import Link from 'next/link'

export function GuestOptions () {
  return (
    <div className='flex items-center gap-4 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
      <Link href='/login' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Login</Link>
      <Link href='/register' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Register</Link>
    </div>
  )
}
