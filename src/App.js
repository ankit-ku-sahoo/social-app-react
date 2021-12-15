import Navbar from './components/navbar/navbar'
import SignUp from './components/signup/signup'
import Signin from './components/signin/signin'
import People from './components/people/people'
import MyPeople from './components/mypeople/mypeople'
import Profile from './components/profile/profile';
import Home from './components/home/home'
import {
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import {React,useState} from 'react';
import './firebase'

// git remote add origin https://github.com/ankit-ku-sahoo/social-app.git

const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false)
  function login() {
    setisLoggedIn(true)
  }

  function logout() {
    setisLoggedIn(false)
  }

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} logout={logout}/>

      <Routes>
        <Route exact path='/social-app' element={<Home />}></Route>
        <Route exact path='/social-app/profile' element={<Profile isLoggedIn={isLoggedIn}/>}></Route>
        <Route exact path='/social-app/people' element={<People/>}></Route>
        <Route exact path='/social-app/mypeople' element={<MyPeople isLoggedIn={isLoggedIn}/>}></Route>
        <Route exact path='/social-app/signup' element={< SignUp login={login}/>}></Route>
        <Route exact path='/social-app/signin' element={< Signin login={login}/>}></Route>
      </Routes>
        
      
    </div>
  );

  
}

export default App;
