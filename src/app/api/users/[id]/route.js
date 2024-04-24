import { customError } from '@/app/utils/customError'
import { prisma } from '@/libs/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET (request, { params }) {
  let user
  const userId = params.id

  try {
    if (!isNaN(userId)) {
      user = await prisma.user.findUnique({
        where: {
          id: Number(userId)
        },
        include: {
          posts: true
        }
      })
    } else {
      user = await prisma.user.findUnique({
        where: {
          username: userId
        },
        include: {
          posts: true
        }
      })
    }

    if (!user) {
      return NextResponse.json(customError(
        { error: 'User not found', status: 404 }
      ))
    }

    const { id, img, name, biography, phone, username, email, posts } = user

    const filteredUser = { id, img, name, biography, phone, username, email, posts }

    return NextResponse.json(filteredUser)
  } catch (error) {
    customError(
      { error: 'Error when trying to update the user', status: 400, moreInfo: error?.message }
    )
    return NextResponse.send(400, {
      error: 'Error when trying to get the user',
      status: 400,
      moreInfo: error?.message
    })
  }
}

export async function PUT (request, { params }) {
  try {
    const session = await getServerSession(request)
    const userId = session?.user?.email

    if (!session || !userId) {
      return NextResponse.json(customError(
        { error: 'Unauthorized', status: 401 }
      ))
    }

    const data = await request.json()
    const userUpdated = await prisma.user.update({
      where: {
        id: Number(params.id)
      },
      data
    })

    if (!userUpdated) {
      return NextResponse.json(customError(
        { error: 'User not updated', status: 400 }
      ))
    }

    return NextResponse.json(userUpdated)
  } catch (error) {
    customError(
      { error: 'Error when trying to update the user', status: 400, moreInfo: error?.message }
    )
    return NextResponse.send(400, {
      error: 'Error when trying to update the user',
      status: 400,
      moreInfo: error?.message
    })
  }
}

export async function DELETE (request, { params }) {
  try {
    const userDeleted = await prisma.user.delete({
      where: {
        id: Number(params.id)
      }
    })
    return NextResponse.json(userDeleted)
  } catch (error) {
    customError(
      { error: 'Error when trying to update the user', status: 400, moreInfo: error?.message }
    )
    return NextResponse.send(400, {
      error: 'Error when trying to delete the user',
      status: 400,
      moreInfo: error?.message
    })
  }
}
