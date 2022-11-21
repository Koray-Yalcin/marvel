import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path='/' element= { <Home></Home> }></Route>
      <Route path='/register' element= {<Register></Register>}></Route>
      <Route path='/login' element= { <Login></Login> }></Route>
   </Routes>
  );
}

export default App;
