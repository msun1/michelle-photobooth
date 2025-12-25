import React, { useState, useRef } from "react";
import { Upload, Download } from "lucide-react";

// Import images - UPDATE THESE PATHS to match actual filenames
import bg1 from "./images/backgrounds/bg1.jpg";

import smiskiTheme from "./images/themes/smiskiTheme.png";
import sunsetTheme from "./images/themes/smiskiTheme.png";
import mintTheme from "./images/themes/smiskiTheme.png";
import bubblegumTheme from "./images/themes/smiskiTheme.png";

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

// Theme configuration - add your frame measurements here
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
  sunset: {
    name: "Sunset",
    image: sunsetTheme,
    accent: "#ff6b35",
    frameWidth: 444,
    frameHeight: 1413,
    photoWidth: 348,
    photoHeight: 229,
    photoLeft: 45,
    photoTop: 58,
    photoSpacing: 38,
  },
  mint: {
    name: "Mint",
    image: mintTheme,
    accent: "#10b981",
    frameWidth: 444,
    frameHeight: 1413,
    photoWidth: 348,
    photoHeight: 229,
    photoLeft: 45,
    photoTop: 58,
    photoSpacing: 38,
  },
  bubblegum: {
    name: "Bubblegum",
    image: bubblegumTheme,
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

    // Only add sticker if clicking directly on the strip or photos, not on existing stickers or controls
    const isSticker = e.target.closest(".sticker-item");
    const isControl = e.target.closest(".sticker-controls");
    if (isSticker || isControl) return;

    const rect = stripRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setStickers([
      ...stickers,
      { image: selectedSticker, x, y, id: Date.now(), size: 40, rotation: 0 },
    ]);
    setActiveStickerIndex(null);
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

  const updateStickerSize = (index, delta) => {
    setStickers((prev) =>
      prev.map((s, i) =>
        i === index
          ? { ...s, size: Math.max(20, Math.min(100, s.size + delta)) }
          : s
      )
    );
  };

  const updateStickerRotation = (index, delta) => {
    setStickers((prev) =>
      prev.map((s, i) =>
        i === index ? { ...s, rotation: (s.rotation + delta) % 360 } : s
      )
    );
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
              const size = (sticker.size / 40) * 60;

              // Calculate dimensions to maintain aspect ratio
              const imgAspect = stickerImg.width / stickerImg.height;
              let drawWidth = size;
              let drawHeight = size;

              if (imgAspect > 1) {
                // Wider than tall
                drawHeight = size / imgAspect;
              } else if (imgAspect < 1) {
                // Taller than wide
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
                    onClick={() => setTheme(key)}
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
                  className="relative shadow-2xl cursor-crosshair"
                  style={{
                    width: "296px",
                    height: `${
                      (THEMES[theme].frameHeight / THEMES[theme].frameWidth) *
                      296
                    }px`,
                  }}
                >
                  {displayImages.map((img, idx) => {
                    const config = THEMES[theme];
                    const scale = 296 / config.frameWidth;

                    return (
                      <div
                        key={idx}
                        className="absolute photo-container"
                        style={{
                          left: `${config.photoLeft * scale}px`,
                          top: `${
                            (config.photoTop +
                              idx *
                                (config.photoHeight + config.photoSpacing)) *
                            scale
                          }px`,
                          width: `${config.photoWidth * scale}px`,
                          height: `${config.photoHeight * scale}px`,
                          zIndex: 1,
                        }}
                      >
                        <img
                          src={img}
                          alt={`Strip ${idx + 1}`}
                          className="w-full h-full"
                        />
                      </div>
                    );
                  })}

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `url(${THEMES[theme].image})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "top center",
                      width: "100%",
                      height: "100%",
                      zIndex: 2,
                    }}
                  />

                  {stickers.map((sticker, index) => (
                    <React.Fragment key={sticker.id}>
                      <div
                        className="sticker-item absolute cursor-move select-none"
                        style={{
                          left: `${sticker.x}%`,
                          top: `${sticker.y}%`,
                          transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg)`,
                          width: `${sticker.size}px`,
                          height: `${sticker.size}px`,
                          zIndex: activeStickerIndex === index ? 30 : 20,
                        }}
                        onMouseDown={(e) => handleStickerMouseDown(e, index)}
                      >
                        <img
                          src={sticker.image}
                          alt="Sticker"
                          className="w-full h-full object-contain pointer-events-none"
                          draggable="false"
                        />
                      </div>

                      {activeStickerIndex === index && (
                        <div
                          className="sticker-controls absolute bg-white rounded-lg shadow-lg p-2 flex gap-2"
                          style={{
                            left: `${sticker.x}%`,
                            top: `${sticker.y}%`,
                            transform: `translate(-50%, calc(-50% - ${
                              sticker.size / 2 + 45
                            }px))`,
                            zIndex: 40,
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStickerSize(index, -5);
                            }}
                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs font-bold"
                          >
                            -
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStickerSize(index, 5);
                            }}
                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs font-bold"
                          >
                            +
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStickerRotation(index, -15);
                            }}
                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs font-bold"
                          >
                            ↺
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStickerRotation(index, 15);
                            }}
                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs font-bold"
                          >
                            ↻
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSticker(sticker.id);
                            }}
                            className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-bold"
                          >
                            ✕
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
