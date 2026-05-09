import { BrowserRouter,Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home';
import About from './pages/About';
import RegisterPage from './pages/RegisterPage';
import Login from './pages/Login';
import Map from './pages/Map';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/map" element={<Map/>} />
        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;