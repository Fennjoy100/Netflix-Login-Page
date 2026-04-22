import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'

const AUTH_STORAGE_KEY = 'netflix-clone-auth'

const defaultForm = {
  email: '',
  password: '',
}

function LoginPage({ isAuthenticated, onLogin }) {
  const navigate = useNavigate()
  const [form, setForm] = useState(defaultForm)
  const [fieldErrors, setFieldErrors] = useState({})
  const [statusMessage, setStatusMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleChange = ({ target }) => {
    const { name, value } = target

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))

    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }))

    setStatusMessage('')
  }

  const validateForm = () => {
    const nextErrors = {}

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.'
    }

    if (!form.password.trim()) {
      nextErrors.password = 'Password is required.'
    }

    setFieldErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setStatusMessage('')

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatusMessage(data.message || 'Unable to sign in right now.')
        return
      }

      onLogin(data.user)
      navigate('/dashboard', { replace: true })
    } catch {
      setStatusMessage('Network error. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="page-shell">
      <section className="hero-overlay">
        <header className="brand-bar">
          <span className="brand-mark">NETFLIX</span>
        </header>

        <div className="login-card">
          <h1>Sign In</h1>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <label className="field-group" htmlFor="email">
              <span className="sr-only">Email address</span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email or phone number"
                value={form.email}
                onChange={handleChange}
                aria-invalid={Boolean(fieldErrors.email)}
              />
              {fieldErrors.email ? (
                <span className="field-error">{fieldErrors.email}</span>
              ) : null}
            </label>

            <label className="field-group" htmlFor="password">
              <span className="sr-only">Password</span>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                aria-invalid={Boolean(fieldErrors.password)}
              />
              {fieldErrors.password ? (
                <span className="field-error">{fieldErrors.password}</span>
              ) : null}
            </label>

            {statusMessage ? (
              <p className="status-banner" role="alert">
                {statusMessage}
              </p>
            ) : null}

            <button className="sign-in-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="helper-row">
            <label className="remember-me">
              <input type="checkbox" defaultChecked />
              <span>Remember me</span>
            </label>
            <a href="/" onClick={(event) => event.preventDefault()}>
              Need help?
            </a>
          </div>

          <div className="login-copy">
            <p>
              <span className="muted-text">Demo credentials:</span>
            </p>
            <p>
              Username: <span className="credential-text">viewer@netflixclone.dev</span>
            </p>
            <p>
              Password: <span className="credential-text">Stream@2026</span>
            </p>
            <p className="signup-line">
              New to Netflix?{' '}
              <a href="/" onClick={(event) => event.preventDefault()}>
                Sign up now
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

function DashboardPage({ currentUser, onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/', { replace: true })
  }

  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <span className="brand-mark">NETFLIX</span>
        <button className="text-button" type="button" onClick={handleLogout}>
          Sign out
        </button>
      </header>

      <section className="dashboard-card">
        <p className="eyebrow">Dashboard</p>
        <h1>Welcome back, {currentUser?.name || 'Viewer'}.</h1>
        <p className="dashboard-copy">
          Your mock authentication flow is working. This screen stands in for a
          protected page after a successful login.
        </p>
      </section>
    </main>
  )
}

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = window.sessionStorage.getItem(AUTH_STORAGE_KEY)
    return storedUser ? JSON.parse(storedUser) : null
  })

  const handleLogin = (user) => {
    window.sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    setCurrentUser(user)
  }

  const handleLogout = () => {
    window.sessionStorage.removeItem(AUTH_STORAGE_KEY)
    setCurrentUser(null)
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LoginPage
            isAuthenticated={Boolean(currentUser)}
            onLogin={handleLogin}
          />
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={Boolean(currentUser)}>
            <DashboardPage currentUser={currentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
