'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export function PostForm ({ onClose, idPost = undefined }) {
  const router = useRouter()
  const { data: session } = useSession()
  if (!session) return null

  const title = idPost === undefined ? 'New Post' : 'Update Post'

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      description: '',
      photo: ''
    }
  })

  // if (idPost !== null) {
  //   fetch(`/api/posts/${idPost}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       reset({
  //         description: data.content,
  //         photo: data.img
  //       })
  //     })
  // }

  const editPost = async (idPost, { description, photo }) => {
    try {
      const res = await fetch(`/api/posts/${idPost}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: description.trim(),
          img: photo.trim(),
          userId: session.user.image
        })
      })
      if (res.ok) {
        toast.success('Post updated correctly')
        onClose()
        router.refresh()
      } else {
        toast.error('error uploading post')
      }
    } catch (error) {
      toast.error('network error' + error)
    }
  }

  const addPost = async ({ description, photo }) => {
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: description.trim(),
          img: photo.trim(),
          userId: session.user.image
        })
      })
      if (res.ok) {
        toast.success('uploaded post')
        onClose()
        router.refresh()
      } else {
        toast.error('error uploading post')
      }
    } catch (error) {
      toast.error('network error' + error)
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
    if (idPost !== undefined) { // editing
      editPost(idPost, data)
    } else { // add
      addPost(data)
    }
  }

  useEffect(() => {
    if (idPost !== undefined) {
      fetch(`/api/posts/${idPost}`)
        .then(res => res.json())
        .then(data => {
          reset({
            description: data.content,
            photo: data.img
          })
        })
    }
  }, [])
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
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
