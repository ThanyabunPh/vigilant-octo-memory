import React, {useEffect, useState, useRef, useLayoutEffect} from "react";
import profile from "../../assets/profile.jpg";
import ChatStart from "../../component/ChatStart/ChatStart";
import ChatEnd from "../../component/ChatEnd/ChatEnd";
import Question from "../../component/Question/Question";
import TypingAnimation from "../../component/TypingAnimation/TypingAnimation";
import ChatLotties from "../../component/ChatLotties/ChatLotties";
import popSound from "../../assets/pop.mp3";
import stay_aroud_me from "../../assets/SAM.mp3";
import {Howl} from "howler";
import * as music_disk_animate from '../../assets/wired-flat-1031-music-album.json';
import * as cake from '../../assets/Animation - 1720668145368.json'

const messages = [
    /* 00 */ {
        type: 'question',
        question: 'สวัสดีจ่ะ วันนี้เป็นวันเกิดใครเอ่ย ?',
        answers: ['วันเกิดน้องเองเบ้บบบ ❤', 'วันเกิดที่ไหนวันศุกร์เฉยๆ เหอะ'],
        typingSpeed: 1.5,
        paths: {'วันเกิดน้องเองเบ้บบบ ❤': 8, 'วันเกิดที่ไหนวันศุกร์เฉยๆ เหอะ': 1}
    },
    /* 01 */ {type: 'start', message: '...', typingSpeed: 0.5},
    /* 02 */ {type: 'start', message: 'อะไรเนี่ยย ไม่ใช่วันนี้เป็นวันเกิดน้องเบ้บเหรอ ?', typingSpeed: 2.5},
    /* 03 */ {type: 'start', message: '🥺🥺', typingSpeed: 1},
    /* 04 */ {
        type: 'question',
        question: 'นี่จำวันเกิดตัวเองไม่ได้เหรอ ?',
        typingSpeed: 1.5,
        answers: ['จำได้ดิ', 'ปลาทองอะจำอะไรไม่ได้หรอกนะ'],
        paths: {'จำได้ดิ': 7, 'ปลาทองอะจำอะไรไม่ได้หรอกนะ': 5}
    },
    /* 05 */ {type: 'start', message: 'กวนอีกแล้วนะ เดี๋ยวเถอะ !!!', typingSpeed: 2},
    /* 06 */ {type: 'start', message: '😡😡', typingSpeed: 1},
    /* 07 */ {type: 'start', message: 'โอเค๊ ปลาทอง', typingSpeed: 1.5},
    /* 08 */ {
        type: 'question',
        question: 'แล้ววันเกิดปีนี้อยากได้อะไรอ่ออ ?',
        typingSpeed: 2.5,
        answers: ['ไม่บอก'],
        paths: {'ไม่บอก': 9}
    },
    /* 09 */ {
        type: 'question',
        question: 'จะบอกไม่บอก ?',
        typingSpeed: 1.5,
        answers: ['ก็ไม่บอกอีกนั่นแหละ', 'บอกก็ได้'],
        paths: {'ก็ไม่บอกอีกนั่นแหละ': 9, 'บอกก็ได้': 10}
    },
    /* 10 */ {type: 'end', message: 'อยากได้~~~~~~~~~~', typingSpeed: 1.5},
    /* 11 */ {type: 'start', message: 'อะไรเหรอออออ', typingSpeed: 1.5},
    /* 12 */ {type: 'end', message: 'ไม่บอก', typingSpeed: 1},
    /* 13 */ {type: 'start', message: 'ไอเด็กคนนี้นี่นะ', typingSpeed: 1.5},
    /* 14 */ {type: 'start', message: 'แต่ว่า วันนี้เป็นวันพิเศษของเบ้บ', typingSpeed: 1.5},
    /* 15 */ {type: 'start', message: 'ก็เลยอยากจะทำอะไรให้ซักหน่อย', typingSpeed: 1.5},
    /* 16 */ {type: 'start', message: 'ถึงแม้มันอาจจะไม่ได้รุรา', typingSpeed: 1.5},
    /* 17 */ {type: 'end', message: '*หรูหรา', typingSpeed: 1},
    /* 18 */ {type: 'start', message: 'แต่ตั้งใจทำสุดๆไปเลยนะ', typingSpeed: 1.5},
    /* 19 */ {type: 'start', message: 'ก่อนอื่นเลย', typingSpeed: 1.5},
    /* 20 */ {type: 'start', message: 'เปิดเพลงก่อนดีม่ะ', typingSpeed: 1.5},
    /* 21 */ {type: 'lottie', lottie: music_disk_animate, lottie_name: 'music_disk'},
    /* 22 */ {type: 'start', message: 'บรรยากาศค่อยดีขึ้นมาหน่อย', typingSpeed: 1.5},
    /* 23 */ {
        type: 'question',
        question: 'ได้ป่ะเพลงนี้ ?',
        typingSpeed: 1.5,
        answers: ['ได้ดิ', 'ไม่มีเพลงอื่นแล้วเหรอ'],
        paths: {'ได้ดิ': 25, 'ไม่มีเพลงอื่นแล้วเหรอ': 24}
    },
    /* 24 */ {type: 'start', message: 'ไม่มี ไม่ได้เตรียมไว้', typingSpeed: 1.5},
    /* 25 */ {type: 'start', message: '😳', typingSpeed: 1},
    /* 26 */ {type: 'start', message: 'ที่เลือกเพลงนี้ เพราะดีแหละ แฮ๊ะๆ ', typingSpeed: 1.5},
    /* 27 */ {type: 'start', message: 'หยอกกกกกกกกก', typingSpeed: 1},
    /* 28 */ {type: 'start', message: 'ที่เลือกเพลงนี้ก็เพราะอยากให้เบ้บอยู่ใกล้ๆ ตลอดนั่นแหละ', typingSpeed: 1.5},
    /* 29 */ {
        type: 'question',
        question: 'โอเค๊ เปิดเพลงแล้ว ต่อไปอะไรดี',
        typingSpeed: 1.5,
        answers: ['เค้กก้อน เ บิ้ ม ๆ !', 'เข้านอนน~'],
        paths: {'เค้กก้อน เ บิ้ ม ๆ !': 30, 'เข้านอนน~': 30}
    },
    /* 30 */ {type: 'start', message: 'โอเค ปิดไฟ', typingSpeed: 1.5},
    /* 31 */ {type: 'lottie', lottie: cake, lottie_name: 'cake'},
    /* 32 */ {type: 'start', message: 'แฮ๊ปปี้เบิร์ดเดย์นะคะเบ้บ', typingSpeed: 1.5},
    /* 33 */ {type: 'start', message: 'แล้วก็สุขสันต์วันครบรอบนะคะ', typingSpeed: 1.5},
    /* 34 */ {type: 'start', message: 'อยู่กับพี่ไปนานๆนะคะ เบ้บๆ', typingSpeed: 1.5},
    /* 35 */ {type: 'start', message: 'เป่าเทียนด้วยนะคะ', typingSpeed: 1.5},
    /* 36 */ {type: 'start', message: 'อย่าลืมอธิฐานด้วยนะ', typingSpeed: 1.5},
    /* 37 */ {type: 'start', message: 'ฅ^•ﻌ•^ฅ', typingSpeed: 1},
    /* 38 */ {type: 'start', message: 'อีกเรื่อง ๆ', typingSpeed: 1},
    /* 39 */ {type: 'end', message: 'อะไรเหย๋ออออ', typingSpeed: 1},
    /* 40 */ {
        type: 'question',
        question: 'เป็นแฟนกันไหม ❤',
        typingSpeed: 1.5,
        answers: ['ไม่เป็น', 'เป็นแน่นอนค่ะ'],
        paths: {'ไม่เป็น': 40, 'เป็นแน่นอนค่ะ': 41}
    },
    /* 41 */ {type: 'start', message: 'เป็นเด็กดีจริงๆ', typingSpeed: 1},
    /* 42 */ {type: 'start', message: 'น่ารักที่สุด', typingSpeed: 1},
    /* 43 */ {
        type: 'question',
        question: 'หมดแล้ว ไม่มีอะไรแล้ว',
        typingSpeed: 1.5,
        answers: ['อะเคค'],
        paths: {'อะเคค': 44}
    },
    /* 44 */ {
        type: 'question',
        question: 'หมดแล้ว ไม่มีอะไรแล้ว',
        typingSpeed: 1.5,
        answers: ['อะเคค'],
        paths: {'อะเคค': 45}
    },
    /* 45 */ {
        type: 'question',
        question: '....',
        typingSpeed: 1.5,
        answers: ['...'],
        paths: {'...': 46}
    },
    /* 46 */ {
        type: 'question',
        question: 'ก็บอกว่าหมดแล้วไงงง',
        typingSpeed: 1.5,
        answers: ['อะเคค'],
        paths: {'อะเคค': 47}
    },
    /* 47 */ {
        type: 'question',
        question: 'ยังอีก',
        typingSpeed: 1.5,
        answers: ['ยังไม่หยุดอีก'],
        paths: {'ยังไม่หยุดอีก': 48}
    },
    /* 48 */ {
        type: 'question',
        question: '...',
        typingSpeed: 1.5,
        answers: ['...'],
        paths: {'...': 49}
    },
    /* 49 */ {
        type: 'question',
        question: '...',
        typingSpeed: 1.5,
        answers: ['...'],
        paths: {'...': 50}
    },
    /* 50 */ {
        type: 'question',
        question: '...',
        typingSpeed: 1.5,
        answers: ['...'],
        paths: {'...': 51}
    },

    /* 51 */ {type: 'start', message: 'ถ้าจะกดมาถึงขนาดนี้', typingSpeed: 2},
    /* 52 */ {
        type: 'question',
        question: 'คนทำเหนื่อยนะรู้ไหม',
        typingSpeed: 1.5,
        answers: ['...'],
        paths: {'...': 53, 'ไม่รู้': 53}
    },
    /* 53 */ {
        type: 'question',
        question: 'เหนื่อยแล้วจริงๆ นะ',
        typingSpeed: 1.5,
        answers: ['...'],
        paths: {'...': 54, 'ไม่รู้': 54}
    },
    /* 54 */ {type: 'start', message: 'พอแล้วๆ', typingSpeed: 1},
    /* 55 */ {type: 'start', message: 'รักเบ้บนะคะ', typingSpeed: 1},

];


const ChatPage = () => {
    const [chatMessages, setChatMessages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const chatTypingRef = useRef(null);
    const questionRef = useRef(null);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleRender = (height) => {
    };

    const handleAnswer = (answer) => {
        const nextIndex = currentQuestion.paths[answer];
        setChatMessages((prevMessages) => [...prevMessages, {type: 'end', message: answer, typingSpeed: 1}]);
        setCurrentQuestion(null); // Hide the question
        setCurrentIndex(nextIndex);
    };

    useEffect(() => {
        if (currentIndex < messages.length && !currentQuestion) {
            const currentMessage = messages[currentIndex];
            if (currentMessage.type !== 'end') setIsTyping(true);
            const typingInterval = setTimeout(() => {
                setChatMessages((prevMessages) => [...prevMessages, currentMessage]);
                setIsTyping(false);
                if (currentMessage.type === 'start' || currentMessage.type === 'question') {
                    const notify = new Howl({
                        src: [popSound],
                        volume: 1,
                        onend: function () {
                            this.unload();
                        }
                    });
                    notify.play();
                }
                if (currentMessage.lottie_name === 'music_disk') {
                    const music = new Howl({
                        src: [stay_aroud_me],
                        volume: 0.2,
                        onend: function () {
                            this.play();
                        }
                    });
                    music.play();
                }
                if (currentMessage.type === 'question') {
                    setCurrentQuestion(currentMessage); // Show the question
                } else {
                    setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next message
                }
                clearTimeout(typingInterval);
            }, currentMessage.typingSpeed * 1000); // Typing speed in seconds

            if (currentIndex === 30) {
                setTimeout(() => {
                    setIsModalVisible(true);
                    setTimeout(() => {
                        setIsModalVisible(false);
                    }, 2000);
                }, 1000);
            }

            return () => clearTimeout(typingInterval);
        }
    }, [currentIndex, currentQuestion]);

    useLayoutEffect(() => {
        if (chatContainerRef.current) {
            const {scrollHeight, clientHeight} = chatContainerRef.current;
            const typingHeight = chatTypingRef.current ? chatTypingRef.current.offsetHeight : 0;
            const questionHeight = questionRef.current ? questionRef.current.offsetHeight : 0;

            if (scrollHeight > clientHeight || typingHeight > 0 || questionHeight > 0) {
                chatEndRef.current?.scrollIntoView({behavior: 'smooth'});
                if (questionRef.current) {
                    questionRef.current.scrollIntoView({behavior: 'smooth', block: 'end'});
                }
            }
        }
    }, [chatMessages, isTyping, currentQuestion]);

    return (
        <div className="w-full min-h-screen flex flex-col relative">
            <div className="sticky top-0 z-10 p-5 flex flex-row items-center border-b-2 border-primary"
                 style={{backgroundColor: '#fae7f4'}}>
                <div className="avatar">
                    <div className="w-16 bg-red-600 rounded-full flex justify-center items-center">
                        <img src={profile} alt="profile narak narak" className="rounded-full"/>
                    </div>
                </div>
                <div className="ml-5">
                    <p className="text-2xl font-bold">____Thanuki____</p>
                    <p className="text-sm text-secondary">วันนี้วันที่ 12 กรกฏาคมแหละ</p>
                </div>
            </div>

            <div className="flex-grow w-full px-5 overflow-auto mb-5" ref={chatContainerRef}>
                {chatMessages.map((chat, index) => {
                    if (chat.type === 'start') {
                        return <ChatStart key={index} message={chat.message} onRender={handleRender}/>;
                    } else if (chat.type === 'end') {
                        return <ChatEnd key={index} message={chat.message} onRender={handleRender}/>;
                    } else if (chat.type === 'question') {
                        return <ChatStart key={index} message={chat.question} onRender={handleRender}/>;
                    } else if (chat.type === 'lottie') {
                        return <ChatLotties key={index} lottie={chat.lottie} lottie_name={chat.lottie_name}
                                            onRender={handleRender}/>
                    } else {
                        return null;
                    }
                })}
                {isTyping && (
                    <TypingAnimation ref={chatTypingRef}/>
                )}
                <div ref={chatEndRef}></div>
            </div>

            {currentQuestion && (
                <div ref={questionRef} className="p-5 border-t-2 border-primary sticky bottom-0 bg-white">
                    <Question question={currentQuestion.question} answers={currentQuestion.answers}
                              onAnswer={handleAnswer}/>
                </div>
            )}

            {isModalVisible && (
                <div
                    className="fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-500 ease-in-out">
                    <p className="text-white text-2xl">แสงไฟดับลง...</p>
                </div>
            )}
        </div>
    );
};

export default ChatPage;
