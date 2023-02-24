import axios from "axios";

const apiUrl = "https://europe-central2-ne-beri-vinchik.cloudfunctions.net/api"

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