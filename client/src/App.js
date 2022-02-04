import './index.css';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Bin from './components/Bin';
import Home from './components/Home';

const App = () => {
  const [requests, setRequests] = useState([]);
  const [bin, setBin] = useState(null);


  return (
    <div>
      <header className="App" style={{textAlign: 'center', marginBottom: '100px'}}>
        <h1>Request Pool</h1>
      </header>
      <Router>
        <Routes>
          <Route path='/:id' element={<Bin />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
      <footer style={{textAlign: 'center', marginTop: '100px'}}>
        <p>Created by Team Dummy Heads</p>
      </footer>
    </div>
  );
}

export default App;
