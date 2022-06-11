import axios from 'axios';

// const baseURL = 'http://192.168.0.210';
const baseURL = 'http://192.168.0.6';
const port = 3333;

const api = axios.create({
  baseURL: `${baseURL}:${port}`,
});

export default api;
