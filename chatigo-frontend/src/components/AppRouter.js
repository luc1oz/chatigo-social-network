import {Route, Routes, Navigate} from 'react-router-dom'
import React from 'react'
import { privateRoutes, publicRoutes } from '../routes.js';
import { NEWS_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import NewsBlock from './NewsBlock.jsx';
import AuthBlock from './AuthBlock.jsx';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

const AppRouter = () => {

    useEffect(() => {
        userId = Boolean(Cookies.get("userID")) || false
    });

    var userId = Boolean(Cookies.get("userID")) || false


    return userId ? 
        (
            <Routes>
                {privateRoutes.map(({path, Component}) =>
                    <Route path={path} Component={Component} exact={true}/>
                )}
                {/* <Route path="*" element={<NewsBlock/>}/> */}
            </Routes>
        )
        :
        (
            <Routes>
                {publicRoutes.map(({path, Component}) =>
                    <Route path={path} Component={Component} exact={true}/>
                )}
                {/* <Route path="*" element={<AuthBlock/>}/> */}
            </Routes>
        )
}
export default AppRouter;