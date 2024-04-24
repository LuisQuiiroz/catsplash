export function ProfileInfo ({ user, editUser }) {
  return (
    <div className='relative overflow-x-auto'>
      <table className='w-full max-w-screen-md mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl overflow-hidden'>
        <thead>
          <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <td colSpan='2' className='px-6 py-4'>
              <div className='flex justify-between items-center gap-4'>
                <div className=''>
                  <h3 className='text-2xl'>Profile</h3>
                  <p className='text-sm font-medium'>Some info may be visible to other people</p>
                </div>
                <button type='button' className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' onClick={editUser}>Edit</button>

              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <td className='px-8 py-6 uppercase w-1/3  text-sm'>
              photo
            </td>
            <th scope='row' className='px-6 py-4 font-medium text-gray-900 dark:text-white text-lg'>
              <img className='size-16 rounded-lg' src={user?.img} alt={`${user?.username} photo`} />
            </th>
          </tr>
          <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <td className='px-8 py-6 uppercase w-1/3 text-sm'>
              username
            </td>
            <th scope='row' className='px-6 py-4 font-medium text-gray-900 dark:text-white text-lg'>
              {user?.username ?? ''}
            </th>
          </tr>
          <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <td className='px-8 py-6 uppercase w-1/3 text-sm'>
              name
            </td>
            <th scope='row' className='px-6 py-4 font-medium text-gray-900 dark:text-white text-lg'>
              {user?.name ?? ''}
            </th>
          </tr>
          <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <td className='px-8 py-6 uppercase w-1/3 text-sm'>
              bio
            </td>
            <th scope='row' className='px-6 py-4 font-medium text-gray-900 dark:text-white text-lg'>
              {user?.biography ?? ''}
            </th>
          </tr>
          <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <td className='px-8 py-6 uppercase w-1/3 text-sm'>
              phone
            </td>
            <th scope='row' className='px-6 py-4 font-medium text-gray-900 dark:text-white text-lg'>
              {user?.phone ?? ''}
            </th>
          </tr>
          <tr className='bg-white dark:bg-gray-800 '>
            <td className='px-8 py-6 uppercase w-1/3 text-sm'>
              email
            </td>
            <th scope='row' className='px-6 py-4 font-medium text-gray-900 dark:text-white text-lg'>
              {user?.email ?? ''}
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
