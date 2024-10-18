import './matador.css';
import applause0 from '../assets/applause0.wav';
import applause1 from '../assets/applause1.wav';
import applause2 from '../assets/applause2.wav';
import applause3 from '../assets/applause3.wav';
import React, { useEffect, useState } from 'react';

interface MatadorProps {
    matadorPosition?: number;
    setMatarodPosition?: (position: number) => void;
    applause?: number;
}

const MatadorComponent: React.FC<MatadorProps> = ({
                                                      matadorPosition = 0,
                                                      setMatarodPosition = () => {},
                                                      applause = 0
                                                  }) => {
    const [previousApplause, setPreviousApplause] = useState<number>(-1);

    useEffect(() => {
        const handleBullRun = (event: CustomEvent) => {
            const bullPosition = event.detail.position;

            if (bullPosition === matadorPosition) {
                let newPosition;
                do {
                    newPosition = Math.floor(Math.random() * 8);
                } while (newPosition === bullPosition);

                console.log(`Matador is moving from ${matadorPosition} to ${newPosition}`);
                setMatarodPosition(newPosition);
            }
        };

        document.addEventListener('bullRun', handleBullRun as EventListener);

        return () => {
            document.removeEventListener('bullRun', handleBullRun as EventListener);
        };
    }, [matadorPosition, setMatarodPosition]);

    const playSound = (soundFile: string) => {
        const audio = new Audio(soundFile);
        audio.play().catch((error) => console.error('Error playing sound:', error));
    };

    useEffect(() => {

            switch (applause) {
                case 0:
                    playSound(applause0);
                    break;
                case 1:
                    playSound(applause1);
                    break;
                case 2:
                    playSound(applause2);
                    break;
                case 3:
                    playSound(applause3);
                    break;
                default:
                    console.log('Unknown applause type.');
        }

        setPreviousApplause(applause);
    }, [applause, previousApplause]);

    return (
        <div>
            <p className="matador"></p>
        </div>
    );
};

const propsAreEqual = (prevProps: MatadorProps, nextProps: MatadorProps) => {
    return prevProps.applause === 3 && nextProps.applause === 3;

};

export const Matador = React.memo(MatadorComponent, propsAreEqual);
