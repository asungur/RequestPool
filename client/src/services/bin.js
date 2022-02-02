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

//generate bin
const generateBin = async () => {
    return 'testId';
    // const response = await axios.get(baseUrl);
    // return response;
}

const requestServices = {
    getRequests,
    deleteRequest,
    generateBin
};

export default requestServices;

