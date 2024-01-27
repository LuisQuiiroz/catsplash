import { Modal } from '@/components/Modal'
import { ListPost } from '@/components/posts/ListPost'

export default async function Home () {
  return (
    <main className='p-4 '>
      <h1>catsplash</h1>
      <Modal />
      <ListPost />
    </main>

  )
}
