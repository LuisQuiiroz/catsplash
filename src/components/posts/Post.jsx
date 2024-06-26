import Link from 'next/link'

export async function Post ({ post }) {
  return (
    <div className='relative mb-10 rounded-2xl overflow-hidden'>
      <Link href={`/images/${post.id}`}>
        <img className='w-full rounded-2xl hover:opacity-50 transition-opacity duration-300' src={post.img} alt={post.content} />
        <div className='absolute inset-0 flex flex-col items-center justify-end opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 p-4'>
          {/* <Actions idPost={post.id} /> */}
          <p className='text-white'>{post.content}</p>
        </div>
      </Link>
    </div>
  )
}
