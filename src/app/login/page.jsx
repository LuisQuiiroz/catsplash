'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Login () {
  const login = '/login'
  const pathName = usePathname()
  const title = pathName === login ? 'Login' : 'Register'
  const isLogin = pathName === login

  const handleSubmit = (e) => {
    e.preventDefault()
    // Read the form data
    const form = e.target
    const formData = new FormData(form)

    // login
    if (pathName === login) {
      console.log('login')
    } else {
      // register
      console.log('register')
    }
    const formJson = Object.fromEntries(formData.entries())
    console.log(formJson)
  }
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-96 mx-auto block bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <form
          className='p-6'
          onSubmit={handleSubmit}
          method='post'
        >
          <h1 className='mb-4 text-2xl font-medium text-gray-900 dark:text-white'>{title}</h1>
          <div className='mb-5'>
            <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your email</label>
            <input type='email' id='email' name='email' className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='name@gmail.com' required defaultValue='test@test.com' />
          </div>
          <div className='mb-5'>
            <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your password</label>
            <input type='password' id='password' name='password' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required defaultValue='test' />
          </div>
          <div className='flex items-start mb-5'>
            <div className='flex items-center h-5'>
              <input id='remember' type='checkbox' value='' className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800' />
            </div>
            <label htmlFor='remember' className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Remember me</label>
          </div>
          <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Submit</button>
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
