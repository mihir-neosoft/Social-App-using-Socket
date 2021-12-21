import axios from 'axios';
import { MAIN_URL } from './URL';

export function registeruser(data) {
    return axios.post(`${MAIN_URL}auth/register`, data);
}
export function login(data) {
    return axios.post(`${MAIN_URL}auth/login`, data);
}
export function getalluserpost(data) {
    return axios.post(`${MAIN_URL}post/mypost/all`, data);
}
export function getpost(id) {
    return axios.get(`${MAIN_URL}post/${id}`);
}
export function commentonpost(id,data) {
    return axios.put(`${MAIN_URL}post/${id}/addcomment`,data);
}