import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditProfileBlockDark.css'
import PageMenuBlock from './PageMenuBlock';
import FriendsFindBlock from './FriendsFindBlock';
import AllFriendsBlock from './AllFriendsBlock';
import OnlineFriendsBlock from './OnlineFriendsBlock';
import AllUsersBlock from './AllUsersBlock';
import SettingsMenuBlock from './SettingsMenuBlock';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { useTheme } from '../hooks/use-theme';

function EditProfileBlock() {

    let navigate = useNavigate();

    const [successMessage, setSuccessMessage] = useState('');

    const [errMessage, setErrMessage] = useState('')

    const [errMessagePassword, setErrMessagePassword] = useState('')

    const [letChangePass, setLetChangePass] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

    const handleChangeEmail = (e) =>{
        setEmail(e.target.value);
        setErrMessage('');
        setErrMessagePassword('');
        setSuccessMessage('')
    }

    const handleChangePassword = (e) =>{
        setPassword(e.target.value);
        setErrMessage('');
        setErrMessagePassword('');
        setSuccessMessage('')
    }

    const handleChangeOldPassword = (e) => {
        setOldPassword(e.target.value);
        setErrMessagePassword('');
        setErrMessage('');
        setSuccessMessage('')
    }

    const unsetOnline = () => {
        var goodStatus = false;

        const formData = new FormData();
        formData.append("userId", Cookies.get('userID'));

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
                    Cookies.remove('userID'); 
                    Cookies.remove('chatId'); 
                    localStorage.removeItem('friendPage'); 
                    navigate(LOGIN_ROUTE); 
                    document.location.reload();
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    const exitAccount = () => {
        unsetOnline();
    }

    const verifyPassword = () => {

        setSuccessMessage('')
        setErrMessage('');
        setErrMessagePassword('');

        var goodStatus = false;

        const formData = new FormData();
        formData.append("userId", Cookies.get('userID'));
        formData.append("password", oldPassword);

        fetch("/checkPassword", {
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
                    console.log(data);
                    setLetChangePass(true);
                }
                else{
                    setErrMessage(data.message);
                }
                
            })
            .catch(error => {
                console.error(error);
            });
    }



    const saveSetttings = () => {

        setSuccessMessage('')
        setErrMessage('');
        setErrMessagePassword('')

        if(email == '' && password == ''){
            setErrMessage('Fill inputs to change password or/and email');
            return;
        }

        var goodStatus = false;
        var obj = {
            "userId":Cookies.get("userID"),
            "email":email,
            "password":password
        }

        fetch("/updateSettings", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(obj),
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
                    console.log(data);
                    setEmail('');
                    setPassword('');
                    setOldPassword('');
                    setErrMessage('');
                    setErrMessagePassword('');
                    setLetChangePass(false);
                    document.getElementById("passwordText").value = '';
                    document.getElementById("passwordOldText").value = '';
                    document.getElementById("emailText").value = '';
                    setSuccessMessage('Account settings updated')
                }
                else{
                    setErrMessage(data.message);
                }
                
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className='edit-profile-block gap-3 w-100'>
            <div className='page-menu-block'>
                <PageMenuBlock/>
            </div>
            <div className='edit-block d-flex flex-column gap-2 '>
                <div className='ed-block w-100 rounded-3 d-flex flex-column gap-2'>
                    <h5>
                        Settings
                    </h5>
                    <div className='el-block rounded-3 d-flex flex-column gap-2'>
                        <div className='d-flex flex-column gap-2'>
                            <div className='d-flex flex-row gap-2 align-items-center'>
                                <svg width="25" height="25" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M28 17V5C28 2.24 25.76 0 23 0H5C2.24 0 0 2.24 0 5V17C0 19.76 2.24 22 5 22H23C25.76 22 28 19.76 28 17ZM26 6.05005V17C26 18.66 24.66 20 23 20H5C3.34 20 2 18.66 2 17V6.05005L11.1899 12.3C12.8899 13.45 15.1101 13.45 16.8101 12.3L26 6.05005ZM25.75 3.80005C25.29 2.74005 24.23 2 23 2H5C3.77 2 2.71 2.74005 2.25 3.80005L12.3101 10.64C13.3301 11.34 14.6699 11.34 15.6899 10.64L25.75 3.80005Z" fill="currentColor"/>
                                </svg>
                                <h6 className='m-0'>
                                Change email
                                </h6>
                            </div>
                            <p className='fw-light m-0'>
                                Set new email
                            </p>
                            
                        </div>
                        <input className='input-field rounded-3' placeholder="Enter new email" type="text" name='emailText' onChange={handleChangeEmail} id='emailText'/>
                    </div>
                    <div className='el-block rounded-3 d-flex flex-column gap-2'>
                        <div className='d-flex flex-column gap-2'>
                            <div className='d-flex flex-row gap-2 align-items-center'>
                                <svg width="25" height="25" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M26.707 1.29055C27.098 1.68055 27.098 2.32047 26.707 2.71047L26.007 3.41054H26.013C26.033 3.43054 26.052 3.45048 26.07 3.47048L28.645 6.04055C29.035 6.43055 29.035 7.07047 28.645 7.46047C28.254 7.85047 27.621 7.85047 27.23 7.46047L24.656 4.88051L21.883 7.66054L24.457 10.2305C24.848 10.6205 24.848 11.2505 24.457 11.6405C24.067 12.0405 23.433 12.0405 23.043 11.6405L20.469 9.07045C20.448 9.05045 20.427 9.03052 20.408 9.01052L15.568 13.8505C17.076 15.4605 18 17.6205 18 20.0005C18 24.9705 13.971 29.0005 9 29.0005C4.029 29.0005 0 24.9705 0 20.0005C0 15.0305 4.029 11.0005 9 11.0005C10.868 11.0005 12.604 11.5705 14.042 12.5405L25.293 1.29055C25.683 0.900547 26.317 0.900547 26.707 1.29055ZM2 20.0005C2 16.1305 5.134 13.0005 9 13.0005C12.866 13.0005 16 16.1305 16 20.0005C16 23.8705 12.866 27.0005 9 27.0005C5.134 27.0005 2 23.8705 2 20.0005Z" fill="currentColor"/>
                                </svg>
                                <h6 className='m-0'>
                                    Change password
                                </h6>
                            </div>
                            <p className='fw-light m-0'>
                                Set new password
                            </p>
                            
                        </div>
                        <div className='d-flex flex-row gap-2 align-items-center'>
                        <input className='input-field rounded-3 dis' placeholder="Enter old password" type="password" disabled={letChangePass} name='passwordOldText' onChange={handleChangeOldPassword} id='passwordOldText'/>
                            <button className='send-button-sett dis dis' disabled={letChangePass} onClick={function(){verifyPassword()}}> Verify </button>
                        </div>
                        {errMessagePassword != '' && <p className='errMessage-p m-0'>{errMessagePassword}</p>}

                        <input className='input-field rounded-3 dis' placeholder="Enter new password" disabled={!letChangePass} type="password" name='passwordText'  onChange={handleChangePassword} id='passwordText'/>
                    </div>
                    <div className='el-block rounded-3 d-flex flex-row gap-2 align-items-center justify-content-between'>
                        <div className='d-flex flex-column gap-2 align'>
                            <div className='d-flex flex-row gap-2 align-items-center'>
                                <h6 className='m-0'>
                                    Save changes
                                </h6>
                            </div>
                            <p className='fw-light m-0'>
                                Click to save new email and password
                            </p>
                            
                        </div>
                        <button className='send-button-sett' onClick={function(){saveSetttings()}}> Save </button>
                    </div>                    
                    {errMessage != '' && <p className='errMessage-p m-0'>{errMessage}</p>}
                    {successMessage != '' && <p className='succMessage-p m-0'>{successMessage}</p>}
                    <div className='el-block rounded-3 d-flex flex-row gap-2 align-items-center justify-content-between'>
                        <div className='d-flex flex-column gap-2'>
                            <div className='d-flex flex-row gap-2 align-items-center'>
                                <svg width="25" height="25" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.00244 27C7.00244 26.45 7.45244 26 8.00244 26H23.0024C24.6624 26 26.0024 24.66 26.0024 23V5C26.0024 3.34 24.6624 2 23.0024 2H8.00244C7.45244 2 7.00244 1.55 7.00244 1C7.00244 0.45 7.45244 0 8.00244 0H23.0024C25.7624 0 28.0024 2.24 28.0024 5V23C28.0024 25.76 25.7624 28 23.0024 28H8.00244C7.45244 28 7.00244 27.55 7.00244 27Z" fill="currentColor"/>
                                    <path d="M3.4125 15.0005L7.71242 19.2905C8.10242 19.6805 8.10242 20.3205 7.71242 20.7105C7.32242 21.1005 6.6825 21.1005 6.2925 20.7105L0.2925 14.7105C-0.0975 14.3205 -0.0975 13.6805 0.2925 13.2905L6.2925 7.29055C6.6825 6.90055 7.32242 6.90055 7.71242 7.29055C8.10242 7.68055 8.10242 8.32047 7.71242 8.71047L3.4125 13.0005H21.0025C21.5525 13.0005 22.0025 13.4505 22.0025 14.0005C22.0025 14.5505 21.5525 15.0005 21.0025 15.0005H3.4125Z" fill="currentColor"/>
                                </svg>

                                <h6 className='m-0'>
                                    Exit
                                </h6>
                            </div>
                            <p className='fw-light m-0'>
                                See you later!
                            </p>
                            
                        </div>
                        <button className='send-button-sett' onClick={function(){exitAccount()}}> Exit </button>
                    </div>
                </div>
            </div>
            <div className='settings-page-block'>
                <SettingsMenuBlock/>
            </div>
        </div>
        
    );}


export default EditProfileBlock;