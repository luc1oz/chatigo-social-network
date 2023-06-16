import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RequestBlockDark.css'
import PageMenuBlock from './PageMenuBlock';
import FriendsFindBlock from './FriendsFindBlock';
import { useNavigate } from 'react-router-dom';
import { FRIENDS_ROUTE, USER_ROUTE, MESSENGER_ROUTE } from '../utils/consts';
import Cookies from 'js-cookie';

function RequestBlock(props) {

    const navigate = useNavigate();

    const [updated, setUpdated] = useState(false);

    const toChat = () => {
        var goodStatus = false;

        var obj = {
            "users": [parseInt(Cookies.get("userID")), parseInt(props.user.userId)]
        }
        
            fetch("/createChat", {
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
                    Cookies.set('chatId', data.chatId); 
                    navigate(MESSENGER_ROUTE);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    const sendRelation = async (type) => {

        var goodStatus = false;
        var obj = {
            "sendUserId": parseInt(Cookies.get("userID")),
            "getUserId": parseInt(props.user.userId),
            "type": type
        }
        if (type == 2){
            obj = {
                "sendUserId": parseInt(props.user.userId),
                "getUserId":  parseInt(Cookies.get("userID")),
                "type": type
            }
        }
        await fetch("/relation", {
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
                    setUpdated(true);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        if(updated){
            localStorage.setItem('friendPage', 2)
            window.location.reload();
        }
    }, [updated])

    const handleToUser = () => {
        navigate(USER_ROUTE, {state: {userId: props.user.userId}, replace: true})
        window.location.reload();
    }


    return (
        <div className='request-block d-flex flex-row rounded-2 align-items-center justify-content-between'>
            <div className='d-flex flex-row gap-3 click-block' onClick={handleToUser}>
                <img src={"data:image/png;base64," + props.user.userImage} alt="" className='request-block-img rounded-pill'/>
                <div>
                    <p className='m-0 fw-bold'>
                        {props.user.username + " " + props.user.userSurname} 
                    </p>
                    <p className='m-0'>
                        {props.user.online == 1 ? "online" : "offline"}
                    </p>
                </div>
            </div>
            <div className='d-flex flex-row gap-3'>
                <button className='message-friend-button d-flex flex-row justify-content-center align-items-center' onClick={function(){toChat()}}>
                    <svg width="25" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14 0C6.27 0 0 6.23005 0 13.9301C0 21.6201 6.20996 28 13.96 28H27C27.33 28 27.6299 27.8399 27.8199 27.5699C28.0099 27.2999 28.0499 26.96 27.9399 26.66L25.9399 21.21C27.2499 19.09 28 16.6001 28 13.9301C28 6.23005 21.73 0 14 0ZM2 13.9301C2 7.35005 7.37 2 14 2C20.63 2 26 7.35005 26 13.9301C26 16.3701 25.26 18.64 24 20.53C23.82 20.8 23.78 21.1301 23.89 21.4301L25.5699 26H13.96C7.33996 26 2 20.5401 2 13.9301Z" fill="currentColor"/>
                    </svg>
                </button>
                <button className='add-friend-button d-flex flex-row justify-content-center align-items-center' onClick={function(){sendRelation(2)}}>
                    <svg width="25" height="25" viewBox="0 0 21 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.1761 26.3706C14.9265 26.3706 14.6768 26.2787 14.4797 26.0816L12.4826 24.0844C12.1015 23.7034 12.1015 23.0727 12.4826 22.6916C12.8636 22.3106 13.4943 22.3106 13.8753 22.6916L15.1761 23.9924L18.4741 20.6945C18.8551 20.3134 19.4858 20.3134 19.8668 20.6945C20.2479 21.0755 20.2479 21.7062 19.8668 22.0872L15.8725 26.0816C15.6754 26.2787 15.4258 26.3706 15.1761 26.3706Z" fill="currentColor"/>
                        <path d="M10.183 13.6254C10.1436 13.6254 10.1173 13.6254 10.0779 13.6254C10.0122 13.6123 9.92022 13.6123 9.84138 13.6254C6.031 13.5072 3.1535 10.5114 3.1535 6.81928C3.14036 5.00606 3.84988 3.29796 5.13753 2.01031C6.42518 0.722659 8.13328 0 9.95964 0C13.7175 0 16.7789 3.06145 16.7789 6.81928C16.7789 10.5114 13.9014 13.494 10.2224 13.6254C10.2093 13.6254 10.1961 13.6254 10.183 13.6254ZM9.95964 1.97089C8.65885 1.97089 7.45004 2.48332 6.53029 3.38993C5.62368 4.30968 5.12439 5.51849 5.12439 6.80614C5.12439 9.43399 7.17411 11.5626 9.78883 11.6414C9.86766 11.6282 10.0385 11.6282 10.2093 11.6414C12.7977 11.5231 14.808 9.40771 14.808 6.80614C14.808 4.15201 12.6269 1.97089 9.95964 1.97089Z" fill="currentColor"/>
                        <path d="M9.95956 28C7.27915 28 4.74327 27.3036 2.82494 26.016C0.998584 24.794 0 23.1253 0 21.3253C0 19.5252 1.01172 17.8696 2.82494 16.6608C6.75358 14.033 13.1393 14.033 17.0679 16.6608C17.5146 16.963 17.646 17.5806 17.3438 18.0273C17.0416 18.4872 16.4241 18.6054 15.9773 18.3032C12.7057 16.1221 7.18718 16.1221 3.9155 18.3032C2.65413 19.1442 1.97089 20.2084 1.97089 21.3253C1.97089 22.4421 2.65413 23.5327 3.9155 24.3736C5.50535 25.4379 7.64705 26.016 9.94642 26.016C10.4851 26.016 10.9319 26.4627 10.9319 27.0014C10.9319 27.5401 10.4983 28 9.95956 28Z" fill="currentColor"/>
                    </svg>
                </button>
                <button className='ignore-friend-button d-flex flex-row justify-content-center align-items-center' onClick={function(){sendRelation(3)}}>
                    <svg width="25" height="25" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.6764 26.8169C14.4267 26.8169 14.1771 26.7249 13.98 26.5279C13.599 26.1468 13.599 25.5161 13.98 25.1351L17.6853 21.4298C18.0663 21.0488 18.697 21.0488 19.078 21.4298C19.4591 21.8109 19.4591 22.4415 19.078 22.8226L15.3728 26.5279C15.1757 26.7249 14.926 26.8169 14.6764 26.8169Z" fill="currentColor"/>
                        <path d="M18.3816 26.8169C18.132 26.8169 17.8824 26.7249 17.6853 26.5279L13.98 22.8226C13.599 22.4415 13.599 21.8109 13.98 21.4298C14.361 21.0488 14.9917 21.0488 15.3728 21.4298L19.078 25.1351C19.4591 25.5161 19.4591 26.1468 19.078 26.5279C18.8809 26.7249 18.6313 26.8169 18.3816 26.8169Z" fill="currentColor"/>
                        <path d="M10.17 13.6254C10.1306 13.6254 10.1043 13.6254 10.0649 13.6254C9.9992 13.6123 9.90722 13.6123 9.82839 13.6254C6.018 13.5072 3.1405 10.5114 3.1405 6.81928C3.1405 3.06145 6.20195 0 9.95978 0C13.7176 0 16.7791 3.06145 16.7791 6.81928C16.7659 10.5114 13.8753 13.5072 10.2094 13.6254C10.1963 13.6254 10.1831 13.6254 10.17 13.6254ZM9.95978 1.97089C7.29251 1.97089 5.11139 4.15201 5.11139 6.81928C5.11139 9.44713 7.16112 11.5626 9.77583 11.6545C9.85467 11.6414 10.0255 11.6414 10.1963 11.6545C12.7716 11.5363 14.795 9.42085 14.8082 6.81928C14.8082 4.15201 12.6271 1.97089 9.95978 1.97089Z" fill="currentColor"/>
                        <path d="M9.95956 28C7.27915 28 4.74327 27.3036 2.82494 26.016C0.998584 24.794 0 23.1253 0 21.3253C0 19.5252 1.01172 17.8696 2.82494 16.6608C6.75358 14.033 13.1393 14.033 17.0679 16.6608C17.5146 16.963 17.646 17.5806 17.3438 18.0273C17.0416 18.4872 16.4241 18.6054 15.9773 18.3032C12.7057 16.1221 7.18718 16.1221 3.9155 18.3032C2.65413 19.1442 1.97089 20.2084 1.97089 21.3253C1.97089 22.4421 2.66727 23.5327 3.9155 24.3736C5.50535 25.4379 7.64705 26.016 9.94642 26.016C10.4851 26.016 10.9319 26.4627 10.9319 27.0014C10.9319 27.5401 10.4983 28 9.95956 28Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
        </div>
        
    );
}

export default RequestBlock;