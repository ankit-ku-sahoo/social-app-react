import React from "react";
import styles from './navbar.module.css'
import { NavLink } from 'react-router-dom'
import logo from '../../img/logo.png'
import { getAuth, signOut } from "firebase/auth"
import '../../firebase'

const auth = getAuth()



class Navbar extends React.Component {
    constructor() {
        super()
        this.state={
            user: auth.currentUser,
            isLoggedIn: auth.currentUser?true:false
        }
    }
    signout() {
        console.log(this.props.isLoggedIn)
        signOut(auth).then(() => {
            // Sign-out successful.
            this.setState({
                user: null,
                isLoggedIn: !this.state.isLoggedIn
            })
            this.props.logout()
        }).catch((error) => {
        // An error happened.
        });
    }

    componentDidUpdate(nextProps, nextState) {
        console.log('Component did update is called')
        if(this.state.user !== auth.currentUser) {
            this.setState({
                user: auth.currentUser,
                isLoggedIn: auth.currentUser?true:false
            })
        }
    }
    render() {
        // const user = auth.currentUser
        return (
            <div className={styles.navbar}>
                <div className={styles.navbar_container}>
                    <div className={styles.contents}>
                        <img className={styles.logo} src={logo} />
                        <NavLink className={styles.nav_btn} to='/social-app'>Home</NavLink>
                        <NavLink className={styles.nav_btn} to='/social-app/people'>People</NavLink>
                        <NavLink className={styles.nav_btn} to='/social-app/mypeople'>My People</NavLink>
                    </div>
                    
                    <div className={styles.profile_container}>
                        {this.props.isLoggedIn?
                        <ul className={styles.profile}>
                            <NavLink className={styles.nav_btn} to='/social-app/profile'>My Profile</NavLink>
                            <NavLink className={styles.nav_btn} to='/social-app/signin'onClick={this.signout}>Signout</NavLink>
                        </ul>
                        :
                        <ul className={styles.profile}>
                            <li><NavLink className={styles.nav_btn} to="/social-app/signin">SignIn</NavLink></li>
                            <li><NavLink className={styles.nav_btn} to="/social-app/signup">SignUp</NavLink></li>
                        </ul>
                        }
                    </div>
                </div>
            </div>
        );
    }
    
}
  
  export default Navbar;