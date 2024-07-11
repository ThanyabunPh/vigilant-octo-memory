import React, {useEffect, useRef} from 'react';
import profilebeb from '../../assets/profilebeb.jpg'

const ChatEnd = ({ message, onRender }) => {

    const messageRef = useRef(null);

    useEffect(() => {
        if (messageRef.current) {
            const { offsetHeight } = messageRef.current;
            onRender(offsetHeight);
        }
    }, []); // eslint-disable-line

    return (
        <div className="w-full chat chat-end" ref={messageRef}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Avatar"
                        src={profilebeb}
                    />
                </div>
            </div>
            <div className="chat-header">
                MY BEBB
            </div>
            <div className="chat-bubble">{message}</div>
        </div>
    );
}

export default ChatEnd;
