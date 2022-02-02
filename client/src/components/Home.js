import React from 'react';
import { useNavigate } from 'react-router-dom';
import requestServices from '../services/bin';

const Home = () => {
  const navigate = useNavigate();

  const navigateToBin = () => {
    requestServices.generateBin()
      .then((binId) => navigate(`/${binId}`));
  }

  return (
    <div style={{textAlign: 'center'}}>
      <button onClick={navigateToBin}>Generate Bin</button>
    </div>
  )
}

export default Home;