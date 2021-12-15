import React from "react";
import style from './peopleCard.module.css'
import { getAuth } from "firebase/auth"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import '../../firebase'

const auth = getAuth()
const db = firebase.firestore()

async function savePerson(person) {
    const user = auth.currentUser
    if(user) {
        const userRef = db.collection('users').doc(user.uid)
        // console.log(userRef)
        var data
        await userRef.get()
        .then(snapshot => {
            data = snapshot.data()
        })
        // console.log(data.people)
        // const value = {
        //     people: [{
        //         name: 'Ankit',
        //         email: 'abcd@gmail.com',
        //         phone: '123456789',
        //         location: {
        //             street: 'adas',
        //             city: 'sdsad',
        //             state: 'sdads',
        //             country: 'dsasdasd'
        //         },
        //         picture: {
        //             large: "https://randomuser.me/api/portraits/men/55.jpg",
        //             medium: "https://randomuser.me/api/portraits/med/men/55.jpg",
        //             thumbnail: "https://randomuser.me/api/portraits/thumb/men/55.jpg"
        //         }
        //     }]
        // }

        data.people.push(person)
        db.collection('users').doc(user.uid)
        .update({
            people: data.people
        })
        // console.log(data)
    }
}

function PeopleCard(props) {
    const person = {
        name: props.name,
        email: props.email,
        picture: props.picture,
        location: props.location,
        phone: props.phone
    }
    return (

        <div className={style.card}>
            <div className={style.header}>
                <img className={style.card_img} src={props.picture.large}/>
                <div className={style.container}>
                    <p className={style.name}>{props.name.title} {props.name.first} {props.name.last}</p>
                    <p>{props.email}</p>
                    <p>{props.phone}</p>
                    <p>{props.location.city}, {props.location.state}, {props.location.country}</p>
                    <button className={style.btn} onClick={() => savePerson(person)}>Add Me</button>
                </div>
            </div>
            
        </div>
    );
}

export default PeopleCard;