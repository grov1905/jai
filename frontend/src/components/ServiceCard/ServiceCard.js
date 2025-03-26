import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ icon, title, description }) => {
    return (
        <div className="service-card">
            <span>{icon}</span>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default ServiceCard;