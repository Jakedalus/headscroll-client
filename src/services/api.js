import axios from 'axios';

export function setTokenHeader(token) {
  console.log('setTokenHeader', token);
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export function apiCall(method, path, data) {
  console.log('apiCall', method, path, data);
  return new Promise((resolve, reject) => {
    console.log('what');
    return axios[method](path, data)
      .then(res => {
        console.log('apiCall, res:', res);
        return resolve(res.data)})
      .catch(err => {
        console.log('apiCall, err:', err, err.response);
        return reject(err.response.data.error)});
  });
}