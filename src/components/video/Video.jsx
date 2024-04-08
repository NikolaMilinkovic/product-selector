import React, { useState } from 'react'
import YouTube from 'react-youtube';
import { v4 as uuid } from 'uuid';
import style from './video.module.css'

function Video({url = 'dQw4w9WgXcQ', settings}) {

    // Handling of video settings
    const defaultSettings = {
        width: '700',
        height: '700',
        playerVars: {
            controls: 0,
            autoplay: 1,
            modestbranding: 1,
        },
        volume: 10
    }
    const finalSettings = settings || defaultSettings;

    // Method for setting video volume
    const onVideoReady = (event) => {
        const {volume} = defaultSettings;

        if(volume > 0){
            event.target.setVolume(volume);
        } else {
            event.target.mute();
        }
    }

    return (
        <div key={uuid()} className={style.video}>
            <YouTube
                videoId={url} 
                opts={finalSettings}
                className={style.youtube}
                onReady={onVideoReady}
            />
        </div>
    )
}

export default Video