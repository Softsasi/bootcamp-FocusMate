import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Play, TrendingUp, Calendar, Zap, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <header className="dash-header">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Good Afternoon, Student</h1>
                    <p className="text-muted">Ready to reach your flow state? You have 2 tasks this week.</p>
                </div>
                <Button onClick={() => navigate('/focus')}>Quick Start</Button>
            </header>

            <div className="stats-grid">
                <Card className="metric-card">
                    <div className="metric-icon purple"><Zap size={24} /></div>
                    <div>
                        <div className="metric-value">4.5 hrs</div>
                        <div className="metric-label">Focused Today</div>
                    </div>
                </Card>
                <Card className="metric-card">
                    <div className="metric-icon cyan"><TrendingUp size={24} /></div>
                    <div>
                        <div className="metric-value">12 Days</div>
                        <div className="metric-label">Current Streak</div>
                    </div>
                </Card>
                <Card className="metric-card">
                    <div className="metric-icon pink"><Brain size={24} /></div>
                    <div>
                        <div className="metric-value">850</div>
                        <div className="metric-label">Focus Points</div>
                    </div>
                </Card>
            </div>

            <div className="main-grid">
                <section className="focus-section">
                    <h2 className="section-title">Start Session</h2>
                    <div className="action-grid">
                        <Card className="action-card hover-glow" onClick={() => navigate('/focus')}>
                            <div className="action-icon bg-primary">
                                <Play size={28} fill="currentColor" className="text-white" />
                            </div>
                            <div>
                                <h3 className="card-title">Deep Focus</h3>
                                <p className="card-desc">25 min • Strict Mode</p>
                            </div>
                        </Card>

                        <Card className="action-card" onClick={() => navigate('/focus?mode=chill')}>
                            <div className="action-icon bg-secondary">
                                <Play size={28} fill="currentColor" className="text-white" />
                            </div>
                            <div>
                                <h3 className="card-title">Light Study</h3>
                                <p className="card-desc">45 min • Pausing Allowed</p>
                            </div>
                        </Card>
                    </div>
                </section>

                <aside className="recommendations">
                    <h2 className="section-title">AI Insight</h2>
                    <Card className="insight-card">
                        <div className="flex gap-3 mb-3">
                            <div className="p-2 bg-accent/20 rounded-lg text-accent"><Brain size={20} /></div>
                            <div>
                                <h4 className="font-bold">Optimal Time</h4>
                                <p className="text-xs text-muted">Based on your history</p>
                            </div>
                        </div>
                        <p className="text-sm mb-4">You are 30% more productive between 8 PM and 10 PM on Tuesdays.</p>
                        <Button variant="outline" className="w-full text-sm">Schedule Session</Button>
                    </Card>
                </aside>
            </div>
        </div>
    );
};

export default Dashboard;
