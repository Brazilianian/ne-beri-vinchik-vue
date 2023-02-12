import db from "@/firebase";
import {
    collection,
    getDocs,
    query,
    where,
    limit,
    doc,
    getDoc,
    getCountFromServer,
    collectionGroup,
    startAt,
    endAt
} from "firebase/firestore"

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

    queryConstraints.push(limit(count))

    let profilesRef = query(collection(db, collectionName), ...queryConstraints)
    const querySnap = await getDocs(profilesRef)

    querySnap.forEach((doc) => {
        let profile = doc.data();
        profile.id = parseInt(doc.id);
        profiles.push(profile)
    })

    return profiles;
}

export async function getProfileById(id) {
    const profileRef = doc(db, collectionName, id.toString())
    const profileDoc = await getDoc(profileRef)

    let profile = profileDoc.data()
    profile.id = profileDoc.id
    return profile
}

export function getProfilesCount() {
    let profilesRef = collectionGroup(db, collectionName);
    return getCountFromServer(profilesRef).then(res => {
        return res.data().count
    })
}


