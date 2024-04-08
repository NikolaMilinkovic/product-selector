import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';
import style from './return_button.module.css'

function ReturnButton({onClick}) {
    

    return (
        <button key={uuid()} type='button' className={style.button} onClick={onClick}>
            <img className={style.icon} src='/arrow-left-solid.svg' alt='arrow back'/>
            <p>Back</p>
        </button>
    )
}

export default ReturnButton