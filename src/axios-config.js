import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://where-to-run-svistel.firebaseio.com'
});

export default instance;