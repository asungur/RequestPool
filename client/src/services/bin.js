import axios from 'axios';
const baseUrl = '/bins';

// get all requests for a bin
const getRequests = async (bin_id) => {
  const config = { headers: { 'Accept': 'application/json' } };
  const bins = await axios.get(`${baseUrl}/${bin_id}`, config)
    .catch(e => console.log(e));
  return bins.data;
}

// delete request
const deleteRequest = async (request_id) => {
  const url = `${baseUrl}/${request_id}`;
  const response = await axios.delete(url)
    .catch(e => console.log(e));
  return response;
}

// generate bin
const generateBin = async () => {
  const response = await axios.post(baseUrl)
    .catch(e => console.log(e));
  return response.data;
}

// create request
const generateRequest = async (bin_id) => {
  const url = `/requests/${bin_id}`
  const response = await axios.get(url)
    .catch(e => console.log(e));
  return response
}

const binServices = {
    getRequests,
    deleteRequest,
    generateBin,
    generateRequest
};

export default binServices;
