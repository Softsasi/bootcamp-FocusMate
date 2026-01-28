import React, { useState, useEffect } from 'react';
import { Timer } from '../../features/focus/Timer';
import { Card } from '../../components/ui/Card';
import { Shield, ShieldAlert, X } from 'lucide-react';
import './FocusMode.css';

const FocusMode = () => {
    const [isStrictMode, setIsStrictMode] = useState(false);
    const [distractions, setDistractions] = useState(0);
    const [isOverlayActive, setIsOverlayActive] = useState(false);
    const [sessionActive, setSessionActive] = useState(false);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && sessionActive) {
                setDistractions(d => d + 1);
                if (isStrictMode) {
                    // In a real app, we might play a sound or send a notification
                    console.log("Distraction detected in strict mode!");
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [sessionActive, isStrictMode]);

    useEffect(() => {
        if (sessionActive && isStrictMode) {
            enterFullScreen();
            setIsOverlayActive(true);
        } else {
            exitFullScreen();
            setIsOverlayActive(false);
        }
    }, [sessionActive, isStrictMode]);

    const enterFullScreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(err => console.log(err));
        }
    };

    const exitFullScreen = () => {
        if (document.fullscreenElement && document.exitFullscreen) {
            document.exitFullscreen().catch(err => console.log(err));
        }
    };

    const handleStart = () => {
        setSessionActive(true);
        setDistractions(0);
    };

    const handleComplete = () => {
        setSessionActive(false);
        setIsOverlayActive(false);
        exitFullScreen();
        // Here we would save the session data
        alert(`Session Complete! You had ${distractions} distractions.`);
    };

    return (
        <div className={`focus-page ${isOverlayActive ? 'deep-focus-active' : ''}`}>
            {isOverlayActive && (
                <div className="deep-focus-overlay">
                    <div className="overlay-content">
                        <Shield size={64} className="text-primary mb-4 animate-pulse" />
                        <h1 className="text-4xl font-bold mb-2">Deep Focus Mode</h1>
                        <p className="text-xl text-muted mb-8">Stay in this window. Distractions are being tracked.</p>
                        <div className="timer-wrapper-overlay">
                            <Timer
                                isStrict={true}
                                onComplete={handleComplete}
                                autoStart={true}
                                onTick={() => { }}
                            />
                        </div>
                        <button className="emergency-exit-btn" onClick={() => setSessionActive(false)}>
                            Emergency Exit
                        </button>
                    </div>
                </div>
            )}

            <div className="container max-w-2xl mx-auto py-8">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Focus Session</h1>
                    <p className="text-muted">Choose your mode and start focusing.</p>
                </header>

                <Card className="settings-card mb-8">
                    <div className="flex items-center justify-between p-2">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isStrictMode ? 'bg-primary/20 text-primary' : 'bg-bg-secondary text-muted'}`}>
                                {isStrictMode ? <Shield size={24} /> : <ShieldAlert size={24} />}
                            </div>
                            <div>
                                <h3 className="font-bold">Strict Mode</h3>
                                <p className="text-sm text-muted">Prevents tab switching (Simulated)</p>
                            </div>
                        </div>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={isStrictMode}
                                onChange={(e) => setIsStrictMode(e.target.checked)}
                                disabled={sessionActive}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </Card>

                <div className="timer-section">
                    <Timer
                        isStrict={isStrictMode}
                        onTick={handleStart}
                        onComplete={handleComplete}
                    />
                </div>

                {distractions > 0 && (
                    <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-center text-red-400">
                        {distractions} distraction{distractions !== 1 ? 's' : ''} detected during this session.
                    </div>
                )}
            </div>
        </div>
    );
};

export default FocusMode;
