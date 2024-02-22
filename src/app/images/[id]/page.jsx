import { ImageDownloader } from '@/components/posts/ImageDownloader'
import { prisma } from '@/libs/prisma'

export default async function Image ({ params }) {
  const { id } = params

  const getImageData = async (id) => {
    try {
      const data = await prisma.post.findUnique({
        where: {
          id: Number(id)
        }
      })
      return data
    } catch (error) {
      console.error('Error al obtener los datos de la imagen:', error)
      return null
    }
  }

  if (isNaN(id)) return <p className='max-w-screen-xl mx-auto mt-10 p-4 text-3xl text-gray-500 dark:text-gray-400'>Invalid id</p>

  const data = await getImageData(id)

  if (!data) return <p className='max-w-screen-xl mx-auto mt-10 p-4 text-3xl text-gray-500 dark:text-gray-400'>Image not found</p>

  // console.log(data)
  return (
    <div className='max-w-screen-xl mx-auto mt-10 p-4'>
      <img className='mx-auto' src={data.img} alt={data.content} />
      <div className='flex justify-between items-center my-10'>
        <p className='text-3xl text-gray-500 dark:text-gray-400'>{data.content}</p>
        <ImageDownloader imageUrl={data.img} fileName={data.content} />
      </div>
    </div>
  )
}
