import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RequestsBlockDark.css'
import PageMenuBlock from './PageMenuBlock';
import FriendsFindBlock from './FriendsFindBlock';
import FriendBlock from './FriendBlock';

function RequestsBlock() {

    return (
        <div className='requests-block d-flex flex-column gap-2 rounded-3'>
            <RequestBlock/>
            <RequestBlock/>
        </div>
        
    );
}

export default RequestsBlock;