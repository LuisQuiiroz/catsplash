import { customError } from '@/app/utils/customError'
import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET () {
  try {
    const posts = await prisma.post.findMany()
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(customError(
      { error: error?.message, status: 400 }
    ))
  }
}

export async function POST (request) {
  try {
    const data = await request.json()
    const newPost = await prisma.post.create({
      data: {
        img: data.img,
        content: data.content,
        userId: data.userId
      }
    })
    return NextResponse.json(newPost)
  } catch (error) {
    return NextResponse.json(customError(
      { error: error?.message, status: 400 }
    ))
  }
}
