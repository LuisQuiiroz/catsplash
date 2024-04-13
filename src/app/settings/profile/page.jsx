'use client'
import { GetOneUser } from '@/app/utils/UserRequests'
import { ProfileForm } from '@/components/user/ProfileForm'
import { ProfileInfo } from '@/components/user/ProfileInfo'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Profile () {
  const [user, setUser] = useState(null)
  const [editUser, setEditUser] = useState(false)
  const session = useSession()

  useEffect(() => {
    GetOneUser(session?.data?.user?.email)
      .then(res => {
        const { id, img, name, biography, phone, username, email } = res
        const userData = {
          id, img, name, biography, phone, username, email
        }
        setUser(userData)
      })
  }, [editUser])
  return (
    <div className='p-4'>
      {/* <div>
        <h1>Personal Info</h1>
        <p>Basic info, like your name and photo</p>
      </div> */}
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      {!editUser && <ProfileInfo user={user} editUser={() => setEditUser(true)} />}
      {editUser && <ProfileForm userId={user.id} editUser={() => setEditUser(false)} />}

    </div>
  )
}
