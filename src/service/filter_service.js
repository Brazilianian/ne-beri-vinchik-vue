import axios from "axios";

const apiUrl = "https://ne-beri-vinchik-rest.web.app/api/v1"

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