const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function GetOneUser (id) {
  try {
    const res = await fetch(`${apiUrl}/api/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      return await res.json()
    } else {
      console.error('Failed to fetch user')
      return {
        error: 'Failed to fetch user'
      }
    }
  } catch (error) {
    console.error('Error getting user data')
    return {
      error: 'Error getting user data'
    }
  }
}
