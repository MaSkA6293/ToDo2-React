import React from 'react';
import PropTypes from 'prop-types';

import './MobyleMenu.scss';


const MobyleMenu = ({ click }) => {

    return (
        <div className='mobyleMenu' onClick={click}> </div>
    )
}

MobyleMenu.propTypes = {
    click: PropTypes.func,
};

export default MobyleMenu;
