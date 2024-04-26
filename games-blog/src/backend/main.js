import express from 'express'
import cors from 'cors'
import fs from 'fs'
import { createToken, validateToken } from './jwt.js'


import {
  getAllPosts, getPostByID, insertPost, updatePostByID, deletePostByID, userLogin, signInUser
} from './db.js'

const app = express()
const port = 3000


function handleUnsupportedMethods(req, res, next) {
  if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'DELETE') {
    return res.status(501).json({ error: 'Method not implemented' })
  }
  return next()
}

app.use(express.json())
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}))


app.use(handleUnsupportedMethods)

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await userLogin(username, password)

    if (user) {
      const token = createToken(user)
      res.status(200).json({ "LogedIn": true, access_token: token})

    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/signIn', async (req, res) => {
  try {
    const { username, email, password } = req.body
    await signInUser(username, email, password)
    res.status(200).json({ "signedIN": true})
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error Colud Not Sign In', reason: error.message})
  }
})

app.get('/posts', async (req, res) => {
  try {
    const posts = await getAllPosts()
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params
    const post = await getPostByID(postId)
    if (post) {
      res.json(post)
    } else {
      res.status(404).json({ error: 'Post not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/posts', async (req, res) => {
  try {
    const {
      title, gameDescription, genre, mainPlatform, multiplayerSupport, onlineFeatures,
    } = req.body
    const result = await insertPost(
      title,
      gameDescription,
      genre,
      mainPlatform,
      multiplayerSupport,
      onlineFeatures,
    )
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.put('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params
    const {
      title, gameDescription, genre, mainPlatform, multiplayerSupport, onlineFeatures,
    } = req.body
    const updatedPost = await updatePostByID(postId, title, gameDescription, genre, mainPlatform, multiplayerSupport, onlineFeatures)
    if (updatedPost) {
      res.status(200).json(updatedPost)
    } else {
      res.status(404).json({ error: 'Post not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.delete('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params
    const deletionSuccessful = await deletePostByID(postId)

    if (deletionSuccessful) {
      res.status(204).send()
    } else {
      res.status(404).json({ error: 'Post not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})