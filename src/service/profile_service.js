const collectionName = "profiles"


export async function getProfiles(count, numberOfPage, filter) {
    let profiles = []

    const queryConstraints = []

    if (filter) {
        if (filter.ageMin && filter.ageMin !== 0) {
            queryConstraints.push(where("age", ">=", filter.ageMin))
        }
        if (filter.ageMax && filter.ageMax !== 0) {
            queryConstraints.push(where("age", "<=",
                filter.ageMax < filter.ageMin
                    ? filter.ageMin
                    : filter.ageMax))
        }
        if (filter.gender) {
            queryConstraints.push(where("gender", "==", filter.gender))
        }
        if (filter.city) {
            queryConstraints.push(where("city_were_found", "==", filter.city))
        }
        if (filter.name && filter.name !== "") {
            queryConstraints.push(where("name", "==", filter.name))
        }
    }



    return profiles;
}

export async function getProfileById(id) {

}

export function getProfilesCount() {

}


