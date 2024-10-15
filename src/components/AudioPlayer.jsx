import React, { useState, useRef, useEffect } from "react";
import { Pause, Play, Download } from "./SvgIcons";

function AudioPlayer({ audioURL }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [audioURL]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const onTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const onProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const onEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex items-center gap-4 w-full">
        <button
          onClick={handlePlayPause}
          className="cursor-pointer focus:outline-none"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>

        <div className="w-full bg-accent rounded-full h-2 relative min-[1750px]:h-3">
          <input
            type="range"
            ref={progressRef}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            min="0"
            max="100"
            step="0.1"
            value={(currentTime / duration) * 100 || 0}
            onChange={onProgressChange}
            aria-label="Audio progress"
          />
          <div
            className="bg-primary h-full rounded-full"
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          ></div>
        </div>

        <span className="text-text text-lg whitespace-nowrap min-[1750px]:text-2xl">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        <a
          href={audioURL}
          download
          className="text-text text-xl py-2 flex gap-2 items-center self-start px-2"
          aria-label="Download audio"
        >
          <Download />
        </a>
      </div>
      
      <audio
        ref={audioRef}
        src={audioURL}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />
    </div>
  );
}

export default AudioPlayer;