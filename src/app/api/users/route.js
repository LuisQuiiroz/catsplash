import { prisma } from '@/libs/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { customError } from '@/app/utils/customError'

export async function GET () {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(customError(
      { error: error?.message, status: 400 }
    ))
  }
}

export async function POST (request) {
  try {
    const data = await request.json()
    const { username, email, password } = data

    const userFound = await prisma.user.findUnique({
      where: {
        username
      }
    })

    const emailFound = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (userFound) {
      return NextResponse.json(customError(
        { error: 'Username already exists', status: 400 }
      ))
    }

    if (emailFound) {
      return NextResponse.json(customError(
        { error: 'Email already exists', status: 400 }
      ))
    }

    const passHash = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        pass_hash: passHash
      }
    })

    const user = {
      username: newUser.username,
      email: newUser.email
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(customError(
      { error: error?.message, status: 400 }
    ))
  }
}
