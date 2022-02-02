import axios from 'axios';
const baseUrl = '/api';

const getRequests = async (bin_id) => {
    const bins = await axios.get(`${baseUrl}/${bin_id}`);
    return bins.data;
}

const deleteRequest = async (bin_id, request_id) => {
    const url = `${baseUrl}/${bin_id}/${request_id}`;
    const response = await axios.delete(url);
    return response;
}

const requestServices = {
    getRequests,
    deleteRequest
};

export default requestServices;

