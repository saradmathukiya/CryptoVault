import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Coinpage from './pages/Coinpage';

function App() {
  return (
    <div className='wrapper'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/coin/:id' element={<Coinpage/>} />
      </Routes>
    </div>
    
  );
}

export default App;
