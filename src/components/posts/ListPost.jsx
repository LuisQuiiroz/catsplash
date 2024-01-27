import { prisma } from '@/libs/prisma'
import { Post } from './Post'
async function loadPosts () {
  return await prisma.post.findMany()
}
export async function ListPost () {
  const posts = await loadPosts()

  return (
    <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 md:gap-8 max-w-screen-xl mx-auto'>
      {
        posts.map(post => (
          <Post key={post.id} post={post} />
        ))
      }
    </div>
  )
}
