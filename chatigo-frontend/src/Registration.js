import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderProfile from './components/HeaderProfile';
import Header from './components/Header';
import AuthBlock from './components/AuthBlock';
import './AuthorizationLight.css'

function Registration() {
  return (
    <>
    <Header/>
    <div className='auth-block-centering'>
      <AuthBlock/> 
    </div> 
    </>
  );
}

export default Registration;