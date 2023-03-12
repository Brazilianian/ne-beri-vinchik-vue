import axios from "axios";

export function getCities() {
    return axios.get('/cities')
        .then(re => {
            return re.data
        })
}

export function getGenders() {
    return axios.get('/genders')
        .then(re => {
            return re.data
        })
}