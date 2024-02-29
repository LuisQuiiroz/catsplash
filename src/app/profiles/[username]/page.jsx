import { GetOneUser } from '@/app/utils/UserRequests'
import { ListPost } from '@/components/posts/ListPost'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export default async function Username ({ params }) {
  const { username } = params

  const data = await GetOneUser(username)
  return (
    <div className='p-4 max-w-screen-xl mx-auto'>
      {
        data?.error
          ? (
            <h1 className='text-3xl text-gray-500 dark:text-gray-400'>No user found</h1>
            )
          : (
            <>
              <h1 className='text-3xl text-gray-500 dark:text-gray-400 mb-4'>Username: {username}</h1>
              <ListPost data={data.posts} />
            </>
            )
      }
    </div>
  )
}
