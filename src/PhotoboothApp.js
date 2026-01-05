import React, { useState, useRef } from "react";
import { X } from "lucide-react";

// Import images
import bg from "./images/backgrounds/bg.jpg";

import smiskiTheme from "./images/themes/smiskiTheme.jpg";
import sonnyAngelTheme from "./images/themes/sonnyAngelTheme.jpg";
import miffyTheme from "./images/themes/miffyTheme.jpg";
import strawberryTheme from "./images/themes/strawberryTheme.jpg";
import whiteTheme from "./images/themes/whiteTheme.jpg";
import blackTheme from "./images/themes/blackTheme.png";
import yellowTheme from "./images/themes/yellowTheme.png";

import smiskiOverlay from "./images/themes/smiskiOverlay.png";
import sonnyAngelOverlay from "./images/themes/sonnyAngelOverlay.png";
import miffyCupcakeOverlay from "./images/themes/miffyCupcakeOverlay.png";

// Import button images
import heartButton from "./images/buttons/heart-button.png";
import heartButtonDown from "./images/buttons/heart-button-down.png";
import smiskiButton from "./images/buttons/smiski-button.png";
import sonnyAngelButton from "./images/buttons/sonnyAngel-button.png";
import miffyButton from "./images/buttons/miffy-button.png";
import strawberryButton from "./images/buttons/strawberry-button.png";
import whiteButton from "./images/buttons/white-button.png";
import blackButton from "./images/buttons/black-button.png";
import yellowButton from "./images/buttons/yellow-button.png";

import takePicButton from "./images/buttons/takepics-button.png";
import takePicButtonDown from "./images/buttons/takepics-button-down.png";

import sticker1 from "./images/stickers/smiskiSticker.png";
import sticker2 from "./images/stickers/pandaSonnyAngelSticker.png";
import sticker3 from "./images/stickers/strawberrySonnyAngelSticker.png";
import sticker4 from "./images/stickers/miffyCakeSticker.png";
import sticker5 from "./images/stickers/croissantSticker.png";
import sticker6 from "./images/stickers/campusLifeSticker.png";
import sticker7 from "./images/stickers/miffySticker.png";
import sticker8 from "./images/stickers/smiskiSwirlCakeSticker.png";
import sticker9 from "./images/stickers/miffyCupcakeSticker.png";
import sticker10 from "./images/stickers/miffyIllinoisSticker.png";
import sticker11 from "./images/stickers/heartSticker.png";
import sticker12 from "./images/stickers/sunnyDaysSticker.png";
import sticker13 from "./images/stickers/starSticker.png";
import sticker14 from "./images/stickers/cakeSticker.png";
import sticker15 from "./images/stickers/cakeSliceSticker.png";
import sticker16 from "./images/stickers/matchaThoughtsSticker.png";
import sticker17 from "./images/stickers/butterflySticker.png";
import sticker18 from "./images/stickers/heartStickerSmall.png";
import sticker19 from "./images/stickers/starStickerSmall.png";
import sticker20 from "./images/stickers/butterflySticker.png";
import sticker21 from "./images/stickers/highonlifeSticker.png";
import sticker22 from "./images/stickers/happySticker.png";

import backButton from "./images/buttons/back-button.png";
import downloadButton from "./images/buttons/download-button.png";

// actual bg image dimensions !!
const BG_WIDTH = 2004;
const BG_HEIGHT = 1194;

const THEMES = {
  smiski: {
    name: "Smiski",
    image: smiskiTheme,
    buttonImage: smiskiButton,
    buttonWidth: 60,
    buttonLeft: 81,
    buttonTop: 460,
    frameWidth: 281,
    frameHeight: 881,
    photoWidth: 219,
    photoHeight: 142,
    photoLeft: 31,
    photoTop: 39,
    photoSpacing: 21.5,
    overlay: {
      image: smiskiOverlay,
      width: 135,
      x: 150,
      y: 600,
    },
  },
  sonnyAngel: {
    name: "Sonny Angel",
    image: sonnyAngelTheme,
    buttonImage: sonnyAngelButton,
    buttonWidth: 110,
    buttonLeft: 230,
    buttonTop: 470,
    frameWidth: 228,
    frameHeight: 719,
    photoWidth: 177,
    photoHeight: 114,
    photoLeft: 25,
    photoTop: 42,
    photoSpacing: 21.5,
    overlay: {
      image: sonnyAngelOverlay,
      width: 130,
      x: 103,
      y: 412,
    },
  },
  miffy: {
    name: "Miffy",
    image: miffyTheme,
    buttonImage: miffyButton,
    buttonWidth: 60,
    buttonLeft: 420,
    buttonTop: 440,
    frameWidth: 281,
    frameHeight: 886,
    photoWidth: 217,
    photoHeight: 141,
    photoLeft: 33,
    photoTop: 67,
    photoSpacing: 26,
    overlay: {
      image: miffyCupcakeOverlay,
      width: 206,
      x: -8,
      y: 616,
    },
  },
  strawberry: {
    name: "Strawberry",
    image: strawberryTheme,
    buttonImage: strawberryButton,
    buttonWidth: 140,
    buttonLeft: 140,
    buttonTop: 550,
    frameWidth: 280,
    frameHeight: 879,
    photoWidth: 215,
    photoHeight: 140,
    photoLeft: 34,
    photoTop: 73,
    photoSpacing: 25,
  },
  white: {
    name: "White",
    image: whiteTheme,
    buttonImage: whiteButton,
    buttonWidth: 70,
    buttonLeft: 580,
    buttonTop: 430,
    frameWidth: 421,
    frameHeight: 1316,
    photoWidth: 320,
    photoHeight: 209,
    photoLeft: 51,
    photoTop: 97,
    photoSpacing: 36,
  },
  black: {
    name: "Black",
    image: blackTheme,
    buttonImage: blackButton,
    buttonWidth: 70,
    buttonLeft: 364,
    buttonTop: 530,
    frameWidth: 283,
    frameHeight: 881,
    photoWidth: 217,
    photoHeight: 142,
    photoLeft: 35,
    photoTop: 65,
    photoSpacing: 21,
  },
  yellow: {
    name: "Yellow",
    image: yellowTheme,
    buttonImage: yellowButton,
    buttonWidth: 70,
    buttonLeft: 510,
    buttonTop: 520,
    frameWidth: 282,
    frameHeight: 883,
    photoWidth: 217,
    photoHeight: 142,
    photoLeft: 34,
    photoTop: 60,
    photoSpacing: 25,
  },
};

const STICKERS = [
  {
    src: sticker1,
    width: 55,
    left: 110,
    top: 790,
    rotation: -20,
    printSize: 150, // smiski
  },
  {
    src: sticker2,
    width: 70,
    left: 180,
    top: 790,
    rotation: 10,
    printSize: 150, // sonny angel
  },
  {
    src: sticker3,
    width: 70,
    left: 250,
    top: 770,
    rotation: -8,
    printSize: 150, // strawberry sonny angel
  },
  {
    src: sticker4,
    width: 70,
    left: 304,
    top: 840,
    rotation: 0,
    printSize: 150, // miffy cake
  },
  {
    src: sticker5,
    width: 90,
    left: 350,
    top: 770,
    rotation: 0,
    printSize: 100, // croissant
  },
  {
    src: sticker6,
    width: 100,
    left: 390,
    top: 790,
    rotation: 0,
    printSize: 150, // campus life
  },
  {
    src: sticker7,
    width: 70,
    left: 630,
    top: 760,
    rotation: -10,
    printSize: 150, // miffy
  },
  {
    src: sticker8,
    width: 100,
    left: 100,
    top: 940,
    rotation: 0,
    printSize: 100,
  }, // smiski swirl cake
  {
    src: sticker9,
    width: 90,
    left: 220,
    top: 920,
    rotation: 0,
    printSize: 100, // miffy cupcake
  },
  {
    src: sticker10,
    width: 80,
    left: 380,
    top: 930,
    rotation: -10,
    printSize: 150, // miffy illinois
  },
  {
    src: sticker11,
    width: 50,
    left: 440,
    top: 920,
    rotation: 0,
    printSize: 100, // heart
  },
  {
    src: sticker12,
    width: 120,
    left: 605,
    top: 990,
    rotation: 0,
    printSize: 150, // sunny days
  },
  {
    src: sticker13,
    width: 50,
    left: 460,
    top: 865,
    rotation: 0,
    printSize: 100, // star
  },
  {
    src: sticker14,
    width: 80,
    left: 500,
    top: 740,
    rotation: 0,
    printSize: 80, // cake
  },
  {
    src: sticker15,
    width: 70,
    left: 560,
    top: 815,
    rotation: 0,
    printSize: 80, // cake slice
  },
  {
    src: sticker16,
    width: 100,
    left: 110,
    top: 1020,
    rotation: 0,
    printSize: 150, // matcha thoughts
  },
  {
    src: sticker17,
    width: 70,
    left: 460,
    top: 980,
    rotation: 0,
    printSize: 100, // butterfly
  },
  {
    src: sticker18,
    width: 40,
    left: 310,
    top: 760,
    rotation: 0,
    printSize: 50, // heart small
  },
  {
    src: sticker19,
    width: 40,
    left: 320,
    top: 1004,
    rotation: 0,
    printSize: 50, // star small
  },
  {
    src: sticker20,
    width: 40,
    left: 443,
    top: 742,
    rotation: 0,
    printSize: 50, // butterfly small
  },
  {
    src: sticker21,
    width: 170,
    left: 530,
    top: 900,
    rotation: 0,
    printSize: 200, // high on life
  },
  {
    src: sticker22,
    width: 160,
    left: 530,
    top: 950,
    rotation: 0,
    printSize: 200, // happy
  },
];

export default function PhotoboothApp() {
  const [images, setImages] = useState([]);
  const [isTakePicPressed, setIsTakePicPressed] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraPhotos, setCameraPhotos] = useState([]);
  const [stream, setStream] = useState(null);
  const [theme, setTheme] = useState("smiski");
  const [stickers, setStickers] = useState([]);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [compositeImage, setCompositeImage] = useState(null);
  const [isHeartPressed, setIsHeartPressed] = useState(false);
  const stripRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

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

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
      });
      setStream(mediaStream);
      setShowCamera(true);
      setCameraPhotos([]);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        } else {
          console.log("videoRef.current is null!");
        }
      }, 100);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert(
        "Unable to access camera. Please check permissions. Error: " +
          err.message
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current || cameraPhotos.length >= 4)
      return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const currentThemeConfig = THEMES[theme];
    const targetWidth = currentThemeConfig.photoWidth * 3;
    const targetHeight = currentThemeConfig.photoHeight * 3;

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const videoAspect = video.videoWidth / video.videoHeight;
    const targetAspect = targetWidth / targetHeight;

    let drawWidth,
      drawHeight,
      offsetX = 0,
      offsetY = 0;

    if (videoAspect > targetAspect) {
      drawHeight = targetHeight;
      drawWidth = videoAspect * drawHeight;
      offsetX = -(drawWidth - targetWidth) / 2;
    } else {
      drawWidth = targetWidth;
      drawHeight = drawWidth / videoAspect;
      offsetY = -(drawHeight - targetHeight) / 2;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);

    const photoData = canvas.toDataURL("image/jpeg", 0.95);
    const newPhotos = [...cameraPhotos, photoData];
    setCameraPhotos(newPhotos);

    if (newPhotos.length === 4) {
      setImages(newPhotos);
      setStickers([]);
      generateCompositeImage(newPhotos, theme);
      stopCamera();
    }
  };

  const cancelCamera = () => {
    stopCamera();
    setCameraPhotos([]);
  };

  React.useEffect(() => {
    if (images.length > 0) {
      generateCompositeImage(images, theme);
    }
  }, [theme, images]);

  const generateCompositeImage = (photoImages, themeKey) => {
    const config = THEMES[themeKey];
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

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

    const themeImg = new Image();
    themeImg.onload = () => {
      ctx.drawImage(themeImg, 0, 0, displayWidth, displayHeight);

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
        if (config.overlay) {
          const overlayImg = new Image();
          overlayImg.onload = () => {
            const overlayWidth =
              (config.overlay.width / config.frameWidth) * displayWidth;
            const overlayHeight =
              (overlayImg.height / overlayImg.width) * overlayWidth;

            const overlayX =
              (config.overlay.x / config.frameWidth) * displayWidth;
            const overlayY =
              (config.overlay.y / config.frameHeight) * displayHeight;

            ctx.drawImage(
              overlayImg,
              overlayX,
              overlayY,
              overlayWidth,
              overlayHeight
            );
            setCompositeImage(canvas.toDataURL());
          };
          overlayImg.src = config.overlay.image;
        } else {
          setCompositeImage(canvas.toDataURL());
        }
      });
    };
    themeImg.src = config.image;
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
      {
        image: selectedSticker.src,
        x,
        y,
        id: Date.now(),
        size: selectedSticker.printSize,
      },
    ]);

    setSelectedSticker(null);
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

    const outputScale = 3;
    canvas.width = config.frameWidth * outputScale;
    canvas.height = config.frameHeight * outputScale;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const displayImages = getDisplayImages();

    const themeImg = new Image();
    themeImg.crossOrigin = "anonymous";
    themeImg.onload = () => {
      ctx.drawImage(themeImg, 0, 0, canvas.width, canvas.height);

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
        const drawOverlayAndStickers = () => {
          if (config.overlay) {
            const overlayImg = new Image();
            overlayImg.crossOrigin = "anonymous";
            overlayImg.onload = () => {
              const overlayWidth = config.overlay.width * outputScale;
              const overlayHeight =
                (overlayImg.height / overlayImg.width) * overlayWidth;

              const overlayX = config.overlay.x * outputScale;
              const overlayY = config.overlay.y * outputScale;

              ctx.drawImage(
                overlayImg,
                overlayX,
                overlayY,
                overlayWidth,
                overlayHeight
              );

              drawStickers();
            };
            overlayImg.src = config.overlay.image;
          } else {
            drawStickers();
          }
        };

        const drawStickers = () => {
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

        drawOverlayAndStickers();
      });
    };
    themeImg.src = config.image;
  };

  const displayImages = getDisplayImages();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      <div
        ref={containerRef}
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg})`,
          width: "100%",
          // maxWidth: "1330px",
          aspectRatio: `${BG_WIDTH} / ${BG_HEIGHT}`,
          maxHeight: "100vh",
        }}
      >
        {/* heart button div */}
        <div
          className="absolute"
          style={{
            left: `${(540 / BG_WIDTH) * 100}%`,
            top: `${(210 / BG_HEIGHT) * 100}%`,
            zIndex: 10,
          }}
        >
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
            style={{
              width: `${(450 / BG_WIDTH) * 100}%`,
              height: "auto",
            }}
            onClick={() => fileInputRef.current?.click()}
            onMouseDown={() => setIsHeartPressed(true)}
            onMouseUp={() => setIsHeartPressed(false)}
            onMouseLeave={() => setIsHeartPressed(false)}
            draggable="false"
          />
        </div>

        {/* camera button div */}
        <div
          className="absolute"
          style={{
            left: `${(135 / BG_WIDTH) * 100}%`,
            top: `${(220 / BG_HEIGHT) * 100}%`,
          }}
        >
          <img
            src={isTakePicPressed ? takePicButtonDown : takePicButton}
            alt="Take Photos"
            className="cursor-pointer transition-transform active:scale-95"
            style={{
              width: `${(450 / BG_WIDTH) * 100}%`,
              height: "auto",
            }}
            onClick={startCamera}
            onMouseDown={() => setIsTakePicPressed(true)}
            onMouseUp={() => setIsTakePicPressed(false)}
            onMouseLeave={() => setIsTakePicPressed(false)}
            draggable="false"
          />
        </div>

        {images.length > 0 && (
          <p
            className="absolute text-center text-white drop-shadow-lg font-bold"
            style={{
              left: `${(450 / BG_WIDTH) * 100}%`,
              top: `${(320 / BG_HEIGHT) * 100}%`,
              width: `${(400 / BG_WIDTH) * 100}%`,
              fontSize: `${(20 / BG_HEIGHT) * 100}vh`,
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            {images.length} photo{images.length !== 1 ? "s" : ""}
          </p>
        )}

        {Object.entries(THEMES).map(([key, t]) => {
          if (!t.buttonImage) return null;
          return (
            <img
              key={key}
              src={t.buttonImage}
              alt={t.name}
              className={`absolute cursor-pointer transition-all ${
                theme === key ? "scale-110 drop-shadow-2xl" : "hover:scale-105"
              }`}
              style={{
                left: `${(t.buttonLeft / BG_WIDTH) * 100}%`,
                top: `${(t.buttonTop / BG_HEIGHT) * 100}%`,
                width: `${(t.buttonWidth / BG_WIDTH) * 100}%`,
                height: "auto",
              }}
              onClick={() => {
                setTheme(key);
                setStickers([]);
              }}
              draggable="false"
            />
          );
        })}

        {displayImages.length > 0 && STICKERS.length > 0 && (
          <>
            {STICKERS.map((sticker, idx) => (
              <img
                key={idx}
                src={sticker.src}
                alt={`Sticker ${idx + 1}`}
                onClick={() => setSelectedSticker(sticker)}
                className={`absolute cursor-pointer transition-all ${
                  selectedSticker === sticker
                    ? "drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]"
                    : "hover:drop-shadow-lg"
                }`}
                style={{
                  left: `${(sticker.left / BG_WIDTH) * 100}%`,
                  top: `${(sticker.top / BG_HEIGHT) * 100}%`,
                  width: `${(sticker.width / BG_WIDTH) * 100}%`,
                  height: "auto",
                  transform: `rotate(${sticker.rotation}deg)`,
                }}
                draggable="false"
              />
            ))}
            {selectedSticker && (
              <p
                className="absolute text-center text-sm text-gray-600 font-medium"
                style={{
                  left: `${(130 / BG_WIDTH) * 100}%`,
                  top: `${(1090 / BG_HEIGHT) * 100}%`,
                  width: `${(440 / BG_WIDTH) * 100}%`,
                  fontSize: `${(16 / BG_HEIGHT) * 100}vh`,
                }}
              >
                click on the strip to add sticker
              </p>
            )}
          </>
        )}

        {displayImages.length > 0 && (
          <img
            src={downloadButton}
            alt="Download Strip"
            onClick={downloadStrip}
            className="absolute cursor-pointer transition-transform hover:scale-105 active:scale-95"
            style={{
              left: `${(1730 / BG_WIDTH) * 100}%`,
              bottom: `${(70 / BG_HEIGHT) * 100}%`,
              width: "auto",
              height: `${(110 / BG_HEIGHT) * 100}%`,
              zIndex: 10,
            }}
            draggable="false"
          />
        )}

        <div
          className="absolute flex flex-col items-center"
          style={{
            right: `${(70 / BG_WIDTH) * 100}%`,
            top: `${(20 / BG_HEIGHT) * 100}%`,
          }}
        >
          {displayImages.length > 0 ? (
            <div className="relative">
              <div
                ref={stripRef}
                onClick={handleStripClick}
                className="relative shadow-2xl cursor-crosshair select-none"
                style={{
                  width: `${(1050 / BG_WIDTH) * 100}%`,
                  height: `${
                    (((THEMES[theme].frameHeight / THEMES[theme].frameWidth) *
                      222) /
                      BG_HEIGHT) *
                    100
                  }%`,
                }}
              >
                {compositeImage && (
                  <img
                    src={compositeImage}
                    alt="strip"
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
                      className="absolute -top-0 -right-0 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => removeSticker(e, sticker.id)}
                      onMouseDown={(e) => e.stopPropagation()}
                      style={{ pointerEvents: "auto" }}
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              className="bg-gray-100 border-4 border-dashed border-gray-400 flex items-center justify-center"
              style={{
                width: `${(2000 / BG_WIDTH) * 100}%`,
                height: `${(10000 / BG_HEIGHT) * 100}%`,
              }}
            >
              {/* <p
                className="text-gray-400 font-bold text-center px-4"
                style={{ fontSize: `${(14 / BG_HEIGHT) * 100}vh` }}
              >
                upload photos to see your strip
              </p> */}
            </div>
          )}
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="absolute"
          style={{
            left: `${(40 / BG_WIDTH) * 100}%`,
            bottom: `${(20 / BG_HEIGHT) * 100}%`,
            zIndex: 10,
          }}
        >
          <img
            src={backButton}
            alt="Back to Home"
            className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
            style={{
              width: `${(220 / BG_WIDTH) * 100}%`,
              height: "auto",
            }}
            draggable="false"
          />
        </button>

        {showCamera && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center"
            style={{ zIndex: 1000 }}
          >
            <div className="relative bg-white rounded-lg p-6 max-w-4xl">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full max-w-2xl rounded-lg"
              />
              <canvas ref={canvasRef} className="hidden" />
              <div className="mt-4 flex gap-4 justify-center items-center">
                <button
                  onClick={takePhoto}
                  disabled={cameraPhotos.length >= 4}
                  className="px-6 py-3 bg-pink-400 hover:bg-pink-600 disabled:bg-gray-300 text-white rounded-lg transition-colors"
                >
                  ☆ take photo ☆ ({cameraPhotos.length}/4)
                </button>
                <button
                  onClick={cancelCamera}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  ☆ cancel ☆
                </button>
              </div>
              <div className="mt-4 flex gap-2 justify-center">
                {cameraPhotos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo}
                    alt={`p ${idx + 1}`}
                    className="w-20 h-20 object-cover rounded border-2 border-pink-500"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
