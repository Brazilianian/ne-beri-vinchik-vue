import db from "@/firebase";
import {collection, getDocs, query} from "firebase/firestore";

const citiesCollectionName = "cities"
const gendersCollectionName = "genders"

export function getCities() {
    let cities = new Map()
    return getDocs(query(collection(db, citiesCollectionName))).then(citiesDocs => {
        citiesDocs.forEach(cityDoc => {
            cities.set(cityDoc.id, cityDoc.data().name)
        })
        return cities
    })
}

export function getGenders() {
    let genders = new Map()
    return getDocs(query(collection(db, gendersCollectionName))).then(genderDocs => {
        genderDocs.forEach(genderDoc => {
            genders.set(genderDoc.id, genderDoc.data().name)
        })
        return genders
    })
}