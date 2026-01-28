import React, { useState, useEffect } from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import './Timer.css';

export const Timer = ({ initialMinutes = 25, onComplete, onTick, isStrict, autoStart = false }) => {
    const [seconds, setSeconds] = useState(initialMinutes * 60);
    const [isActive, setIsActive] = useState(autoStart);
    const [totalTime] = useState(initialMinutes * 60);

    useEffect(() => {
        let interval = null;
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(s => s - 1);
                if (onTick) onTick();
            }, 1000);
        } else if (seconds === 0) {
            setIsActive(false);
            if (onComplete) onComplete();
        }
        return () => clearInterval(interval);
    }, [isActive, seconds, onComplete, onTick]);

    // Handle prop changes
    useEffect(() => {
        if (autoStart) setIsActive(true);
    }, [autoStart]);

    const toggleTimer = () => setIsActive(!isActive);
    const stopTimer = () => {
        setIsActive(false);
        setSeconds(initialMinutes * 60);
    };

    const progress = ((totalTime - seconds) / totalTime) * 100;
    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="timer-container">
            <div className="timer-circle-wrapper">
                <svg className="progress-ring" width="300" height="300">
                    <circle
                        className="progress-ring__circle-bg"
                        stroke="hsl(var(--bg-secondary) / 0.5)"
                        strokeWidth="8"
                        fill="transparent"
                        r={radius}
                        cx="150"
                        cy="150"
                    />
                    <circle
                        className="progress-ring__circle"
                        stroke="hsl(var(--primary))"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="transparent"
                        r={radius}
                        cx="150"
                        cy="150"
                        style={{
                            strokeDasharray: `${circumference} ${circumference}`,
                            strokeDashoffset: strokeDashoffset
                        }}
                    />
                </svg>

                <div className="timer-display">
                    <div className="time-text">
                        {Math.floor(seconds / 60).toString().padStart(2, '0')}:
                        {(seconds % 60).toString().padStart(2, '0')}
                    </div>
                    <div className="status-text text-muted">
                        {isActive ? (isStrict ? 'Strict Mode On' : 'Focusing...') : 'Ready to Focus'}
                    </div>
                </div>
            </div>

            <div className="timer-controls">
                {!isActive ? (
                    <Button onClick={toggleTimer} className="play-btn">
                        <Play fill="currentColor" className="ml-1" size={32} />
                    </Button>
                ) : (
                    <div className="active-controls">
                        {!isStrict ? (
                            <Button onClick={toggleTimer} className="control-btn" style={{ backgroundColor: 'hsl(var(--bg-secondary))' }}>
                                <Pause fill="currentColor" size={24} />
                            </Button>
                        ) : (
                            <div className="strict-badge">Locked</div>
                        )}
                        <Button onClick={stopTimer} className="control-btn stop-btn">
                            <Square fill="currentColor" size={24} />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
