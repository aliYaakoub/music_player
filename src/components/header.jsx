import React from 'react';

const Header = ({tracks, currentSongIndex}) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 justify-items-center items-center'>
            <img src={tracks[currentSongIndex].cover} className='mt-5 rounded-3xl w-52 img' alt="" />
            <div className=' px-5 text-center w-full text-2xl md:text-3xl'>
                <h2>{tracks[currentSongIndex].name}</h2>
                <h2> By {tracks[currentSongIndex].artist}</h2>
            </div>
        </div>
    )
}

export default Header
