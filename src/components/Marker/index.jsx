import React from 'react';
import PropTypes from 'prop-types';

import './Marker.scss';


const Marker = ({ color, addclass, onClick }) => {
    return (
        <div className={addclass} style={{ backgroundColor: color }} onClick={onClick} />
    )
}

Marker.propTypes = {
    color: PropTypes.string,
    addclass: PropTypes.string,
    onClick: PropTypes.func,
};

export default Marker;
