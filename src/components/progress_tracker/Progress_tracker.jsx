/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';
import style from './progress_tracker.module.css'

function ProgressTracker(props) {
    const {
        size = 40,
        stepsCount = 4,
        progressDisplay = 1,
        progressStart = 90,
        trackWidth = 3,
        trackColor = '#0163B7',
        indicatorWidth = 3,
        indicatorColor = '#FFFFFF',
        indicatorCap = 'round',
        fontSize = 12,
        fontWeight = 'bold',
    } = props

    const calcProgress = 100 / (stepsCount / progressDisplay);
    const center = size / 2;
    const radius = center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth);
    const dashArray = 2 * Math.PI * radius;
    const dashOffset = dashArray * ((100 - calcProgress) / 100)

    return (
        <div 
            style={{ width: size, height: size }}
            className={style.progressContainer}
            key={uuid()}
        >
            <span 
                className={style.number}
                style={
                    {
                        fontSize: `${fontSize}px`,
                        fontWeight: `${fontWeight}`
                    }
                }
            >{progressDisplay}</span>
            <svg 
                className={style.indicator}
                style={{ width: size, height: size, transform: `rotate(${progressStart}deg)` }}
            >
                <circle 
                    cx={center}
                    cy={center}
                    fill="transparent"
                    r={radius}
                    stroke={trackColor}
                    strokeWidth={trackWidth}
                />
                <circle 
                    cx={center}
                    cy={center}
                    fill="transparent"
                    r={radius}
                    stroke={indicatorColor}
                    strokeWidth={indicatorWidth}
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    strokeLinecap={indicatorCap}
                />
            </svg>
        </div>
    )
}

export default ProgressTracker