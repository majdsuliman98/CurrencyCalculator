import { useState } from 'react'
import './styles/App.css'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <main className='App'>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </Router>
    </main>
  )
}

export default App
