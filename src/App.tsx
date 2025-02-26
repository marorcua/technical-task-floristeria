/** @format */
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from './pages/Home'
import Header from './components/Header'
import { ProductDetail } from './pages/ProductDetail'

function App() {
  return (
    <Router>
      <div className='grid grid-cols-1 grid-rows-[auto_1fr] min-h-dvh'>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path='/product/:id' element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
