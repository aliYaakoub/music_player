import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../fontAwsome';

const Controls = ({SkipSong, isPlaying, setIsPlaying}) => {
    return (
        <div className='flex flex-row items-center  justify-around w-2/4 h-20'>
            <button onClick={()=>SkipSong(false)} ><FontAwesomeIcon className='text-gray-900'icon={['fas','step-backward']} size='2x' /></button>
            <button onClick={()=>setIsPlaying(!isPlaying)} ><FontAwesomeIcon className='text-gray-900'icon={isPlaying ? ['fas','pause'] : ['fas','play']} size='4x' /></button>
            <button onClick={()=>SkipSong(true)}  ><FontAwesomeIcon className='text-gray-900'icon={['fas','step-forward']} size='2x' /></button>
        </div>
    )
}

export default Controls;
