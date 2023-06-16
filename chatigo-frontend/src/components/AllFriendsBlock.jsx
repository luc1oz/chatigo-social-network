import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import PageMenuBlock from './PageMenuBlock';
import FriendsFindBlock from './FriendsFindBlock';
import FriendBlock from './FriendBlock';

function AllFriendsBlock() {

    return (
        <div className='all-friends-block d-flex flex-column gap-2 rounded-3'>
            <FriendBlock/>
            <FriendBlock/>
        </div>
        
    );
}

export default AllFriendsBlock;