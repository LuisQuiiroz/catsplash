'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'

export default function Login () {
  const login = '/login'
  const pathName = usePathname()
  const isLogin = pathName === login
  const text = isLogin ? 'Login' : 'Register'
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: 'test@test.com',
      password: 'testtest'
    }
  })
  const signInWithCredentials = async data => {
    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })
      if (res.ok) {
        toast.success('Welcome')
        router.push('/')
      } else {
        toast.error(res.error)
      }
    } catch (error) {
      toast.error('network error ' + error)
    }
  }

  const signUpWithCredentials = async data => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (res.ok) {
        toast.success('registered')
        signInWithCredentials(data)
      } else {
        const errorData = await res.json()
        toast.error(errorData.message || 'error registering user')
      }
    } catch (error) {
      toast.error('network error' + error)
    }
  }

  const onSubmit = async data => {
    const { email, password, username } = data
    if (email === undefined ||
        email === null ||
        email.trim() === '') {
      return toast.error('Email is empty')
    }
    if (password === undefined ||
        password === null ||
        password.trim() === '') {
      return toast.error('Password is empty')
    }
    if (pathName === login) { // login
      signInWithCredentials(data)
    } else { // register
      if (username === undefined ||
        username === null ||
        username.trim() === '') {
        return toast.error('Username is empty')
      }
      signUpWithCredentials(data)
    }
  }
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-96 mx-auto block bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <form
          className='p-6'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className='mb-4 text-2xl font-medium text-gray-900 dark:text-white'>{text}</h1>
          {!isLogin && ( // register
            <div className='mb-5'>
              <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your username</label>
              <input
                type='text'
                id='username'
                name='username'
                className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='yourUsername'
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
            </div>
          )}
          <div className='mb-5'>
            <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your email</label>
            <input
              type='email'
              id='email'
              name='email'
              className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='yourEmail@gmail.com'
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
          </div>
          <div className='mb-5'>
            <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your password</label>
            <input
              type='password'
              id='password'
              name='password'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='********'
              {...register('password', {
                required: {
                  value: true,
                  message: 'Password is required'
                },
                minLength: {
                  value: 8,
                  message: 'The password must be 8 characters'
                },
                maxLength: {
                  value: 8,
                  message: 'The password must be 8 characters'
                }
              })}
            />
            {
              errors.password && <p className='mt-2 text-sm font-medium text-red-600 dark:text-red-500'>{errors.password.message}</p>
            }
          </div>
          {
            isLogin && (
              <div className='flex items-start mb-5'>
                <div className='flex items-center h-5'>
                  <input id='remember' type='checkbox' value='' className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800' />
                </div>
                <label htmlFor='remember' className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Remember me</label>
              </div>
            )
          }
          <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>{text}</button>
          {
          isLogin
            ? (
              <p id='helper-text' className='mt-6 text-sm text-gray-500 dark:text-gray-400 text-center'>Don’t have an account yet? <Link href='/register' className='font-medium text-blue-600 hover:underline dark:text-blue-500'>Register</Link>.</p>

              )
            : (
              <p id='helper-text' className='mt-6 text-sm text-gray-500 dark:text-gray-400 text-center'>Adready a member? <Link href='/login' className='font-medium text-blue-600 hover:underline dark:text-blue-500'>Login</Link>.</p>
              )
        }

        </form>
      </div>
    </div>
  )
}
