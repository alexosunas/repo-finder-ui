import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: "https://gain5ozhcl.execute-api.us-east-1.amazonaws.com/dev",
    headers: {
        "Content-type": "application/json",
    },
});

export default apiClient;