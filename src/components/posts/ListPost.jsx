import { Post } from './Post'
export async function ListPost ({ data }) {
  return (
    <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 md:gap-8 max-w-screen-xl mx-auto'>
      {
        data?.error || data?.length === 0
          ? (
            <h1 className='text-3xl text-gray-500 dark:text-gray-400'>No posts found</h1>
            )
          : (
              data.map(post => (
                <Post key={post.id} post={post} />
              ))
            )
      }
    </div>
  )
}
