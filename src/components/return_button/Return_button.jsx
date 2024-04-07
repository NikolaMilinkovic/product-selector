import React, { useState } from 'react'
import style from './return_button.module.css'

function ReturnButton({onClick}) {
    

    return (
        <button type='button' className={style.button} onClick={onClick}>
            <img className={style.icon} src='src/assets/arrow-left-solid.svg' alt='arrow back'/>
            <p>Back</p>
        </button>
    )
}

export default ReturnButton