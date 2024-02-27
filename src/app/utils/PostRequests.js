const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getAllPosts () {
  try {
    const res = await fetch(`${apiUrl}/api/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.ok) {
      return await res.json()
    } else {
      console.error('Failed to fetch posts')
      return {
        error: 'Failed to fetch posts'
      }
    }
  } catch (error) {
    console.error('Error when making GET request:', error)
    return {
      error: 'Error when making GET request'
    }
  }
}

export async function getOnePost (id) {
  try {
    const res = await fetch(`${apiUrl}/api/posts/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      return await res.json()
    } else {
      console.error('Failed to fetch post')
      return {
        error: 'Failed to fetch post'
      }
    }
  } catch (error) {
    console.error('Error when making GET request:', error)
    return {
      error: 'Error when making GET request'
    }
  }
}

export async function createPost (data, userId) {
  try {
    const res = await fetch(`${apiUrl}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: data.description.trim(),
        img: data.photo.trim(),
        userId
      })
    })
    if (res.ok) {
      return await res.json()
    } else {
      console.error('Post could not be created')
      return {
        error: 'Post could not be created'
      }
    }
  } catch (error) {
    console.error('Error when making POST request:', error)
    return {
      error: 'Error when making POST request'
    }
  }
}
export async function putPost (data, postId, userId) {
  try {
    const res = await fetch(`${apiUrl}/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: data.description.trim(),
        img: data.photo.trim(),
        userId
      })
    })
    if (res.ok) {
      return await res.json()
    } else {
      console.error('Post could not be updated')
      return {
        error: 'Post could not be updated'
      }
    }
  } catch (error) {
    console.error('Error when making PUT request', error)
    return {
      error: 'Error when making PUT request'
    }
  }
}

export async function deletePost (id) {
  try {
    const res = await fetch(`${apiUrl}/api/posts/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) {
      return {
        error: 'Error deleting post'
      }
    }
  } catch (error) {
    console.error('Error getting post data:', error)

    return {
      error: 'Error when making DELETE request'
    }
  }
}
