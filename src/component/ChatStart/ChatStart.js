import React, {useEffect, useRef} from 'react';
import profile from '../../assets/profile.jpg'

const ChatBubble = ({ message, onRender }) => {

    const messageRef = useRef(null);

    useEffect(() => {
        if (messageRef.current) {
            const { offsetHeight } = messageRef.current;
            onRender(offsetHeight);
        }
    }, []);

    return (
        <div className="w-full chat chat-start" ref={messageRef}>
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
            <div className="chat-bubble">{message}</div>
        </div>
    );
}

export default ChatBubble;
