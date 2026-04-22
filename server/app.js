import cors from 'cors'
import express from 'express'

const app = express()

const mockUser = {
  email: 'viewer@netflixclone.dev',
  password: 'Stream@2026',
  name: 'Demo Viewer',
}

app.use(cors())
app.use(express.json())

app.post('/api/login', (request, response) => {
  const { email = '', password = '' } = request.body ?? {}

  if (!email.trim() || !password.trim()) {
    return response.status(400).json({
      message: 'Email and password are required.',
    })
  }

  const isValidUser =
    email.trim().toLowerCase() === mockUser.email &&
    password === mockUser.password

  if (!isValidUser) {
    return response.status(401).json({
      message: 'Invalid email or password. Please try again.',
    })
  }

  return response.status(200).json({
    message: 'Login successful.',
    user: {
      email: mockUser.email,
      name: mockUser.name,
    },
  })
})

app.get('/api/health', (_request, response) => {
  response.status(200).json({ ok: true })
})

export default app
