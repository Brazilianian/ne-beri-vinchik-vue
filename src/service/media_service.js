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
                name: media.fullPath,
                type: media.fullPath.substring(media.fullPath.indexOf('.') + 1)
            })
        })

        return mediaList
    })

}

export function getContent(name) {
    const storage = getStorage();
    return getBlob(ref(storage, name))
}

export function getMediaByProfileId(profileId) {
    const storage = getStorage();

    return getMediaInfo(storage, profileId)
}