import axios from 'axios';

const api = axios.create({
  // IP no EXPO + : porta do back-end
  baseURL: 'http://192.168.31.174:3333',
});

export default api;