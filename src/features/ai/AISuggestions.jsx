import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Brain, Sparkles, Calendar, Clock } from 'lucide-react';
import './AISuggestions.css';

// Mock Service
const RecommendationService = {
    analyzeHistory: () => {
        // In a real app, this would analyze local storage or backend data
        return {
            bestDay: 'Tuesday',
            bestTimeStart: '20:00',
            bestTimeEnd: '22:00',
            productivityScore: 85,
            subjects: ['Math', 'Coding']
        };
    },

    generateSchedule: () => {
        return [
            { id: 1, day: 'Today', time: '18:00', subject: 'Math Revision', duration: 45, type: 'review' },
            { id: 2, day: 'Tomorrow', time: '09:00', subject: 'Deep Work', duration: 90, type: 'focus' }
        ];
    }
};

const AISuggestions = () => {
    const [insight, setInsight] = useState(null);
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate AI processing time
        const timer = setTimeout(() => {
            setInsight(RecommendationService.analyzeHistory());
            setSchedule(RecommendationService.generateSchedule());
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <Card className="ai-card loading">
                <Sparkles className="animate-spin text-accent" />
                <p className="text-sm text-muted">Analyzing study patterns...</p>
            </Card>
        );
    }

    return (
        <div className="ai-container">
            <Card className="ai-card highlight">
                <div className="card-header">
                    <div className="icon-badge"><Brain size={18} /></div>
                    <h3 className="font-bold text-lg">AI Insights</h3>
                </div>
                <p className="text-muted text-sm mb-4">
                    Your focus peaks on <strong>{insight.bestDay}s</strong> evenings.
                    Try scheduling your hardest tasks then.
                </p>
                <div className="score-bar">
                    <div className="flex justify-between text-xs mb-1">
                        <span>Productivity Score</span>
                        <span className="font-bold">{insight.productivityScore}/100</span>
                    </div>
                    <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary to-accent"
                            style={{ width: `${insight.productivityScore}%` }}
                        />
                    </div>
                </div>
            </Card>

            <Card className="ai-card">
                <div className="card-header">
                    <div className="icon-badge blue"><Calendar size={18} /></div>
                    <h3 className="font-bold text-lg">Smart Schedule</h3>
                </div>
                <div className="schedule-list">
                    {schedule.map(item => (
                        <div key={item.id} className="schedule-item">
                            <div className="time-col">
                                <span className="text-xs font-bold">{item.day}</span>
                                <span className="text-muted text-xs">{item.time}</span>
                            </div>
                            <div className="info-col">
                                <div className="font-medium text-sm">{item.subject}</div>
                                <div className="flex items-center gap-1 text-xs text-muted">
                                    <Clock size={12} /> {item.duration}m • {item.type}
                                </div>
                            </div>
                            <Button variant="ghost" className="add-btn">+</Button>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default AISuggestions;
