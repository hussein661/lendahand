import Axios from 'axios'

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


