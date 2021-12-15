import {React} from "react";
import { NavLink } from 'react-router-dom'
import style from './home.module.css'

const home = (props) => {
    document.body.style.overflow = "hidden"
    return (
        <div className={style.home_container}>
            <h1>Social App</h1>
            <h2>One Stop App to Connent to People Around the World</h2>
            <br />
            <NavLink to='/social-app/mypeople'>Connect to People</NavLink>
        </div>
    )
}

export default home;