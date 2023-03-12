import axios from 'axios'

export function getProfiles(count, pageNumber, filter) {
    return axios
        .get("/profiles", {
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
        .get("/profiles/" + id)
        .then(result => {
            return result.data
        })
}


