import fs from 'node:fs/promises';
import path from 'path';

const pathname = path.resolve()
const files = await fs.readdir(path.resolve(pathname + "/src/lib/articles/"))

let posts = []
let posts_data: any = {}
for (let i = 0; i < files.length; i++) {
    const filePath = path.resolve(pathname + "/src/lib/articles/" + files[i])
    //const file = await fs.readFile(filePath)
    const date = await fs.stat(filePath)
    posts.push({
        name: files[i].replaceAll(".md", ""),
        date: date.birthtime
    })
    posts_data[files[i].replaceAll(" ", "-").replace('.md', "")] = await fs.readFile(path.resolve(pathname + "/src/lib/articles/" + files[i]), { encoding: 'utf-8' })
}

const sorted_posts = posts.sort((a, b) => b.date.getTime() - a.date.getTime())

export { files, pathname, sorted_posts, posts_data }