import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SettingsMenuBlockDark.css';
import { useNavigate } from 'react-router-dom';
import { EDIT_ROUTE, SETTINGS_ROUTE } from '../utils/consts';

function SettingsMenuBlock() {

    let navigate = useNavigate();

    return (
        <div className='settings-menu-block gap-2 rounded-3'>
            <button className='settings-menu-button rounded-3' onClick={function(){navigate(SETTINGS_ROUTE)}}> 
                <div className='d-flex flex-row gap-3'>
                    <svg width="25" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.793 1.743C20.116 -0.581 23.884 -0.581 26.207 1.743C28.531 4.066 28.531 7.833 26.207 10.157L10.414 25.95H27C27.552 25.95 28 26.397 28 26.95C28 27.502 27.552 27.95 27 27.95H1C0.448 27.95 0 27.502 0 26.95V19.95C0 19.685 0.10503 19.43 0.29303 19.243L17.793 1.743ZM7.586 25.95L21.086 12.45L15.5 6.86403L2 20.364V25.95H7.586ZM16.914 5.45003L22.5 11.036L24.793 8.743C26.335 7.2 26.335 4.699 24.793 3.157C23.25 1.614 20.75 1.614 19.207 3.157L16.914 5.45003Z" fill="currentColor"/>
                    </svg>

                    <p className='m-0 settings-menu-button-text'>
                        Edit profile
                    </p>
                </div>
            </button>
            <button className='settings-menu-button rounded-3' onClick={function(){navigate(EDIT_ROUTE)}}> 
                <div className='d-flex flex-row gap-3'>
                    <svg width="25" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.008 3.74701C10.138 1.65601 11.876 0 14 0C16.124 0 17.862 1.65601 17.992 3.74701C18.139 3.80401 18.284 3.864 18.427 3.927C19.998 2.541 22.397 2.59801 23.9 4.10101C25.402 5.60301 25.459 8.002 24.073 9.573C24.136 9.716 24.196 9.861 24.253 10.008C26.344 10.138 28 11.876 28 14C28 16.124 26.344 17.862 24.253 17.992C24.196 18.139 24.136 18.284 24.073 18.427C25.459 19.998 25.402 22.397 23.899 23.899C22.397 25.402 19.998 25.459 18.427 24.073C18.284 24.136 18.139 24.196 17.992 24.253C17.862 26.344 16.124 28 14 28C11.876 28 10.138 26.344 10.008 24.253C9.861 24.196 9.716 24.136 9.573 24.073C8.002 25.459 5.60301 25.402 4.10101 23.899C2.59801 22.397 2.541 19.998 3.927 18.427C3.864 18.284 3.80401 18.139 3.74701 17.992C1.65601 17.862 0 16.124 0 14C0 11.876 1.65601 10.138 3.74701 10.008C3.80401 9.861 3.864 9.716 3.927 9.573C2.541 8.002 2.59801 5.60301 4.10101 4.10101C5.60301 2.59801 8.002 2.541 9.573 3.927C9.716 3.864 9.861 3.80401 10.008 3.74701ZM5.51501 8.34302C6.02301 8.85202 6.11602 9.60397 5.83502 10.207C5.72902 10.437 5.63201 10.671 5.54401 10.91C5.31601 11.535 4.719 12 4 12C2.895 12 2 12.895 2 14C2 15.105 2.895 16 4 16C4.719 16 5.31601 16.465 5.54401 17.09C5.63201 17.329 5.72902 17.563 5.83502 17.793C6.11602 18.396 6.02301 19.148 5.51501 19.657C4.73401 20.438 4.73401 21.704 5.51501 22.485C6.29601 23.266 7.56202 23.266 8.34302 22.485C8.85202 21.977 9.60397 21.884 10.207 22.165C10.437 22.271 10.671 22.368 10.91 22.456C11.535 22.684 12 23.281 12 24C12 25.105 12.895 26 14 26C15.105 26 16 25.105 16 24C16 23.281 16.465 22.684 17.09 22.456C17.329 22.368 17.564 22.271 17.793 22.165C18.396 21.884 19.148 21.977 19.657 22.485C20.438 23.266 21.704 23.266 22.485 22.485C23.266 21.704 23.266 20.438 22.485 19.657C21.977 19.148 21.884 18.396 22.165 17.793C22.271 17.563 22.368 17.329 22.456 17.09C22.684 16.465 23.281 16 24 16C25.105 16 26 15.105 26 14C26 12.895 25.105 12 24 12C23.281 12 22.684 11.535 22.456 10.91C22.368 10.671 22.271 10.437 22.165 10.207C21.884 9.60397 21.977 8.85202 22.485 8.34302C23.266 7.56202 23.266 6.29601 22.485 5.51501C21.704 4.73401 20.438 4.73401 19.657 5.51501C19.148 6.02301 18.396 6.11602 17.793 5.83502C17.564 5.72902 17.329 5.63201 17.09 5.54401C16.465 5.31601 16 4.719 16 4C16 2.895 15.105 2 14 2C12.895 2 12 2.895 12 4C12 4.719 11.535 5.31601 10.91 5.54401C10.671 5.63201 10.436 5.72902 10.207 5.83502C9.60397 6.11602 8.85202 6.02301 8.34302 5.51501C7.56202 4.73401 6.29601 4.73401 5.51501 5.51501C4.73401 6.29601 4.73401 7.56202 5.51501 8.34302Z" fill="currentColor"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14 10C11.791 10 10 11.791 10 14C10 16.209 11.791 18 14 18C16.209 18 18 16.209 18 14C18 11.791 16.209 10 14 10ZM8 14C8 10.686 10.686 8 14 8C17.314 8 20 10.686 20 14C20 17.314 17.314 20 14 20C10.686 20 8 17.314 8 14Z" fill="currentColor"/>
                    </svg>
                    <p className='m-0 settings-menu-button-text'>
                        Settings
                    </p>
                </div>
            </button>
            
        </div>
    );
}

export default SettingsMenuBlock;