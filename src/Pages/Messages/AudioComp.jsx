import React, { useState, useRef, useEffect } from 'react';
import { BsPause, BsPlay } from 'react-icons/bs';

const AudioComp = (props) => {

    const [audioUrl, setAudioUrl] = useState('')

    const getAudioUrl = (e) => {
        let data = e.split("=")[1]
        console.log(data)
        data = JSON.parse(data)
        console.log({ fileUrl: data.fileUrl })
        setAudioUrl(data.fileUrl)
        // return data.fileUrl

    }
    useEffect(() => {
        console.log("runnign audio comp")
        console.log(props.payload)
        getAudioUrl(props.payload)
    }, [])
    // const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const setAudioDuration = () => setDuration(audio.duration);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', setAudioDuration);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', setAudioDuration);
        };
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const audio = audioRef.current;
        audio.currentTime = e.target.value;
        setCurrentTime(e.target.value);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <>
            <div className="flex items-center w-[17rem] space-x-4 p-4 border rounded-md shadow-md bg-white">
                <button
                    onClick={togglePlayPause}
                    className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-300"
                >
                    {isPlaying ? (
                        <span className="material-icons"><BsPause /></span>
                    ) : (
                        <span className="material-icons"><BsPlay /></span>
                    )}
                </button>

                <div className="flex-grow">
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-sm text-gray-500 flex justify-between">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                <audio ref={audioRef} src={audioUrl} />
            </div>
        </>
    );
};

export default AudioComp;
