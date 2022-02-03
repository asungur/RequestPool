import React from "react";

const Request = ({ request, deleteRequest }) => {
  const handleClick = () => {
    deleteRequest(request.id)
  }

  return (
    <>
      <p>request id = {request.id}</p>
      <p>request data = {request.request_data}</p>
      <button onClick={handleClick}>Delete Request</button>
    </>

  );
}

export default Request;