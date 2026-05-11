import { BrowserRouter,Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home';
import About from './pages/About';
import RegisterPage from './pages/RegisterPage';
import Login from './pages/Login';
import Map from './pages/Map';
import { PublicOnlyRoute,PrivateRoute } from './context/RouteWrapper';
import Profile from './pages/ProfilePage';
import MyReports from './pages/MyReports';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
      
        <Route path="/map" element={<Map/>} />
      
        {/* Add more routes here */}
        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/my-reports" element={<MyReports/>} />
        </Route>
        <Route element={<PublicOnlyRoute/>}>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<RegisterPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;