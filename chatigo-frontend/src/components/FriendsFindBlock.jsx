import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FriendsFindBlockDark.css'
import FriendBlock from './FriendBlock';
import RequestBlock from './RequestBlock';
import UserBlock from './UserBlock';
import Cookies from 'js-cookie';
import MyRequestBlock from './MyRequestBlock';

function FriendsFindBlock(props) {


    const [elementsFinding, setElementsFinding] = useState([]);

    const [typeFinding, setTypeFinding] = useState(parseInt(localStorage.getItem('friendPage')));

    const [allFriends, setAllFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const [myRequests, setMyRequests] = useState([]);
    const [requests, setRequests] = useState([]);
    const [users, setUsers] = useState([]);

    const [queryAllFriends, setQueryAllFriends] = useState([]);
    const [queryOnlineFriends, setQueryOnlineFriends] = useState([]);
    const [queryMyRequests, setQueryMyRequests] = useState([]);
    const [queryRequests, setQueryRequests] = useState([]);
    const [queryUsers, setQueryUsers] = useState([]);

    const [allFriendsLoaded, setAllFriendsLoaded] = useState(false);
    const [onlineFriendsLoaded, setOnlineFriendsLoaded] = useState(false);
    const [myRequestsLoaded, setMyRequestsLoaded] = useState(false);
    const [requestsLoaded, setRequestsLoaded] = useState(false);
    const [usersLoaded, setUsersLoaded] = useState(false);

    const [inQuery, setInQuery] = useState(false);
    const [querySentense, setQuerySentense] = useState(false);

    const getAllFriends = async () => {

        var goodStatus = false;

        const formData = new FormData();
        formData.append("userId", Cookies.get('userID'));

        await fetch("/getAllFriends", {
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
                    setAllFriends(data.users);
                    setAllFriendsLoaded(true);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    const getOnlineFriends = async () => {
        var goodStatus = false;

        const formData = new FormData();
        formData.append("userId", Cookies.get('userID'));

        await fetch("/getFriendsOnline", {
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
                    setOnlineFriends(data.users);
                    setOnlineFriendsLoaded(true);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    const getMyRequests = async () => {
        var goodStatus = false;

        const formData = new FormData();
        formData.append("userId", Cookies.get('userID'));

        await fetch("/getMyRequestsInFriends", {
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
                    setMyRequests(data.users);
                    setMyRequestsLoaded(true);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    const getRequests = async () => {
        var goodStatus = false;

        const formData = new FormData();
        formData.append("userId", Cookies.get('userID'));

        await fetch("/getRequestsInFriends", {
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
                    setRequests(data.users);
                    setRequestsLoaded(true);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    const getUsers = async () => {
        var goodStatus = false;

        const formData = new FormData();
        formData.append("userId", Cookies.get('userID'));

        await fetch("/getAllUsers", {
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
                    console.log(data.users)
                    setUsers(data.users);
                    setUsersLoaded(true);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleChangeRequestQuery = (e) => {
        
        setQuerySentense(e.target.value);

        setInQuery(true);

        if(e.target.value == ''){
            setInQuery(false);
            return;
        }

        var queryString = e.target.value.toLowerCase().replace(/\s/g, '');
        console.log("QUERY STRING " + queryString)
        switch(typeFinding){
            case 0:
                var usersObj = [];
                allFriends.forEach((user) => {
                    var nameAndSurname = (user.username + user.userSurname).toLowerCase().replace(/\s/g, '');
                    nameAndSurname = nameAndSurname.toLowerCase().replace(/\s/g, '')
                    console.log(nameAndSurname);
                    if(nameAndSurname.includes(queryString)){
                        usersObj.push(user);
                    }
                })
                setQueryAllFriends(usersObj)
            break;
            case 1:
                var usersObj = [];
                onlineFriends.forEach((user) => {
                    var nameAndSurname = user.username + user.userSurname;
                    nameAndSurname = nameAndSurname.toLowerCase().replace(/\s/g, '')
                    if(nameAndSurname.includes(queryString)){
                        usersObj.push(user);
                    }
                })
                setQueryOnlineFriends(usersObj)
            break;
            case 2:
                var usersObj = [];
                myRequests.forEach((user) => {
                    var nameAndSurname = user.username + user.userSurname;
                    nameAndSurname = nameAndSurname.toLowerCase().replace(/\s/g, '')
                    if(nameAndSurname.includes(queryString)){
                        usersObj.push(user);
                    }
                })
                setQueryMyRequests(usersObj)

                usersObj = [];
                requests.forEach((user) => {
                    var nameAndSurname = user.username + user.userSurname;
                    nameAndSurname = nameAndSurname.toLowerCase().replace(/\s/g, '')
                    if(nameAndSurname.includes(queryString)){
                        usersObj.push(user);
                    }
                })
                setQueryRequests(usersObj)
            break;
            case 3:
                var usersObj = [];
                users.forEach((user) => {
                    var nameAndSurname = user.username + user.userSurname;
                    nameAndSurname = nameAndSurname.toLowerCase().replace(/\s/g, '')
                    console.log(nameAndSurname);
                    if(nameAndSurname.includes(queryString)){
                        usersObj.push(user);
                    }
                })
                setQueryUsers(usersObj)
            break;
        }
    }

    useEffect(() => {
        if(allFriendsLoaded, onlineFriendsLoaded, myRequestsLoaded, usersLoaded, requestsLoaded){
            handleSetOutArray();
        }
    },[typeFinding, requests, allFriends, onlineFriends, myRequests, users, allFriendsLoaded, onlineFriendsLoaded, myRequestsLoaded, usersLoaded, requestsLoaded, querySentense])

    const handleSetOutArray = () => {
        switch(typeFinding){
            case 0:
                var objsToShow = [];
                
                if(!inQuery){
                    objsToShow.push(<><p className='text-color-count'>Friends count: {allFriends.length} </p></>)
                    allFriends.forEach((user) => {
                        objsToShow.push(<FriendBlock user={user} type={0}/>)
                    })
                }
                else{
                    objsToShow.push(<><p className='text-color-count'>Friends count: {queryAllFriends.length} </p></>)
                    queryAllFriends.forEach((user) => {
                        objsToShow.push(<FriendBlock user={user} type={0}/>)
                    })
                }

                setElementsFinding(objsToShow);

            break;
            case 1:
                console.log("CASE 1")
                var objsToShow = [];

                if(!inQuery){
                    objsToShow.push(<><p className='text-color-count'>Online friends count: {onlineFriends.length} </p></>)
                    onlineFriends.forEach((user) => {
                        objsToShow.push(<FriendBlock user={user} type={1}/>)
                    })
                }
                else{
                    objsToShow.push(<><p className='text-color-count'>Online friends count: {queryOnlineFriends.length} </p></>)
                    queryOnlineFriends.forEach((user) => {
                        objsToShow.push(<FriendBlock user={user} type={1}/>)
                    })
                }

                setElementsFinding(objsToShow);
            break;
            case 2:
                var objsToShow = [];

                if(!inQuery){
                    objsToShow.push(<><p className='text-color-count'>Requests count: {requests.length} </p></>)
                    requests.forEach((user) => {
                        objsToShow.push(<RequestBlock user={user}/>)
                    })
                    objsToShow.push(<><p className='text-color-count'>My requests count: {myRequests.length} </p></>)
                    myRequests.forEach((user) => {
                        objsToShow.push(<MyRequestBlock user={user}/>)
                    })
                }
                else{
                    objsToShow.push(<><p className='text-color-count'>Requests count: {queryRequests.length} </p></>)
                    queryRequests.forEach((user) => {
                        objsToShow.push(<RequestBlock user={user}/>)
                    })
                    objsToShow.push(<><p className='text-color-count'>My requests count: {queryMyRequests.length} </p></>)
                    queryMyRequests.forEach((user) => {
                        objsToShow.push(<MyRequestBlock user={user}/>)
                    })
                }

                console.log("ВСЕ REQUESTS")
                console.log(objsToShow)

                setElementsFinding(objsToShow);
            break;
            case 3:
                var objsToShow = [];

                if(!inQuery){
                    objsToShow.push(<><p className='text-color-count'>Users count: {users.length} </p></>)
                    users.forEach((user) => {
                        console.log(user);
                        objsToShow.push(<UserBlock user={user}/>)
                    })
                }
                else{
                    objsToShow.push(<><p className='text-color-count'>Users count: {queryUsers.length} </p></>)
                    queryUsers.forEach((user) => {
                        objsToShow.push(<UserBlock user={user}/>)
                    })
                }

                setElementsFinding(objsToShow);
            break;
        }
    }

    const setLocalType = (type) => {
        localStorage.setItem('friendPage', type);
    }

    const handleChangeTypeAll = () =>{
        getAllFriends()
        setLocalType(0);
        setTypeFinding(0);
        setInQuery(false);
    }

    const handleChangeTypeOnline = () =>{
        getOnlineFriends()
        setLocalType(1);
        setTypeFinding(1);
        setInQuery(false);
    }

    const handleChangeTypeRequests = () =>{
        getRequests();
        getMyRequests();
        setLocalType(2);
        setTypeFinding(2);
        setInQuery(false);
    }

    const handleChangeTypePeople = () =>{
        getUsers();
        setLocalType(3);
        setTypeFinding(3);
        setInQuery(false);
    }

    useEffect(() => {
        // handleChangeType(0);
        // setTypeFinding(0);
        getAllFriends();
        getOnlineFriends();
        getMyRequests();
        getRequests();
        getUsers();
    }, [])

    return (
        <>
        <div className='d-flex flex-column gap-3 friends-find-block rounded-3 w-100'>
            <div className='d-flex flex-row w-100 gap-2 buttons-friends'>
                <button className='search-type-button' onClick={function() {handleChangeTypeAll()}}>
                    All friends
                </button>
                <button className='search-type-button' onClick={function() {handleChangeTypeOnline()}}>
                    Friends online
                </button>
                <button className='search-type-button' onClick={function() {handleChangeTypeRequests()}}>
                    Requests
                </button>
                <button className='search-type-button' onClick={function() {handleChangeTypePeople()}}>
                    Find friends
                </button>
            </div>
            <div className='d-flex flex-row w-100 gap-2'>
                <input className='input-field rounded-3' placeholder="Find friends..." onChange={handleChangeRequestQuery} type="text" name='friendsFind' id='friendsFind'/>
            </div>
        </div>
        <div className='users-list-block d-flex flex-column gap-2 rounded-3'>
            {elementsFinding}
        </div>
        </>
        
    );
}

export default FriendsFindBlock;