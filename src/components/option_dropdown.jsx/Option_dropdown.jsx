import React, { useState } from 'react'
import style from './option_dropdown.module.css'

function OptionDropdown({question, title, answers, selected, onChange}) {
    // const [selectedChoide, setSelectedChoice] = useState(selected)

    return (
        <div className={style.dropdownContainer}>
            <h3 className={style.title}>{title}</h3>
            <select className={style.dropdown} value={selected} onChange={(event)=> onChange(question, event.target.value)}>
                {answers.map((answer) => <option className={style.option} value={answer}>{answer}</option>)}
            </select>
        </div>
    )
}

export default OptionDropdown