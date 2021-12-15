import React from "react";
import style from './mypeople.module.css'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import '../../firebase'

function PeopleCard(props) {
    return (

        <div className={style.card}>
            <div className={style.header}>
                <img className={style.card_img} src={props.picture.large}/>
                <div className={style.container}>
                    <p className={style.name}>{props.name.title} {props.name.first} {props.name.last}</p>
                    <p>{props.email}</p>
                    <p>{props.phone}</p>
                    <p>{props.location.city}, {props.location.state}, {props.location.country}</p>
                </div>
            </div>
            
        </div>
    );
}

export default PeopleCard;