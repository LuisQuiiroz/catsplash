import { Post } from '@/components/posts/Post'
import { prisma } from '@/libs/prisma'

export default async function Username ({ params }) {
  const { username } = params
  const getUserData = async (id) => {
    try {
      const data = await prisma.user.findUnique({
        where: {
          username
        },
        include: {
          posts: true
        }
      })
      return data
    } catch (error) {
      console.error('Error getting user data:', error)
      return null
    }
  }

  const data = await getUserData(username)

  return (
    <div className='p-4'>
      <p>Username {username}</p>
      <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 md:gap-8 max-w-screen-xl mx-auto'>

        {data?.posts && (
          data?.posts?.map(post => (
            <Post key={post.id} post={post} />

          ))
        )}
      </div>

    </div>
  )
}
