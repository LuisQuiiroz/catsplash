import { customError } from '@/app/utils/customError'
import { prisma } from '@/libs/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET (request, { params }) {
  const postId = params.id
  if (isNaN(postId)) {
    return NextResponse.json(customError(
      { error: 'Invalid id', status: 400 }
    ))
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId)
      }
    })

    if (!post) {
      return NextResponse.json(customError(
        { error: 'Post not found', status: 400 }
      ))
    }
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(customError(
      { error: 'Error when trying to get the post', status: 400, moreInfo: error?.message }
    ))
  }
}

export async function PUT (request, { params }) {
  const session = await getServerSession(request)
  const userId = session?.user?.email

  if (!session || userId == null) {
    return NextResponse.json(customError(
      { error: 'Unauthorized', status: 401 }
    ))
  }

  const postId = params.id
  if (!postId) {
    return NextResponse.json(customError(
      { error: 'Post id is required', status: 400 }
    ))
  }

  if (isNaN(postId)) {
    return NextResponse.json(customError(
      { error: 'Invalid id', status: 400 }
    ))
  }

  try {
    const data = await request.json()
    data.userId = userId
    const postUpdated = await prisma.post.update({
      where: {
        id: Number(postId)
      },
      data
    })
    if (!postUpdated) {
      return NextResponse.json(customError(
        { error: 'Post not updated', status: 400 }
      ))
    }
    return NextResponse.json(postUpdated)
  } catch (error) {
    return NextResponse.json(customError(
      { error: 'Error when trying to update the post', status: 400, moreInfo: error?.message }
    ))
  }
}

export async function DELETE (request, { params }) {
  const session = await getServerSession(request)
  const userId = session?.user?.email

  if (!session || userId == null) {
    return NextResponse.json(customError(
      { error: 'Unauthorized', status: 401 }
    ))
  }

  const postId = params.id
  if (!postId) {
    return NextResponse.json(customError(
      { error: 'Post id is required', status: 400 }
    ))
  }

  try {
    const postDeleted = await prisma.post.delete({
      where: {
        id: Number(postId)
      }
    })
    return NextResponse.json(postDeleted)
  } catch (error) {
    return NextResponse.json(customError(
      { error: 'error when trying to delete the post', status: 400, moreInfo: error?.message }
    ))
  }
}
