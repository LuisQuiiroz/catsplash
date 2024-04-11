import { customError } from '@/app/utils/customError'
import { prisma } from '@/libs/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET () {
  try {
    const posts = await prisma.post.findMany()
    if (!posts) {
      return NextResponse.json(customError(
        { error: 'Posts not found', status: 400 }
      ))
    }
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(customError(
      { error: 'Error when trying to get the posts', status: 400, moreInfo: error?.message }
    ))
  }
}

export async function POST (request) {
  const session = await getServerSession(request)
  const userId = session?.user?.email

  if (!session || userId == null) {
    return NextResponse.json(customError(
      { error: 'Unauthorized', status: 401 }
    ))
  }

  try {
    const data = await request.json()

    const newPost = await prisma.post.create({
      data: {
        img: data.img,
        content: data.content,
        userId
      }
    })

    if (!newPost) {
      return NextResponse.json(customError(
        { error: 'Post not added', status: 400 }
      ))
    }
    return NextResponse.json(newPost)
  } catch (error) {
    return NextResponse.json(customError(
      { error: 'Error when trying to add the post', status: 400, moreInfo: error?.message }
    ))
  }
}
