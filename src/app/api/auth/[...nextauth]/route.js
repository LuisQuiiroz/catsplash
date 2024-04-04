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

        // const user = {
        //   name: userFound.name,
        //   image: userFound.img,
        //   email: userFound.email,
        //   username: userFound.username,
        //   id: userFound.id
        // }
        // return user
        return { // datos para generar el JWT
          image: userFound.img,
          name: userFound.username,
          email: userFound.id
        }
      }
    })
  ],
  // callbacks: {
  //   async jwt (token) {
  //     if (token.user) {
  //       token.token.username = token.user.username
  //       token.token.id = token.user.id
  //     }
  //     return token
  //   },
  //   async session (session) {
  //     session.session.user.name = session.token.token.user.name ?? ''
  //     session.session.user.email = session.token.token.user.email ?? ''
  //     session.session.user.image = session.token.token.user.image ?? ''
  //     session.session.user.username = session.token.token.user.username ?? ''
  //     session.session.user.id = session.token.token.user.id ?? ''

  //     return session
  //   }
  // },
  pages: {
    signIn: '/login'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
