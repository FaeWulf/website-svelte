import path from 'path'
import fs from 'fs/promises'

const defaultPath = "/documents/playlist.json"

const lastUpdatePlaylistDate = async () => {
    const pathname = path.resolve()
    const lastUpdatePlaylist = await fs.stat(pathname + defaultPath)
    return lastUpdatePlaylist.ctime.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}


const getPlaylist = async () => {
    const pathname = path.resolve()
    const jsonData = await fs.readFile(pathname + defaultPath, 'utf-8')
    return JSON.parse(jsonData)
}

export { getPlaylist, lastUpdatePlaylistDate }