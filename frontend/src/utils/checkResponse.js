import Axios from 'axios'

const API_TOKEN = localStorage.getItem("API_TOKEN");
Axios.defaults.headers.common["Authorization"] = API_TOKEN;
// Axios.defaults.headers.common["Content-Type"] = 'application/json'

export default  function checkResponse (url,method,data){
    return Axios({
        url,
        method,
        data
    }).then(result =>{
        return result
    }
    ).catch(error =>{console.info(error.response)
        if(error.response.status == 401){
            if(error.response.data.error.name == "TokenExpiredError"){
                alert("session expired")
                localStorage.clear()
                return
            }
           return error
        }
        if(error.response.status == 400){
            return error
        }
        if(error.response.status == 404){
            return error
        }
        if(error.response.status == 422){
            return error
        
    }})
}


