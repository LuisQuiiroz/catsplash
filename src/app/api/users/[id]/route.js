import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET (request, { params }) {
  try {
    let user
    const identifier = params.id
    if (!isNaN(identifier)) {
      user = await prisma.user.findUnique({
        where: {
          id: Number(identifier)
        },
        include: {
          posts: true
        }
      })
    } else {
      user = await prisma.user.findUnique({
        where: {
          username: identifier
        },
        include: {
          posts: true
        }
      })
    }

    if (!user) return NextResponse.json({ error: 'User not found', status: 404 })
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(error.message)
  }
}

export async function PUT (request, { params }) {
  try {
    const data = await request.json()
    const userUpdated = await prisma.user.update({
      where: {
        id: Number(params.id)
      },
      data
    })
    return NextResponse.json(userUpdated)
  } catch (error) {
    return NextResponse.json(error.message)
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
    return NextResponse.json(error.message)
  }
}
