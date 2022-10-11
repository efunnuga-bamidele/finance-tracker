import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';


//pages & components
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';

function App() {
  const { authIsReady } = useAuthContext()
  return (
    <div className="App">
    {authIsReady && (
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
      )}
    </div>
  );
}

export default App;
