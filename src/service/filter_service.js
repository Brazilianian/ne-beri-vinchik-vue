import axios from "axios";

const apiUrl = "http://127.0.0.1:8080/api/v1"

export function getCities() {
    return axios.get(apiUrl + '/cities')
        .then(re => {
            return re.data
        })
}

export function getGenders() {
    return axios.get(apiUrl + '/genders')
        .then(re => {
            return re.data
        })
}