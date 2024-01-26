import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET (request, { params }) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(params.id)
      }
    })
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(error.message)
  }
}

export async function PUT (request, { params }) {
  try {
    const data = await request.json()
    const postUpdated = await prisma.post.update({
      where: {
        id: Number(params.id)
      },
      data
    })
    return NextResponse.json(postUpdated)
  } catch (error) {
    return NextResponse.json(error.message)
  }
}

export async function DELETE (request, { params }) {
  try {
    const postDeleted = await prisma.post.delete({
      where: {
        id: Number(params.id)
      }
    })
    return NextResponse.json(postDeleted)
  } catch (error) {
    return NextResponse.json(error.message)
  }
}
