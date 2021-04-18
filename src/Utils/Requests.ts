import Axios from 'axios'
export  const Requests = {
    github:{
        getUserData: (username: string)=> { 
            return Axios.get(`https://api.github.com/users/${username}`)
        }
    }
}