import {React,useState} from "react";
import style from './profile.module.css'
import { getAuth } from "firebase/auth";
import  { Navigate } from 'react-router-dom'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import '../../firebase'
import user from '../../img/user.png'

const auth = getAuth()

const Profile = (props) => {
    const [currentUser, setcurrentUser] = useState(auth.currentUser)
    const [isLoggedIn, setIsLoggedIn] = useState(props.isLoggedIn)

    document.body.style.overflow = "hidden"
    return (
        <div className={style.profile}>
            {currentUser!==auth.currentUser?setcurrentUser(auth.currentUser):<></>}
            {isLoggedIn!==props.isLoggedIn?setIsLoggedIn(props.isLoggedIn):<></>}
            {isLoggedIn?
            <div className={style.profile_container}>
                <img src={user} />
                <p><b>{currentUser.displayName}</b></p>
                <p>{currentUser.email}</p>
            </div>
            :
            <Navigate to='/social-app/signin'></Navigate>}
            
        </div>
    )
}

export default Profile;