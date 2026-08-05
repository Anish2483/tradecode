import { useEffect, useRef, useState } from "react";

interface TransparentLogoVideoProps {
  className?: string;
  size?: number; // target display size in px
}

export function TransparentLogoVideo({ className = "", size = 380 }: TransparentLogoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Correct asset path handling for GitHub Pages deployment (/tradecode/tradecode-logo-anim.mp4)
  const videoSrc = `${import.meta.env.BASE_URL}tradecode-logo-anim.mp4`;

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animId: number;

    const renderFrame = () => {
      if (video.paused || video.ended) {
        animId = requestAnimationFrame(renderFrame);
        return;
      }

      if (video.videoWidth > 0 && video.videoHeight > 0) {
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        // Draw video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Extract image data for real-time background removal (Chroma key for black background)
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;
        const len = data.length;

        // Key out black background ([0..25] brightness threshold with soft alpha falloff)
        for (let i = 0; i < len; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const maxVal = Math.max(r, g, b);

          if (maxVal < 18) {
            data[i + 3] = 0; // Fully transparent
          } else if (maxVal < 45) {
            // Smooth anti-aliased edge transition
            data[i + 3] = Math.floor(((maxVal - 18) / 27) * 255);
          }
        }

        ctx.putImageData(frame, 0, 0);
      }

      animId = requestAnimationFrame(renderFrame);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      animId = requestAnimationFrame(renderFrame);
    };

    video.addEventListener("play", handlePlay);

    // Attempt autoplay
    video.play().catch(() => {
      setIsPlaying(false);
    });

    animId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(animId);
      video.removeEventListener("play", handlePlay);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Ambient background glow echoing logo animation */}
      <div
        className="absolute inset-[-15%] rounded-full animate-glow-pulse pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, rgba(245,158,11,0.12) 50%, transparent 75%)",
          filter: "blur(32px)",
        }}
      />

      {/* Hidden source video element */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onError={() => setHasError(true)}
        className="hidden"
      />

      {/* Real-time processed transparent canvas */}
      {!hasError ? (
        <div
          onClick={togglePlay}
          className="relative cursor-pointer group transition-transform duration-500 hover:scale-105"
          style={{ width: size, height: size }}
          title={isPlaying ? "Click to pause logo animation" : "Click to play logo animation"}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain filter drop-shadow-[0_12px_32px_rgba(124,58,237,0.25)]"
          />

          {/* Pause overlay button indicator on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 rounded-full backdrop-blur-[2px]">
            <span className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 bg-white/90 text-violet-700 rounded-full shadow-md border border-violet-200">
              {isPlaying ? "Pause Anim" : "Play Anim"}
            </span>
          </div>
        </div>
      ) : (
        /* Fallback video player with CSS mix-blend-mode if canvas keying fails */
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain mix-blend-screen filter drop-shadow-[0_12px_32px_rgba(124,58,237,0.25)]"
          style={{ maxWidth: size, maxHeight: size }}
        />
      )}
    </div>
  );
}
