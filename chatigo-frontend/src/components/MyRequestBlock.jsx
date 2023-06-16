import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RequestBlockDark.css'
import PageMenuBlock from './PageMenuBlock';
import FriendsFindBlock from './FriendsFindBlock';
import { useNavigate } from 'react-router-dom';
import { FRIENDS_ROUTE, USER_ROUTE, MESSENGER_ROUTE } from '../utils/consts';
import Cookies from 'js-cookie';

function MyRequestBlock(props) {

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
            <div className=' d-flex flex-row gap-3'>
                <button className='message-friend-button d-flex flex-row justify-content-center align-items-center' onClick={function(){toChat()}}>
                    <svg width="25" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14 0C6.27 0 0 6.23005 0 13.9301C0 21.6201 6.20996 28 13.96 28H27C27.33 28 27.6299 27.8399 27.8199 27.5699C28.0099 27.2999 28.0499 26.96 27.9399 26.66L25.9399 21.21C27.2499 19.09 28 16.6001 28 13.9301C28 6.23005 21.73 0 14 0ZM2 13.9301C2 7.35005 7.37 2 14 2C20.63 2 26 7.35005 26 13.9301C26 16.3701 25.26 18.64 24 20.53C23.82 20.8 23.78 21.1301 23.89 21.4301L25.5699 26H13.96C7.33996 26 2 20.5401 2 13.9301Z" fill="currentColor"/>
                    </svg>
                </button>
                <button className='ignore-friend-button d-flex flex-row justify-content-center align-items-center' onClick={function(){sendRelation(3)}}>
                    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.5 19.75H15.5C15.09 19.75 14.75 19.41 14.75 19C14.75 18.59 15.09 18.25 15.5 18.25H19.5C19.91 18.25 20.25 18.59 20.25 19C20.25 19.41 19.91 19.75 19.5 19.75Z" fill="currentColor"/>
                        <path d="M12.1503 11.62C12.1203 11.62 12.1003 11.62 12.0703 11.62C12.0103 11.61 11.9503 11.62 11.8903 11.62C8.99029 11.53 6.80029 9.25 6.80029 6.44C6.80029 3.58 9.13029 1.25 11.9903 1.25C14.8503 1.25 17.1803 3.58 17.1803 6.44C17.1703 9.25 14.9703 11.53 12.1803 11.62C12.1703 11.62 12.1603 11.62 12.1503 11.62ZM11.9903 2.75C9.96029 2.75 8.30029 4.41 8.30029 6.44C8.30029 8.44 9.86029 10.05 11.8503 10.12C11.9103 10.11 12.0403 10.11 12.1703 10.12C14.1303 10.03 15.6703 8.42 15.6803 6.44C15.6803 4.41 14.0203 2.75 11.9903 2.75Z" fill="currentColor"/>
                        <path d="M11.9902 22.5602C9.95016 22.5602 8.02016 22.0302 6.56016 21.0502C5.17016 20.1202 4.41016 18.8502 4.41016 17.4802C4.41016 16.1102 5.18016 14.8502 6.56016 13.9302C9.55016 11.9302 14.4102 11.9302 17.4002 13.9302C17.7402 14.1602 17.8402 14.6302 17.6102 14.9702C17.3802 15.3202 16.9102 15.4102 16.5702 15.1802C14.0802 13.5202 9.88016 13.5202 7.39016 15.1802C6.43016 15.8202 5.91016 16.6302 5.91016 17.4802C5.91016 18.3302 6.43016 19.1602 7.39016 19.8002C8.60016 20.6102 10.2302 21.0502 11.9802 21.0502C12.3902 21.0502 12.7302 21.3902 12.7302 21.8002C12.7302 22.2102 12.4002 22.5602 11.9902 22.5602Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
        </div>
        
    );
}

export default MyRequestBlock;