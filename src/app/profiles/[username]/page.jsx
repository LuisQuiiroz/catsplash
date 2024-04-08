import { GetOneUser } from '@/app/utils/UserRequests'
import { GoHome } from '@/components/GoHome'
import { ListPost } from '@/components/posts/ListPost'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export default async function Username ({ params }) {
  const { username } = params
  let data
  try {
    data = await GetOneUser(username)
  } catch (error) {
    data = error
  }
  return (
    <div className='p-4 max-w-screen-xl mx-auto'>
      {
        data?.error
          ? (
            <>
              <h1 className='text-3xl text-gray-500 dark:text-gray-400'>No user found</h1>
              <div className='flex items-center justify-center p-8'>
                <GoHome />
              </div>
            </>
            )
          : (
            <>
              <div className='md:flex max-w-2xl mx-auto p-8 gap-8 mb-8'>
                <img
                  className='size-32 mb-6 md:mb-0'
                  src={data?.img}
                  alt={data?.username}
                />
                <div>
                  <h1 className='text-4xl font-bold'>{data?.name}</h1>
                  <h1 className='text-lg mb-4'>{data?.username}</h1>
                  <p>{data?.biography}</p>
                </div>
              </div>
              <ListPost data={data?.posts} />
            </>
            )
      }
    </div>
  )
}
