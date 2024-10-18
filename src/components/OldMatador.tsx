import './matador.css';
import applause0 from '../assets/applause0.wav';
import applause1 from '../assets/applause1.wav';
import applause2 from '../assets/applause2.wav';
import applause3 from '../assets/applause3.wav';
import React, { Component } from 'react';

interface MatadorProps {
    matadorPosition?: number;
    setMatarodPosition?: (position: number) => void;
    applause?: number;
}

interface MatadorState {
    previousApplause: number;
}

export class OldMatador extends Component<MatadorProps, MatadorState> {
    static defaultProps: Partial<MatadorProps> = {
        matadorPosition: 0,
        setMatarodPosition: () => {},
        applause: 0
    };

    constructor(props: MatadorProps) {
        super(props);
        this.state = {
            previousApplause: -1
        };
    }

    componentDidMount() {
        document.addEventListener('bullRun', this.handleBullRun as EventListener);
    }

    componentWillUnmount() {
        document.removeEventListener('bullRun', this.handleBullRun as EventListener);
    }

    componentDidUpdate(prevProps: MatadorProps) {
        const { applause } = this.props;
        const { previousApplause } = this.state;

        if (applause !== prevProps.applause) {
            this.playApplauseSound(applause!);

            if (applause === 3 && previousApplause !== 3) {
                this.setState({ previousApplause: applause });
            }
        }
    }

    handleBullRun = (event: CustomEvent) => {
        const bullPosition = event.detail.position;
        const { matadorPosition, setMatarodPosition } = this.props;

        if (bullPosition === matadorPosition) {
            let newPosition;
            do {
                newPosition = Math.floor(Math.random() * 8);
            } while (newPosition === bullPosition);

            console.log(`Matador is moving from ${matadorPosition} to ${newPosition}`);
            setMatarodPosition?.(newPosition);
        }
    };

    playApplauseSound(applause: number) {
        let soundFile: string;
        switch (applause) {
            case 0:
                soundFile = applause0;
                break;
            case 1:
                soundFile = applause1;
                break;
            case 2:
                soundFile = applause2;
                break;
            case 3:
                soundFile = applause3;
                break;
            default:
                console.log('Unknown applause type.');
                return;
        }

        const audio = new Audio(soundFile);
        audio.play().catch((error) => console.error('Error playing sound:', error));
    }

    shouldComponentUpdate(nextProps: MatadorProps) {
        const { applause } = this.props;
        const { previousApplause } = this.state;

        return nextProps.applause === 3 && previousApplause !== 3;

    }

    render() {
        return (
            <div>
                <p className="matador"></p>
            </div>
        );
    }
}