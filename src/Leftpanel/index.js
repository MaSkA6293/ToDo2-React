import React from 'react';
import './index.css';

function Leftpanel({ items }) {
    return (
        <div className='leftpanel'>
            <ul>
                {
                    items.map((item, index) => (
                        <li key={index}>
                            <div className='marker' style={{ backgroundColor: item.color }} />
                            <span>{item.title}</span>
                            <div className='btnX'>X</div>
                        </li>
                    ))}

            </ul>

        </div>
    );
}

export default Leftpanel;
