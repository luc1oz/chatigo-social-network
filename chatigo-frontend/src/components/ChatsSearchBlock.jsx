import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatsSearchBlockDark.css'
import ChatsListBlock from './ChatsListBlock';
import Cookies from 'js-cookie';
import ChatBlock from './ChatBlock';
import ChatBlockNotViewed from './ChatBlockNotViewed';
import { Container, Modal, Row } from 'react-bootstrap';
import SockJS from "sockjs-client"
import Stomp from 'stompjs'

function ChatsSearchBlock() {

    const [checkboxs, setCheckboxs] = useState([])
    const [letCreate, setLetCreate] = useState(true)

    const [friends, setFriends] = useState([])
    const [friendsLoaded, setFriendsLoaded] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setCheckboxs([]);
        setLetCreate(true);
        setShow(false)};
    const handleShow = () => setShow(true);

    const [chats, setChats] = useState([]);
    const [queryChats, setQueryChats] = useState([])
    const [chatsForOutput, setChatsForOutput] = useState([])

    const [loaded, setLoaded] = useState(false);

    const [querySentense, setQuerySentense] = useState('');
    const [inQuery, setInQuery] = useState(false);

    const handleChangeRequestQuery = (e) => {
        
        setQuerySentense(e.target.value);

        setInQuery(true);

        if(e.target.value == ''){
            setInQuery(false);
            return;
        }

        var queryString = e.target.value.toLowerCase().replace(/\s/g, '');
        console.log("QUERY STRING " + queryString)

        var usersObj = [];

        chats.forEach((chat) => {
            var chatName = chat.chatName.toLowerCase().replace(/\s/g, '');
            console.log(chatName);
            if(chatName.includes(queryString)){
                usersObj.push(chat);
            }
        })

        setQueryChats(usersObj)
    }

    const setOutChats = () => {
        if(!inQuery && querySentense == ''){
            setChatsForOutput(chats);
        }
        else{
            setChatsForOutput(queryChats);
        }
    }

    const getFriends = () => {
        var goodStatus = false;

        const formData = new FormData();
        formData.append("userId", Cookies.get('userID'));

        fetch("/getAllFriends", {
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
                    setFriends(data.users);
                    setFriendsLoaded(true);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    const getChats = () => {
        
        var goodStatus = false;
        const formData = new FormData();
        formData.append("userId", Cookies.get("userID"));

        fetch("/getChats", {
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
                    setChats(data.chats)
                   
                    setLoaded(true);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        getChats();
        getFriends();
    },[])

    useEffect(() => {
        if(loaded){
            connect();
        }
    },[loaded])

    var stompClient;

    const [conn, setConn] = useState(null)
    const [sub, setSub] = useState(null);

    const connect = () => {

        const socket = SockJS("/messenger");
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            setConn(stompClient);
            console.log(stompClient.status)
            chats.map(chat =>{
                console.log(chat.chatId)
                setSub(stompClient.subscribe("/chat/" + chat.chatId + "/message" , function (message) {
                
                    var data = JSON.parse(message.body)
                    console.log(data)
                    if(data.notificationType == 1){
                        getChats();
                    }
                }))
            })            
        });
    };


    useEffect(() => {
        setOutChats();
    },[queryChats, chats, loaded, inQuery])

    const handleChangeCheckboxs = (id) => {

        var obj = checkboxs;
        var objHelp = [];

        if(obj.includes(id)){
           objHelp = obj.filter((number) => number !== id)
           console.log(objHelp)
        }
        else{
            objHelp = obj;
            objHelp.push(id);
        }

        if(objHelp.length > 1){
            setLetCreate(false)
        }
        else{
            setLetCreate(true);
        }
        setCheckboxs(objHelp);
    }

    const createChat = () => {
        var goodStatus = false;

        var users = [];
        users.push(parseInt(Cookies.get("userID")));

        var usersToSend = users.concat(checkboxs)

        var obj = {
            "users": usersToSend
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
                    handleClose();
                    getChats();
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className='d-flex flex-column gap-3'>
            <div className='d-flex flex-column gap-3 chats-find-block rounded-3 '>
                <div className='d-flex flex-row w-100 gap-2'>
                    <input className='input-field rounded-3' placeholder="Search..." type="text" name='chatFind' onChange={handleChangeRequestQuery} id='chatFind'/>
                    <button className='find-chat-button' disabled={!friendsLoaded} onClick={handleShow}>
                        <svg width="25" height="25" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12C9 11.45 9.45 11 10 11H13V8C13 7.45 13.45 7 14 7C14.55 7 15 7.45 15 8V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13H15V16C15 16.55 14.55 17 14 17C13.45 17 13 16.55 13 16V13H10C9.45 13 9 12.55 9 12Z" fill="currentColor"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M28 5V19C28 21.76 25.76 24 23 24H8.31995L3.16003 27.6801C1.84003 28.6301 0 27.6801 0 26.0601V5C0 2.24 2.24 0 5 0H23C25.76 0 28 2.24 28 5ZM26 19V5C26 3.34 24.66 2 23 2H5C3.34 2 2 3.34 2 5V26.0601L7.68005 22H23C24.66 22 26 20.66 26 19Z" fill="currentColor"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className='d-flex flex-column gap-1 chats-list-block rounded-3 '>
                {chatsForOutput.length != 0 ? chatsForOutput.map((chat) =>{
                    console.log()
                    if(chat.countOfUnreadMessages == 0){
                        console.log(1);
                        return <ChatBlock
                        chatId={chat.chatId}
                        chatName={chat.chatName}
                        chatImage={chat.chatImage}
                        messageText={chat.lastMessageText}
                        messageUserImage={chat.lastMessageUserImage}
                        messageDate={chat.lastMessageDate}
                        countUnreaded={chat.countOfUnreadMessages}/>
                        
                    }
                    else{
                        return <ChatBlockNotViewed
                        chatId={chat.chatId}
                        chatName={chat.chatName}
                        chatImage={chat.chatImage}
                        messageText={chat.lastMessageText}
                        messageUserImage={chat.lastMessageUserImage}
                        messageDate={chat.lastMessageDate}
                        countUnreaded={chat.countOfUnreadMessages}/>
                    }
                }) : <p className='fw-bold m-0'> No chats </p>}
                
            </div>
                <Modal show={show} onHide={handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    dialogClassName="create-chat-block"
                    scrollable={true}
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Create group chat</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='modal-inside'>

                    <div className='d-flex flex-column gap-1'>
                        {friends.length >= 2 ? friends.map((friend) => {
                            return <label for={friend.userId}> 
                            <div className='d-flex flex-row gap-3 justify-content-between friend-to-chat rounded-3'>
                                <div className='d-flex flex-row gap-3'>
                                    <img src={"data:image/png;base64," + friend.userImage} alt="" className='chat-block-img rounded-pill'/>
                                    <div className='d-flex flex-column align-items-start'>
                                        <p className='m-0 fw-bold'>
                                            {friend.username} {friend.userSurname}
                                        </p>
                                        <p className='m-0'>
                                            {friend.online == '1' ? "online" : "offline"}
                                        </p>
                                    </div>
                                </div>
                                <input type="checkbox" id={friend.userId} onChange={function() {handleChangeCheckboxs(friend.userId)}} className='me-3' />
                            </div>
                        </label>
                            
                        }) : 
                        <div className='friend-to-chat rounded-3'>
                            <p className='m-0 fw-bold '>
                                You need to have at lest 2 friends to create group chat!
                            </p> 
                        </div>}
                    </div>
                       

                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" disabled={letCreate} onClick={function() {createChat()}} className="btn btn-primary">Create chat</button>
                    </Modal.Footer>
                </Modal>

        </div>
    );
}

export default ChatsSearchBlock;