import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Timer, Zap, Users, Settings } from 'lucide-react';
import './Layout.css';

const Layout = () => {
    return (
        <div className="app-layout">
            {/* Sidebar */}
            <aside className="sidebar glass-panel">
                <div className="sidebar-header">
                    <div className="logo-icon">
                        <Zap size={20} fill="currentColor" />
                    </div>
                    <span className="logo-text">FocusMate</span>
                </div>

                <nav className="sidebar-nav">
                    <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
                    <NavItem to="/focus" icon={<Timer size={20} />} label="Focus Mode" />
                    <NavItem to="/social" icon={<Users size={20} />} label="Community" />
                    <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <div className="content-container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

const NavItem = ({ to, icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
    >
        {icon}
        <span>{label}</span>
    </NavLink>
);

export default Layout;
