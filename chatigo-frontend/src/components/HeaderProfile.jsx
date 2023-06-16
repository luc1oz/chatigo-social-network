import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HeaderProfileLight.css'

function HeaderProfile() {

    return (
        <button className='rounded-pill d-flex flex-row justify-content-around p-0 align-items-center header-profile-elem'> 
            <p className='mb-0 mt-0 me-3 ms-3'>Viktor Stepanov</p>
            <img src='./egor.jpg' className='rounded-pill' alt='egor'></img>
        </button>
    );
}

export default HeaderProfile;