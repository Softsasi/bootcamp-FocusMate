import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Calendar, Music, Database, Check } from 'lucide-react';

const IntegrationCard = ({ icon, name, description, isConnected, onToggle }) => {
    return (
        <Card className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${isConnected ? 'bg-green-500/20 text-green-500' : 'bg-bg-secondary text-muted'}`}>
                    {icon}
                </div>
                <div>
                    <h3 className="font-bold text-lg">{name}</h3>
                    <p className="text-sm text-muted">{description}</p>
                </div>
            </div>
            <Button
                variant={isConnected ? "outline" : "primary"}
                onClick={onToggle}
                className={isConnected ? "border-green-500/50 text-green-500 hover:bg-green-500/10" : ""}
            >
                {isConnected ? (
                    <>
                        <Check size={18} className="mr-2" />
                        Connected
                    </>
                ) : (
                    'Connect'
                )}
            </Button>
        </Card>
    );
};

const Integrations = () => {
    const [connections, setConnections] = useState({
        calendar: false,
        spotify: false,
        notion: false
    });

    const toggleConnection = (key) => {
        setConnections(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className="container max-w-3xl mx-auto animation-fade-in">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Integrations</h1>
                <p className="text-muted">Connect your favorite tools to supercharge your focus.</p>
            </header>

            <div className="flex flex-col gap-4">
                <IntegrationCard
                    icon={<Calendar size={24} />}
                    name="Google Calendar"
                    description="Sync your study schedule and block out focus time."
                    isConnected={connections.calendar}
                    onToggle={() => toggleConnection('calendar')}
                />

                <IntegrationCard
                    icon={<Music size={24} />}
                    name="Spotify"
                    description="Play focus playlists directly from your dashboard."
                    isConnected={connections.spotify}
                    onToggle={() => toggleConnection('spotify')}
                />

                <IntegrationCard
                    icon={<Database size={24} />}
                    name="Notion"
                    description="Import tasks and project notes automatically."
                    isConnected={connections.notion}
                    onToggle={() => toggleConnection('notion')}
                />
            </div>
        </div>
    );
};

export default Integrations;
