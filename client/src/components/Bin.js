import Request from './Request';
import { useParams } from 'react-router-dom';

const Bin = ({ binId, requests, onDelete, handleIdChange }) => {
  const { id } = useParams();

  if (id !== binId) {
    handleIdChange(id);
  }

  return (
    <div style={{textAlign: 'center'}}>
      <h2>Requests</h2>
      <h3 style={{color: 'green'}}>Bin URL: {binId}</h3>
      {requests.map(request => 
        <div className='request' key={request.id} style={{marginTop: '100px'}}>
          <Request request={request} deleteRequest={onDelete} />
        </div>
      )}
    </div>
  );
}

export default Bin;
