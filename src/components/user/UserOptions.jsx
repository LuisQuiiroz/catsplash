import { signOut, useSession } from 'next-auth/react'
import { createPortal } from 'react-dom'
import { PostForm } from '../posts/PostForm'
import { useState } from 'react'
import Link from 'next/link'

export function UserOptions () {
  const [showModal, setShowModal] = useState(false)

  const { data: session } = useSession()
  return (
    <div className='flex items-center gap-4 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
      <button type='button' className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' onClick={() => setShowModal(true)}>upload</button>
      {showModal && createPortal(
        <PostForm onClose={() => setShowModal(false)} />,
        document.body
      )}
      <Link href={`/profiles/${session?.user?.name}`}>
        <p>{session?.user?.name}</p>
      </Link>
      <button type='button' className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800' onClick={() => signOut()}>Logout</button>
    </div>
  )
}
