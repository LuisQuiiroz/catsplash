import { prisma } from '@/libs/prisma'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'your@email.com' },
        password: { label: 'Password', type: 'password', placeholder: '********' }
      },
      async authorize (credentials, req) {
        const userFound = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        if (!userFound) throw new Error('Wrong email')

        const match = await bcrypt.compare(credentials.password, userFound.pass_hash)

        if (!match) throw new Error('Wrong password')

        return { // datos para generar el JWT
          image: userFound.img,
          name: userFound.username,
          email: userFound.id
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
