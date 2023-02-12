import db from "@/firebase";
import {collection, getDocs, query, where, limit, doc, getDoc} from "firebase/firestore"

let lastFoundedProfiles = []

export async function getProfiles(count, numberOfPage, filter) {

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
    }

    queryConstraints.push(limit(count))

    let profilesRef = query(collection(db, 'profiles'), ...queryConstraints)
    const querySnap = await getDocs(profilesRef)

    querySnap.forEach((doc) => {
        let profile = doc.data();
        profile.id = parseInt(doc.id);
        lastFoundedProfiles.push(profile)
    })

    return lastFoundedProfiles;

}

export async function getProfileById(id) {
    const profileRef = doc(db, "profiles", id.toString())
    const profileDoc = await getDoc(profileRef)

    let profile = profileDoc.data()
    profile.id = profileDoc.id
    return profile
}


