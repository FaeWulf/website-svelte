import path from 'path'
import fs from 'fs/promises'

const lastUpdatePlaylistDate = async () => {
    const pathname = path.resolve()
    const lastUpdatePlaylist = await fs.stat(pathname + "/src/lib/data/playlist.json")
    return lastUpdatePlaylist.ctime.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}


const getPlaylist = async () => {
    const pathname = path.resolve()
    const jsonData = await fs.readFile(pathname + "/src/lib/data/playlist.json", 'utf-8')
    return JSON.parse(jsonData)
}

export { getPlaylist, lastUpdatePlaylistDate }