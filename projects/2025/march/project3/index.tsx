import {
  Maximize,
  Minimize,
  Pause,
  Play,
  Settings,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { CustomSlider } from "../project2";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
}

const useLoadVideoMetadata = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setTimeout(() => {
        setDuration(video.duration);
      }, 10);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return {
    progress,
    setProgress,
    duration,
    currentTime,
    videoRef,
  };
};

const useVideoPlayerControls = () => {
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    if (isPlaying && !isHovering) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else {
      setShowControls(true);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, isHovering]);

  return {
    showControls,
    setIsHovering,
    isPlaying,
    setIsPlaying,
  };
};

const useVideoPlayer = () => {
  const { progress, duration, currentTime, videoRef, setProgress } =
    useLoadVideoMetadata();
  const { showControls, setIsHovering, isPlaying, setIsPlaying } =
    useVideoPlayerControls();
  const playerRef = useRef<HTMLDivElement>(null);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (value: number) => {
    const video = videoRef.current;
    if (!video) return;

    console.log({value, duration});
    const newTime = (value / 100) * duration;
    console.log(newTime);
    video.currentTime = newTime;
    setProgress(value);
  };

  const handleVolume = (value: number) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = value;
    video.volume = newVolume / 100;
    setVolume(newVolume);

    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume / 100;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const enterFullscreen = () => {
    const player = playerRef.current;
    if (!player) return;

    if (player.requestFullscreen) {
      player.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.min(video.currentTime + 10, video.duration);
  };

  const skipBackward = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(video.currentTime - 10, 0);
  };

  return {
    isPlaying,
    isMuted,
    isFullscreen,
    volume,
    progress,
    duration,
    showControls,
    currentTime,
    playerRef,
    videoRef,
    handleVolume,
    handleProgress,
    togglePlay,
    toggleMute,
    enterFullscreen,
    exitFullscreen,
    skipForward,
    skipBackward,
    setIsHovering,
  };
};

const CustomVideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster = "img/poster.jpg",
  title = "Video Title",
}) => {
  const {
    isPlaying,
    isMuted,
    isFullscreen,
    volume,
    progress,
    duration,
    showControls,
    currentTime,
    playerRef,
    videoRef,
    handleVolume,
    handleProgress,
    togglePlay,
    toggleMute,
    enterFullscreen,
    exitFullscreen,
    skipForward,
    skipBackward,
    setIsHovering,
  } = useVideoPlayer();

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const renderVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeX size={20} />;
    } else if (volume < 60) {
      return <Volume1 size={20} />;
    } else {
      return <Volume2 size={20} />;
    }
  };

  return (
    <div
      ref={playerRef}
      className="relative group w-full bg-black rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <video
        ref={videoRef}
        onClick={togglePlay}
        poster={poster}
        className="w-full h-full cursor-pointer"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Title overlay */}
      {showControls && (
        <div className="absolute top-0 left-0 p-4">
          <h2 className="text-white text-lg font-semibold drop-shadow-lg">
            {title}
          </h2>
        </div>
      )}

      {/* Controls overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mb-2">
          <CustomSlider
            value={progress}
            min={0}
            max={100}
            step={0.1}
            onChange={handleProgress}
            className="h-1.5"
            thumbClassName="bg-red-500"
            trackClassName="bg-gray-700"
            rangeClassName="bg-red-500"
          />
          <div className="flex justify-between text-xs text-gray-300 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={skipBackward}
              className="text-white hover:bg-white/40 hover:text-white"
            >
              <SkipBack size={20} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="text-white hover:bg-white/40 hover:text-white"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={skipForward}
              className="text-white hover:bg-white/40 hover:text-white"
            >
              <SkipForward size={20} />
            </Button>

            <div className="flex items-center ml-2 group relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="text-white hover:bg-white/40 hover:text-white"
              >
                {renderVolumeIcon()}
              </Button>

              <div className="w-24 h-8 hidden group-hover:flex items-center absolute left-10 bg-black/70 rounded px-2">
                <CustomSlider
                  value={isMuted ? 0 : volume}
                  min={0}
                  max={100}
                  step={1}
                  onChange={handleVolume}
                  className="h-1.5"
                  thumbClassName="bg-white"
                  trackClassName="bg-gray-700"
                  rangeClassName="bg-white"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/40 hover:text-white"
            >
              <Settings size={20} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={isFullscreen ? exitFullscreen : enterFullscreen}
              className="text-white hover:bg-white/40 hover:text-white"
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Project3() {
  return (
    <div className="w-[80%] m-auto p-4 pt-6">
      <CustomVideoPlayer
        src="https://res.cloudinary.com/dv6llczby/video/upload/v1740895678/1_minute_relaxing_video_with_nature_-_A_minute_with_nature_Flowing_River_t9yy5d.mp4"
        poster="img/poster.jpg"
        title="Relaxing Nature Video - Flowing River"
      />
    </div>
  );
}
