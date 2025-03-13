import './App.css'
import Home from './Components/Home/Home'
import { BrowserRouter, Route, Routes } from 'react-router'
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


function App() {

  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/profile" element={<Profile />} />
          <Route path="/boards/about" element={<About />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/boards/popular/boards" element={<Popular_Boards />} />
          <Route path="/boards/popular/comments" element={<Popular_Comments />} />
          <Route path="/boards/random/:id" element={<Random />} />
          <Route path="/boards/:id/details" element={<Details />} />
          <Route path="*" element={<Not_Found />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
