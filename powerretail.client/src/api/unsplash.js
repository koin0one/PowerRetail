import axios from 'axios';


export const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com',
});
