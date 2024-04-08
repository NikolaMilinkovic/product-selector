import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';
import style from './option_button.module.css'

function OptionButton(
    {
        header = 'Header Sample',
        text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nisi iste sed.',
        onClick,
        name,
    }
) {
    

    return (
        <button key={uuid()} name={name} type='button' className={style.button} onClick={() => onClick(name)}>
            <p className={style.header}>{header}</p>
            {text && (
                <p className={style.text}>{text}</p>
            )}
        </button>
    )
}

export default OptionButton