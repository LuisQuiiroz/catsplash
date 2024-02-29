import { getOnePost } from '@/app/utils/PostRequests'
import { Actions } from '@/components/posts/Actions'
import { ImageDownloader } from '@/components/posts/ImageDownloader'
export const dynamic = 'force-dynamic'

export default async function Image ({ params }) {
  const { id } = params

  if (isNaN(id)) return <p className='max-w-screen-xl mx-auto mt-10 p-4 text-3xl text-gray-500 dark:text-gray-400'>Invalid id</p>

  const data = await getOnePost(id)
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
              <div className='flex justify-between items-center my-10'>
                <p className='text-3xl text-gray-500 dark:text-gray-400'>{data?.content}</p>
                <ImageDownloader imageUrl={data?.img} fileName={data?.content} />
              </div>
            </>
            )
      }

    </div>
  )
}
