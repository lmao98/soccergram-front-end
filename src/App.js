import React from 'react'
import './App.css';
import Nav from './components/Nav'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Landing from './pages/Landing'
import FriendsList from './pages/FriendsList'
import CreateAPost from './pages/CreateAPost'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import { CheckSession } from './services/Auth'
import UpdateAPost from './pages/UpdateAPost';

const App = () => {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  console.log(process.env.NODE_ENV, 'Node Environment')

  const checkToken = async () => {
    const user = await CheckSession();
    setUser(user);
    toggleAuthenticated(true);
  }

  const handleLogOut = () => {
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      <Nav
        authenticated={authenticated}
        user={user}
        handleLogOut={handleLogOut}
      />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn
            setUser={setUser}
            toggleAuthenticated={toggleAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home
            user={user}
            authenticated={authenticated} />} />
          <Route path="/create_post" element={<CreateAPost
            user={user} />} />
          <Route path="/:post_id" element={<UpdateAPost />} />
          <Route path="/profile/:user_id" element={<Profile
            user={user} />} />
          <Route path="/profile/:user_id/friendsList" element={<FriendsList />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
