import playList from '$lib/playlist.json'
import fs from 'node:fs/promises';
import path from 'path';

const pathname = path.resolve()
const lastUpdatePlaylist = await fs.stat(pathname + "/src/lib/playlist.json")
const lastUpdatePlaylistDate = lastUpdatePlaylist.ctime.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
})



export { playList, lastUpdatePlaylistDate }