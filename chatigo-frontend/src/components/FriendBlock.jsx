import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FriendBlockDark.css'
import PageMenuBlock from './PageMenuBlock';
import FriendsFindBlock from './FriendsFindBlock';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { USER_ROUTE, MESSENGER_ROUTE } from '../utils/consts';

function FriendBlock(props) {

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
                    setUpdated(true)
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        if(updated){
            if(props.type == 0){
                localStorage.setItem('friendPage', 0)
            }
            else{
                localStorage.setItem('friendPage', 1)
                
            }
            window.location.reload();
        }
    }, [updated])

    const handleToUser = () => {
        navigate(USER_ROUTE, {state: {userId: props.user.userId}, replace: true})
        window.location.reload();
    }

    return (
        <div className='friend-block d-flex flex-row rounded-2 align-items-center justify-content-between'>
            <div className='d-flex flex-row gap-3 click-block' onClick={handleToUser}>
                <img src={"data:image/png;base64," + props.user.userImage} alt="" className='friend-block-img rounded-pill'/>
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
                <button className='delete-friend-button d-flex flex-row justify-content-center align-items-center' onClick={function() {sendRelation(3)}}>
                    <svg width="25" height="25" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.0173 16.028C8.59914 16.028 5.0033 12.4322 5.0033 8.014C5.0033 3.59585 8.59914 0 13.0173 0C17.4354 0 21.0313 3.59585 21.0313 8.014C21.0313 12.4322 17.4354 16.028 13.0173 16.028ZM13.0173 2.09061C9.75595 2.09061 7.0939 4.75265 7.0939 8.014C7.0939 11.2753 9.75595 13.9374 13.0173 13.9374C16.2786 13.9374 18.9407 11.2753 18.9407 8.014C18.9407 4.75265 16.2786 2.09061 13.0173 2.09061Z" fill="currentColor"/>
                        <path d="M1.0453 29.9654C0.473871 29.9654 0 29.4916 0 28.9201C0 22.9689 5.83976 18.1187 13.0175 18.1187C14.4252 18.1187 15.805 18.2999 17.143 18.6762C17.7005 18.8295 18.0211 19.4009 17.8677 19.9584C17.7144 20.5159 17.143 20.8365 16.5855 20.6832C15.4426 20.3626 14.244 20.2093 13.0175 20.2093C6.99656 20.2093 2.09061 24.1117 2.09061 28.9201C2.09061 29.4916 1.61674 29.9654 1.0453 29.9654Z" fill="currentColor"/>
                        <path d="M21.3798 29.9656C19.7352 29.9656 18.1742 29.3524 16.9616 28.2513C16.4738 27.8332 16.0418 27.3175 15.7073 26.7461C15.094 25.7426 14.7595 24.5579 14.7595 23.3454C14.7595 21.6032 15.4285 19.9725 16.6271 18.7321C17.8815 17.4359 19.5679 16.7251 21.3798 16.7251C23.2753 16.7251 25.0732 17.5335 26.2997 18.9272C27.3868 20.1398 28 21.7007 28 23.3454C28 23.875 27.9304 24.4046 27.791 24.9063C27.6516 25.5335 27.3868 26.1886 27.0244 26.76C25.8676 28.7391 23.6934 29.9656 21.3798 29.9656ZM21.3798 18.8157C20.1394 18.8157 18.9965 19.3035 18.1324 20.1815C17.3101 21.0317 16.8501 22.1467 16.8501 23.3454C16.8501 24.1677 17.0731 24.976 17.5052 25.6729C17.7282 26.0631 18.0209 26.4115 18.3553 26.7042C19.1916 27.4708 20.2648 27.889 21.3798 27.889C22.9547 27.889 24.446 27.0527 25.2544 25.7008C25.4913 25.3105 25.6725 24.8646 25.7701 24.4325C25.8676 24.0701 25.9094 23.7217 25.9094 23.3593C25.9094 22.2443 25.4913 21.1712 24.7387 20.3349C23.9025 19.3593 22.676 18.8157 21.3798 18.8157Z" fill="currentColor"/>
                        <path d="M19.8743 25.8536C19.6095 25.8536 19.3447 25.7561 19.1357 25.547C18.7315 25.1429 18.7315 24.4739 19.1357 24.0697L22.0764 21.1288C22.4806 20.7246 23.1496 20.7246 23.5538 21.1288C23.958 21.533 23.958 22.202 23.5538 22.6062L20.613 25.547C20.404 25.7561 20.1391 25.8536 19.8743 25.8536Z" fill="currentColor"/>
                        <path d="M22.8572 25.8814C22.5924 25.8814 22.3276 25.7838 22.1185 25.5748L19.1778 22.634C18.7736 22.2298 18.7736 21.5608 19.1778 21.1567C19.582 20.7525 20.2509 20.7525 20.6551 21.1567L23.5959 24.0974C24.0001 24.5016 24.0001 25.1706 23.5959 25.5748C23.3868 25.7838 23.122 25.8814 22.8572 25.8814Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
        </div>
        
    );
}

export default FriendBlock;