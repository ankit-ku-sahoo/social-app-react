import {React,useState} from "react";
import style from './signin.module.css'

import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import  { Navigate } from 'react-router-dom'
function Signin(props) {
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const provider = new GoogleAuthProvider()

    function handleSubmit(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        checkUser(email, password);

    }

    const checkUser = async (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            // const user = userCredential.user;
            // // ...
            // console.log(user)
            document.getElementById('show_msg_signin').innerHTML = 'Signin Successful'
            setisLoggedIn(true)
            props.login()
        })
        .catch((error) => {
            const errorCode = error.code;
            // const errorMessage = error.message;
            document.getElementById('signin_error').innerHTML = 'Error: '+errorCode.split('auth/')[1]
            // console.log(errorCode.split('auth/'))
            // console.log(errorMessage)
        });
    };

    const handleGoogleSignin = (e) => {
        e.preventDefault()
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            // const user = result.user;
            // console.log(user)
            document.getElementById('signin_error').innerHTML = 'Signin Successful'
            setisLoggedIn(true)
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            
            // const email = error.email;
            
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // console.log(errorMessage)
        });
    }
    
    document.body.style.overflow = "hidden"
    return (
        <div className={style.form_container}>
            <p id="show_msg_signin"></p>
            <div className={style.form_body}>
                <form action="">
                    <div className={style.header}>Sign IN</div>
                    <div id="signin_error"></div>
                    <div className={style.form_section}>
                        <label htmlFor="email"><b>Email</b></label>
                        <input placeholder="Enter your Email" id='email' type='text' autoComplete='off' name='email'></input>
                    </div>
                    <div className={style.form_section}>
                        <label htmlFor="password"><b>Password</b></label>
                        <input placeholder="Enter your Password" id='password' type='password' autoComplete='off' name='password'></input>
                    </div>
                    <button type='submit' onClick={handleSubmit}>Submit</button>
                    <button className={style.google_signin} onClick={handleGoogleSignin}>Sign In with Google</button>
                </form>
                
                
                {isLoggedIn?
                    <div><Navigate to='/social-app/mypeople' /></div>
                    :
                    <div></div>
                }
            </div>
        </div>
            
    );
}

export default Signin;