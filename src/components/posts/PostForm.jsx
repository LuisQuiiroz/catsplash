'use client'

import { createPost, getOnePost, putPost } from '@/app/utils/PostRequests'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export function PostForm ({ onClose, postId = undefined }) {
  const router = useRouter()
  const { data: session } = useSession()

  const title = postId === undefined ? 'New Post' : 'Update Post'
  const userId = session?.user?.email

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      description: '',
      photo: ''
    }
  })

  if (!session) return null

  useEffect(() => {
    if (postId !== undefined) {
      getOnePost(postId)
        .then(data => {
          reset({
            description: data.content,
            photo: data.img
          })
        })
    }
  }, [])

  const editPost = async (data, postId, userId) => {
    const res = await putPost(data, postId, userId)
    if (res?.error) {
      toast.error('Error uploading post')
    } else {
      toast.success('Post updated correctly')
      onClose()
      router.refresh()
    }
  }

  const addPost = async (data, userId) => {
    const res = await createPost(data, userId)
    if (res?.error) {
      toast.error('Error creating post ')
    } else {
      toast.success('Post created')
      onClose()
      router.refresh()
    }
  }

  const onSubmit = (data) => {
    const { description, photo } = data
    if (description === undefined ||
        description === null ||
        description.trim() === '') {
      return toast.error('Description is empty')
    }
    if (photo === undefined ||
        photo === null ||
        photo.trim() === '') {
      return toast.error('Photo url is empty')
    }
    if (postId !== undefined) { // editing
      editPost(data, postId, userId)
    } else { // add
      addPost(data, userId)
    }
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='w-96 lg:w-[620px] mx-auto block bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
        <form
          className='p-6'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className='mb-4 text-2xl font-medium text-gray-900 dark:text-white'>{title}</h1>
          <div className='mb-5'>
            <label htmlFor='description' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Description</label>
            <input
              type='text'
              id='description'
              name='description'
              className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='name@gmail.com'
              autoFocus
              autoComplete='off'
              {...register('description', {
                required: {
                  value: true,
                  message: 'Description is required'
                }
              })}
            />
            {
              errors.description && <p className='mt-2 text-sm font-medium text-red-600 dark:text-red-500'>{errors.description.message}</p>
            }
          </div>
          <div className='mb-5'>
            <label htmlFor='photo' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Photo URL</label>
            <input
              type='text'
              id='photo'
              name='photo'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='yourImage.com'
              autoComplete='off'
              {...register('photo', {
                required: {
                  value: true,
                  message: 'Photo url is required'
                }
              })}
            />
            {
              errors.photo && <p className='mt-2 text-sm font-medium text-red-600 dark:text-red-500'>{errors.photo.message}</p>
            }
          </div>
          <div className='flex justify-end'>
            <button type='button' className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800' onClick={onClose}>Cancel</button>
            <button type='submit' className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
