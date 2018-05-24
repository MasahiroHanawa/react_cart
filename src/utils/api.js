import axios from 'axios';

const apiClient = () => {
  const apiInfo = axios.create({
    baseURL: 'https://private-3efa8-products123.apiary-mock.com',
    timeout: 100000,
  });
  return apiInfo;
};

export default apiClient;
