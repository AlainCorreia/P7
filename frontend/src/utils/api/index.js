import axios from 'axios';
import { API_BASE_PATH } from '../constants';

export const api = axios.create({
  baseURL: API_BASE_PATH,
  withCredentials: true,
});
