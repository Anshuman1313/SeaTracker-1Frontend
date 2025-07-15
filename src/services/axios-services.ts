//what i am implementing axiosservice fn where i will pass the rest so that i will form the request 

import { API_URL } from "@/constant";
import axios from "axios";

export const  axios_service_get = (endpoint : string) :void => {
    axios.get(`${API_URL}/${endpoint}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);   
      });

};








