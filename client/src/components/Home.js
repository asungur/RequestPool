import React from "react";
import { useNavigate } from 'react-router-dom';
import requestServices from "../services/bin";

const Home = () => {

  const navigate = useNavigate();

  const navigateToBin = () => {
    const binId = generateBin();
    navigate(`/${binId}`);
  }

  const generateBin = () => {
    return 'testID';
  }

  return (
    <div style={{textAlign: 'center'}}>
      <button onClick={navigateToBin}>Generate Bin</button>
    </div>
  )
}

export default Home