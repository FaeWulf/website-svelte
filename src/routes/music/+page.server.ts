import { getPlaylist, lastUpdatePlaylistDate } from '../../lib/playlist';

export async function load({ params }) {

    const playlistData = async () => {
        return {
            playList: await getPlaylist(),
            lastUpdatePlaylistDate: await lastUpdatePlaylistDate()
        }
    }

    return {
        streamed: {
            playlist: playlistData()
        }
    };
}