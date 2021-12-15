import {React,useState} from "react";
import style from './signup.module.css'
import  { Navigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import '../../firebase'

const db = firebase.firestore()

const Signup = (props) => {
    const [isLoggedIn, setisLoggedIn] = useState(false)
    function handleSubmit(e) {
        e.preventDefault();
        // console.log('You submitted successfully', e)

        const name = document.getElementById('fullname').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        
        addUser(name,email,password)
        // if(user) {
        //     navigate('/')
        // }
        // console.log(user)
    }

    const addUser = (name, email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // console.log(user)
            // ...
            document.getElementById('signup_error').innerHTML = 'Signup Successful'

            updateProfile(auth.currentUser, {
                displayName: name
            }).then((user) => {
                // console.log(user)
            }).catch((error) => {
                // An error occurred
                // ...
            });

            const value = {
                people: []
            }
            db.collection('users').doc(user.uid).set(value)
            setisLoggedIn(true)
            props.login()
        })
        .catch((error) => {
            const errorCode = error.code;
            // const errorMessage = error.message;
            document.getElementById('signup_error').innerHTML = errorCode
            // console.log(errorMessage)
            return null
            // ..
        });
    }
    document.body.style.overflow = "hidden"
    return (
        <div className={style.form_container}>
            <div id="show_msg"></div>
            <div className={style.form_body}>
                <form action="">
                    <div className={style.header}>Sign UP</div>
                    <div id="signup_error"></div>
                    <div className={style.form_section}>
                        <label htmlFor="fullname"><b>Full Name</b></label>
                        <input id='fullname' placeholder="Enter your Full Name" autoComplete='off' type='text' autoComplete='off' name='fullname'></input>
                    </div>
                    <div className={style.form_section}>
                        <label htmlFor="email"><b>Email</b></label>
                        <input id='email' placeholder="Enter your Email" type='email' autoComplete='off' name='email'></input>
                    </div>
                    <div className={style.form_section}>
                        <label htmlFor="password"><b>Password</b></label>
                        <input id='password' placeholder="Enter your Password" type='password' autoComplete='off' name='password'></input>
                    </div>
                    <button type='submit' onClick={handleSubmit}>Submit</button>
                </form>


                {isLoggedIn?
                    <div><Navigate to='/social-app/mypeople' /></div>
                    :
                    <div></div>
                }
            </div>
        </div>
    )
}

export default Signup;