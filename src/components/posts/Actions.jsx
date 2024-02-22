'use client'

import { createPortal } from 'react-dom'
import { PostForm } from './PostForm'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export function Actions ({ id }) {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const handleEdit = (e) => {
    setShowModal(true)
  }

  const handleDelete = async (e) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        toast.success('Post deleted correctly')
        router.refresh()
      } else {
        toast.error('error deleting post')
      }
    } catch (error) {
      toast.error('network error' + error)
    }
  }
  return (
    <div className=' flex items-center justify-between w-full' onClick={(e) => e.preventDefault()}>
      {showModal && createPortal(
        <PostForm onClose={() => setShowModal(false)} id={id} />,
        document.body
      )}
      <button
        type='button' className='py-1 px-2 me-2 mb-2 text-xs font-medium text-blue-700 focus:outline-none rounded-lg border border-blue-200 hover:bg-blue-100 hover:text-white focus:z-10 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-700 bg-transparent dark:text-blue-400 dark:border-blue-600 dark:hover:bg-blue-700'
        onClick={handleEdit}
      >Edit
      </button>
      <button
        type='button' className='py-1 px-2 me-2 mb-2 text-xs font-medium text-red-700 focus:outline-none rounded-lg border border-red-200 hover:bg-red-100 hover:text-white focus:z-10 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-700 bg-transparent dark:text-red-400 dark:border-red-600 dark:hover:bg-red-700'
        onClick={handleDelete}
      >delete
      </button>
    </div>
  )
}
