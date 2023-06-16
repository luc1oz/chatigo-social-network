import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SettingsBlockDark.css'
import PageMenuBlock from './PageMenuBlock';
import FriendsFindBlock from './FriendsFindBlock';
import AllFriendsBlock from './AllFriendsBlock';
import OnlineFriendsBlock from './OnlineFriendsBlock';
import AllUsersBlock from './AllUsersBlock';
import SettingsMenuBlock from './SettingsMenuBlock';
import Cookies from 'js-cookie';

function SettingsBlock() {
    
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [description, setDescription] = useState('');

    const [errorName, setErrorName] = useState('')
    const [errorSurname, setErrorSurname] = useState('')

    const handleChangeName = (e) => {
        setName(e.target.value);
        const re = /^[a-zA-Zа-яА-Я]*$/;
        if(e.target.value.length < 2) {
            setErrorName('Name is too short');
        }
        else if(e.target.value.length > 25) {
            setErrorName('Name is too long');
        }
        else if(!re.test(String(e.target.value).toLowerCase())) {
            setErrorName("Name contains only letters");
        } 
        else {
            setErrorName('');
        }
    }

    const handleChangeSurname = (e) => {
        setSurname(e.target.value);
        const re = /^[a-zA-Zа-яА-Я]*$/;
        if(e.target.value.length < 2) {
            setErrorSurname('Surname is too short');
        }
        else if(e.target.value.length > 25) {
            setErrorSurname('Surname is to short');
        }
        else if(!re.test(String(e.target.value).toLowerCase())) {
            
            console.log(e.target.value)
            setErrorSurname("Surname contains only letters");
        } 
        else {
            setErrorSurname('');
        }
    }

    const handleChangeDescription = (e) =>{
        setDescription(e.target.value)
        if(e.target.value == ""){
            setDescription("")
        }
    }

    const [mainImg, setMainImg] = useState('')

    const [imgToShow, setImgToShow] = useState('')
    const [imgToSend, setImgToSend] = useState('')

    const [isImgLoaded, setIsImgLoaded] = useState(false)

    const getAvatar = () => {
        var jsonObj = {
            'userId':Cookies.get('userID')
        }

        var goodStatus = false;
        // var result

        fetch("/getAvatar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(jsonObj),
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
                    setMainImg(data.image);
                }
                
            })
            .catch(error => {
                console.error(error);
            });
    }



    useEffect(() => {

        getAvatar();
       
      }, []);

    // const saveSetttings = () => {

    //     var goodStatus = false;
    //     var obj = {
    //         "userId":Cookies.get("userID"),
    //         "email":email,
    //         "password":password
    //     }

    //     fetch("/updateSettings", {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json; charset=UTF-8'
    //         },
    //         body: JSON.stringify(obj),
    //         })
    //         .then(response => 
    //             {
    //                 if(response.status === 200)
    //                 {
    //                     goodStatus = true;
    //                 } 
    //                 return response.json();
    //             }
    //         )
    //         .then(data => {
    //             if(goodStatus){
    //                 console.log(data);
    //                 setEmail('');
    //                 setPassword('');
    //                 document.querySelector("passwordText").value = '';
    //                 document.querySelector("emailText").value = '';
    //             }
                
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }

    const handleImage = (e) =>{
        
        e.preventDefault();
        setImgToSend(e.target.files[0]);
        // console.log(postImageToSend);

        var fr = new FileReader();
        fr.onload = function () {
            setImgToShow(fr.result);
        }
        fr.readAsDataURL(e.target.files[0]);
        
        if(e.target.value == ''){
            setIsImgLoaded(false);
        }
        else{
            setIsImgLoaded(true);
        }
    }

    const saveImage = () =>{
        var goodStatus = false;
        const formData = new FormData();
        formData.append("file", imgToSend);
        formData.append("userId", Cookies.get("userID"));

        fetch("/mainImage", {
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
                    getAvatar();
                    console.log(data);
                    setImgToSend('');
                    setImgToShow('');
                    setIsImgLoaded(false)
                    // document.getElementById('fileInputImg').value = '';
                }
                
            })
            .catch(error => {
                console.error(error);
            });
    }

    const deleteImage = () => {
        if(isImgLoaded){
            setImgToSend('');
            setImgToShow('');
            setIsImgLoaded(false)
            // document.getElementById('fileInputImg').value = '';
        }
        else{

            const formData = new FormData();
            formData.append("userId", Cookies.get("userID"));
            
            var goodStatus = false;

            fetch("/deletePhoto", {
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
                        getAvatar();
                    }
                    
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    const saveChanges = () =>{
        
        var goodStatus = false;
        var obj = {
            "userId":Cookies.get("userID"),
            "userName":name,
            "userSurname":surname,
            "description":description
        }

        fetch("/editProfile", {
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
                    setSurname('');
                    setName('');
                    setDescription('')
                    document.getElementById('nameText').value = '';
                    document.getElementById('surnameText').value = '';
                    document.getElementById('descripText').value = '';
                }
                
            })
            .catch(error => {
                console.error(error);
            });
    }
   
    return (
        <div className='edit-profile-block gap-3 w-100'>
            <div className='page-menu-block'>
                <PageMenuBlock/>
            </div>
            <div className='edit-block d-flex flex-column gap-2 '>
                <div className='ed-block w-100 rounded-3 d-flex flex-column gap-2'>
                    <h5>
                        Change profile info
                    </h5>
                    <div className='el-block rounded-3 d-flex flex-column gap-2'>
                        <div className='d-flex flex-column gap-2'>
                            <div className='d-flex flex-row gap-2 align-items-center'>
                                <h6 className='m-0'>
                                Change profile image
                                </h6>
                            </div>
                            <div className='d-flex flex-row gap-3 flex-wrap'>
                                <div>
                                    <img src={imgToShow != '' ? imgToShow : ("data:image/png;base64," + mainImg)} alt="" className='test-image rounded-3' />
                                </div>
                                <div className='d-flex flex-column justify-content-between align-items-end'>
                                    <p className='fw-light'>
                                        It will be easier for friends to recognize you if you upload your real photo. You can upload an image in JPG or PNG format.
                                    </p>
                                    <div className='d-flex flex-row gap-3 flex-wrap'>
                                        <button className='send-button-img' onClick={function(){deleteImage()}}> Delete </button>
                                        {!isImgLoaded && <label className='send-button-img d-flex flex-row justify-content-center align-items-center'>
                                            <p className='m-0'> Upload </p>
                                            <input type="file" id='fileInputImg' className='file-input' accept="image/jpeg, image/png" onChange={handleImage}/>
                                        </label>}
                                        {isImgLoaded && <>
                                        <button className='send-button-img' onClick={function(){saveImage()}}> Save </button> </> } 
                                                                                          
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='el-block rounded-3 d-flex flex-column gap-2'>
                        <div className='d-flex flex-column gap-2'>
                            <div className='d-flex flex-row gap-2 align-items-center'>
                                <h6 className='m-0'>
                                    Change name and surname
                                </h6>
                            </div>
                            <p className='fw-light m-0'>
                                Set new name and surname!
                            </p>
                            
                        </div>
                        <div className='d-flex flex-row gap-2'>
                            <input className='input-field rounded-3' placeholder="Enter new name" type="text" name='nameText' minLength={2} maxLength={25} onChange={handleChangeName} id='nameText'/>
                            <input className='input-field rounded-3' placeholder="Enter new surname" type="text" name='surnameText' minLength={2} maxLength={25} onChange={handleChangeSurname} id='surnameText'/>
                        </div>
                        {errorName != '' && <p className='errMessage-p m-0'>{errorName}</p>}
                        {errorSurname != '' && <p className='errMessage-p m-0'>{errorSurname}</p>}
                        
                    </div>
                    <div className='el-block rounded-3 d-flex flex-column gap-2'>
                        <div className='d-flex flex-column gap-2 align'>
                            <div className='d-flex flex-row gap-2 align-items-center'>
                                <h6 className='m-0'>
                                    Change description
                                </h6>
                            </div>
                            <p className='fw-light m-0'>
                                Here you can change your description!
                            </p>
                        </div>
                        <input className='input-field rounded-3' placeholder="Enter new description" maxLength={150} type="text" name='descripText' onChange={handleChangeDescription} id='descripText'/>
                    </div>
                    <div className='el-block rounded-3 d-flex flex-column gap-2'>
                        <div className='d-flex flex-row justify-content-between gap-2'>
                            <div className='d-flex flex-column gap-2'>
                                <h6 className='m-0'>
                                Save changes
                                </h6>
                                <p className='fw-light m-0'>
                                Don't forget to save changes!
                            </p>
                            </div>
                            <button disabled={errorName != '' || errorSurname != ''} className='send-button-img align-self-end' onClick={function(){saveChanges()}}> Save </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='settings-page-block'>
                <SettingsMenuBlock/>
            </div>
        </div>
        
    );}


export default SettingsBlock;