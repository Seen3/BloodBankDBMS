import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import SignUp from './pages/signup';
import Signin from './pages/signin';
import './App.css';
import NotFound from './pages/404';
import Disp from './pages/mainpage';
import Admin from './pages/admin';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/main' element={<Disp/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path ='/*' element={<NotFound/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
