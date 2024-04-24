'use client'
import { updateUser } from '@/app/utils/UserRequests'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export function ProfileForm ({ userId, editUser }) {
  const [selectedFile, setSelectedFile] = useState(null)

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      picture: '',
      // username: '',
      name: '',
      biography: '',
      phone: ''
      // email: ''
    }
  })

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()

      // Configurar una función que se ejecutará cuando el archivo termine de cargarse
      reader.onload = async () => {
      // El contenido del archivo se almacena en el resultado del FileReader como un data URL
      // Esto se puede utilizar para mostrar la imagen en la página
      // Establecer el resultado del FileReader en el estado selectedFile
        setSelectedFile(reader.result)
      }
      // Leer el contenido del archivo como un data URL
      reader.readAsDataURL(file)
      setValue('picture', file)
    }
  }

  const uploadImgToCloudinary = async (fileObj) => {
    if (!fileObj) {
      return null
    }
    const formData = new FormData()
    if (fileObj && fileObj.type.startsWith('image/')) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL_CLOUDINARY
      const presetName = process.env.NEXT_PUBLIC_UPLOAD_PRESET_NAME

      formData.append('file', fileObj)
      formData.append('upload_preset', presetName)
      formData.append('folder', 'imgUsers')

      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          body: formData
        })
        if (!res.ok) {
          throw new Error('Error uploading image to database')
        }

        const data = await res.json()
        return data.secure_url
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error)
        toast.error('Error uploading image. Please try another time.')
        return null
      }
    } else {
      console.error('Please select a valid image file.')
      toast.error('Please select a valid image file.')
      return null
    }
  }

  const editUserReq = async (data, userId) => {
    try {
      const res = await updateUser(data, userId)
      if (res) {
        toast.success('User updated correctly')
        editUser()
      } else {
        // toast.error('Error uploading user')
        throw new Error('Error updating user')
      }
    } catch (error) {
      console.error('Error updating user:', error)
      toast.error('Error updating user')
    }
  }

  const onSubmit = async (data) => {
    if (typeof data.picture === 'object') {
      const urlImg = await uploadImgToCloudinary(data.picture)
      data.picture = urlImg
    }
    try {
      if (data.picture !== null) {
        await editUserReq(data, userId)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Error updating user')
    }
  }

  useEffect(() => { // get user info
    if (userId !== null) {
      fetch(`/api/users/${userId}`)
        .then(res => res.json())
        .then(data => {
          reset({
            picture: data.img ?? '/profile.webp',
            // username: data.username,
            name: data.name,
            biography: data.biography,
            phone: data.phone
            // email: data.email
          })
        })
    }
  }, [])

  return (
    <div className=''>
      <div className='w-full max-w-screen-md mx-auto rounded-xl overflow-hidden bg-white dark:bg-gray-800'>
        <form
          className='p-6'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className='mb-4 text-2xl font-medium text-gray-500 dark:text-gray-400'>Change Info</h1>
          <div className='mb-5 flex items-center gap-4'>
            <input
              type='file'
              id='picture'
              name='picture'
              className='hidden'
              {...register('picture')}
              onChange={handleFileChange}
            />
            <div className='shrink-0'>
              <img className='h-16 w-16 object-cover rounded-xl' src={selectedFile || watch('picture')} alt='Current profile photo' />
            </div>
            <label htmlFor='picture' className='block mb-2 text-sm font-bold text-gray-900 dark:text-white uppercase hover:cursor-pointer hover:opacity-70'>Change photo</label>

            {
            errors.pircture && <p className='mt-2 text-sm font-medium text-red-600 dark:text-red-500'>{errors.pircture.message}</p>
          }
          </div>
          {/* <div className='mb-5'>
            <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Username</label>
            <input
              type='text'
              id='username'
              name='username'
              className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='EmmaGarcia'
              {...register('username', {
                required: {
                  value: true,
                  message: 'Username is required'
                },
                pattern: {
                  value: /^[a-zA-Z0-9_-]+$/,
                  message: 'username can contain upper and lower case letters, numbers, underscores (_) and hyphens (-).'
                }
              })}
            />
            {
            errors.username && <p className='mt-2 text-sm font-medium text-red-600 dark:text-red-500'>{errors.username.message}</p>
          }
          </div> */}
          <div className='mb-5'>
            <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Emma García'
              {...register('name')}
            />
            {
            errors.name && <p className='mt-2 text-sm font-medium text-red-600 dark:text-red-500'>{errors.name.message}</p>
          }
          </div>
          <div className='mb-5'>
            <label htmlFor='biography' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Bio</label>
            <textarea
              rows='4'
              id='biography'
              name='biography'
              className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='tell your story...'
              {...register('biography')}
            />
            {
            errors.biography && <p className='mt-2 text-sm font-medium text-red-600 dark:text-red-500'>{errors.biography.message}</p>
          }
          </div>
          <div className='mb-5'>
            <label htmlFor='phone' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Phone</label>
            <input
              type='text'
              id='phone'
              name='phone'
              className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='e.g. 999-999-9999'
              {...register('phone')}
            />
            {
            errors.phone && <p className='mt-2 text-sm font-medium text-red-600 dark:text-red-500'>{errors.phone.message}</p>
          }
          </div>
          {/* <div className='mb-5'>
            <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your email</label>
            <input
              type='email'
              id='email'
              name='email'
              className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='emma@email.com'
              {...register('email', {
                required: {
                  value: true,
                  message: 'Email is required'
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Provide a valid email'
                }
              })}
            />
            {
            errors.email && <p className='mt-2 text-sm font-medium text-red-600 dark:text-red-500'>{errors.email.message}</p>
          }
          </div> */}
          <div className='flex justify-end'>
            <button type='button' className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800' onClick={editUser}>Cancel</button>
            <button type='submit' className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Save</button>
          </div>
        </form>
      </div>
    </div>

  )
}
