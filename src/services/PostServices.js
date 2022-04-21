import Client from './api'

export const GetPosts = async () => {
  try {
    const res = await Client.get('/post')
    return res.data
  } catch (error) {
    throw error
  }
}
