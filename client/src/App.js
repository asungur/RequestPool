import './index.css';
import { useState } from 'react';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import Bin from './components/Bin';
import Home from './components/Home';
import binService from './services/bin';

const App = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [binId, setBinId] = useState(null);

  const handleDeleteRequest = (requestId) => {
    binService.deleteRequest(requestId)
      .then(_ => setRequests(requests.filter(request => request.id !== requestId)));
  }

  const handleGenerateBin = () => {
    binService.generateBin()
      .then(createdBin => {
        setBinId(createdBin.hash);
        navigate(`/${createdBin.hash}`);
      })
  }

  const parseUrlId = (id) => {
    binService.getRequests(id)
      .then(requests => {
        setBinId(id);
        setRequests(requests);
      })
  }

  return (
    <div>
      <header className="App" style={{textAlign: 'center', marginBottom: '100px'}}>
        <h1>Request Pool</h1>
      </header>
      <Routes>
        <Route path='/:id' element={
          <Bin
            binId={binId}
            requests={requests}
            handleDelete={handleDeleteRequest}
            handleIdChange={parseUrlId}
          />
        }/>
        <Route path='/' element={
          <Home handleGenerate={handleGenerateBin} />
        }/>

      </Routes>
    </div>
  );
}

export default App;
