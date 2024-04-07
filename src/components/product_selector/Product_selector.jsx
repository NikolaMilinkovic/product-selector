import React, { useState, useEffect } from 'react'
import style from './product_selector.module.css'
import ProgressTracker from '../progress_tracker/Progress_tracker';
import Video from '../video/Video';
import StepsData from './product_selector_data.json'
import OptionButton from '../button/Option_button';
import ReturnButton from '../return_button/Return_button';
import OptionDropdown from '../option_dropdown.jsx/Option_dropdown';

function ProductSelector() {
    // Cache last step
    const [lastStep, setLastStep] = useState([]);

    // Innitializes step 1
    const [stepData, setStepData] = useState(StepsData.step_1[0])

    // Step counter innitialization
    const [componentStep, setComponentStep] = useState(1);

    // Choices cache
    const [choices, setChoices] = useState([]);

    // Questions with all answers cache
    const [questionSet, setQuestionSet] = useState([]);

    // Display questions preview
    const [displayPreview, setDisplayPreview] = useState(false)

    function updateQuestionSet(data){
        setQuestionSet(prevSet => [...prevSet, data])
    }

    const handleDropdownChange = (question, selectedAnswer) => {
        setChoices((prevChoices) =>
            prevChoices.map((choice) =>
                choice.question === question ? { ...choice, user_answer: selectedAnswer } : choice
            )
        );
    };

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
    // Case questions overview
    function infoOverview(){
        console.log('info overview je na redu!')
    }


    // Method for handling the next step
    function updateStep(nextStep, answer){
        switch(nextStep){
        case 'information_overview':
            nextQuestions(nextStep, answer)
            displayAnswers()
            break;
        default:
            nextQuestions(nextStep, answer)
        }
    }


    useEffect(() => {
        console.log(choices);
    }, [choices])

    // Returns last step and sets it as current step
    function stepBack(){
        setDisplayPreview(false)
        setStepData(lastStep.pop());
        setComponentStep(prevStep => prevStep - 1);
        choices.pop();
        console.log(choices);
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

    // Method for displaying option dropdowns
    const optionDropdown = () => {
        if (displayPreview === true) {
            console.log('Building dropdowns')
            console.log(choices);
            let qCount = 0;

            return choices.map((set) => {
                qCount++
                return (
                    <OptionDropdown
                        question={set.question}
                        title={`Q${qCount}. ${set.question}`
                        }
                        answers={set.possible_answers}
                        selected={set.user_answer}
                        onChange={handleDropdownChange}
                    />
                )});
        }
        return null;
    };
    const displayAnswers = () => {
        setDisplayPreview(true);
        console.log('setting display to true')
    }

    // NOTE ZA MENE
    // UZMI PATH, SREDI GA DA BUDE U ODREDJENOM OBLIKU
    // ZATIM SAMO UPDATE choices SA NOVIN PATHOVIMA
    // TO CE OPALITI RERENDER I DISPLAY CE SE NOVI DROPDOWN
    

    // function displayQuestion(currentStep, userAnswers) {
    //     const stepData = StepsData[currentStep][0];
    //     const { header, options } = stepData;
    
    //     // Find the user's answer for this question
    //     const userAnswer = userAnswers[header] || '';
    
    //     // Check if the user's answer matches any of the options
    //     const match = Object.entries(options).find(([key, value]) => value.header === userAnswer);
    
    //     if (match) {
    //         // Display OptionDropdown with user's answer
    //         return <OptionDropdown value={userAnswer} options={Object.values(options).map(option => option.header)} />;
    //     } 
    
    //     // Display OptionDropdown with first option
    //     const defaultOption = Object.values(options)[0].header;
    //     return <OptionDropdown value={defaultOption} options={Object.values(options).map(option => option.header)} />;
        
    //     // Calculate the nextStep based on the match or default to the first option
    //     const nextStep = match ? match[1].next_step : Object.values(options)[0].next_step;
    
    //     if (nextStep) {
    //         // Recursive call with next_step
    //         return displayQuestion(nextStep, userAnswers);
    //     } 
    //     return null; // Base case: no next_step
    // }


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
                        {optionDropdown()}
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
                        <Video/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductSelector