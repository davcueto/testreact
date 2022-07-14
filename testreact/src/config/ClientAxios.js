import axios from 'axios';

const clientAxios = axios.create({
  baseURL: 'https://atlantia-dev-test.herokuapp.com'
});

export default clientAxios;
