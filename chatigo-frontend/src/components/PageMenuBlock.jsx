import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PageMenuBlockDark.css';
import { Navigate } from 'react-router-dom';
import { CHATS_ROUTE, FRIENDS_ROUTE, NEWS_ROUTE, USER_ROUTE } from '../utils/consts';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function PageMenuBlock() {

    const [countNotifChats, setCountNotifChats] = useState(0)

    const [countNotifFriends, setCountNotifFriends] = useState(0)

    useEffect(() => {   
        loadNotifications();
    },[])

    const loadNotifications = () => {
        const formData = new FormData();
        formData.append("userId", Cookies.get('userID'));
        var goodStatus = false;

        fetch("/getNotifications", {
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
                    setCountNotifChats(data.messages)
                    setCountNotifFriends(data.friends)
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    let navigate = useNavigate();

    const toUserPage = () => {
        navigate(USER_ROUTE, {state: {userId: Cookies.get("userID")}, replace: true})
        window.location.reload();
    }

    const toUserChats = () => {
        navigate(CHATS_ROUTE);
        window.location.reload();
    }

    const toUserFriends = () => {
        if(!localStorage.getItem('friendPage')){
            localStorage.setItem('friendPage', 0);
        }
        navigate(FRIENDS_ROUTE)
        window.location.reload();
    }

    const toUserNews = () =>{
        navigate(NEWS_ROUTE)
        window.location.reload();
    }

    return (
        <div className='menu-block gap-2'>
            <button className='menu-button rounded-3' onClick={toUserPage}> 
                <div className='d-flex flex-row gap-3'>
                    <svg width="25" height="25" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 0C9.134 0 6 3.134 6 7C6 10.866 9.134 14 13 14C16.866 14 20 10.866 20 7C20 3.134 16.866 0 13 0ZM8 7C8 4.239 10.239 2 13 2C15.761 2 18 4.239 18 7C18 9.761 15.761 12 13 12C10.239 12 8 9.761 8 7Z" fill="currentColor"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.6042 16C3.2842 16 1.95819 16.661 1.31819 17.952C0.794186 19.008 0.153194 20.578 0.0131936 22.202C-0.0898064 23.404 0.410184 24.642 1.51618 25.33C3.26718 26.417 6.87519 28 13.0002 28C19.1252 28 22.7332 26.417 24.4842 25.33C25.5902 24.642 26.0902 23.404 25.9872 22.202C25.8472 20.578 25.2062 19.008 24.6822 17.952C24.0422 16.661 22.7162 16 21.3962 16H4.6042ZM3.11018 18.84C3.36018 18.335 3.9192 18 4.6042 18H21.3962C22.0812 18 22.6402 18.335 22.8902 18.84C23.3702 19.808 23.8862 21.115 23.9942 22.373C24.0422 22.932 23.8092 23.394 23.4292 23.631C22.0022 24.517 18.7612 26 13.0002 26C7.23919 26 3.99821 24.517 2.57121 23.631C2.19121 23.394 1.95821 22.932 2.00621 22.373C2.11421 21.115 2.63018 19.808 3.11018 18.84Z" fill="currentColor"/>
                    </svg>
                    <p className='m-0 menu-button-text'>
                        My page
                    </p>
                </div>
            </button>
            <button className='menu-button rounded-3' onClick={toUserFriends}> 
                <div className='d-flex flex-row gap-3'>
                    <svg width="25" height="25" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.70039 14C9.66281 14 9.63777 14 9.60019 14C9.53757 13.9865 9.4499 13.9865 9.37476 14C5.74277 13.8785 3 10.8004 3 7.00675C3 3.14561 5.91811 0 9.5 0C13.0819 0 16 3.14561 16 7.00675C15.9875 10.8004 13.2322 13.8785 9.73796 14C9.72543 14 9.71291 14 9.70039 14ZM9.5 2.02507C6.95761 2.02507 4.87861 4.26615 4.87861 7.00675C4.87861 9.70685 6.83237 11.8804 9.32466 11.9749C9.39981 11.9614 9.56262 11.9614 9.72543 11.9749C12.1802 11.8534 14.1089 9.67985 14.1214 7.00675C14.1214 4.26615 12.0424 2.02507 9.5 2.02507Z" fill="currentColor"/>
                        <path d="M19.1379 14C19.1025 14 19.0671 14 19.0316 13.9871C18.5478 14.0388 18.0521 13.6635 18.0049 13.1329C17.9577 12.6024 18.2528 12.1235 18.7366 12.0588C18.8782 12.0459 19.0316 12.0459 19.1615 12.0459C20.8845 11.9424 22.2298 10.3894 22.2298 8.48706C22.2298 6.52 20.7782 4.92824 18.9844 4.92824C18.5006 4.94118 18.0993 4.50118 18.0993 3.97059C18.0993 3.44 18.5006 3 18.9844 3C21.7459 3 24 5.47176 24 8.5C24 11.4765 21.8758 13.8835 19.1733 14C19.1615 14 19.1497 14 19.1379 14Z" fill="currentColor"/>
                        <path d="M9.5 28C7.04029 28 4.56803 27.3572 2.69815 26.0717C0.953765 24.889 0 23.2692 0 21.508C0 19.7468 0.953765 18.1142 2.69815 16.9187C6.46301 14.3604 12.5621 14.3604 16.3019 16.9187C18.0337 18.1014 19 19.7211 19 21.4823C19 23.2435 18.0462 24.8761 16.3019 26.0717C14.4194 27.3572 11.9597 28 9.5 28ZM3.73976 18.5384C2.53501 19.3612 1.88243 20.4153 1.88243 21.5209C1.88243 22.6136 2.54756 23.6677 3.73976 24.4776C6.8646 26.6245 12.1354 26.6245 15.2602 24.4776C16.465 23.6549 17.1176 22.6007 17.1176 21.4952C17.1176 20.4025 16.4524 19.3483 15.2602 18.5384C12.1354 16.4044 6.8646 16.4044 3.73976 18.5384Z" fill="currentColor"/>
                        <path d="M20.9638 26C20.5107 26 20.1093 25.6803 20.0187 25.2008C19.9152 24.6547 20.2518 24.1353 20.7696 24.0154C21.5852 23.8423 22.3361 23.5093 22.9187 23.0431C23.6567 22.4704 24.058 21.7511 24.058 20.9919C24.058 20.2327 23.6567 19.5134 22.9317 18.954C22.362 18.5012 21.65 18.1815 20.8085 17.9817C20.2906 17.8618 19.954 17.3291 20.0705 16.783C20.187 16.2502 20.7049 15.9039 21.2357 16.0238C22.3491 16.2768 23.3201 16.7297 24.1098 17.3557C25.3138 18.2881 26 19.6067 26 20.9919C26 22.3771 25.3009 23.6957 24.0969 24.6414C23.2942 25.2808 22.2844 25.7469 21.171 25.9734C21.0933 26 21.0285 26 20.9638 26Z" fill="currentColor"/>
                    </svg>
                    <p className='m-0 menu-button-text'>
                        Friends
                    </p>
                    {(countNotifFriends !== 0) ?
                    <>
                        <div className='notification rounded-pill d-flex flex-row justify-content-center align-items-center'>
                            <p className='m-0'> {countNotifFriends} </p>
                        </div>
                    </>
                    : <></>}
                </div>
            </button>
            <button className='menu-button rounded-3' onClick={toUserNews}> 
                <div className='d-flex flex-row gap-3'>
                    <svg width="25" height="25" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.6271 25.1723C17.3126 25.1723 16.9861 25.1586 16.6353 25.1177C16.0064 25.063 15.2929 24.9264 14.5551 24.7215L12.5233 24.1752C6.94779 22.6863 5.12155 19.3534 6.42773 13.0701L7.61297 7.34678C7.87905 6.04913 8.1935 4.99736 8.58052 4.12316C10.6607 -0.725928 14.6398 -0.288828 17.4698 0.462439L19.4896 0.995156C22.3197 1.74642 24.1096 2.93479 25.1135 4.75149C26.1052 6.56819 26.2624 8.90395 25.5972 12.1002L24.412 17.8099C23.3719 22.8092 21.207 25.1723 17.6271 25.1723ZM14.3737 2.04693C12.3539 2.04693 11.0719 2.98943 10.2133 5.01102C9.8988 5.74863 9.62063 6.66381 9.37874 7.81119L8.1935 13.5345C7.11711 18.6977 8.36282 20.9515 12.9345 22.1809L14.9663 22.7273C15.6194 22.9048 16.2362 23.0141 16.7926 23.0687C20.0822 23.4375 21.7149 21.8121 22.6341 17.3455L23.8194 11.6358C24.3636 8.99956 24.291 7.15554 23.5654 5.83058C22.8397 4.50562 21.4126 3.6041 19.0663 2.98943L17.0465 2.45671C16.0427 2.18352 15.1477 2.04693 14.3737 2.04693Z" fill="currentColor"/>
                        <path d="M8.58055 28C5.47232 28 3.48885 25.8965 2.21894 21.4572L0.670872 16.0617C-1.04652 10.0516 0.489457 6.66404 5.78677 4.72441L7.69767 4.02778C8.32657 3.80923 8.79825 3.65897 9.22155 3.57702C9.57229 3.49506 9.91093 3.64531 10.1165 3.95948C10.3221 4.27365 10.3584 4.68343 10.2133 5.03857C9.89884 5.76252 9.62067 6.6777 9.39087 7.82509L8.20563 13.5484C7.12924 18.7116 8.37495 20.9654 12.9466 22.1948L14.9784 22.7412C15.6315 22.9187 16.2484 23.028 16.8047 23.0826C17.1917 23.1236 17.5062 23.4241 17.615 23.8476C17.7118 24.271 17.5666 24.7081 17.2522 24.954C16.454 25.5686 15.4501 26.0877 14.1802 26.5521L12.2693 27.2624C10.8785 27.7541 9.66904 28 8.58055 28ZM7.91537 6.10401L6.3552 6.6777C2.03753 8.24853 1.00951 10.5433 2.40036 15.4334L3.94843 20.8288C5.35137 25.7052 7.38322 26.8799 11.7009 25.3091L13.6118 24.5988C13.6844 24.5715 13.7448 24.5442 13.8174 24.5169L12.5354 24.1754C6.95992 22.6865 5.13367 19.3536 6.43986 13.0703L7.6251 7.34701C7.70976 6.90991 7.80652 6.48647 7.91537 6.10401Z" fill="currentColor"/>
                        <path d="M19.6589 11.9634C19.5863 11.9634 19.5137 11.9497 19.4291 11.9361L13.5633 10.256C13.0795 10.1194 12.7893 9.55933 12.9102 9.01296C13.0312 8.46658 13.527 8.13875 14.0108 8.27535L19.8766 9.95545C20.3603 10.092 20.6506 10.6521 20.5296 11.1985C20.4329 11.6492 20.058 11.9634 19.6589 11.9634Z" fill="currentColor"/>
                        <path d="M16.1153 16.5805C16.0427 16.5805 15.9702 16.5668 15.8855 16.5531L12.3661 15.5423C11.8823 15.4057 11.592 14.8457 11.713 14.2993C11.8339 13.753 12.3298 13.4251 12.8135 13.5617L16.333 14.5725C16.8168 14.7091 17.107 15.2691 16.9861 15.8155C16.8893 16.2799 16.5265 16.5805 16.1153 16.5805Z" fill="currentColor   "/>
                    </svg>
                    <p className='m-0 menu-button-text'>
                        News
                    </p>
                </div>
            </button>
            <button className='menu-button rounded-3' onClick={toUserChats}> 
                <div className='d-flex flex-row gap-3 align-items-center '>
                    <svg width="25" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12C9 11.45 9.45 11 10 11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13H10C9.45 13 9 12.55 9 12Z" fill="currentColor"/>
                        <path d="M10 16C9.45 16 9 16.45 9 17C9 17.55 9.45 18 10 18H14C14.55 18 15 17.55 15 17C15 16.45 14.55 16 14 16H10Z" fill="currentColor"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14 0C6.27 0 0 6.23005 0 13.9301C0 21.6201 6.20996 28 13.96 28H27C27.33 28 27.6299 27.8399 27.8199 27.5699C28.0099 27.2999 28.0499 26.96 27.9399 26.66L25.9399 21.21C27.2499 19.09 28 16.6001 28 13.9301C28 6.23005 21.73 0 14 0ZM2 13.9301C2 7.35005 7.37 2 14 2C20.63 2 26 7.35005 26 13.9301C26 16.3701 25.26 18.64 24 20.53C23.82 20.8 23.78 21.1301 23.89 21.4301L25.5699 26H13.96C7.33996 26 2 20.5401 2 13.9301Z" fill="currentColor"/>
                    </svg>
                    <p className='m-0 menu-button-text'>
                        Messenger
                    </p>
                    {(countNotifChats !== 0) ?
                    <>
                        <div className='notification rounded-pill d-flex flex-row justify-content-center align-items-center'>
                            <p className='m-0'> {countNotifChats} </p>
                        </div>
                    </>
                    : <></>}
                </div>
            </button>   
        </div>
    );
}

export default PageMenuBlock;