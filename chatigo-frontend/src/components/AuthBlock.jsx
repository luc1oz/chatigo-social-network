import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AuthBlockDark.css'
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { NEWS_ROUTE, REG_ROUTE } from '../utils/consts';
import { useEffect, useState } from 'react';
import { Location } from 'react-router-dom';

function AuthBlock() {

    let navigate = useNavigate();

    const [isAuth, setIsAuth] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const [errorMessage, setErrorMessage] = useState('No such email or wrong password');

    const handleEmail = (e) =>{
        setEmail(e.target.value)
        setSubmitted(false)
    }

    const handlePassword = (e) =>{
        setPassword(e.target.value)
        setSubmitted(false)
    }


    const handleSubmit = (e) => {
        
        var goodStatus = false;

        var jsonObj = {
            "userEmail":email,
            "userPassword":password
        }
        fetch("/auth", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(jsonObj),
            })
            .then(response => 
                {
                    if(response.status === 200)
                    {
                        goodStatus = true;
                    } 
                    else{
                        return response.json();
                    }
                    return response.json();
                
                }
            )
            .then(data => {
                if(goodStatus){
                    Cookies.set('userID', data.userId);
                    localStorage.setItem('friendPage', 0);
                    setOnline(data.userId);
                }
                else{
                    setErrorMessage(data.message)
                    setSubmitted(true);
                }
            })
            .catch(error => {
                console.error(error);
            });
        
    }

    useEffect(() => {
        if(isAuth){
            navigate(NEWS_ROUTE);
            window.location.reload();
        }
    },[isAuth])

    const setOnline = (userId) => {
        var goodStatus = false;

        const formData = new FormData();
        formData.append("userId", userId);

        fetch("/setOnline", {
            method: "POST",
            // headers: {
            //     'Content-Type': 'application/json; charset=UTF-8'
            // },
            body: formData,
            })
            .then(response => 
                {
                    if(response.status === 200)
                    {
                        goodStatus = true;
                    } 
                    return response.json();
                
                }
            )
            .then(data => {
                if(goodStatus){
                    setIsAuth(true);
                }
                else{
                    setErrorMessage(data.message)
                    setSubmitted(true);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    const toReg = () =>{
        navigate(REG_ROUTE);
    }

    return (
        <form method='POST' className='auth-block rounded-3'>
            <h3 className='text-color align-self-center'> Authorization </h3>
            <input className='input-field rounded-3' placeholder="Email" type="email" name='email' id='email' onChange={handleEmail} autocomplete="off" required />
            <input className='input-field rounded-3' placeholder="Password" type="password" name='password' onChange={handlePassword} id='password' required />
            {(submitted && errorMessage) && <div className='errorBlock'>{errorMessage}</div>}
            <Button variant='primary' className='button-field' onClick={handleSubmit}> Sign in </Button>
            <Button variant='danger' className='button-half align-self-center button-field' onClick={toReg}> Registrate </Button>
        </form>        
    );
}

export default AuthBlock;