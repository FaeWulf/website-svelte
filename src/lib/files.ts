import fs from 'node:fs/promises';
import path from 'path';

const pathname = path.resolve()

const getPosts = async () => {
    return await fs.readdir(path.resolve(pathname + "/src/lib/articles/"))
}


const getPostsData = async () => {
    let posts_data: any = {}
    let files = await getPosts()
    for (let i = 0; i < files.length; i++) {
        posts_data[files[i].replaceAll(" ", "-").replace('.md', "")] = await fs.readFile(path.resolve(pathname + "/src/lib/articles/" + files[i]), { encoding: 'utf-8' })
    }

    return posts_data
}

const getPostsInfos = async () => {
    let posts = []
    let files = await getPosts()
    for (let i = 0; i < files.length; i++) {
        const filePath = path.resolve(pathname + "/src/lib/articles/" + files[i])
        const date = await fs.stat(filePath)
        posts.push({
            name: files[i].replaceAll(".md", ""),
            date: date.birthtime
        })
    }
    return posts.sort((a, b) => b.date.getTime() - a.date.getTime())
}



export { getPosts, getPostsInfos, getPostsData }