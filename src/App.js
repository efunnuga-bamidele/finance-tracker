import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';


//pages & components
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';

function App() {
  const { authIsReady, user } = useAuthContext()
  // const redirect = useNavigate()

  //Edit the route to have a redirect
  return (
    <div className="App">
    {authIsReady && (
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to='/login' />}></Route>
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />}></Route>
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />}></Route>
        </Routes>
      </BrowserRouter>
      )}
    </div>
  );
}

export default App;
