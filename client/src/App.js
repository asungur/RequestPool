import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Bin from './components/Bin';
import Home from './components/Home';

const App = () => {
  
  return (
    <div>
      <header className="App" style={{textAlign: 'center', marginBottom: '100px'}}>
        <p>some links here probably</p>
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
        <p>maybe some more links here</p>
      </footer>
    </div>
  );
}

export default App;
