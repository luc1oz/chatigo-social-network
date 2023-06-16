import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PhotoModalDark.css'
import PageMenuBlock from './PageMenuBlock';
import FriendsFindBlock from './FriendsFindBlock';

function PhotoModal() {

    return (
        <div className='user-block d-flex flex-row rounded-2 align-items-center justify-content-between'>
            <div className='d-flex flex-row gap-3'>
                <img src="./egor.jpg" alt="" className='user-block-img rounded-pill'/>
                <div>
                    <p className='m-0 fw-bold'>
                        Viktor Stepanov
                    </p>
                    <p className='m-0'>
                        5 min ago
                    </p>
                </div>
            </div>
            <div className='d-flex flex-row gap-3'>
                <button className='send-request-button d-flex flex-row justify-content-center align-items-center'>
                    <svg width="25" height="25" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.5134 24.9651H13.2576C12.7188 24.9651 12.2721 24.5183 12.2721 23.9796C12.2721 23.4409 12.7188 22.9941 13.2576 22.9941H18.5134C19.0521 22.9941 19.4989 23.4409 19.4989 23.9796C19.4989 24.5183 19.0521 24.9651 18.5134 24.9651Z" fill="currentColor"/>
                        <path d="M15.8855 27.593C15.3468 27.593 14.9 27.1462 14.9 26.6075V21.3517C14.9 20.813 15.3468 20.3662 15.8855 20.3662C16.4242 20.3662 16.871 20.813 16.871 21.3517V26.6075C16.871 27.1462 16.4242 27.593 15.8855 27.593Z" fill="currentColor"/>
                        <path d="M10.1832 13.6257C10.1437 13.6257 10.1175 13.6257 10.0781 13.6257C10.0124 13.6126 9.92037 13.6126 9.84154 13.6257C6.03106 13.5075 3.1535 10.5117 3.1535 6.81943C3.14036 5.00617 3.8499 3.29803 5.13757 2.01035C6.42525 0.722676 8.13339 0 9.95979 0C13.7177 0 16.7792 3.06152 16.7792 6.81943C16.7792 10.5117 13.9017 13.4943 10.2226 13.6257C10.2094 13.6257 10.1963 13.6257 10.1832 13.6257ZM9.95979 1.97093C8.65898 1.97093 7.45014 2.48338 6.53037 3.39001C5.62374 4.30978 5.12444 5.51862 5.12444 6.80629C5.12444 9.43421 7.17421 11.5628 9.78898 11.6417C9.86782 11.6285 10.0386 11.6285 10.2094 11.6417C12.7979 11.5234 14.8083 9.40793 14.8083 6.80629C14.8083 4.1521 12.6271 1.97093 9.95979 1.97093Z" fill="currentColor"/>
                        <path d="M9.95979 27.9998C7.27932 27.9998 4.74338 27.3034 2.82501 26.0158C0.998607 24.7938 0 23.1251 0 21.3249C0 19.5248 1.01175 17.8692 2.82501 16.6604C6.75374 14.0325 13.1396 14.0325 17.0683 16.6604C17.515 16.9626 17.6464 17.5802 17.3442 18.0269C17.042 18.4868 16.4245 18.605 15.9777 18.3028C12.706 16.1217 7.18734 16.1217 3.91559 18.3028C2.65419 19.1438 1.97093 20.2081 1.97093 21.3249C1.97093 22.4418 2.65419 23.5324 3.91559 24.3733C5.50548 25.4376 7.64723 26.0158 9.94665 26.0158C10.4854 26.0158 10.9321 26.4625 10.9321 27.0012C10.9321 27.5399 10.4985 27.9998 9.95979 27.9998Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default PhotoModal;