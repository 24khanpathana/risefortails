import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Main Site Components
import Navbar from './components/Navbar';
import Home from './components/sections/Home';
import About from './components/sections/About';
import Volunteer from './components/sections/Volunteer';
import Feedback from './components/sections/Feedback';
import Complaints from './components/sections/Complaints';
import Contact from './components/sections/Contact';
import DynamicContentRenderer from './components/DynamicContentRenderer';

// Page Components
import SlotBooking from './pages/SlotBooking';
import Donation from './pages/Donation';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdoptionPage from './pages/AdoptionPage'; // New Page

import { AuthProvider } from './context/AuthContext';

function MainLayout() {
    return (
        <>
            <Navbar />
            <main>
                <DynamicContentRenderer position="above-home" />
                <Home />
                <DynamicContentRenderer position="below-home" />
                <About />
                <DynamicContentRenderer position="below-about" />
                <Volunteer />
                <DynamicContentRenderer position="below-volunteer" />
                <Feedback />
                <DynamicContentRenderer position="below-feedback" />
                <Complaints />
                <DynamicContentRenderer position="below-complaints" />
                <Contact />
                <DynamicContentRenderer position="below-contact" />
            </main>
        </>
    );
}

function App() {
    // Theme logic can be moved to a context if preferred, but this is fine.
    const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light');

    React.useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<MainLayout />} />
                        <Route path="/book-a-slot" element={<SlotBooking />} />
                        <Route path="/donate" element={<Donation />} />
                        <Route path="/animals-for-adoption" element={<AdoptionPage />} /> {/* New Route */}
                        <Route path="/admin" element={<AdminLogin />} />
                        <Route path="/admin/dashboard" element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;