import {getStorage, listAll, getBlob, ref, getDownloadURL} from "firebase/storage"

export function modifyType(medias) {
    for (const media of medias) {
        switch (media.type) {
            case "MOV":
            case "video":
            case "mp4":
            case "MP4":
                media.fileType = 'video'
                break;
            default:
                media.fileType = 'image'
                break;
        }
    }
}

const mediaList = []

async function getMediaInfo(storage, profileId) {

    return listAll(ref(storage, profileId.toString())).then(result => {
        result.items.forEach(media => {
            mediaList.push({
                name: media.fullPath
            })
        })

        return mediaList
    })

}

export function getContent(name) {
    const storage = getStorage();
    console.log(name)
    getDownloadURL(ref(storage, name)).then(res => {
        console.log(res)
    })
}

export function getMediaByProfileId(profileId) {
    const storage = getStorage();

    return getMediaInfo(storage, profileId)
}