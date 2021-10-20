import React, { useState, useEffect, useRef } from 'react';
import Controls from './controls';
import Header from './header';

const MusicPlayer = (props) => {
    const [songDuration, setSongDuration] = useState(0);
    const [currentSongDuration, setCurrentSongDuration] = useState(0);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioEl = useRef(null)
    const arrayOfDirections = ['t','tr','r','br','b','bl','l','tl'];
    const [tracks] = useState([
        {
            name: "Mekanın Sahibi",
            artist: "Norm Ender",
            cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3",
            url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
            favorited: false
        },
        {
            name: "Everybody Knows",
            artist: "Leonard Cohen",
            cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3",
            url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
            favorited: true
        },
        {
            name: "Extreme Ways",
            artist: "Moby",
            cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3",
            url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
            favorited: false
        },
        {
            name: "Butterflies",
            artist: "Sia",
            cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3",
            url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y",
            favorited: false
        },
        {
            name: "The Final Victory",
            artist: "Haggard",
            cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3",
            url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
            favorited: true
        },
        {
            name: "Genius ft. Sia, Diplo, Labrinth",
            artist: "LSD",
            cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/6.mp3",
            url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
            favorited: false
        },
        {
            name: "The Comeback Kid",
            artist: "Lindi Ortega",
            cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3",
            url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
            favorited: true
        },
        {
            name: "Overdose",
            artist: "Grandson",
            cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
            url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
            favorited: false
        },
        {
            name: "Rag'n'Bone Man",
            artist: "Human",
            cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
            source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
            url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
            favorited: false
        }])  

    useEffect(() => {
        setNextSongIndex(()=>{
            if (currentSongIndex + 1 > tracks.length-1){
                return 0;
            }
            else return currentSongIndex +1
        })
    }, [currentSongIndex, tracks])

    useEffect(()=>{
        if(isPlaying){
            audioEl.current.play();
        }
        else{
            audioEl.current.pause();
        }
    });

    const SkipSong = (forward = true) =>{
        if(forward){
            setCurrentSongIndex(()=>{
                let temp = currentSongIndex;
                temp++;
                if(temp > tracks.length-1){
                    temp = 0
                }
                return temp;
            })
        }
        else{
            setCurrentSongIndex(()=>{
                let temp = currentSongIndex;
                temp--;
                if(temp < 0){
                    temp = tracks.length-1;
                }
                return temp;
            })
        }
    }

    useEffect(()=>{
        setSongDuration(Math.floor(document.getElementById('audio').duration));
        // console.log(songDuration);
        let interval = setInterval(()=>{
            setCurrentSongDuration(Math.floor(document.getElementById('audio').currentTime));
            // console.log(currentSongDuration);
        },1000)
        return(() => {
            clearInterval(interval)
        })
    },[songDuration,currentSongDuration,currentSongIndex,tracks])

    useEffect(()=>{
        document.getElementById('progress-inner');
        if(songDuration === currentSongDuration){
            setCurrentSongIndex((c)=>{
                let temp = c;
                temp++;
                if(temp > tracks.length-1){
                    temp = 0
                }
                return temp;
            })
        }
    },[currentSongDuration, tracks, songDuration]);

    return (
        <div className='flex justify-center items-center h-screen'>
            <audio ref={audioEl} src={tracks[currentSongIndex].source} id='audio' ></audio>
            <div className={`bg-gradient-to-t from-red-500 to-transparent transition-colors duration-300 p-1 rounded-2xl`}>
                <div className="relative card rounded-2xl grid grid-cols-1 justify-items-center">
                    <Header tracks={tracks} currentSongIndex={currentSongIndex} />
                    <Controls SkipSong={SkipSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
                    <input onChange={(e)=>document.getElementById('audio').currentTime = e.target.value} type='range' value={currentSongDuration} max={songDuration} className='w-9/12 range' />
                    <p className='absolute bottom-2'>Next {tracks[nextSongIndex].name} By {tracks[nextSongIndex].artist}</p>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;