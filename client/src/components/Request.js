import React from "react";

const Request = ({ request, deleteRequest }) => {
  const handleClick = () => {
    deleteRequest(request.id)
  }
  let headerArr = [];

  for (const [key, value] of Object.entries(request.content.headers)) {
    headerArr = headerArr.concat({ title: key, value: value })
  }

  return (
    <div className="flex flex-col items-center max-w-screen-lg">
      <div className='py-4 px-32' key={request.id}>
        <div className="py-8 px-16  bg-white rounded-xl border-4 border-blue3 text-black2">
          <p className="text-lg"><span className="font-semibold">Method: </span>{request.content.method}</p>
          <p className="text-lg"><span className="font-semibold">Url: </span>{request.content.url}</p>
            <div>
              <p className="text-xl">Headers:</p>
              {headerArr.map(header =>
                <p key={header.title} className="text-lg"><span className="font-semibold">{header.title}: </span>{header.value}</p>
              )}
            </div>
            <button
              className="mt-6 rounded-md bg-blue3 text-white py-2 px-4 text-xs hover:bg-blue1"
              onClick={handleClick}
            >
              Delete Request
            </button>
        </div>
      </div>
    </div>
  );
}

export default Request;
