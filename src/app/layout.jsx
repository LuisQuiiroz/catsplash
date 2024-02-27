// import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import './globals.css'
import { NavBar } from '@/components/NavBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'catsplash',
  description: 'app inspired in unsplash'
}
export const dynamic = 'force-dynamic'

export default async function RootLayout ({ children }) {
  const session = await getServerSession()
  return (
    <html lang='en'>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <NavBar />
          {children}
          <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
          />
        </SessionProvider>
      </body>
    </html>
  )
}
