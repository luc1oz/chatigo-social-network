import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderProfile from './components/HeaderProfile';
import Header from './components/Header';
import AuthBlock from './components/AuthBlock';
import RegBlock from './components/RegBlock';
import './AuthorizationDark.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WhatsUpBlock from './components/WhatsUpBlock';
import NewsBlock from './components/NewsBlock';
import MyPageBlock from './components/MyPageBlock';
import FriendsBlock from './components/FriendsBlock';
import ChatsBlock from './components/ChatsBlock';
import MessengerBlock from './components/MessengerBlock';
import AppRouter from './components/AppRouter';
import {useTheme} from './hooks/use-theme'
import { useEffect } from 'react';

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Header/>
      <div className='auth-block-centering'>
      {/* <Routes>
        
        <Route exact path="/" element={<AuthBlock/>}/>
        <Route path="/user" element={<MyPageBlock/>}/>
        <Route path="/authorization" element={<AuthBlock/>}/>
        <Route path="/registration" element={<RegBlock/>}/>
        <Route path="/news" element={<NewsBlock/>}/>
        <Route path="/friends" element={<FriendsBlock/>}/>
        <Route path="/chats" element={<ChatsBlock/>}/>
        <Route path="/messenger" element={<MessengerBlock/>}/>

      </Routes> */}
        <AppRouter/>
      </div> 
      
    </BrowserRouter>
    </>
  );
}

export default App;
