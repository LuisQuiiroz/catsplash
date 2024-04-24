import { signOut, useSession } from 'next-auth/react'
import { PostForm } from '../posts/PostForm'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Modal } from '../Modal'
import { GetOneUser } from '@/app/utils/UserRequests'

export function UserOptions () {
  const [user, setUser] = useState(null)

  const [modal, setModal] = useState(false)
  const [UserOptions, setUserOptions] = useState(false)

  const { data: session } = useSession()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-menu')) {
        setUserOptions(false)
      }
    }

    if (UserOptions) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [UserOptions])

  const toggleMenu = () => setUserOptions(value => !value)

  useEffect(() => {
    if (session) {
      GetOneUser(session?.user?.name)
        .then(data => {
          setUser(data)
        })
    }
  }, [UserOptions])

  return (
    <div className='flex items-center gap-1 md:gap-3 md:order-2 rtl:space-x-reverse'>
      <button
        type='button'
        className='block px-4 py-2 text-gray-800 hover:bg-gray-300 dark:text-white dark:hover:bg-gray-800 rounded-md border dark:border-gray-800'
        onClick={() => setModal(true)}
      >upload
      </button>
      <Modal openModal={modal} closeModal={() => setModal(false)}>
        <PostForm onClose={() => setModal(false)} />
      </Modal>
      <div className='relative'>
        <button
          className='hover:bg-gray-300 dark:hover:bg-gray-800 dark:text-white py-2 px-4 rounded-md inline-flex items-center space-x-2'
          onClick={toggleMenu}
        >
          <img
            className='size-6 rounded-full'
            src={user?.img}
            alt={user?.username}
          />
          <span>{user?.username}</span>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={`size-4 ${UserOptions ? 'rotate-180' : ''}`}>
            <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
          </svg>
        </button>
        {UserOptions && (
          <div className='absolute right-0 mt-2 p-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-xl z-20 font-medium border dark:border-gray-800 dropdown-menu' onClick={toggleMenu}>
            <Link
              href={`/profiles/${user?.username}`}
              className='block px-4 py-2 text-gray-800 hover:bg-gray-300 dark:text-white dark:hover:bg-gray-800 rounded-md w-full text-left'
            >
              Profile
            </Link>
            <Link
              href='/settings/profile'
              className='block px-4 py-2 text-gray-800 hover:bg-gray-300 dark:text-white dark:hover:bg-gray-800 rounded-md w-full text-left'
            >
              Account
            </Link>
            <button
              type='button'
              className='block px-4 py-2 text-red-600 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-md w-full text-left'
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
