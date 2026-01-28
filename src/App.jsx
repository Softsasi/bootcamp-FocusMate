import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import FocusMode from './features/focus/FocusMode';
import Social from './pages/Social';
import Integrations from './pages/Integrations';

// Placeholder Pages for those not yet implemented
const Settings = () => <div className="card"><h1>Settings</h1><p>App preferences.</p></div>;

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="focus" element={<FocusMode />} />
                    <Route path="social" element={<Social />} />
                    <Route path="integrations" element={<Integrations />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
