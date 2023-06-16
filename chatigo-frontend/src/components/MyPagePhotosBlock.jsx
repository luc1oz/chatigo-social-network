import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyPagePhotosBlockDark.css';
import Cookies from 'js-cookie';
import { Container, Modal, Row } from 'react-bootstrap';

function MyPagePhotosBlock(props) {

    const [loaded, setLoaded] = useState(false)

    const [loadedImage, setLoadedImage] = useState();
    const [loadedImageToShow, setLoadedImageToShow] = useState('');
    const [isLoadedImage, setIsLoadedImage] = useState(false);
    const [isAllImage, setIsAllImage] = useState(false);

    const [userImages, setUserImages] = useState([]);
    const [userImagesNotAll, setUserImagesNotAll] = useState([]);

    const [isNotManyPhoto, setIsNotManyPhoto] = useState(true);

    const [show, setShow] = useState(false);
    const [showPhoto, setShowPhoto] = useState(false);

    const [currentPhoto, setCurrentPhoto] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClosePhoto = () => {
        setCurrentPhoto({})
        setShowPhoto(false);
    } 

    const handleShowPhoto = (photo) => {
        setCurrentPhoto(photo)
        setShowPhoto(true);
    }
    const getPhotos = () => {
        const formData = new FormData();
        formData.append("getUserId", props.userId);

        var goodStatus = false;

        fetch("/getUserImages", {
            method: "POST",
            body: formData
        })
        .then(responce => 
        {
            if(responce.status === 200)
            {
                goodStatus = true;
                return responce.json()
            } 
            
        })
        .then(data => {
            if(goodStatus){
                if(data.userImages.length != 0){
                    setUserImages(data.userImages)
                    setUserImagesNotAll(data.userImages.slice(0, 2))
                    if(data.userImages.length <= 2){
                        
                        setIsNotManyPhoto(true)
                    }
                    else{
                        setIsNotManyPhoto(false)
                    }
                    setLoaded(true);
                }
                else{
                    setLoaded(true);
                }
            }
        })
        .catch(error => {
            console.error(error);
        });
    }

    const handleImage = (e) =>{
        e.preventDefault();
        if(e.target.files[0]){
            setLoadedImage(e.target.files[0]);
            console.log(loadedImage);

            var fr = new FileReader();
            fr.onload = function () {
                setLoadedImageToShow(fr.result);
            }
            fr.readAsDataURL(e.target.files[0]);
            
            if(e.target.value == ''){
                setIsLoadedImage(false);
            }
            else{
                setIsLoadedImage(true);
            }
        }
        
    }

    const deletePhoto = () =>{
        setLoadedImageToShow('');
        setLoadedImage(null);
        setIsLoadedImage(false);
        document.querySelector('input[type=file]').value = '';
    }

   

    const uploadPhoto = () =>{
        const formData = new FormData();
        formData.append("file", loadedImage);
        formData.append("userId", Cookies.get("userID"));

        var goodStatus = false;

        fetch("/addImage", {
            method: "POST",
            body: formData
        })
        .then(response => 
        {
            if(response.status === 200)
                {
                    goodStatus = true;
                } 
            response.json()
        })
        .then(data => {
            if(goodStatus){
                console.log(data);
                deletePhoto();
                getPhotos();
            }
            
        })
        .catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        if (loaded) return ;
        setIsAllImage(false);
        console.log(props.relation + "IN")
        getPhotos()
        
    },[loaded])
    
    const showAllPhotos = () => {
        if(isAllImage){
            setIsAllImage(false);
        }
        else{
            setIsAllImage(true);
        }
        
    }
    

    return (
        <div className='d-flex flex-column gap-2'>
            <div className='d-flex flex-column gap-2 photos-block rounded-3'>
                <div className='d-flex flex-row justify-content-between align-items-center flex-wrap'>
                    <p className='text-color m-0'>
                        Photos
                    </p>
                    <div className='d-flex flex-row gap-2 align-items-end flex-wrap'>
                        {props.relation == 4 && <label className='photos-button-add d-flex flex-row justify-content-center align-items-center gap-2 rounded-3'>
                            <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5 2C3.343 2 2 3.343 2 5V16.586L6.29303 12.293C6.68303 11.902 7.31697 11.902 7.70697 12.293L15.5 20.086L20.293 15.293C20.683 14.902 21.317 14.902 21.707 15.293L26 19.586V5C26 3.343 24.657 2 23 2H5ZM28 5C28 2.239 25.761 0 23 0H5C2.239 0 0 2.239 0 5V23C0 25.761 2.239 28 5 28H23C25.761 28 28 25.761 28 23V5ZM26 22.414L21 17.414L16.914 21.5L21.414 26H23C24.657 26 26 24.657 26 23V22.414ZM18.586 26L7 14.414L2 19.414V23C2 24.657 3.343 26 5 26H18.586ZM20 6C18.895 6 18 6.895 18 8C18 9.105 18.895 10 20 10C21.105 10 22 9.105 22 8C22 6.895 21.105 6 20 6ZM16 8C16 5.791 17.791 4 20 4C22.209 4 24 5.791 24 8C24 10.209 22.209 12 20 12C17.791 12 16 10.209 16 8Z" fill="currentColor"/>
                            </svg>
                            <p className='m-0'>
                                Add photo
                            </p>
                            <input type="file" id='fileInput' className='file-input' accept="image/jpeg, image/png" onChange={handleImage}/>
                        </label>}

                        
                        {!isNotManyPhoto && <button className='photos-button rounded-3' onClick={handleShow}>
                            <p className='m-0'>
                                Show all
                            </p>
                        </button>}

                        <Modal show={show} onHide={handleClose} dialogClassName='modal-photos'
                        aria-labelledby="contained-modal-title-vcenter"
                        scrollable={true}
                        centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Photos</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className='modal-inside'>
                                    <div className='d-flex flex-row flex-wrap justify-content-start gap-1'>
                                        {userImages.map((image, i) => (
                                            
                                        <div key={i} style={{ backgroundImage: "url(data:image/png;base64," + image.image + ")",
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center' }} onClick={function() {handleShowPhoto(userImages[i])}} className='all-photo-block rounded-3 align-self-center'> </div>
                                        ))}
                                    </div>
                            </Modal.Body>
                            <Modal.Footer>
                                
                            </Modal.Footer>
                        </Modal>

                        <Modal show={showPhoto} onHide={handleClosePhoto} dialogClassName='modal-photos'
                        aria-labelledby="contained-modal-title-vcenter"
                        scrollable={false}
                        centered>
                            <Modal.Header closeButton>
                                <Modal.Title>User photo ({currentPhoto.date})</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className='m-body d-flex flex-column align-items-center'>

                                <img src={"data:image/png;base64," + currentPhoto.image} alt="" className='current-image-block' />
                                    {/* <div style={{ backgroundImage: "url(data:image/png;base64," + currentPhoto.image + ")",
                                            backgroundSize: 'contain',
                                            objectFit: 'contain',
                                            backgroundRepeat: 'no-repeat'}} className='current-photo-block img-fluid rounded-3 align-self-center'> </div> */}
                            </Modal.Body>

                        </Modal>
                    </div>
                </div>
                {!loaded ? 
                    <div className='d-flex flex-row flex-wrap justify-content-between gap-2'>
                        <div style={{ backgroundColor: "#46484a",
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center' }} 
                                                    className='photo-block rounded-3'></div>
                        <div style={{ backgroundColor: "#46484a",
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center' }} 
                                                    className='photo-block rounded-3'></div>
                    </div> 
                    : 
                    <div className='d-flex flex-row flex-wrap justify-content-between gap-2'>
                        {userImagesNotAll.map((image, i) => (
                            <div key={i} style={{ backgroundImage: "url(data:image/png;base64," + image.image + ")",
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center' }} onClick={function() {handleShowPhoto(userImagesNotAll[i])}} className='photo-block rounded-3'> </div>
                        ))}

                    </div>}
            </div>
            {isLoadedImage && <div className='d-flex flex-column gap-2 photos-block rounded-3'>
                <img src={loadedImageToShow} alt="" className='img-fluid rounded-3'/>
                <div className='d-flex flex-row justify-content-between'>
                    <button className='clear-button rounded-3' onClick={deletePhoto}>
                        <p className='m-0'>
                            Clear
                        </p>
                    </button>
                    <button className='upload-button rounded-3' onClick={uploadPhoto}>
                        <p className='m-0 '>
                            Upload
                        </p>
                    </button>
                </div>
            </div>}
        </div>
        
    );
}

export default MyPagePhotosBlock;