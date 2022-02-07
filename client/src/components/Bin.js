import React, { useEffect } from 'react';
import Request from './Request';
import { useParams, useSearchParams } from 'react-router-dom';

const Bin = ({ binId, requests, onDelete, handleIdChange, handleNoInspect }) => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (id !== binId) {
      handleIdChange(id);
    }
    if (!searchParams.get("inspect")) {
      handleNoInspect(id);
      setSearchParams({"inspect": true});
    }
  });


  return (
    <div className="flex flex-col items-center">
      <div className="flex-auto pt-12 pb-2 max-w-screen-lg">
        <p className="text-3xl text-black">Pool URL</p>
      </div>
      <div className="flex-auto pb-8 max-w-screen-lg">
        <input
          className="disabled:bg-white text-2xl text-blue3 border-2 border-blue3 rounded-md px-4 py-2"
          type="text"
          disabled
          value={`localhost:3001/${id}`}
        >
        </input>
      </div>
      <div className="flex-auto pt-8 pb-2 max-w-screen-lg">
        <p className="text-3xl text-black">Requests</p>
      </div>
      <div className="flex-auto max-w-screen-lg">
        {requests.map(request =>
          <Request key={request.id} request={request} deleteRequest={onDelete} />
        )}
      </div>
    </div>
  );
}

export default Bin;
