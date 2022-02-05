import React from 'react';

const Home = ({ handleGenerate }) => {

  return (
    <div style={{textAlign: 'center'}}>
      <p>Welcome to RequestPool app, please generate a pool to start</p>
      <button onClick={() => handleGenerate()}>Generate Bin</button>
    </div>
  )
}

export default Home;
