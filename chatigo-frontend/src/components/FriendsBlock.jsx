import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FriendsBlockDark.css'
import PageMenuBlock from './PageMenuBlock';
import FriendsFindBlock from './FriendsFindBlock';
import AllFriendsBlock from './AllFriendsBlock';
import OnlineFriendsBlock from './OnlineFriendsBlock';
import AllUsersBlock from './AllUsersBlock';
import { useLocation } from 'react-router-dom';

function FriendsBlock() {

    return (
        <div className='d-flex flex-row friends-block justify-content-center gap-3 w-100'>
            <div className='page-menu-block-friends'>
                <PageMenuBlock/>
            </div>
            <div className='friends-search-block d-flex flex-column gap-2'>
                {localStorage.getItem('friendPage') ? <FriendsFindBlock type={localStorage.getItem('friendPage')}/> 
                : <FriendsFindBlock type={0}/>}
                
            </div>
            <div className='help-center-block'>

            </div>
        </div>
        
    );
}

export default FriendsBlock;