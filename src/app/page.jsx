import { ListPost } from '@/components/posts/ListPost'
import { getAllPosts } from './utils/PostRequests'

export default async function Home () {
  const data = await getAllPosts()
  return (
    <main className='p-4 max-w-screen-xl mx-auto'>
      <ListPost data={data} />
    </main>

  )
}
