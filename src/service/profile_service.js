import axios from 'axios'

const apiUrl = "http://127.0.0.1:8080/api/v1"

export function getProfiles(count, numberOfPage, filter) {
    return axios
        .get(apiUrl + "/profiles?page=" + numberOfPage + "&size=" + count, {
            params: {
                city: filter?.city,
                ageMin: filter?.ageMin,
                ageMax: filter?.ageMax,
                gender: filter?.gender,
                name: filter?.name,
                description: filter?.description
            }
        })
        .then(result => {
            return result.data
        })
}

export function getProfileById(id) {

    return axios
        .get(apiUrl + "/profile/" + id)
        .then(result => {
            return result.data
        })
}

export function getMediaByProfileId(profileId) {
    return axios
        .get(apiUrl + "/media/" + profileId)
        .then(result => {
            return result.data
        })
}
