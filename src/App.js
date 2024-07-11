import React, {useState, useEffect} from 'react';
import {Howl} from 'howler';
import './App.css';

import Lottie from 'react-lottie';
import * as animationData from './assets/Animation - 1719421374463.json'
import DarlingCallYou from "./component/DarlingCallYou/DarlingCallYou";
import TextShadows from "./component/BonceText/BonceText";
import ChatPage from "./view/ChatPage/ChatPage";

function App() {
    const [sound, setSound] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const [textVisible, setTextVisible] = useState(true)
    const [phoneCall, setPhoneCall] = useState(true)

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unload();
            }
        };
    }, [sound]);

    const toggleAudio = () => {
        setTextVisible(false)
        if (isPlaying) {
            sound.stop();
            setIsPlaying(false);
        } else {
            if (!sound) {
                setIsLoading(true);
                const cors_link = 'https://asia-southeast1-my-gcp-427612.cloudfunctions.net/corsAnywhere'
                const audioUrl = `${cors_link}/https://dl.sndup.net/bqwfz/Magnetic.mp3`;
                const newSound = new Howl({
                    src: [audioUrl],
                    volume: 0.5,
                    onload: () => {
                        setIsLoading(false);
                        newSound.play();
                        setIsPlaying(true);
                    },
                    onloaderror: (id, error) => {
                        console.error('Error loading audio:', error);
                        setIsLoading(false);
                    },
                    onplayerror: (id, error) => {
                        console.error('Error playing audio:', error);
                    },
                });
                setSound(newSound);
            } else {
                sound.play();
                setIsPlaying(true);
            }
        }
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className={'w-full min-h-screen flex justify-center items-center'}>
            <TextShadows
                text={'ก็อกๆ'}
                visible={textVisible}
                onClick={() => {
                toggleAudio()
            }} />
            {
                isLoading ?
                    <Lottie
                        style={{pointerEvents: 'none'}}
                        options={defaultOptions}
                        height={400}
                        width={400}/>
                    : isPlaying && phoneCall ?
                        <DarlingCallYou onClick={()=> {
                            toggleAudio()
                            setPhoneCall(false)
                        }}/>
                        : phoneCall !== true && <ChatPage />
            }
        </div>
    );
}

export default App;
