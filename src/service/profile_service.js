import axios from 'axios'
const apiUrl = "https://ne-beri-vinchik-rest.web.app/api/v1"

export function getProfiles(count, pageNumber, filter) {
    return axios
        .get(apiUrl + "/profiles", {
            params: {
                city: filter?.city,
                ageMin: filter?.ageMin,
                ageMax: filter?.ageMax,
                gender: filter?.gender,
                name: filter?.name,
                description: filter?.description,
                limit: count,
                pageNumber: pageNumber
            }
        })
        .then(result => {
            return result.data
        })
}

export function getProfileById(id) {
    return axios
        .get(apiUrl + "/profiles/" + id)
        .then(result => {
            return result.data
        })
}


