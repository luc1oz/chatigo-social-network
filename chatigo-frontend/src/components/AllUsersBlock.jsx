import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AllUsersBlockDark.css'
import PageMenuBlock from './PageMenuBlock';
import FriendsFindBlock from './FriendsFindBlock';
import FriendBlock from './FriendBlock';
import UserBlock from './UserBlock';

function AllUsersBlock() {

    return (
        <div className='all-users-block d-flex flex-column gap-2 rounded-3'>
            <UserBlock/>
            <UserBlock/>
        </div>
        
    );
}

export default AllUsersBlock;