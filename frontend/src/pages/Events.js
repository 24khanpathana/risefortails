import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Pages.css';

const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/content`).then(res => {
            setEvents(res.data.filter(c => c.page === 'Event'));
        });
    },[]);

    return (
        <section className="page-section container">
            <h1 className="section-title">Upcoming Events</h1>
            <div className="grid-container grid-3">
                {events.map(event => (
                    <div key={event._id} className="card" style={{padding: 0, overflow: 'hidden'}}>
                        {event.imageUrl ? (
                            <img src={event.imageUrl} alt={event.title} className="content-image" style={{marginBottom: 0, borderRadius: 0}} />
                        ) : (
                            <div style={{height: '200px', backgroundColor: 'var(--border-light)'}}></div>
                        )}
                        <div style={{padding: '20px'}}>
                            <h3 style={{marginBottom: '10px'}}>{event.title}</h3>
                            {event.date && <p style={{color: 'var(--primary-light)', fontWeight: 'bold', marginBottom: '10px'}}>{new Date(event.date).toDateString()}</p>}
                            <p>{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
export default Events;