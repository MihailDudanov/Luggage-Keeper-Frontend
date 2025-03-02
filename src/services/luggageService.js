// import axios from 'axios';
//
// const API_BASE_URL = 'https://localhost:8080/api/luggage';
//
// export const getAllLuggages = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching luggages', error);
//         throw error;
//     }
// };
//
// export const addLuggage = async (luggageDTO) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/add`, luggageDTO);
//         return response.data;
//     } catch (error) {
//         console.error('Error adding luggage', error);
//         throw error;
//     }
// };
//
// export const editLuggage = async (id, luggageDTO) => {
//     try {
//         const response = await axios.put(`${API_BASE_URL}/edit/${id}`)}
//