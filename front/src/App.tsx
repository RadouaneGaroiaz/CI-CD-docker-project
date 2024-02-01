
import Login from "./signups/signup-2/Login";
import { Routes, Route, Router } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      
      <Routes>
      <Route path="/" element={<Login />} />
      </Routes>
   
    </div>
  );
}

export default App;
