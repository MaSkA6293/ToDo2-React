import React from 'react';
import './Marker.css';
function Marker({ color, addclass }) {
    return (
        <div className={addclass} style={{ backgroundColor: color }} />
    );
}

export default Marker;
