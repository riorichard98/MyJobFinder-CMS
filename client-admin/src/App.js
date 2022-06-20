import CompanyList from './views/companyList.js'
import './App.css';
import { Routes, Route } from "react-router-dom";
import Job from './views/jobList.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './views/loginPage.js';
import RequireAuth from './views/requireAuth.js';
import RegisterPage from './views/registerPage.js';

function App() {
  return (
    <div className="App p-2">
      <div>
        <Routes>
            <Route index path="/companies" element={<RequireAuth> <CompanyList /> </RequireAuth>}></Route>
            <Route index path="/" element={<RequireAuth> <Job /> </RequireAuth>}></Route>
            <Route index path="/login" element={<Login />}></Route>
            <Route index path="/register"element={<RequireAuth> <RegisterPage /> </RequireAuth>}></Route>
        </Routes>
      </div>


    </div>
  );
}

export default App;
