import React from 'react';

const Home = ({ handleGenerate }) => {

  return (
    <div className="flex flex-col items-center">
      <div className="flex-auto py-16 max-w-screen-lg">
        <p className="text-2xl text-black">Welcome to Request Pool app, please generate a pool to start</p>
      </div>
      <button
        className="rounded-md bg-blue3 text-white py-4 px-12 text-xl hover:bg-blue1"
        onClick={() => handleGenerate()}
      >
        Generate Bin
      </button>
    </div>
  )
}

export default Home;
