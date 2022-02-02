import { useState, useEffect } from 'react';
import requestServices from '../services/bin';
import Request from './Request';
import { useParams } from 'react-router-dom';

const Bin = () => {
  const [requests, setRequests] = useState([{id: 5, request_data: 'test data'}, {id: 6, request_data: 'test data2'}]);
  const params = useParams();
  // useEffect(() => {
  //   requestServices.getRequests(params.binId)
  //     .then(data => setRequests(data))
  // }, []);

  return (
    <div style={{textAlign: 'center'}}>
      <h2>Requests</h2>
      <h3 style={{color: 'green'}}>{params.id}</h3>
      {requests.map(request => 
        <div className='request' key={request.id} style={{marginTop: '100px'}}>
          <Request request={request} />
        </div>
      )}
    </div>
  );
}

export default Bin;