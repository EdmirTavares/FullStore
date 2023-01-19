import {Routes, Route} from 'react-router-dom';
import Supplier from '../pages/Supplier';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import AppTest from '../layout/test';

function AppRoutes(){
  return <Routes>
    <Route path='/' element={<Home />}></Route>
    <Route path='/test' element={<AppTest />}></Route>
    <Route path='/:supplier' element={<Supplier />}></Route>
    <Route path='/login' element={<LoginPage />}></Route>
  </Routes>
}

export default AppRoutes;