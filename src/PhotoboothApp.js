import React, { useState, useRef } from "react";
import { X } from "lucide-react";

// Import images
import bg from "./images/backgrounds/bg.jpg";

import smiskiTheme from "./images/themes/smiskiTheme.png";
import sonnyAngelTheme from "./images/themes/sonnyAngelTheme.png";
import miffyTheme from "./images/themes/miffyTheme.png";
import strawberryTheme from "./images/themes/strawberryTheme.png";

// Import button images
import heartButton from "./images/buttons/heart-button.png";
import heartButtonDown from "./images/buttons/heart-button-down.png";
import smiskiButton from "./images/buttons/smiski-button.png";
import sonnyAngelButton from "./images/buttons/sonnyAngel-button.png";
import miffyButton from "./images/buttons/miffy-button.png";
import strawberryButton from "./images/buttons/strawberry-button.png";

import sticker1 from "./images/stickers/smiskiSticker.png";
import sticker2 from "./images/stickers/smiskiSticker.png";
import sticker3 from "./images/stickers/smiskiSticker.png";
import sticker4 from "./images/stickers/smiskiSticker.png";
import sticker5 from "./images/stickers/smiskiSticker.png";
import sticker6 from "./images/stickers/smiskiSticker.png";
import sticker7 from "./images/stickers/smiskiSticker.png";
import sticker8 from "./images/stickers/smiskiSticker.png";
import sticker9 from "./images/stickers/smiskiSticker.png";
import sticker10 from "./images/stickers/smiskiSticker.png";
import sticker11 from "./images/stickers/smiskiSticker.png";
import sticker12 from "./images/stickers/smiskiSticker.png";

import backButton from "./images/buttons/back-button.png";
import downloadButton from "./images/buttons/download-button.png";

const THEMES = {
  smiski: {
    name: "Smiski",
    image: smiskiTheme,
    buttonImage: smiskiButton,
    frameWidth: 281,
    frameHeight: 881,
    photoWidth: 223,
    photoHeight: 148,
    photoLeft: 27,
    photoTop: 35,
    photoSpacing: 16,
  },
  sonnyAngel: {
    name: "Sonny Angel",
    image: sonnyAngelTheme,
    buttonImage: sonnyAngelButton,
    frameWidth: 228,
    frameHeight: 719,
    photoWidth: 177,
    photoHeight: 117,
    photoLeft: 24,
    photoTop: 40,
    photoSpacing: 19,
  },
  miffy: {
    name: "Miffy",
    image: miffyTheme,
    buttonImage: miffyButton,
    frameWidth: 281,
    frameHeight: 886,
    photoWidth: 218,
    photoHeight: 142,
    photoLeft: 31,
    photoTop: 68,
    photoSpacing: 25,
  },
  strawberry: {
    name: "Strawberry",
    image: strawberryTheme,
    buttonImage: strawberryButton,
    frameWidth: 280,
    frameHeight: 876,
    photoWidth: 215,
    photoHeight: 140,
    photoLeft: 33,
    photoTop: 73,
    photoSpacing: 25,
  },
};

const STICKERS = [
  sticker1,
  sticker2,
  sticker3,
  sticker4,
  sticker5,
  sticker6,
  sticker7,
  sticker8,
  sticker9,
  sticker10,
  sticker11,
  sticker12,
];

export default function PhotoboothApp() {
  const [images, setImages] = useState([]);
  const [theme, setTheme] = useState("smiski");
  const [stickers, setStickers] = useState([]);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [compositeImage, setCompositeImage] = useState(null);
  const [isHeartPressed, setIsHeartPressed] = useState(false);
  const stripRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    const currentThemeConfig = THEMES[theme];

    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Use 3x resolution for better quality
            const targetWidth = currentThemeConfig.photoWidth * 3;
            const targetHeight = currentThemeConfig.photoHeight * 3;
            canvas.width = targetWidth;
            canvas.height = targetHeight;

            const aspectRatio = img.width / img.height;
            const targetAspect = targetWidth / targetHeight;

            let drawWidth,
              drawHeight,
              offsetX = 0,
              offsetY = 0;

            if (aspectRatio > targetAspect) {
              drawHeight = targetHeight;
              drawWidth = aspectRatio * drawHeight;
              offsetX = -(drawWidth - targetWidth) / 2;
            } else {
              drawWidth = targetWidth;
              drawHeight = drawWidth / aspectRatio;
              offsetY = -(drawHeight - targetHeight) / 2;
            }

            // Enable image smoothing for better quality
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            resolve(canvas.toDataURL("image/jpeg", 0.95));
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((results) => {
      setImages(results);
      setStickers([]);
      generateCompositeImage(results, theme);
    });
  };

  React.useEffect(() => {
    if (images.length > 0) {
      generateCompositeImage(images, theme);
    }
  }, [theme]);

  const generateCompositeImage = (photoImages, themeKey) => {
    const config = THEMES[themeKey];
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Render preview at 2x resolution for crisp display
    const previewScale = 2;
    const displayWidth = 222 * previewScale;
    const displayHeight =
      (config.frameHeight / config.frameWidth) * 222 * previewScale;
    canvas.width = displayWidth;
    canvas.height = displayHeight;

    const scale = displayWidth / config.frameWidth;

    const displayImages =
      photoImages.length === 4
        ? photoImages
        : (() => {
            const display = [...photoImages];
            while (display.length < 4) {
              display.push(photoImages[display.length % photoImages.length]);
            }
            return display;
          })();

    const photoPromises = displayImages.map((src, idx) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const x = config.photoLeft * scale;
          const y =
            (config.photoTop +
              idx * (config.photoHeight + config.photoSpacing)) *
            scale;
          const width = config.photoWidth * scale;
          const height = config.photoHeight * scale;

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, x, y, width, height);
          resolve();
        };
        img.src = src;
      });
    });

    Promise.all(photoPromises).then(() => {
      const themeImg = new Image();
      themeImg.onload = () => {
        ctx.drawImage(themeImg, 0, 0, displayWidth, displayHeight);
        setCompositeImage(canvas.toDataURL());
      };
      themeImg.src = config.image;
    });
  };

  const getDisplayImages = () => {
    if (images.length === 0) return [];
    if (images.length === 4) return images;

    const display = [...images];
    while (display.length < 4) {
      display.push(images[display.length % images.length]);
    }
    return display;
  };

  const handleStripClick = (e) => {
    if (!selectedSticker || !stripRef.current) return;

    const isSticker = e.target.closest(".sticker-item");
    if (isSticker) return;

    const rect = stripRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setStickers([
      ...stickers,
      { image: selectedSticker, x, y, id: Date.now(), size: 150 },
    ]);
  };

  const removeSticker = (e, id) => {
    e.stopPropagation();
    setStickers(stickers.filter((s) => s.id !== id));
  };

  const handleStickerMouseDown = (e, sticker) => {
    e.stopPropagation();

    if (!stripRef.current) return;
    const rect = stripRef.current.getBoundingClientRect();

    const onMouseMove = (moveEvent) => {
      const x = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      const y = ((moveEvent.clientY - rect.top) / rect.height) * 100;

      setStickers((prev) =>
        prev.map((s) => (s.id === sticker.id ? { ...s, x, y } : s))
      );
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const downloadStrip = () => {
    if (!stripRef.current) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const config = THEMES[theme];

    // Use 3x resolution for high quality output
    const outputScale = 3;
    canvas.width = config.frameWidth * outputScale;
    canvas.height = config.frameHeight * outputScale;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const displayImages = getDisplayImages();

    const photoPromises = displayImages.map((src, idx) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const y =
            (config.photoTop +
              idx * (config.photoHeight + config.photoSpacing)) *
            outputScale;
          ctx.drawImage(
            img,
            config.photoLeft * outputScale,
            y,
            config.photoWidth * outputScale,
            config.photoHeight * outputScale
          );
          resolve();
        };
        img.src = src;
      });
    });

    Promise.all(photoPromises).then(() => {
      const themeImg = new Image();
      themeImg.crossOrigin = "anonymous";
      themeImg.onload = () => {
        ctx.drawImage(themeImg, 0, 0, canvas.width, canvas.height);

        const stickerPromises = stickers.map((sticker) => {
          return new Promise((resolve) => {
            const stickerImg = new Image();
            stickerImg.crossOrigin = "anonymous";
            stickerImg.onload = () => {
              const x = (sticker.x / 100) * canvas.width;
              const y = (sticker.y / 100) * canvas.height;
              const size = (sticker.size / 150) * 195 * outputScale;

              const imgAspect = stickerImg.width / stickerImg.height;
              let drawWidth = size;
              let drawHeight = size;

              if (imgAspect > 1) {
                drawHeight = size / imgAspect;
              } else if (imgAspect < 1) {
                drawWidth = size * imgAspect;
              }

              ctx.drawImage(
                stickerImg,
                x - drawWidth / 2,
                y - drawHeight / 2,
                drawWidth,
                drawHeight
              );
              resolve();
            };
            stickerImg.onerror = () => resolve();
            stickerImg.src = sticker.image;
          });
        });

        Promise.all(stickerPromises).then(() => {
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "photostrip.png";
            a.click();
            URL.revokeObjectURL(url);
          }, "image/png");
        });
      };
      themeImg.src = config.image;
    });
  };

  const displayImages = getDisplayImages();

  return (
    <div
      className="min-h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        className="max-w-full mx-auto relative"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        {/* Heart Button - positioned at (150, 100) */}
        <div className="absolute" style={{ left: "135px", top: "150px" }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            multiple
            className="hidden"
          />
          <img
            src={isHeartPressed ? heartButtonDown : heartButton}
            alt="Upload Photos"
            className="cursor-pointer transition-transform active:scale-95"
            style={{ width: "110px", height: "auto" }}
            onClick={() => fileInputRef.current?.click()}
            onMouseDown={() => setIsHeartPressed(true)}
            onMouseUp={() => setIsHeartPressed(false)}
            onMouseLeave={() => setIsHeartPressed(false)}
            draggable="false"
          />
        </div>

        {images.length > 0 && (
          <p
            className="absolute text-center text-white drop-shadow-lg font-bold"
            style={{
              left: "137px",
              top: "234px",
              width: "100px",
              fontSize: "12px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            {images.length} photo{images.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Theme Buttons - moved down 130 pixels to (100, 290) */}
        <div
          className="absolute flex gap-0"
          style={{ left: "80px", top: "320px" }}
        >
          {Object.entries(THEMES).map(([key, t], index) => (
            <img
              key={key}
              src={t.buttonImage}
              alt={t.name}
              className={`cursor-pointer transition-all ${
                theme === key ? "scale-110 drop-shadow-2xl" : "hover:scale-105"
              }`}
              style={{
                width: "auto",
                height: "50px",
                marginLeft: index === 0 ? "0" : "50px",
              }}
              onClick={() => {
                setTheme(key);
                setStickers([]);
              }}
              draggable="false"
            />
          ))}
        </div>

        {/* Stickers Section */}
        {displayImages.length > 0 && STICKERS.length > 0 && (
          <div
            className="absolute rounded-3xl p-6"
            style={{ left: "60px", top: "520px", width: "500px" }}
          >
            <div className="grid grid-cols-6 gap-2 mb-4">
              {STICKERS.map((sticker, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSticker(sticker)}
                  className={`p-2 rounded-xl border-3 transition-all ${
                    selectedSticker === sticker
                      ? "border-purple-300 scale-110 border-4"
                      : "border-gray-300 hover:bg-gray-100 border-2"
                  }`}
                >
                  <img
                    src={sticker}
                    alt={`Sticker ${idx + 1}`}
                    className="w-full h-10 object-contain"
                  />
                </button>
              ))}
            </div>
            {selectedSticker && (
              <p className="text-center text-sm text-gray-600 font-medium">
                Click on the strip to add sticker
              </p>
            )}
          </div>
        )}

        {/* Download Button */}
        {displayImages.length > 0 && (
          <img
            src={downloadButton}
            alt="Download Strip"
            onClick={downloadStrip}
            className="absolute cursor-pointer transition-transform hover:scale-105 active:scale-95"
            style={{
              left: "1050px",
              bottom: "50px",
              width: "auto",
              height: "100px",
            }}
            draggable="false"
          />
        )}

        {/* Preview Section - removed "Preview" text */}
        <div
          className="absolute flex flex-col items-center"
          style={{ right: "70px", top: "20px" }}
        >
          {displayImages.length > 0 ? (
            <div className="relative">
              <div
                ref={stripRef}
                onClick={handleStripClick}
                className="relative shadow-2xl cursor-crosshair select-none"
                style={{
                  width: "222px",
                  height: `${
                    (THEMES[theme].frameHeight / THEMES[theme].frameWidth) * 222
                  }px`,
                  maxHeight: "100vh",
                }}
              >
                {compositeImage && (
                  <img
                    src={compositeImage}
                    alt="Photo strip"
                    className="w-full h-full pointer-events-none select-none"
                    draggable="false"
                    style={{ userSelect: "none" }}
                  />
                )}

                {stickers.map((sticker) => (
                  <div
                    key={sticker.id}
                    className="sticker-item absolute select-none group cursor-move"
                    style={{
                      left: `${sticker.x}%`,
                      top: `${sticker.y}%`,
                      transform: `translate(-50%, -50%)`,
                      width: `${sticker.size}px`,
                      height: `${sticker.size}px`,
                      zIndex: 20,
                      pointerEvents: "auto",
                    }}
                    onMouseDown={(e) => handleStickerMouseDown(e, sticker)}
                  >
                    <img
                      src={sticker.image}
                      alt="Sticker"
                      className="w-full h-full object-contain pointer-events-none"
                      draggable="false"
                      style={{ userSelect: "none" }}
                    />
                    <button
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => removeSticker(e, sticker.id)}
                      onMouseDown={(e) => e.stopPropagation()}
                      style={{ pointerEvents: "auto" }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              className="bg-gray-100 border-4 border-dashed border-gray-400 flex items-center justify-center"
              style={{
                width: "222px",
                height: "700px",
              }}
            >
              <p className="text-gray-400 font-bold text-center px-4">
                Upload photos to see your strip!
              </p>
            </div>
          )}
        </div>

        {/* Back Button */}
        <button
          onClick={() => (window.location.href = "/")}
          className="absolute"
          style={{ left: "40px", bottom: "10px" }}
        >
          <img
            src={backButton}
            alt="Back to Home"
            className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
            style={{ width: "120px", height: "auto" }}
            draggable="false"
          />
        </button>
      </div>
    </div>
  );
}
