import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET () {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(error.message)
  }
}

export async function POST (request) {
  try {
    const data = await request.json()
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        pass_hash: data.pass
      }
    })
    return NextResponse.json(newUser)
  } catch (error) {
    return NextResponse.json(error.message)
  }
}
