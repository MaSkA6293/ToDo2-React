import React from 'react';
import './Contentpanel.css';
import checkbox from '../../assets/img/checkbox.svg'
import checkbox2 from '../../assets/img/checkbox2.svg'
import checkbox3 from '../../assets/img/checkbox3.svg'


const Contentpanel = () => {



    return (
        <div className='content'>
            <h2>Заголовок</h2>
            <ul>
                <li onClick={(e) => {
                    console.log(e.target.textContent);
                }}>  <img src={checkbox} alt='checkbox' />  Готово</li>

                <li>
                    <svg id="Layer_1"
                        width='30'
                        version="1.1"
                        viewBox="0 0 128 128"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g><circle class="st0" cx="64" cy="64" r="64" /></g>
                        <g >
                            <path className="st1"
                                d="M54.3,97.2L24.8,67.7c-0.4-0.4-0.4-1,0-1.4l8.5-8.5c0.4-0.4,1-0.4,1.4,0L55,78.1l38.2-38.2   c0.4-0.4,1-0.4,1.4,0l8.5,8.5c0.4,0.4,0.4,1,0,1.4L55.7,97.2C55.3,97.6,54.7,97.6,54.3,97.2z" /></g></svg>

                </li>


            </ul>




        </div >
    )
}


export default Contentpanel