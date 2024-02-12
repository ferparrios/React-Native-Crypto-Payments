import { FormData } from "../interfaces/dataInterface";
import axios from "axios"

const cryptoApi = axios.create({
  baseURL: "https://payments.pre-bnvo.com/api/v1",
  headers:{
    'X-Device-Id': 'ee66fdeb-e2a0-4f2b-8444-c01a71fa65d8',
    'Content-Type': 'multipart/form-data'
  },
})

export const getCoins = () => {
  return cryptoApi.get(`/currencies`);
};

export const sendForm = (body: FormData) => {
  return cryptoApi.post(`/orders/`, body)
}

export const getOrderInfo = (identifier: string) => {
  return cryptoApi.get(`/orders/info/${identifier}`)
}