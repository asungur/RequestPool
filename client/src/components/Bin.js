import { useState, useEffect } from 'react';
import requestServices from '../services/bin';
import Request from './Request';
import { useParams } from 'react-router-dom';

const Bin = () => {
  const [requests, setRequests] = useState([]);
  const params = useParams();
  // const binFound = true;
  useEffect(() => {
    requestServices.getRequests(params.id)
      .then(data => setRequests(data))
  }, [params.id]);

  const onDelete = async (requestId) => {
    await requestServices.deleteRequest(requestId);
    setRequests(requests.filter(request => request.id !== requestId));
  }

  return (
    <div style={{textAlign: 'center'}}>
      <h2>Requests</h2>
      <h3 style={{color: 'green'}}>{params.id}</h3>
      {requests.map(request => 
        <div className='request' key={request.id} style={{marginTop: '100px'}}>
          <Request request={request} deleteRequest={onDelete} />
        </div>
      )}
    </div>
  );
}

export default Bin;
