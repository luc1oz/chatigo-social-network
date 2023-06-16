import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegBlockDark.css'
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from '../utils/consts';


function RegBlock() {

    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [sex, setSex] = useState();

    //validation block
    const [inName, setInName] = useState(false);
    const [inSurname, setInSurname] = useState(false);
    const [inEmail, setInEmail] = useState(false);
    const [inPassword, setInPassword] = useState(false);
    const [inRepassword, setInRepassword] = useState(false);
    const [inBirthday, setInBirthday] = useState(false);
    const [inSex, setInSex] = useState(false);
    const [formValid, setFromValid] = useState(false);

    const [errorName, setErrorName] = useState('Name cannot be empty');

    const [errorSurname, setErrorSurname] = useState('Surname cannot be empty');
   /* const [numberSurname, setNumberSurname] = useState('Surname must not contain numbers');
    const [shortSurname, setShortSurname] = useState('Surname must not be shorter than 2 characters');
    const [longSurname, setLongSurname] = useState('Surname must not be longer than 25 characters');*/

    const [errorEmail, setErrorEmail] = useState('Email cannot be empty');
   /* const [badEmail, setBadEmail] = useState('Invalid mail address');*/

    const [errorPassword, setErrorPassword] = useState('Password cannot be empty');
    /*const [shortPassword, setShortPassword] = useState('Password must not be shorter than 2 characters');
    const [notEqualPassword, setNotEqualPassword] = useState('Passwords must match');*/

    const [errorRepassword, setErrorRepassword] = useState('Confirm the password');
    //const [notEqualRepassword, setNotEqualRepassword] = useState('Passwords must match');

    const [errorBirthday, setErrorBirthday] = useState('Choose your birthday');

    const [errorSex, setErrorSex] = useState('Choose your sex');
    //calidation block end

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [result, setResult] = useState('');

    useEffect(() => {
        if(errorName || errorSurname || errorEmail || errorPassword || errorRepassword || errorBirthday || errorSex) {
            setFromValid(false);
        }
        else {
            setFromValid(true);
        }
    }, [errorName, errorSurname, errorEmail, errorPassword, errorRepassword, errorBirthday, errorSex])

    const blurHandler = (e) => {
        switch(e.target.name) {
            case 'name':
                setInName(true)
                break
            case 'surname':
                setInSurname(true)
                break
            case 'email':
                setInEmail(true)
                break
            case 'password':
                setInPassword(true)
                break
            case 'repeat_password':
                setInRepassword(true)
                break
            case 'birthday':
                setInBirthday(true)
                break
            case 'sex':
                setInSex(true)
                break
        }
    }

    const handleName = (e) => {
        setName(e.target.value);
        const re = /^[a-zA-Zа-яА-Я]*$/;
        if(e.target.value.length < 2) {
            setErrorName('Name is too short');
        }
        else if(e.target.value.length > 25) {
            setErrorName('Name is too long');
        }
        else if(!re.test(String(e.target.value).toLowerCase())) {
            setErrorName("Name contains only letters");
        } 
        else {
            setErrorName('');
        }
        setSubmitted(false);
    }

    const handleSurname = (e) => {
        setSurname(e.target.value);
        const re = /^[a-zA-Zа-яА-Я]*$/;
        if(e.target.value.length < 2) {
            setErrorSurname('Surname is too short');
        }
        else if(e.target.value.length > 25) {
            setErrorSurname('Surname is to short');
        }
        else if(!re.test(String(e.target.value).toLowerCase())) {
            setErrorSurname("Surname contains only letters");
        } 
        else {
            setErrorSurname('');
        }
        setSubmitted(false);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(e.target.value).toLowerCase())) {
            setErrorEmail('Invalid mail address');
        }
        else {
            setErrorEmail('');
        }
        setSubmitted(false);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        if(e.target.value.length < 5) {
            setErrorPassword('Password is too simple');
        }
        else {
            setErrorPassword('');
        }
        setSubmitted(false);
    }

    const handleRePassword = (e) => {
        setRepassword(e.target.value);
        if(e.target.value != password) {
            setErrorRepassword('Password mismatch');
        }
        else {
            setErrorRepassword('');
        }
        setSubmitted(false);
    }

    const handleBirthday = (e) => {
        setBirthday(e.target.value);
        const date = new Date().toLocaleString();
        var ss = date.split(',');
        if(e.target.value != "дд.мм.гггг") {
            const userDate = new Date(e.target.value);
            const curDate = new Date(ss[0]);
            if (userDate - curDate > 0) {
                setErrorBirthday('Are you from future?');
            }
            else {
                setErrorBirthday('');
            }
        } 
        setSubmitted(false);
    }

    const handleSex = (e) => {
        setSex(e.target.value);
        if(e.target.value != "Sex") {
            setErrorSex('');
        }
        setSubmitted(false);
    }

    const ToAuth = () => {
        navigate(LOGIN_ROUTE);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (errorName || errorSurname || errorEmail || errorPassword || errorRepassword || errorBirthday || errorSex) {
            setError(true);
        } else {
            var jsonReg = {
                "userName": name,
                "userSurname": surname,
                "userEmail": email,
                "userPassword": password,
                "userBirthday": birthday,
                "userGender": sex
            }
            fetch("/user/reg", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(jsonReg),
                })
                .then(response => 
                    {
                        if(response.status === 200)
                        {
                            console.log("SUCCESSS");
                            navigate(LOGIN_ROUTE);
                        }  
                        else{
                            return response.json();
                        }
                        
                    }
                )
                .then(data => {
                    setErrorEmail(data.message)
                })
                .catch(error => {
                    // console.error(error);
                });
            
        }
    };

    return (
        <div className='block-m'>
            <form method='POST' className='reg-block rounded-3'>
                <h3 className='text-color align-self-center mb-3'> Registration </h3>
                <div className='d-flex flex-row gap-2'>
                    <div className='w-100'>
                        <input className='input-field rounded-3' placeholder="Name" type="text" name='name' id='name' value={name} onChange={handleName} onBlur={e => blurHandler(e)} autoComplete="off" required />
                        {(inName && errorName) && <div className='errorBlock'>{errorName}</div>}
                    </div>
                    <div className='w-100'> 
                        <input className='input-field rounded-3' placeholder="Surname" type="text" name='surname' id='surname' value={surname} onChange={handleSurname} onBlur={e => blurHandler(e)} autoComplete="off" required />
                        {(inSurname && errorSurname) && <div className='errorBlock'>{errorSurname}</div>}
                    </div>
                </div>
                <div>
                    <input className='input-field rounded-3' placeholder="Email" type="email" name='email' id='email' value={email} onChange={handleEmail} onBlur={e => blurHandler(e)} autoComplete="off" required />
                    {(inEmail && errorEmail) && <div className='errorBlock'>{errorEmail}</div>}
                </div>
                <div>
                    <input className='input-field rounded-3' placeholder="Password" type="password" name='password' id='password' value={password} onChange={handlePassword} onBlur={e => blurHandler(e)} required />
                    {(inPassword && errorPassword) && <div className='errorBlock'>{errorPassword}</div>}
                </div>
                <div>
                    <input className='input-field rounded-3' placeholder="Repeat password" type="password" name='repeat_password' id='repeat_password' onChange={handleRePassword} onBlur={e => blurHandler(e)} required />
                    {(inRepassword && errorRepassword) && <div className='errorBlock'>{errorRepassword}</div>}
                </div>
                <div>
                    <input className='input-field rounded-3' placeholder="Birthday" type="date" name='birthday' id='birthday' value={birthday} onChange={handleBirthday} onFocus={(e) => e.currentTarget.showPicker()} onKeyDown={(e) => e.preventDefault()} onBlur={e => blurHandler(e)} required />
                    {(inBirthday && errorBirthday) && <div className='errorBlock'>{errorBirthday}</div>}
                </div>
                <div>
                    <select className='input-field rounded-3 select-field' value={sex} name="sex" onChange={handleSex} onBlur={e => blurHandler(e)} required>
                        <option selected disabled hidden className='unselected-option'> Sex </option>
                        <option> Male </option>
                        <option> Female </option>
                        <option> Other </option>
                    </select>
                    {(inSex && errorSex) && <div className='errorBlock'>{errorSex}</div>}
                </div>
                   
                <Button type='submit' variant='primary' className='button-field' onClick={handleSubmit} disabled={!formValid}> Registrate </Button>
                <Button variant='danger' className='button-half align-self-center button-field' onClick={ToAuth}> Sign in </Button>
            </form>      
        </div>
    );
}

export default RegBlock;