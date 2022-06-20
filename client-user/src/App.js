import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './views/home';
import JobDetail from './views/jobDetail';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Routes> 
        <Route index path="/" element={<Home/>}></Route>
        <Route index path="/:id" element={<JobDetail/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
