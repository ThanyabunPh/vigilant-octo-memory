import React from 'react';

const Question = ({ question, answers, onAnswer }) => {
    return (
        <div className="w-full">
            <div className={'flex flex-col w-full gap-2'}>
                    {answers.map((answer, index) => (
                        <button
                            key={index}
                            className="p-2 btn btn-primary"
                            onClick={() => onAnswer(answer)}
                        >
                            {answer}
                        </button>
                    ))}
            </div>
        </div>
    );
};

export default Question;
