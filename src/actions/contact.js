import axios from '../config/axios';
// import * as url from '../enums/url';
import {
  GET_CONTACT
} from '../enums/mutations'

export const getData = () =>{
  return async dispatch => {
    const {data} = (await axios.get(`/contact`)).data;
    dispatch({
      type: GET_CONTACT,
      payload: { data }
    })
  }
}
export const postData = (newData) =>{
  return async dispatch => {
    const {data} = (await axios.post(`/contact`,newData)).data;
    getData();
  }
}
export const updateData = (newData) =>{
  return async dispatch => {
    const {data} = (await axios.put(`/contact`,newData)).data;
    getData();
  }
}
export const deleteData = (id) =>{
  return async dispatch => {
    const {data} = (await axios.delete(`/contact`, id)).data;
  }
}