import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';
import style from './option_dropdown.module.css'

function OptionDropdown({question, title, answers, selected, onChange}) {

    return (
        <div key={uuid()} className={style.dropdownContainer}>
            <h3 key={uuid()} className={style.title}>{title}</h3>
            <select key={uuid()} className={style.dropdown} value={selected} onChange={(event)=> onChange(question, event.target.value)}>
                {answers.map((answer) => <option key={uuid()} className={style.option} value={answer}>{answer}</option>)}
            </select>
        </div>
    )
}

export default OptionDropdown