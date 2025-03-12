import './App.css'
import Home from './Components/Home/Home'
import { BrowserRouter, Route, Routes } from 'react-router'
import Register from './Components/User/Register'
import Login from './Components/User/Login'
import Profile from './Components/User/Profile'
import About from './Components/Board/About'


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
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
