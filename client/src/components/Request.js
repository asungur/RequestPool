import React from "react";

const Request = ({ request }) => {
  return (
    <>
      <p>request id = {request.id}</p>
      <p>request data = {request.request_data}</p>
    </>

  );
}

export default Request;