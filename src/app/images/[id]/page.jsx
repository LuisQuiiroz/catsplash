import { getOnePost } from '@/app/utils/PostRequests'
import { GetOneUser } from '@/app/utils/UserRequests'
import { Actions } from '@/components/posts/Actions'
import { ImageDownloader } from '@/components/posts/ImageDownloader'
import Link from 'next/link'
export const dynamic = 'force-dynamic'

export default async function Image ({ params }) {
  const { id } = params

  if (isNaN(id)) return <p className='max-w-screen-xl mx-auto mt-10 p-4 text-3xl text-gray-500 dark:text-gray-400'>Invalid id</p>

  const data = await getOnePost(id)
  const user = await GetOneUser(data.userId)
  return (
    <div className='max-w-screen-xl mx-auto mt-10 p-4'>
      {
        data?.error || data == null
          ? (
            <h1 className='text-3xl text-gray-500 dark:text-gray-400'>No post found</h1>
            )
          : (
            <>
              <Actions data={data} />
              <img className='mx-auto' src={data?.img} alt={data?.content} />
              <div className='flex justify-between items-center mt-8 mb-4'>
                <p className='text-3xl text-gray-500 dark:text-gray-400'>{data?.content}</p>
                <ImageDownloader imageUrl={data?.img} fileName={data?.content} />
              </div>
              <div className='flex gap-2 items-center'>
                <img
                  className='size-8'
                  src={user.img}
                  alt={user.username}
                />
                <Link
                  className='text-xl text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 hover:underline font-bold'
                  href={`/profiles/${user.username}`}
                >{user.username}
                </Link>
              </div>
            </>
            )
      }

    </div>
  )
}
