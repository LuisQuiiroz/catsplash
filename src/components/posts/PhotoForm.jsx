'use client'

import { toast } from 'react-toastify'

export function PhotoForm ({ onClose }) {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.description.value
    const img = e.target.photo.value

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ img, content })
      })
      if (res.ok) {
        toast.success('uploaded photo')
        onClose()
      } else {
        toast.error('error uploading photo')
      }
    } catch (error) {
      toast.error('network error' + error)
    }
  }
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-96 lg:w-[620px] mx-auto block bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
        <form
          className='p-6'
          onSubmit={handleSubmit}
          method='post'
        >
          <h1 className='mb-4 text-2xl font-medium text-gray-900 dark:text-white'>Add a new photo</h1>
          <div className='mb-5'>
            <label htmlFor='description' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Description</label>
            <input type='text' id='description' name='description' className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='name@gmail.com' required defaultValue='Imagen de prueba' />
          </div>
          <div className='mb-5'>
            <label htmlFor='photo' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Photo URL</label>
            <input type='text' id='photo' name='photo' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required defaultValue='https://res.cloudinary.com/luisdev99/image/upload/v1706298309/imgUploader/qvhwfzq7t6znnvj3bnn0.png' />
          </div>
          <div className='flex justify-end'>

            <button type='text' className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800' onClick={onClose}>Cancel</button>
            <button type='submit' className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Submit</button>
          </div>
        </form>
      </div>

    </div>
  )
}
