import { signOut } from 'next-auth/react'
import { createPortal } from 'react-dom'
import { PostForm } from '../posts/PostForm'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export function UserOptions ({ user }) {
  const [showModal, setShowModal] = useState(false)
  const [UserOptions, setUserOptions] = useState(false)

  const username = user?.name
  const imgUser = user?.image

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

  return (
    <div className='flex items-center gap-1 md:gap-3 md:order-2 rtl:space-x-reverse'>
      <button
        type='button'
        className='block px-4 py-2 text-gray-800 hover:bg-gray-300 dark:text-white dark:hover:bg-gray-800 rounded-md border dark:border-gray-800'
        onClick={() => setShowModal(true)}
      >upload
      </button>
      {showModal && createPortal(
        <PostForm onClose={() => setShowModal(false)} />,
        document.body
      )}
      <div className='relative'>
        <button
          className='hover:bg-gray-300 dark:hover:bg-gray-800 dark:text-white py-2 px-4 rounded-md inline-flex items-center space-x-2'
          onClick={toggleMenu}
        >
          <img
            className='size-6'
            src={imgUser}
            alt={username}
          />
          <span>{username}</span>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={`size-4 ${UserOptions ? 'rotate-180' : ''}`}>
            <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
          </svg>
        </button>
        {UserOptions && (
          <div className='absolute right-0 mt-2 p-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-xl z-20 font-medium border dark:border-gray-800 dropdown-menu' onClick={toggleMenu}>
            <Link
              href={`/profiles/${username}`}
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
