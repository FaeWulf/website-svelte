import { playList, lastUpdatePlaylistDate } from './playlist';


export async function load({ params }) {
    return {
        playList,
        lastUpdatePlaylistDate
    };
}