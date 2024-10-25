import axios from 'axios';

const BASE_URL = 'https://64d63928754d3e0f1361cb3d.mockapi.io/api/v1';

export const fetchItem = async (endpoint: string) => {
	const res = await axios.get(`${BASE_URL}/${endpoint}`);
	return res.data;
};

export const addItem = async (endpoint: string, data: any) => {
	const res = await axios.post(`${BASE_URL}/${endpoint}`, data);
	return res.data;
};

export const updateItem = async (endpoint: string, id: string, data: any) => {
	const res = await axios.put(`${BASE_URL}/${endpoint}/${id}`, data);
	return res.data;
};

export const deleteItem = async (endpoint: string, id: string) => {
	const res = await axios.delete(`${BASE_URL}/${endpoint}/${id}`);
	return res.data;
};
