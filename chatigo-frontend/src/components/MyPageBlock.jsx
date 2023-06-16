import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyPageBlockDark.css'
import PostBlock from './PostBlock';
import PageMenuBlock from './PageMenuBlock';
import WhatsUpBlock from './WhatsUpBlock';
import MyPageInfoBlock from './MyPageInfoBlock';
import MyPagePhotosBlock from './MyPagePhotosBlock';
import SettingsMenuBlock from './SettingsMenuBlock';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';


function MyPageBlock(props) {

    const [loaded, setLoaded] = useState(false)

    let location = useLocation();

    const [own, setOwn] = useState(false);
    
    const [birthday, setBirthday] = useState('');
    const [description, setDescription] = useState('');
    const [gender, setGender] = useState('');
    const [online, setOnline] = useState(0);
    const [regdate, setRegdate] = useState('');
    const [relation, setRelation] = useState(4);
    const [userId, setUserId] = useState(location.state.userId);
    const [userImage, setUserImage] = useState('');
    const [userName, setUserName] = useState('');
    const [userSurname, setUserSurname] = useState('');
    
    const [postsObj, setPostsObj] = useState([]);

    const getInfo = () => {
        var goodStatus = false;
        const formData = new FormData();
        console.log(location.state.userId + "ПОСМОТРИ")
        formData.append("sendUserId", Cookies.get('userID'));
        formData.append("getUserId", location.state.userId);
        fetch("/infoUser", {
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
                    setBirthday(data.userInfo.birthday)
                    setDescription(data.userInfo.description)
                    setGender(data.userInfo.gender)
                    setOnline(data.userInfo.online)
                    setRegdate(data.userInfo.regdate)
                    setRelation(data.userInfo.relation)
                    setUserId(data.userInfo.userId)
                    setUserImage(data.userInfo.userImage)
                    setUserName(data.userInfo.userName)
                    setUserSurname(data.userInfo.userSurname)
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    const getPosts = () => {
        var goodStatus = false;
        const formData = new FormData();
        console.log(location.state.userId);
        formData.append("getUserId", location.state.userId);
        formData.append("sendUserId", Cookies.get("userID"));
        console.log(location.state)
        fetch("/getUserPagePosts", {
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
                    var obj = [];
                    if(data.userPosts.length != 0){
                        console.log(data)
                        data.userPosts.forEach(function(post, index){
                            obj.push(
                                <>
                                    <PostBlock
                                        userImage={post.userImage}
                                        postText={post.postText}
                                        userName={post.userName}
                                        userSurname={post.userSurname}
                                        postImage={post.postImage}
                                        likeCount={post.likeCount}
                                        postDate={post.postDate}
                                        postId={post.postId}
                                        userId={post.userId}
                                        isLiked={post.isLiked}
                                        commentCount={post.commentCount}
                                    />
                                </>
                            )
                        });
                    }
                    else{
                        obj.push(
                        <>
                            <div className='no-posts-block rounded-3'>
                                {/* TODO: DIV 0 POSTS */}
                                You didn't post anything yet.
                            </div>
                        </>
                        )
                    }
                    setPostsObj(obj);
                    
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        if (loaded) return ;
        if (location.state.userId == Cookies.get('userID')) {
            setOwn(true);
        }
        getInfo();
        getPosts();
        setLoaded(true);
    },[loaded])


    return (
        <div className='my-page-block gap-3 w-100'>
            <div className='page-menu-block'>
                <PageMenuBlock/>
            </div>
            <div className='current-page-block d-flex flex-column gap-2'>
                <MyPageInfoBlock
                birthday={birthday}
                description={description}
                gender={gender}
                online={online}
                regdate={regdate}
                relation={relation}
                userId={userId}
                userImage={userImage}
                userName={userName}
                userSurname={userSurname}
                />

                <MyPagePhotosBlock userId={userId} relation={relation}/>
                {own && <WhatsUpBlock/>}
                {postsObj}
            </div>
            <div className='settings-page-block'>
                {own && <SettingsMenuBlock/>}
            </div>
        </div>
        
    );
}

export default MyPageBlock;