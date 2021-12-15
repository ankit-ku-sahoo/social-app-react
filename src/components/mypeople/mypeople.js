import React from "react";
import { getAuth,signOut } from "firebase/auth"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import '../../firebase'
import PeopleCard from "./myprofile_card";
import style from './mypeople.module.css'
import { Navigate } from "react-router";


const auth = getAuth()
const db = firebase.firestore()

class People extends React.Component {
    constructor() {
        super()
        this.state={
            person: [],
            isLoading: true
        }
    }

    signout() {
        signOut(auth).then(() => {
            // Sign-out successful.
            this.setState({
                person: [],
            })
        }).catch((error) => {
        // An error happened.
        });

    }

    componentDidMount() {
        if(auth.currentUser){
            db.collection('users').doc(auth.currentUser.uid).get()
            .then((snapshot) => {
                const data = snapshot.data()
                console.log(data)
                this.setState({
                    people: data.people,
                    isLoading:false
                })
            })
        }
    }
    render() {
        document.body.style.overflowY = "scroll"
        document.body.style.overflowX = "hidden"
        const {isLoading,people}=this.state
        console.log(people)
        return (
            <div>
                
                {this.props.isLoggedIn?
                (
                    <div className={style.mypeople_wrap}>
                        {/* <button onClick={() => this.signout()}>Signout</button> */}
                        {/* {user.email} */}
                        {isLoading?
                        (<div className={style.text}>Loading</div>)
                        :
                        (
                        <div>
                            
                        {people.length>0?
                        <div className={style.container_cards}>
                            <h1 className={style.heading}>My People</h1>
                            {people.map((person) => <PeopleCard 
                                name={person.name}
                                email={person.email}
                                location={person.location}
                                picture={person.picture}
                                phone={person.phone}
                                key={person.phone}
                            />)}
                        </div>
                        :
                        <div className={style.container_cards}>
                            <h1 className={style.heading}>People</h1>
                            No person added yet</div>}
                            
                        </div>)
                        }
                        
                    </div>
                )
                :(
                    <>
                    <div>Please Login</div>
                    <Navigate to='/social-app/signin' />
                    </>
                    
                )
                }
            </div>
        )
    }
    
}


export default People