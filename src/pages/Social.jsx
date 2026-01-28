import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Users, Trophy, MessageCircle, Star } from 'lucide-react';
import './Social.css';

const Social = () => {
    const [activeTab, setActiveTab] = useState('leaderboard');

    return (
        <div className="social-container">
            <header className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Community</h1>
                    <p className="text-muted">Study together, stay motivated.</p>
                </div>
                <div className="flex gap-2 p-1 bg-bg-secondary rounded-lg">
                    <button
                        className={`tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
                        onClick={() => setActiveTab('leaderboard')}
                    >
                        Leaderboard
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'groups' ? 'active' : ''}`}
                        onClick={() => setActiveTab('groups')}
                    >
                        My Groups
                    </button>
                </div>
            </header>

            {activeTab === 'leaderboard' ? (
                <div className="leaderboard-list">
                    {[
                        { rank: 1, name: 'Alex M.', points: 2450, status: 'Focusing' },
                        { rank: 2, name: 'You', points: 2100, status: 'Idle' },
                        { rank: 3, name: 'Sarah K.', points: 1950, status: 'Offline' },
                        { rank: 4, name: 'Davide R.', points: 1800, status: 'Focusing' },
                    ].map((user) => (
                        <Card key={user.name} className={`leaderboard-item ${user.name === 'You' ? 'highlight' : ''}`}>
                            <div className="flex items-center gap-4">
                                <div className={`rank-badge rank-${user.rank}`}>#{user.rank}</div>
                                <div className="avatar-placeholder">{user.name.charAt(0)}</div>
                                <div>
                                    <div className="font-bold">{user.name}</div>
                                    <div className="text-xs text-muted flex items-center gap-1">
                                        <span className={`status-dot ${user.status.toLowerCase()}`}></span>
                                        {user.status}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 font-bold text-primary">
                                <Star size={16} fill="currentColor" />
                                {user.points}
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="groups-grid">
                    <Card className="group-card">
                        <div className="group-header">
                            <div className="group-icon">🚀</div>
                            <div>
                                <h3 className="font-bold">CS Year 1</h3>
                                <p className="text-xs text-muted">12 Members • 4 Active</p>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <Button variant="outline" className="w-full text-sm">Chat</Button>
                            <Button variant="primary" className="w-full text-sm">Join Room</Button>
                        </div>
                    </Card>

                    <Card className="group-card dashed">
                        <div className="flex flex-col items-center justify-center h-full gap-2 text-muted">
                            <Users size={32} />
                            <span>Create New Group</span>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Social;
