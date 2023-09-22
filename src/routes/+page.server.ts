import { client } from "$lib/discordStatus.js";
import { getPlaylist, lastUpdatePlaylistDate } from './music/playlist';
import { getPostsInfos } from '$lib/files.js';

export async function load({ params, depends }) {
    depends('title:discordStatus');

    //await reload();
    const fortuneCookies = async () => {
        const res = await fetch("http://yerkee.com/api/fortune/all")
        return await res.json()
    }

    const discordStatus = async () => {
        const serverId = '1102279635468832768';
        const userIdToCheck = '442263875560144896';
        const statusList = [undefined, 'online', 'idle', 'dnd']
        const myStatus = client.guilds.get(serverId)?.presences.get(userIdToCheck)?.status
        return statusList.indexOf(myStatus)
    }

    const recentBlog = async () => {
        let posts = await getPostsInfos()
        return posts.slice(0, 5)
    }

    const playlist = async () => {
        const pl: any = await getPlaylist()
        return {
            tracks: pl.slice(pl.length - 5, pl.length).reverse(),
            lastUpdate: await lastUpdatePlaylistDate()
        }
    }

    return {
        streamed: {
            fortuneCookies: fortuneCookies(),
            discord: discordStatus(),
            blog: recentBlog(),
            playlist: playlist()
        }
    }
}