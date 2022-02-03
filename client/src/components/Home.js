import React from 'react';
import { useNavigate } from 'react-router-dom';
import binServices from '../services/bin';

const Home = () => {
  const navigate = useNavigate();

  const navigateToBin = () => {
    binServices.generateBin()
      .then((binId) => navigate(`/${binId}`));
  }

  return (
    <div style={{textAlign: 'center'}}>
      <button onClick={navigateToBin}>Generate Bin</button>
    </div>
  )
}

export default Home;