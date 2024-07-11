import React, { forwardRef } from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../../assets/Animation - 1719599949102.json';
import profile from "../../assets/profile.jpg"; // Replace with your Lottie JSON file

const TypingAnimation = forwardRef((props, ref) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="w-full chat chat-start" ref={ref}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Avatar"
                        src={profile}
                    />
                </div>
            </div>
            <div className="chat-header">
                ____Thanuki____
            </div>
            <div className="chat-bubble">
                <Lottie options={defaultOptions} height={30} width={30}/>
            </div>
        </div>
    );
});

export default TypingAnimation;
