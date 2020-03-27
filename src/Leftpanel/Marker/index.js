import React from 'react';
import './Marker.css';
const Marker = ({ color, addclass, onClick }) => {
    return (
        <div className={addclass} style={{ backgroundColor: color }} onClick={onClick} />
    );
}

export default Marker;
