import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MessengerChatBlockDark.css'
import PageMenuBlock from './PageMenuBlock';
import FriendsFindBlock from './FriendsFindBlock';
import AllFriendsBlock from './AllFriendsBlock';
import OnlineFriendsBlock from './OnlineFriendsBlock';
import AllUsersBlock from './AllUsersBlock';
import MessageBlock from './MessageBlock';
import MessageNotViewedBlock from './MessageNotViewedBlock';
import Cookies from 'js-cookie';
import SockJS from "sockjs-client"
import Stomp from 'stompjs'
import { useNavigate } from 'react-router-dom';
import { CHATS_ROUTE, MESSENGER_ROUTE } from '../utils/consts';

function MessengerChatBlock() {

    var stompClient;

    const navigate = useNavigate();

    const [isConnected, setIsConnected] = useState(false);

    const [loaded, setLoaded] = useState(false);

    const [messagesToShow, setMessagesToShow] = useState([]);
    
    const [info, setInfo] = useState({});

    const [messageImage, setMessageImage] = useState();
    const [messageImageToSend, setMessageImageToSend] = useState('');
    const [inImage, setInImage] = useState(false);

    const [text, setText] = useState('');
    const [inText, setInText] = useState(false);

    const myRef = useRef(null);

    const executeScroll = () => myRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })  

    const getUserInfo = () => {

        var goodStatus = false;

        const formData = new FormData();
        formData.append("userId", Cookies.get("userID"));
        formData.append("chatId", Cookies.get("chatId"));
        
        fetch("/getChatInfo", {
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
                setInfo(data.info)
            }
        })
        .catch(error => {
            console.error(error);
        });

    }

    const [conn, setConn] = useState(null)
    const [sub, setSub] = useState(null);

    const scrollToBottom = () => {
        myRef.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    const getMessages = () => {

        var obj = {
            "chatId" : Cookies.get("chatId"),
            "userId" : Cookies.get("userID"),
            "text" : ''
        }

        if(sub !== null){
            conn.send("/app/read-message",{}, JSON.stringify(obj));
        }

        var goodStatus = false;

        const formData = new FormData();
        formData.append("chatId", Cookies.get("chatId"));
        formData.append("userId", Cookies.get("userID"));
        
        fetch("/getMessages", {
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
                setMessagesToShow(data.messages);
            }
        })
        .catch(error => {
            console.error(error);
        });
    }


    useEffect(() => {

        getUserInfo();
        if(sub !== null){
            getMessages();
        }
        
        if(sub === null){
            connect();
        }
    },[sub])



    const connect = () => {

        const socket = SockJS("/messenger");
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            setConn(stompClient);
            console.log(stompClient.status)
            setSub(stompClient.subscribe("/chat/" + Cookies.get('chatId') + "/message" , function (message) {
                
                var data = JSON.parse(message.body)
                console.log(data)
                    if(data.notificationType == 1 || (Cookies.get('userID') != data.userId && data.notificationType == 0)){
                        getMessages();
                    }
                }))
        });
        
    };
    
    const subscribe = () => {
        console.log("123")
        
    }

    useEffect(() => {
        myRef.current?.scrollIntoView();
    },[messagesToShow])

    const handleImage = (e) =>{
        
        e.preventDefault();
        if(e.target.files[0]){
            setMessageImageToSend(e.target.files[0]);
            console.log(messageImageToSend);

            var fr = new FileReader();
            fr.onload = function () {
                setMessageImage(fr.result);
            }
            fr.readAsDataURL(e.target.files[0]);
            
            if(e.target.value == ''){
                setInImage(false);
            }
            else{
                setInImage(true);
            }
        }
    }

    const handleClearAfterSend = () => {
        setText('');
        setInText(false);
        document.getElementById('messageSend').value = '';
    }

    const handleDeleteImg = () => {
        setMessageImage('');
        setMessageImageToSend(null);
        setInImage(false);
        document.getElementById("fileInputMessage").value = '';
    }

    const handleText = (e) =>{
        
        setText(e.target.value)
        if(e.target.value == ''){
            setInText(false);
        }
        else{
            setInText(true);
        }
        
    }

    const sendMessage = () =>{
        
        var goodStatus = false;

        const formData = new FormData();
        formData.append("chatId", Cookies.get("chatId"));
        formData.append("userId", Cookies.get("userID"));
        formData.append("text", text);
        formData.append("file", messageImageToSend);

        fetch("/createMessage", {
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
                    handleDeleteImg();
                    handleClearAfterSend();
                    
                    var obj = {
                        "chatId" : Cookies.get("chatId"),
                        "userId" : Cookies.get("userID"),
                        "text" : text
                    }

                    conn.send("/app/chat-message",{}, JSON.stringify(obj));

                }
            })
            .catch(error => {
                console.error(error);
            });


        
        

    }

    return (
        <div className='d-flex flex-column current-chat-block gap-2 rounded-3'>
            <div className='chat-header-block rounded-3 d-flex flex-row align-items-center justify-content-between'>
                <button className='chat-back-button d-flex flex-row justify-content-center align-items-center' onClick={function(){navigate(CHATS_ROUTE); window.location.reload();}}>
                    <svg width="20" height="20" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.2925 13.2933C-0.0975 13.6833 -0.0975 14.3172 0.2925 14.7072L13.2925 27.7072C13.6825 28.0982 14.3224 28.0982 14.7124 27.7072C15.1024 27.3172 15.1024 26.6832 14.7124 26.2932L2.41237 14.0002L14.7124 1.70719C15.1024 1.31719 15.1024 0.68325 14.7124 0.29325C14.3224 -0.09775 13.6825 -0.09775 13.2925 0.29325L0.2925 13.2933Z" fill="currentColor"/>
                    </svg>
                </button>
                <div className='d-flex flex-column align-items-center'>
                    <p className='m-0 fw-bold'>
                        {info.chatName}
                    </p>
                    <p className='m-0'>
                        {info.online != -1 && '' || info.online == 1 && 'online' ||  info.online == 0 && 'offline'}
                    </p>
                </div>
                <img src={"data:image/png;base64," + info.chatImage} className='chat-header-img rounded-pill' alt='egor'></img>
            </div>
            {sub !== null ? <div id='scroll-block' className='flex-grow-1 d-flex flex-column gap-1 chat-messages-block'>
               

                {messagesToShow.map((message) => {
                    if(message.messageType == 1){
                        return <MessageBlock
                                messageId={message.messageId}
                                messageText={message.messageText}
                                messageImage={message.messageImage}
                                messageDate={message.messageDate}
                                userId={message.userId}
                                userName={message.userName}
                                userImage={message.userImage}
                                />
                    }
                    else{
                        return <MessageNotViewedBlock
                                messageId={message.messageId}
                                messageText={message.messageText}
                                messageImage={message.messageImage}
                                messageDate={message.messageDate}
                                userId={message.userId}
                                userName={message.userName}
                                userImage={message.userImage}/>
                    }
                })}
                
                <div ref={myRef}>

                </div>
            </div> : 
            <div className='flex-grow-1 d-flex flex-column justify-content-center align-items-center load-block'>
                 <h5> Loading chat... </h5>
            </div>}
            <div className='d-flex flex-column w-100 gap-2'>
                {(inImage) && <div className='message-img-block'>
                    <img src={messageImage} alt="" className='rounded-3 img-to-send align-self-start'/>
                    <button className='delete-button-file d-flex flex-row justify-content-center align-items-center' onClick={handleDeleteImg}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 6.72998C20.98 6.72998 20.95 6.72998 20.92 6.72998C15.63 6.19998 10.35 5.99998 5.12001 6.52998L3.08001 6.72998C2.66001 6.76998 2.29001 6.46998 2.25001 6.04998C2.21001 5.62998 2.51001 5.26998 2.92001 5.22998L4.96001 5.02998C10.28 4.48998 15.67 4.69998 21.07 5.22998C21.48 5.26998 21.78 5.63998 21.74 6.04998C21.71 6.43998 21.38 6.72998 21 6.72998Z" fill="currentColor"/>
                            <path d="M8.50001 5.72C8.46001 5.72 8.42001 5.72 8.37001 5.71C7.97001 5.64 7.69001 5.25 7.76001 4.85L7.98001 3.54C8.14001 2.58 8.36001 1.25 10.69 1.25H13.31C15.65 1.25 15.87 2.63 16.02 3.55L16.24 4.85C16.31 5.26 16.03 5.65 15.63 5.71C15.22 5.78 14.83 5.5 14.77 5.1L14.55 3.8C14.41 2.93 14.38 2.76 13.32 2.76H10.7C9.64001 2.76 9.62001 2.9 9.47001 3.79L9.24001 5.09C9.18001 5.46 8.86001 5.72 8.50001 5.72Z" fill="currentColor"/>
                            <path d="M15.21 22.7501H8.78999C5.29999 22.7501 5.15999 20.8201 5.04999 19.2601L4.39999 9.19007C4.36999 8.78007 4.68999 8.42008 5.09999 8.39008C5.51999 8.37008 5.86999 8.68008 5.89999 9.09008L6.54999 19.1601C6.65999 20.6801 6.69999 21.2501 8.78999 21.2501H15.21C17.31 21.2501 17.35 20.6801 17.45 19.1601L18.1 9.09008C18.13 8.68008 18.49 8.37008 18.9 8.39008C19.31 8.42008 19.63 8.77007 19.6 9.19007L18.95 19.2601C18.84 20.8201 18.7 22.7501 15.21 22.7501Z" fill="currentColor"/>
                            <path d="M13.66 17.25H10.33C9.91999 17.25 9.57999 16.91 9.57999 16.5C9.57999 16.09 9.91999 15.75 10.33 15.75H13.66C14.07 15.75 14.41 16.09 14.41 16.5C14.41 16.91 14.07 17.25 13.66 17.25Z" fill="currentColor"/>
                            <path d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z" fill="currentColor"/>
                        </svg>
                    </button>
                </div>}
                <div className='d-flex flex-row gap-2'>
                <label className='send-button-file d-flex flex-row justify-content-center align-items-center'>
                    <svg width="30" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 2C3.343 2 2 3.343 2 5V16.586L6.29303 12.293C6.68303 11.902 7.31697 11.902 7.70697 12.293L15.5 20.086L20.293 15.293C20.683 14.902 21.317 14.902 21.707 15.293L26 19.586V5C26 3.343 24.657 2 23 2H5ZM28 5C28 2.239 25.761 0 23 0H5C2.239 0 0 2.239 0 5V23C0 25.761 2.239 28 5 28H23C25.761 28 28 25.761 28 23V5ZM26 22.414L21 17.414L16.914 21.5L21.414 26H23C24.657 26 26 24.657 26 23V22.414ZM18.586 26L7 14.414L2 19.414V23C2 24.657 3.343 26 5 26H18.586ZM20 6C18.895 6 18 6.895 18 8C18 9.105 18.895 10 20 10C21.105 10 22 9.105 22 8C22 6.895 21.105 6 20 6ZM16 8C16 5.791 17.791 4 20 4C22.209 4 24 5.791 24 8C24 10.209 22.209 12 20 12C17.791 12 16 10.209 16 8Z" fill="currentColor"/>
                    </svg>
                    <input type="file" id='fileInputMessage' className='file-input' accept="image/jpeg, image/png" onChange={handleImage}/>
                </label>
                <input className='input-field rounded-3' placeholder="Type your message..." type="text" onChange={handleText} name='messageSend' id='messageSend'/>
                <button className='send-button' disabled={(!inImage && !inText) || sub === null} onClick={sendMessage}>
                    <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M29.3998 4.45025C30.2998 2.04025 27.9599 -0.309742 25.5499 0.580258L2.72986 9.01031C0.32986 9.90031 0.0799483 13.2003 2.31995 14.4503L10.2699 18.8803C10.4499 18.9803 10.5998 19.1304 10.6898 19.3104L15.0599 28.2703C16.2199 30.6303 19.6399 30.4703 20.5699 28.0003L29.3998 4.45025ZM27.4598 3.91034L12.4899 18.4503L16.86 27.3903C17.24 28.1803 18.3898 28.1203 18.6898 27.3004L27.4598 3.91034ZM11.0699 17.0303L3.28992 12.7003C2.53992 12.2903 2.62981 11.1903 3.42981 10.8903L25.9999 2.54034L11.0699 17.0303Z" fill="currentColor"/>
                    </svg>
                </button>
                </div>
            </div>
        </div>
    );
}

export default MessengerChatBlock;