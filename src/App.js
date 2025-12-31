import React, { useState, useRef } from "react";
import { Upload, Download, X } from "lucide-react";

// Import images - UPDATE THESE PATHS to match actual filenames
import bg1 from "./images/backgrounds/bg1.jpg";

import smiskiTheme from "./images/themes/smiskiTheme.png";
import sonnyAngelTheme from "./images/themes/sonnyAngelTheme.png";
import miffyTheme from "./images/themes/miffyTheme.png";
import strawberryTheme from "./images/themes/strawberryTheme.png";

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

// Theme configuration
const THEMES = {
  smiski: {
    name: "Smiski",
    image: smiskiTheme,
    accent: "#e2ffdaff",
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
    accent: "#ff6b35",
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
    accent: "#10b981",
    frameWidth: 444,
    frameHeight: 1413,
    photoWidth: 348,
    photoHeight: 229,
    photoLeft: 45,
    photoTop: 58,
    photoSpacing: 38,
  },
  strawberry: {
    name: "Strawberry",
    image: strawberryTheme,
    accent: "#ec4899",
    frameWidth: 444,
    frameHeight: 1413,
    photoWidth: 348,
    photoHeight: 229,
    photoLeft: 45,
    photoTop: 58,
    photoSpacing: 38,
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
  const [activeStickerIndex, setActiveStickerIndex] = useState(null);
  const [compositeImage, setCompositeImage] = useState(null);
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

            const targetWidth = currentThemeConfig.photoWidth;
            const targetHeight = currentThemeConfig.photoHeight;
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

  // Regenerate composite image when theme changes
  React.useEffect(() => {
    if (images.length > 0) {
      generateCompositeImage(images, theme);
    }
  }, [theme]);

  const generateCompositeImage = (photoImages, themeKey) => {
    const config = THEMES[themeKey];
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Use display size for preview
    const displayWidth = 296;
    const displayHeight = (config.frameHeight / config.frameWidth) * 296;
    canvas.width = displayWidth;
    canvas.height = displayHeight;

    const scale = displayWidth / config.frameWidth;

    // Get display images (with duplicates if needed)
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

    // Draw photos first
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
          ctx.drawImage(img, x, y, width, height);
          resolve();
        };
        img.src = src;
      });
    });

    Promise.all(photoPromises).then(() => {
      // Draw frame on top
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
    const isControl = e.target.closest(".sticker-controls");
    if (isSticker || isControl) return;

    const rect = stripRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setStickers([
      ...stickers,
      { image: selectedSticker, x, y, id: Date.now(), size: 60, rotation: 0 },
    ]);
    setActiveStickerIndex(stickers.length);
  };

  const removeSticker = (id) => {
    setStickers(stickers.filter((s) => s.id !== id));
    setActiveStickerIndex(null);
  };

  const handleStickerMouseDown = (e, index) => {
    e.stopPropagation();
    setActiveStickerIndex(index);

    if (!stripRef.current) return;
    const rect = stripRef.current.getBoundingClientRect();

    const onMouseMove = (moveEvent) => {
      const x = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      const y = ((moveEvent.clientY - rect.top) / rect.height) * 100;

      setStickers((prev) =>
        prev.map((s, i) => (i === index ? { ...s, x, y } : s))
      );
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleCornerDrag = (e, index, corner) => {
    e.stopPropagation();
    if (!stripRef.current) return;

    const sticker = stickers[index];
    const rect = stripRef.current.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const startSize = sticker.size;
    const startRotation = sticker.rotation;

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      if (corner === "rotate") {
        // Calculate rotation based on mouse position relative to sticker center
        const stickerCenterX = (sticker.x / 100) * rect.width;
        const stickerCenterY = (sticker.y / 100) * rect.height;
        const angle =
          Math.atan2(
            moveEvent.clientY - rect.top - stickerCenterY,
            moveEvent.clientX - rect.left - stickerCenterX
          ) *
          (180 / Math.PI);

        setStickers((prev) =>
          prev.map((s, i) => (i === index ? { ...s, rotation: angle + 90 } : s))
        );
      } else {
        // Resize based on distance from center
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const newSize = Math.max(30, Math.min(150, startSize + distance * 0.3));

        setStickers((prev) =>
          prev.map((s, i) => (i === index ? { ...s, size: newSize } : s))
        );
      }
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

    canvas.width = config.frameWidth;
    canvas.height = config.frameHeight;

    const displayImages = getDisplayImages();

    const photoPromises = displayImages.map((src, idx) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const y =
            config.photoTop + idx * (config.photoHeight + config.photoSpacing);
          ctx.drawImage(
            img,
            config.photoLeft,
            y,
            config.photoWidth,
            config.photoHeight
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
        ctx.drawImage(themeImg, 0, 0, config.frameWidth, config.frameHeight);

        const stickerPromises = stickers.map((sticker) => {
          return new Promise((resolve) => {
            const stickerImg = new Image();
            stickerImg.crossOrigin = "anonymous";
            stickerImg.onload = () => {
              const x = (sticker.x / 100) * config.frameWidth;
              const y = (sticker.y / 100) * config.frameHeight;
              const size = (sticker.size / 60) * 80;

              const imgAspect = stickerImg.width / stickerImg.height;
              let drawWidth = size;
              let drawHeight = size;

              if (imgAspect > 1) {
                drawHeight = size / imgAspect;
              } else if (imgAspect < 1) {
                drawWidth = size * imgAspect;
              }

              ctx.save();
              ctx.translate(x, y);
              ctx.rotate((sticker.rotation * Math.PI) / 180);
              ctx.drawImage(
                stickerImg,
                -drawWidth / 2,
                -drawHeight / 2,
                drawWidth,
                drawHeight
              );
              ctx.restore();

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
          });
        });
      };
      themeImg.src = config.image;
    });
  };

  const displayImages = getDisplayImages();

  return (
    <div
      className="min-h-screen p-8 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-5xl font-black text-center mb-2 text-white drop-shadow-lg"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
        >
          photobooth :)
        </h1>
        <p
          className="text-center text-white drop-shadow-lg mb-8 font-medium"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
        >
          Upload up to 4 photos and create your strip!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-gray-800">
              <h2 className="text-2xl font-black mb-4 text-gray-800">
                Upload Photos
              </h2>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                multiple
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 border-4 border-blue-700 shadow-lg transition-all active:translate-y-1"
              >
                <Upload size={24} />
                Choose Photos (Max 4)
              </button>
              {images.length > 0 && (
                <p className="mt-3 text-center text-gray-600 font-medium">
                  {images.length} photo{images.length !== 1 ? "s" : ""} uploaded
                </p>
              )}
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-gray-800">
              <h2 className="text-2xl font-black mb-4 text-gray-800">
                Choose Theme
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(THEMES).map(([key, t]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setTheme(key);
                      setStickers([]);
                      setActiveStickerIndex(null);
                    }}
                    className={`py-3 px-4 rounded-xl font-bold border-4 transition-all overflow-hidden ${
                      theme === key
                        ? "border-gray-800 shadow-lg scale-105"
                        : "border-gray-400 hover:border-gray-600"
                    }`}
                  >
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-20 object-cover rounded-lg mb-2"
                    />
                    <span className="text-sm">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {displayImages.length > 0 && STICKERS.length > 0 && (
              <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-gray-800">
                <h2 className="text-2xl font-black mb-4 text-gray-800">
                  Add Stickers
                </h2>
                <div className="grid grid-cols-6 gap-2 mb-4">
                  {STICKERS.map((sticker, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSticker(sticker)}
                      className={`p-2 rounded-xl border-3 transition-all ${
                        selectedSticker === sticker
                          ? "bg-yellow-200 border-yellow-500 scale-110 border-4"
                          : "bg-gray-50 border-gray-300 hover:bg-gray-100 border-2"
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

            {displayImages.length > 0 && (
              <button
                onClick={downloadStrip}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 border-4 border-green-700 shadow-lg transition-all active:translate-y-1"
              >
                <Download size={24} />
                Download Strip
              </button>
            )}
          </div>

          <div className="flex flex-col items-center">
            <h2
              className="text-2xl font-black mb-4 text-white drop-shadow-lg"
              style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
            >
              Preview
            </h2>
            {displayImages.length > 0 ? (
              <div className="relative">
                <div
                  ref={stripRef}
                  onClick={handleStripClick}
                  className="relative shadow-2xl cursor-crosshair select-none"
                  style={{
                    width: "296px",
                    height: `${
                      (THEMES[theme].frameHeight / THEMES[theme].frameWidth) *
                      296
                    }px`,
                  }}
                >
                  {/* Single composite image instead of layers */}
                  {compositeImage && (
                    <img
                      src={compositeImage}
                      alt="Photo strip"
                      className="w-full h-full pointer-events-none select-none"
                      draggable="false"
                      style={{ userSelect: "none" }}
                    />
                  )}

                  {stickers.map((sticker, index) => (
                    <React.Fragment key={sticker.id}>
                      {/* Sticker Image */}
                      <div
                        className="sticker-item absolute cursor-move select-none"
                        style={{
                          left: `${sticker.x}%`,
                          top: `${sticker.y}%`,
                          transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg)`,
                          width: `${sticker.size}px`,
                          height: `${sticker.size}px`,
                          zIndex: activeStickerIndex === index ? 30 : 20,
                          pointerEvents: "auto",
                        }}
                        onMouseDown={(e) => handleStickerMouseDown(e, index)}
                      >
                        <img
                          src={sticker.image}
                          alt="Sticker"
                          className="w-full h-full object-contain"
                          draggable="false"
                          style={{ pointerEvents: "none", userSelect: "none" }}
                        />
                      </div>

                      {/* Selection Box & Handles */}
                      {activeStickerIndex === index && (
                        <div
                          className="sticker-controls absolute"
                          style={{
                            left: `${sticker.x}%`,
                            top: `${sticker.y}%`,
                            transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg)`,
                            width: `${sticker.size + 20}px`,
                            height: `${sticker.size + 20}px`,
                            zIndex: 31,
                            pointerEvents: "none",
                          }}
                        >
                          {/* Border */}
                          <div
                            className="absolute inset-0 border-2 border-blue-500 rounded"
                            style={{ pointerEvents: "none" }}
                          />

                          {/* Corner Handles for Resizing */}
                          <div
                            className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-nwse-resize"
                            style={{
                              top: "-8px",
                              left: "-8px",
                              pointerEvents: "auto",
                            }}
                            onMouseDown={(e) =>
                              handleCornerDrag(e, index, "tl")
                            }
                          />
                          <div
                            className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-nesw-resize"
                            style={{
                              top: "-8px",
                              right: "-8px",
                              pointerEvents: "auto",
                            }}
                            onMouseDown={(e) =>
                              handleCornerDrag(e, index, "tr")
                            }
                          />
                          <div
                            className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-nesw-resize"
                            style={{
                              bottom: "-8px",
                              left: "-8px",
                              pointerEvents: "auto",
                            }}
                            onMouseDown={(e) =>
                              handleCornerDrag(e, index, "bl")
                            }
                          />
                          <div
                            className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-nwse-resize"
                            style={{
                              bottom: "-8px",
                              right: "-8px",
                              pointerEvents: "auto",
                            }}
                            onMouseDown={(e) =>
                              handleCornerDrag(e, index, "br")
                            }
                          />

                          {/* Rotation Handle */}
                          <div
                            className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-grab active:cursor-grabbing"
                            style={{
                              top: "-30px",
                              left: "50%",
                              transform: "translateX(-50%)",
                              pointerEvents: "auto",
                            }}
                            onMouseDown={(e) =>
                              handleCornerDrag(e, index, "rotate")
                            }
                          />

                          {/* Delete Button */}
                          <button
                            className="absolute bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg"
                            style={{
                              top: "-35px",
                              right: "-15px",
                              pointerEvents: "auto",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSticker(sticker.id);
                            }}
                            onMouseDown={(e) => e.stopPropagation()}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ) : (
              <div
                className="bg-gray-100 border-4 border-dashed border-gray-400 flex items-center justify-center"
                style={{
                  width: "296px",
                  height: `${
                    (THEMES[theme].frameHeight / THEMES[theme].frameWidth) * 296
                  }px`,
                }}
              >
                <p className="text-gray-400 font-bold text-center px-4">
                  Upload photos to see your strip!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
