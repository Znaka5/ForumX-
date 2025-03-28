import './App.css'
import Home from './Components/Home/Home'
import Register from './Components/User/Register'
import Login from './Components/User/Login'
import Profile from './Components/User/Profile'
import About from './Components/Board/About'
import Boards from './Components/Board/Boards'
import Popular_Boards from './Components/Popular/Popular-Boards'
import Popular_Comments from './Components/Popular/Popular-Comments'
import Random from './Components/Board/Random'
import Details from './Components/Board/Details'
import Not_Found from './Components/Board/404'
import Create from './Components/User/Create'

import { Navigate, Route, Routes } from 'react-router'
import { useContext } from 'react'
import Profile_Edit from './Components/User/Profile-Edit'
import Edit_Board from './Components/Board/Edit'
import MyContext from './Components/Context/Context'
import useLocalStorage from './Components/hooks/localStorage'
import Comment_edit from './Components/Board/editComment'

function App() {
   const [user, setUser, Logout] = useLocalStorage("user", null);
  const { err, setError, type, setType, navigator } = useContext(MyContext)

  const registered = async (ev) => {
    ev.preventDefault();

    const userData = Object.fromEntries(new FormData(ev.currentTarget))

    const request = await fetch("http://localhost:5000/users/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    })

    const data = await request.json()

    if (data.recievedData !== "error") {
      setUser(data.recievedData)
    } else {
      const message = data.message

      if (type === "fade") {
        setType("")
      }

      setError(message)
    }
  }

  const login = async (ev) => {
    ev.preventDefault();

    const userData = Object.fromEntries(new FormData(ev.currentTarget))

    const request = await fetch("http://localhost:5000/users/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    })

    const data = await request.json()

    if (data.recievedData !== "error") {
      const obj = data.obj

      setUser(obj)
    } else {
      const message = data.message

      if (type === "fade") {
        setType("")
      }

      setError(message)
    }
  }

  const create = async (ev) => {
    ev.preventDefault();

    let userData = Object.fromEntries(new FormData(ev.currentTarget))

    userData.owner = user.username
    userData.owner_id = user._id


    try {
      await fetch("http://localhost:5000/users/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })

      navigator("/boards")
    } catch (err) {
      navigator("/boards")
    }
  }

  const editProfile = async (ev) => {
    ev.preventDefault();

    let userData = Object.fromEntries(new FormData(ev.currentTarget))
    userData._id = user._id

    try {
      const request = await fetch("http://localhost:5000/users/profile-edit", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })

      const data = await request.json()
      const tokenData = data.recievedData

      if (tokenData !== "error") {
        setUser(tokenData)
        navigator("/users/profile")
      } else {
        const message = data.message

        if (type === "fade") {
          setType("")
        }

        setError(message)
      }

    } catch (err) {

      if (type === "fade") {
        setType("")
      }

      setError("Something went wrong :|")
    }
  }

  const errorClose = () => {
    setType("fade")
  }

  const logout = () => {
    Logout()
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home user={user} onLogout={logout} />} />
        <Route path="/users/register" element={user !== null ? <Navigate to="/" /> : <Register onRegister={registered} show={errorClose}/>} />
        <Route path="/users/login" element={user !== null ? <Navigate to="/" /> : <Login onlogin={login} error={err} show={errorClose} type={type} />} />
        <Route path="/users/profile" element={user === null ? <Navigate to="/404" /> : <Profile user={user} />} />
        <Route path="/users/create" element={user === null ? <Navigate to="/404" /> : <Create onCreate={create} />} />
        <Route path="/user/:id/edit-profile" element={!user ? <Navigate to="/404" /> : <Profile_Edit onEdit={editProfile} error={err} show={errorClose} type={type} />} />
        <Route path="/boards/:id/edit-comment" element={!user ? <Navigate to="/404" /> : <Comment_edit error={err} user={user} navigate={navigator} />} />
        <Route path="/boards/about" element={<About />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/popular/boards" element={<Popular_Boards />} />
        <Route path="/boards/popular/comments" element={<Popular_Comments />} />
        <Route path="/boards/random/:id" element={<Random user={user} navigate={navigator} />} />
        <Route path="/boards/:id/details" element={<Details user={user} navigate={navigator} />} />
        <Route path="/boards/:id/edit" element={<Edit_Board user={user} error={err} show={errorClose} />} />
        <Route path="/404" element={<Not_Found />} />
        <Route path="*" element={<Not_Found />} />
      </Routes>
    </>
  )
}

export default App
