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