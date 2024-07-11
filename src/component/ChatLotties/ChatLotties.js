import React, {useEffect, useRef, useState} from "react";
import lottieWeb from 'lottie-web';

const ChatLotties = ({lottie, onRender, lottie_name}) => {
    const messageRef = useRef(null);
    const lottieRef = useRef(null);
    const [isCakeBlown] = useState(false);
    const [isCakeFirstPlay, setIsCakeFirstPlay] = useState(false)

    useEffect(() => {
        if (messageRef.current) {
            const {offsetHeight} = messageRef.current;
            onRender(offsetHeight);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        let anim;
        if (lottieRef.current) {
            anim = lottieWeb.loadAnimation({
                container: lottieRef.current,
                renderer: 'svg',
                loop: lottie_name !== 'cake' || isCakeBlown,
                autoplay: lottie_name !== 'cake' || isCakeBlown, // Autoplay only if not 'cake' or isCakeBlown is true
                animationData: lottie,
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice'
                }
            });

            if (lottie_name === 'cake') {

                if (!isCakeFirstPlay) {
                    anim.playSegments([0, 150], true); // Play initial segment
                } else {
                    anim.playSegments([[165, 200], [200, 170]], true);
                }



                anim.addEventListener('complete', () => {
                    if (!isCakeFirstPlay) {
                        setIsCakeFirstPlay(false)
                        anim.playSegments([[147, 160], [160, 147]], true);
                    }


                });

                lottieRef.current.addEventListener('click', () => {
                    setIsCakeFirstPlay(false)
                    anim.playSegments([[165, 200], [200, 170]], true);
                });
            }
        }

        return () => {
            if (anim) {
                anim.destroy();
            }
        };
        // eslint-disable-next-line
    }, [lottie_name, lottie, isCakeBlown]);

    return (
        <div className="w-full justify-center p-5 flex flex-row" ref={messageRef}>
            <div ref={lottieRef}
                 style={{width: lottie_name === 'cake' ? 350 : 100, height: lottie_name === 'cake' ? 350 : 100}}/>
        </div>
    );
};

export default ChatLotties;
