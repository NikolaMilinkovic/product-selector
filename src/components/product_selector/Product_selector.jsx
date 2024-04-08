/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect, useMemo } from 'react'
import { v4 as uuid } from 'uuid';
import style from './product_selector.module.css'
import ProgressTracker from '../progress_tracker/Progress_tracker';
import Video from '../video/Video';
import StepsData from './product_selector_data.json'
import OptionButton from '../button/Option_button';
import ReturnButton from '../return_button/Return_button';
import OptionDropdown from '../option_dropdown.jsx/Option_dropdown';

const VideoDisplay = React.memo(() => (
    <Video/>
));

function ProductSelector() {
    // Cache last step
    const [lastStep, setLastStep] = useState([]);

    // Innitializes step 1
    const [stepData, setStepData] = useState(StepsData.step_1[0])

    // Step counter innitialization
    const [componentStep, setComponentStep] = useState(1);

    // Choices cache
    const [choices, setChoices] = useState([]);

    // Display questions preview
    const [displayPreview, setDisplayPreview] = useState(false)

    // Cache JSON traversal
    const [renderElements, setRenderElements] = useState([]);

    // Dropdown elements
    const [dropdownElements, setDropdownElements] = useState();

    function setRenderElementsForDisplay(elements){
        setRenderElements(elements);
    }

    // Recursive JSON traversal and dropdown generation
    function JSONtraversal(step, allChoices, elements=[]){

        const elementsArr = [...elements];
        setRenderElementsForDisplay(elementsArr);
        // setChoices(elementsArr);

        // Break je ukoliko vise nemamo opcija
        if(!step.options){ 
            return;
        }
        // Prolazimo kroz opcije i uporedjujemo sa allChoices
        
        const headers = Object.values(step.options).map(option => [option.header, option.next_step]);
        let match = null;

        for (let i = 0; i < headers.length; i++) {
            match = allChoices.find(choice => choice.user_answer === headers[i][0])
            // match = {...match, path: headers[i][1]}
            if (match) {
                match.path = headers[i][1];
                break;
            }
        }

        if(match){

            elementsArr.push(match);
            if(StepsData[match.path] === 'information_overview'){
                return;
            }
            JSONtraversal(StepsData[match.path][0], allChoices, elementsArr)
            
        } else {
            const possibleAnswers = Object.entries(step.options).map(([key, value]) => value.header);
            match = {...step.options.option_1, 
                question: step.header,
                possible_answers: possibleAnswers,
                path: step.options.option_1.next_step
            };
            match = {...match, user_answer: match.header}
            elementsArr.push(match);
            setChoices(elementsArr);
            if(StepsData[match.path] === 'information_overview'){
                return;
            }
            JSONtraversal(match, allChoices, elementsArr)
        }
    }

    // Case question round
    function nextQuestions(nextStep, answer){
        const possibleAnswers = Object.entries(stepData.options).map(([key, value]) => value.header);
        
        setChoices(prevChoices => [...prevChoices, {
            question: stepData.header,
            user_answer: answer,
            path: nextStep,
            possible_answers: possibleAnswers
        }])
        
        setLastStep(prevSteps => [...prevSteps, stepData]);
        setStepData(StepsData[nextStep][0]);
        setComponentStep(prevStep => prevStep + 1);
    }


    // Method for handling the next step
    function updateStep(nextStep, answer){
        switch(nextStep){
        case 'information_overview':
            nextQuestions(nextStep, answer)
            enableInformationOverview()
            break;
        default:
            nextQuestions(nextStep, answer)
        }
    }
    //
    useEffect(() => {
        if(displayPreview === true)
            JSONtraversal(StepsData.step_1[0], choices);
    }, [choices, displayPreview] );
  
    // Returns last step and sets it as current step
    function stepBack(){
        setDisplayPreview(false)
        setStepData(lastStep.pop());
        setComponentStep(prevStep => prevStep - 1);
        choices.pop();
    }


    // Method for displaying option buttons
    const optionButtons = () => {
        if (stepData.options) {
            return Object.entries(stepData.options).map(([key, value]) => {
                if (value.type === 'button') {
                    return (
                        <OptionButton
                            key={key}
                            header={value.header}
                            text={value.text}
                            onClick={() => updateStep(value.next_step, value.header)}
                        />
                    );
                }
                return null; // or another default value if needed
            });
        } 
        return null; // or another default value if there are no options
    };

    const handleDropdownChange = (question, selectedAnswer) => {
        
        setChoices((prevChoices) =>
            prevChoices.map((choice) =>
                choice.question === question ? { ...choice, user_answer: selectedAnswer,   } : choice
            )
        );


        // console.log('====================')
        // console.log('CHOICES:')
        // console.log(choices)
        // console.log('RENDER_ELEMENTS:')
        // console.log(renderElements)
        // console.log('====================')
        // JSONtraversal(StepsData.step_1[0], choices)
    };

    // Method for displaying option dropdowns
    useEffect(() => {

        if (displayPreview === true) {
            let qCount = 0;
            setDropdownElements(renderElements.map((set) => {
                qCount++
                return (
                    <OptionDropdown
                        key={uuid()}
                        question={set.question}
                        title={`Q${qCount}. ${set.question}`}
                        answers={set.possible_answers}
                        selected={set.user_answer}
                        onChange={handleDropdownChange}
                    />
                )
            }));
        }
    }, [renderElements, displayPreview]);
    const enableInformationOverview = () => {
        setDisplayPreview(true);
    }

    return (
        <div className={style.mainContainer}>
            <div>
                <h1 className={style.header1}>Waterpik™ Oral Health Product Selector</h1>
            </div>
            <div className={style.content}>
                <div className={style.controls}>

                    {/* CIRCULAR PROGRESS TRACKER */}
                    <ProgressTracker
                        progressDisplay = {componentStep}
                    />

                    <h2 className={style.header2}>
                        {/* QUESTION HEADER */}
                        {stepData.header}
                    </h2>
                    <div className={style.options}>

                        {/* BUTTON OPTIONS */}
                        {optionButtons()}
                        {displayPreview && (dropdownElements)}
                    </div>
                    <div className={style.returnSection}>

                        {/* BACK BUTTON */}
                        {componentStep > 1 && (
                            <ReturnButton onClick={()=> stepBack()}/>
                        )}
                    </div>
                </div>

                {/* ANIMATION SECTION */}
                <div className={style.animationSection}>

                    {/* VIDEO */}
                    <div className={style.video}>
                        <VideoDisplay/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductSelector