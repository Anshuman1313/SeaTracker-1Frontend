//what i am implementing axiosservice fn where i will pass the rest so that i will form the request 

import { API_URL } from "@/constant";
import axios from "axios";

export const  axios_service_get = async (endpoint : string)  => {
  

      try{
        const res = await axios.get(`${API_URL}/${endpoint}`,{
          headers:{
            Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3RyaW5nIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJVc2VySWQiOiIxIiwiZXhwIjoxNzUyNjQ4NzQ3LCJpc3MiOiJZb3VySXNzdWVyIiwiYXVkIjoiWW91ckF1ZGllbmNlIn0.n6U2UFla41KibshYQV6tj0rPN8lW7HrzGbNn35YVSOM'
          }
        })
        console.log(res);
        return res;
      }
      catch(e){
        console.log(e)
      }

};








