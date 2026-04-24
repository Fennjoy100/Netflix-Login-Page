import { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import './App.css'

const AUTH_STORAGE_KEY = 'netflix-clone-auth'
const SUBSCRIPTION_STORAGE_KEY = 'netflix-clone-subscription'
const SESSION_START_STORAGE_KEY = 'netflix-clone-session-start'
const MY_LIST_STORAGE_KEY = 'netflix-clone-my-list'
const RATINGS_STORAGE_KEY = 'netflix-clone-ratings'
const PRELOADER_DELAY_MS = 3000
const MOVIE_PRELOADER_DELAY_MS = 1600

const defaultForm = {
  email: '',
  password: '',
}

const createMovie = (id, title, image, details) => ({
  id,
  title,
  image,
  ...details,
})

const subscriptionPlans = [
  {
    id: 'monthly',
    name: 'Mobile Monthly',
    duration: '1 Month',
    price: 'Rs 1000',
    quality: 'HD streaming on one device',
  },
  {
    id: 'five-month',
    name: 'Premium Saver',
    duration: '5 Months',
    price: 'Rs 3000',
    quality: 'Ultra HD streaming on four devices',
  },
]

const browseRows = [
  {
    title: 'Trending Now',
    items: [
      createMovie('peaky-blinders', 'Peaky Blinders', '/image/1.jfif', {
        rating: '8.8/10',
        downloads: '2.3M downloads',
        views: '14.8M views',
        watchlist: '1.1M watchlist saves',
        year: '2013',
        duration: '6 Seasons',
        genre: 'Crime Drama',
        description:
          'A sharp crime saga about ambition, family power, and the rise of Tommy Shelby in post-war Birmingham.',
      }),
      createMovie('breaking-bad', 'Breaking Bad', '/image/2.jfif', {
        rating: '9.5/10',
        downloads: '3.9M downloads',
        views: '22.4M views',
        watchlist: '1.7M watchlist saves',
        year: '2008',
        duration: '5 Seasons',
        genre: 'Crime Thriller',
        description:
          'A chemistry teacher turns into a feared drug kingpin in one of the most iconic prestige dramas ever made.',
      }),
      createMovie('interstellar', 'Interstellar', '/image/7.jfif', {
        rating: '8.7/10',
        downloads: '2.1M downloads',
        views: '17.2M views',
        watchlist: '1.4M watchlist saves',
        year: '2014',
        duration: '2h 49m',
        genre: 'Sci-Fi Adventure',
        description:
          'A visually grand journey across space and time as explorers search for humanity\'s next home.',
      }),
      createMovie('stranger-things', 'Stranger Things', '/image/8.jfif', {
        rating: '8.6/10',
        downloads: '3.4M downloads',
        views: '26.1M views',
        watchlist: '2.2M watchlist saves',
        year: '2016',
        duration: '4 Seasons',
        genre: 'Sci-Fi Horror',
        description:
          'A nostalgic supernatural mystery where a small-town group faces impossible threats from another world.',
      }),
      createMovie('money-heist', 'Money Heist', '/image/3.jfif', {
        rating: '8.2/10',
        downloads: '2.8M downloads',
        views: '18.7M views',
        watchlist: '1.5M watchlist saves',
        year: '2017',
        duration: '5 Parts',
        genre: 'Heist Thriller',
        description:
          'A master planner leads a legendary robbery, turning strategy, emotion, and rebellion into global spectacle.',
      }),
      createMovie('sherlock', 'Sherlock', '/image/4.jfif', {
        rating: '9.1/10',
        downloads: '1.9M downloads',
        views: '12.3M views',
        watchlist: '920K watchlist saves',
        year: '2010',
        duration: '4 Seasons',
        genre: 'Mystery Drama',
        description:
          'A modern reimagining of Sherlock Holmes, packed with brilliant deductions and stylish storytelling.',
      }),
    ],
  },
  {
    title: 'Critically Acclaimed TV Dramas',
    items: [
      createMovie('black-mirror', 'Black Mirror', '/image/5.jfif', {
        rating: '8.7/10',
        downloads: '2.5M downloads',
        views: '15.9M views',
        watchlist: '1.3M watchlist saves',
        year: '2011',
        duration: '6 Seasons',
        genre: 'Anthology Sci-Fi',
        description:
          'A chilling anthology exploring technology, identity, and the dark corners of modern life.',
      }),
      createMovie('amazing-spider-man', 'The Amazing Spider-Man', '/image/9.jfif', {
        rating: '7.0/10',
        downloads: '1.6M downloads',
        views: '10.1M views',
        watchlist: '770K watchlist saves',
        year: '2012',
        duration: '2h 16m',
        genre: 'Superhero Action',
        description:
          'Peter Parker balances responsibility, love, and danger while growing into his own version of Spider-Man.',
      }),
      createMovie('man-of-steel', 'Man of Steel', '/image/10.jfif', {
        rating: '7.1/10',
        downloads: '1.7M downloads',
        views: '11.6M views',
        watchlist: '880K watchlist saves',
        year: '2013',
        duration: '2h 23m',
        genre: 'Superhero Epic',
        description:
          'Superman\'s origin is retold with scale, emotion, and a battle over what it means to protect Earth.',
      }),
      createMovie('f1', 'F1', '/image/11.jfif', {
        rating: '8.4/10',
        downloads: '1.4M downloads',
        views: '9.8M views',
        watchlist: '690K watchlist saves',
        year: '2025',
        duration: '2h 35m',
        genre: 'Sports Drama',
        description:
          'High-speed intensity, rivalries, and pressure collide in a cinematic racing story built for adrenaline.',
      }),
      createMovie('dark-knight', 'The Dark Knight', '/image/6.jfif', {
        rating: '9.0/10',
        downloads: '3.1M downloads',
        views: '24.4M views',
        watchlist: '2.6M watchlist saves',
        year: '2008',
        duration: '2h 32m',
        genre: 'Crime Superhero',
        description:
          'Batman faces escalating chaos as Gotham is pushed to its limit by the Joker\'s terrifying unpredictability.',
      }),
      createMovie('dark', 'Dark', '/image/12.jfif', {
        rating: '8.7/10',
        downloads: '1.8M downloads',
        views: '13.6M views',
        watchlist: '1.1M watchlist saves',
        year: '2017',
        duration: '3 Seasons',
        genre: 'Time Mystery',
        description:
          'A haunting time-bending story where family secrets and fate intertwine across generations.',
      }),
    ],
  },
  {
    title: 'Top Picks for You',
    items: [
      createMovie('avengers-endgame', 'Avengers: Endgame', '/image/13.jfif', {
        rating: '8.4/10',
        downloads: '3.6M downloads',
        views: '28.2M views',
        watchlist: '2.8M watchlist saves',
        year: '2019',
        duration: '3h 1m',
        genre: 'Superhero Event',
        description:
          'The Avengers return for one final impossible mission to undo catastrophe and save the universe.',
      }),
      createMovie('finding-nemo', 'Finding Nemo', '/image/14.jfif', {
        rating: '8.2/10',
        downloads: '1.3M downloads',
        views: '8.7M views',
        watchlist: '610K watchlist saves',
        year: '2003',
        duration: '1h 40m',
        genre: 'Family Animation',
        description:
          'A heartfelt ocean adventure full of humor, color, and a father\'s determined journey to find his son.',
      }),
      createMovie('top-gun-maverick', 'Top Gun: Maverick', '/image/18.jfif', {
        rating: '8.3/10',
        downloads: '2.2M downloads',
        views: '16.5M views',
        watchlist: '1.2M watchlist saves',
        year: '2022',
        duration: '2h 10m',
        genre: 'Action Drama',
        description:
          'Maverick returns with speed, precision, and legacy on the line in a thrilling high-altitude comeback.',
      }),
      createMovie('transformers', 'Transformers', '/image/15.jfif', {
        rating: '7.0/10',
        downloads: '1.5M downloads',
        views: '10.9M views',
        watchlist: '730K watchlist saves',
        year: '2007',
        duration: '2h 24m',
        genre: 'Sci-Fi Action',
        description:
          'Explosive battles between Autobots and Decepticons bring giant-scale spectacle to Earth.',
      }),
      createMovie('wednesday', 'Wednesday', '/image/16.jfif', {
        rating: '8.1/10',
        downloads: '2.7M downloads',
        views: '19.2M views',
        watchlist: '1.9M watchlist saves',
        year: '2022',
        duration: '1 Season',
        genre: 'Mystery Comedy',
        description:
          'Wednesday Addams solves a twisted supernatural mystery with gothic charm and razor-sharp wit.',
      }),
      createMovie('lupin', 'Lupin', '/image/17.jfif', {
        rating: '7.5/10',
        downloads: '1.6M downloads',
        views: '11.4M views',
        watchlist: '860K watchlist saves',
        year: '2021',
        duration: '3 Parts',
        genre: 'Heist Mystery',
        description:
          'A charismatic master thief uses intelligence, disguise, and revenge to outplay every obstacle.',
      }),
    ],
  },
]

const preloaderPosterSet = [
  { title: 'Peaky Blinders', image: '/image/1.jfif' },
  { title: 'Money Heist', image: '/image/3.jfif' },
  { title: 'Avengers: Endgame', image: '/image/13.jfif' },
  { title: 'Dark', image: '/image/12.jfif' },
  { title: 'The Amazing Spider-Man', image: '/image/9.jfif' },
  { title: 'Wednesday', image: '/image/16.jfif' },
]

const movieCatalog = browseRows.flatMap((row) => row.items)
const movieById = Object.fromEntries(movieCatalog.map((movie) => [movie.id, movie]))

function formatUsageDuration(totalSeconds) {
  const safeSeconds = Math.max(0, totalSeconds)
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`
  }

  return `${minutes}m ${seconds}s`
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
        setIsSubmitting(false)
        return
      }

      await onLogin(data.user)
      navigate('/dashboard', { replace: true })
    } catch {
      setStatusMessage('Network error. Please try again in a moment.')
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
            <span
              className="text-button-help"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  alert('Help is not available in this demo.')
                }
              }}
              onClick={() => alert('Help is not available in this demo.')}
            >
              Need help?
            </span>
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
                <span
                  className="text-button-signup"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      alert('Sign up is not available in this demo.')
                    }
                  }}
                  onClick={() => alert('Sign up is not available in this demo.')}
                >
                  Sign up now
                </span>
              </p>
           </div>
         </div>
       </section>
     </main>
   )
 }

function NetflixPreloader() {
  const posterLibrary = [...preloaderPosterSet, ...preloaderPosterSet]

  return (
    <div className="preloader-overlay" role="status" aria-live="polite">
      <div className="preloader-backdrop" aria-hidden="true">
        {posterLibrary.map((poster, index) => (
          <div key={`${poster.title}-${index}`} className="poster-tile">
            <img src={poster.image} alt="" />
            <span>{poster.title}</span>
          </div>
        ))}
      </div>

      <div className="preloader-content">
        <span className="preloader-brand">NETFLIX</span>
        <div className="preloader-bar" aria-hidden="true">
          <span className="preloader-bar-fill"></span>
        </div>
      </div>
    </div>
  )
}

function MovieLaunchPreloader({ movie }) {
  if (!movie) {
    return null
  }

  return (
    <div className="movie-preloader-overlay" role="status" aria-live="polite">
      <img src={movie.image} alt={movie.title} className="movie-preloader-image" />
      <div className="movie-preloader-shade"></div>
      <div className="movie-preloader-content">
        <p className="eyebrow">Opening Title</p>
        <h2>{movie.title}</h2>
        <p className="movie-preloader-copy">
          Loading ratings, downloads, views, and your movie dashboard.
        </p>
      </div>
    </div>
  )
}

function RatingModal({ movie, userRating, onRate, onClose }) {
  const [hoveredStar, setHoveredStar] = useState(0)

  const handleStarClick = (rating) => {
    onRate(movie.id, rating)
    onClose()
  }

  return (
    <div className="rating-modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="rating-modal" onClick={(e) => e.stopPropagation()}>
        <button className="rating-modal-close" type="button" onClick={onClose} aria-label="Close rating modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="rating-modal-poster">
          <img src={movie.image} alt={movie.title} />
        </div>

        <div className="rating-modal-content">
          <p className="eyebrow">Rate this title</p>
          <h2>{movie.title}</h2>

          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = star <= (hoveredStar || userRating)
              return (
                <button
                  key={star}
                  className={`star-button ${isFilled ? 'star-filled' : 'star-empty'}`}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  aria-label={`Rate ${star} out of 5 stars`}
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill={isFilled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
              )
            })}
          </div>

          {userRating > 0 && (
            <p className="rating-thanks">Thanks for rating!</p>
          )}
        </div>
      </div>
    </div>
  )
}

function UsageSummaryModal({ usageText, onClose }) {
  return (
    <div className="usage-modal-overlay" role="dialog" aria-modal="true">
      <div className="usage-modal">
        <p className="eyebrow">Session Summary</p>
        <h2>Thanks for watching.</h2>
        <p className="usage-modal-copy">
          You used Netflix for <strong>{usageText}</strong>.
        </p>
        <button className="usage-modal-button" type="button" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  )
}

function BrowseHeader({
  currentPlan,
  usageSeconds,
  onManagePlan,
  onLogout,
  onOpenMyList,
}) {
  return (
    <header className="browse-header">
        <div className="browse-brand-row">
          <Link to="/dashboard" className="brand-mark brand-mark-small">NETFLIX</Link>
          <nav className="browse-nav">
            <Link to="/dashboard">Home</Link>
            <Link to="/dashboard">TV Shows</Link>
            <Link to="/dashboard">Movies</Link>
            <button className="nav-link-button" type="button" onClick={onOpenMyList}>
              My List
            </button>
          </nav>
        </div>

      <div className="browse-tools">
        <span className="time-chip">Used {formatUsageDuration(usageSeconds)}</span>
        <span className="plan-chip">{currentPlan?.price} | {currentPlan?.duration}</span>
        <button className="text-button" type="button" onClick={onManagePlan}>
          Subscription
        </button>
        <button className="text-button" type="button" onClick={onLogout}>
          Sign out
        </button>
      </div>
    </header>
  )
}

function SubscriptionPlans({ selectedPlanId, onSelectPlan, showArrows, onScrollLeft, onScrollRight }) {
  return (
    <section className="subscription-panel">
      <div className="subscription-header">
        <p className="eyebrow">Subscription</p>
        <h2>Choose your plan</h2>
        <p className="subscription-copy">
          Pick a subscription amount to unlock the movie app experience.
        </p>
      </div>

      <div className="plan-scroll-wrapper">
        <div className="mobile-subscription-label">Subscription</div>
        {showArrows && (
          <button
            className="plan-scroll-arrow plan-scroll-arrow-left visible"
            aria-label="Previous plan"
            onClick={onScrollLeft}
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <div className="plan-grid">
          {subscriptionPlans.map((plan) => {
            const isActive = selectedPlanId === plan.id

            return (
              <button
                key={plan.id}
                type="button"
                className={`plan-card${isActive ? ' plan-card-active' : ''}`}
                onClick={() => onSelectPlan(plan)}
              >
                <span className="plan-name">{plan.name}</span>
                <strong className="plan-price">{plan.price}</strong>
                <span className="plan-duration">{plan.duration}</span>
              </button>
            )
          })}
        </div>
        {showArrows && (
          <button
            className="plan-scroll-arrow plan-scroll-arrow-right visible"
            aria-label="Next plan"
            onClick={onScrollRight}
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>
    </section>
  )
}

function BrowsePage({
  currentUser,
  currentPlan,
  usageSeconds,
  onManagePlan,
  onLogout,
  onOpenMovie,
  onOpenMyList,
}) {
  return (
    <main className="browse-shell">
      <BrowseHeader
        currentPlan={currentPlan}
        usageSeconds={usageSeconds}
        onManagePlan={onManagePlan}
        onLogout={onLogout}
        onOpenMyList={onOpenMyList}
      />

      <section className="hero-banner">
        <div className="hero-banner-content">
          <p className="eyebrow">Now Streaming</p>
          <h1>Welcome, {currentUser?.name || 'Viewer'}</h1>
          <p className="dashboard-copy">
            Your selected plan is active. Click any movie card to open a full detail page.
          </p>
        </div>
      </section>

      <section className="browse-rows">
        {browseRows.map((row) => (
          <div key={row.title} className="browse-row">
            <h2>{row.title}</h2>
            <div className="content-strip">
              {row.items.map((item, index) => (
                <article
                  key={item.id}
                  className={`content-card content-card-${(index % 6) + 1}`}
                  onClick={() => onOpenMovie(item)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      onOpenMovie(item)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <img src={item.image} alt={item.title} className="content-card-image" />
                  <span>{item.title}</span>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

function MovieDetailPage({
  currentUser,
  currentPlan,
  usageSeconds,
  myList,
  userRatings,
  ratingMovieId,
  onDownloadMovie,
  onRateMovie,
  onOpenRatingModal,
  onCloseRatingModal,
  onBackToBrowse,
  onManagePlan,
  onLogout,
  onOpenMyList,
}) {
  const { movieId } = useParams()
  const movie = movieById[movieId]
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)

  if (!movie) {
    return <Navigate to="/dashboard" replace />
  }

  const isInMyList = myList.some((savedMovie) => savedMovie.id === movie.id)
  const userRating = userRatings[movie.id] || 0
  const showRatingModal = ratingMovieId === movie.id

  const handleDownloadClick = () => {
    if (isInMyList || isDownloading) return

    setIsDownloading(true)
    setDownloadProgress(0)

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsDownloading(false)
          onDownloadMovie(movie)
          return 0
        }
        return prev + 1
      })
    }, 20) // 20ms * 100 = 2000ms total
  }

   const getButtonContent = () => {
     if (isInMyList) {
       return 'Saved in My List'
     }
     if (isDownloading) {
       return 'Downloading...'
     }
     return 'Download Movie'
   }

   return (
    <main className="browse-shell">
      <BrowseHeader
        currentPlan={currentPlan}
        usageSeconds={usageSeconds}
        onManagePlan={onManagePlan}
        onLogout={onLogout}
        onOpenMyList={onOpenMyList}
      />

      <section className="movie-detail-hero">
        <div className="movie-detail-poster-wrap">
          <img src={movie.image} alt={movie.title} className="movie-detail-poster" />
        </div>

        <div className="movie-detail-copy">
          <p className="eyebrow">Now Watching</p>
          <h1>{movie.title}</h1>
          <p className="movie-meta-line">
            {movie.year} | {movie.duration} | {movie.genre}
          </p>
          <p className="movie-detail-description">{movie.description}</p>

          <div className="movie-stats-grid">
            <article className="movie-stat-card">
              <span className="movie-stat-label">Rating</span>
              <strong>{movie.rating}</strong>
            </article>
            <article className="movie-stat-card">
              <span className="movie-stat-label">People Downloaded</span>
              <strong>{movie.downloads}</strong>
            </article>
            <article className="movie-stat-card">
              <span className="movie-stat-label">Views</span>
              <strong>{movie.views}</strong>
            </article>
            <article className="movie-stat-card">
              <span className="movie-stat-label">Watchlist</span>
              <strong>{movie.watchlist}</strong>
            </article>
          </div>

          <div className="movie-detail-actions">
            <button
              className={`usage-modal-button download-button${isDownloading ? ' downloading' : ''}${isInMyList ? ' saved' : ''}`}
              type="button"
              onClick={handleDownloadClick}
              disabled={isInMyList || isDownloading}
            >
              {getButtonContent()}
            </button>
            <button
              className="usage-modal-button rate-button"
              type="button"
              onClick={onOpenRatingModal}
            >
              {userRating > 0 ? `Your Rating: ${'★'.repeat(userRating)}` : 'Rate Movie'}
            </button>
            <button className="usage-modal-button" type="button" onClick={onBackToBrowse}>
              Back to Browse
            </button>
          </div>

          {isDownloading && (
            <div className="download-progress-bar">
              <div className="download-progress-fill" style={{ transform: `scaleX(${downloadProgress / 100})` }}></div>
            </div>
          )}
        </div>
      </section>

      <section className="browse-rows">
        <div className="browse-row">
          <h2>Movie Info</h2>
          <div className="movie-info-panel">
            <p>
              <span className="movie-info-label">Viewer:</span> {currentUser?.name || 'Viewer'}
            </p>
            <p>
              <span className="movie-info-label">Subscription:</span> {currentPlan?.price} |{' '}
              {currentPlan?.duration}
            </p>
            <p>
              <span className="movie-info-label">Streaming Status:</span> Ready to play
            </p>
          </div>
        </div>
      </section>

      {showRatingModal && (
        <RatingModal
          movie={movie}
          userRating={userRating}
          onRate={onRateMovie}
          onClose={onCloseRatingModal}
        />
      )}
    </main>
  )
  }

  function MyListPage({
  currentPlan,
  usageSeconds,
  myList,
  selectedMovieIds,
  onToggleSelect,
  onSelectAll,
  onDeselectAll,
  onClearSelected,
  onClearAll,
  onManagePlan,
  onLogout,
  onOpenMovie,
  onOpenMyList,
  onBackToBrowse,
}) {
  const handleToggleSelect = (movie) => {
    onToggleSelect(movie.id)
  }

  const handleSelectAllClick = () => {
    const allSelected = myList.every((movie) => selectedMovieIds.includes(movie.id))
    if (allSelected) {
      onDeselectAll()
    } else {
      onSelectAll()
    }
  }

  const handleClearSelected = () => {
    onClearSelected()
    if (myList.length - selectedMovieIds.length === 0) {
      onBackToBrowse()
    }
  }

  const handleClearAll = () => {
    onClearAll()
    onBackToBrowse()
  }

  return (
    <main className="browse-shell">
      <BrowseHeader
        currentPlan={currentPlan}
        usageSeconds={usageSeconds}
        onManagePlan={onManagePlan}
        onLogout={onLogout}
        onOpenMyList={onOpenMyList}
      />

      <section className="browse-rows">
        <div className="browse-row">
          <div className="my-list-header">
            <div>
              <p className="eyebrow">My List</p>
              <h2>Downloaded movies</h2>
            </div>
            <div className="my-list-controls">
              {myList.length > 0 && (
                <>
                  <button
                    className="text-button select-all-button"
                    type="button"
                    onClick={handleSelectAllClick}
                  >
                    {myList.every((movie) => selectedMovieIds.includes(movie.id)) ? 'Deselect All' : 'Select All'}
                  </button>
                  <button className="text-button clear-all-button" type="button" onClick={handleClearAll}>
                    Clear All
                  </button>
                  {selectedMovieIds.length > 0 && (
                    <button className="text-button clear-button" type="button" onClick={handleClearSelected}>
                      Clear Selected ({selectedMovieIds.length})
                    </button>
                  )}
                </>
              )}
              <button className="text-button" type="button" onClick={onBackToBrowse}>
                Back to Browse
              </button>
            </div>
          </div>

           {myList.length === 0 ? (
             <div className="movie-info-panel empty-state">
               <p>No downloaded movies yet. Use the `Download Movie` button inside a movie page.</p>
             </div>
           ) : (
             <div className="content-strip">
               {myList.map((movie, index) => (
                   <article
                     key={movie.id}
                     className={`content-card content-card-${(index % 6) + 1}`}
                     onClick={() => onOpenMovie(movie)}
                     onKeyDown={(event) => {
                       if (event.key === 'Enter' || event.key === ' ') {
                         event.preventDefault()
                         onOpenMovie(movie)
                       }
                     }}
                     role="button"
                     tabIndex={0}
                   >
                     <img src={movie.image} alt={movie.title} className="content-card-image" />
                     <span>{movie.title}</span>
                   </article>
               ))}
             </div>
           )}
        </div>
      </section>
    </main>
  )
}

function DashboardPage({
  currentUser,
  currentPlan,
  usageSeconds,
  onLogout,
  onSelectPlan,
  onOpenMovie,
  onOpenMyList,
}) {
  const navigate = useNavigate()
  const [showPlanArrows, setShowPlanArrows] = useState(false)

  useEffect(() => {
    if (window.innerWidth <= 640) {
      setShowPlanArrows(true)
      const timer = window.setTimeout(() => setShowPlanArrows(false), 5000)
      return () => window.clearTimeout(timer)
    }
  }, [])

  const scrollPlans = (direction) => {
    const wrapper = document.querySelector('.plan-grid')
    if (wrapper) {
      const scrollAmount = wrapper.clientWidth * 0.8
      wrapper.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const handleLogout = () => {
    onLogout()
    navigate('/', { replace: true })
  }

  if (currentPlan) {
    return (
      <BrowsePage
        currentUser={currentUser}
        currentPlan={currentPlan}
        usageSeconds={usageSeconds}
        onManagePlan={() => onSelectPlan(null)}
        onLogout={handleLogout}
        onOpenMovie={onOpenMovie}
        onOpenMyList={onOpenMyList}
      />
    )
  }

  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <span className="brand-mark">NETFLIX</span>
        <div className="dashboard-actions">
          <span className="time-chip">Used {formatUsageDuration(usageSeconds)}</span>
          <button className="text-button" type="button" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </header>

      <section className="dashboard-card">
        <div className="dashboard-layout">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1>Welcome back, {currentUser?.name || 'Viewer'}.</h1>
            <p className="dashboard-copy">
              Choose a subscription plan. After selecting a plan, you can open any movie card
              and see a detailed page with rating, downloads, views, and watchlist stats.
            </p>
          </div>

          <SubscriptionPlans
            selectedPlanId={currentPlan?.id}
            onSelectPlan={onSelectPlan}
            showArrows={showPlanArrows}
            onScrollLeft={() => scrollPlans('left')}
            onScrollRight={() => scrollPlans('right')}
          />
        </div>
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
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false)
  const [usageSeconds, setUsageSeconds] = useState(0)
  const [usageSummary, setUsageSummary] = useState('')
  const [selectedMovieForLaunch, setSelectedMovieForLaunch] = useState(null)
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = window.sessionStorage.getItem(AUTH_STORAGE_KEY)
    return storedUser ? JSON.parse(storedUser) : null
  })
  const [currentPlan, setCurrentPlan] = useState(() => {
    const storedPlan = window.sessionStorage.getItem(SUBSCRIPTION_STORAGE_KEY)
    return storedPlan ? JSON.parse(storedPlan) : null
  })
  const [myList, setMyList] = useState(() => {
    const storedMyList = window.sessionStorage.getItem(MY_LIST_STORAGE_KEY)
    return storedMyList ? JSON.parse(storedMyList) : []
  })
  const [selectedMovieIds, setSelectedMovieIds] = useState([])
  const [downloadProgress, setDownloadProgress] = useState({})
  const [userRatings, setUserRatings] = useState(() => {
    const storedRatings = window.sessionStorage.getItem(RATINGS_STORAGE_KEY)
    return storedRatings ? JSON.parse(storedRatings) : {}
  })
  const [ratingMovieId, setRatingMovieId] = useState(null)

  useEffect(() => {
    if (!currentUser) {
      setUsageSeconds(0)
      return
    }

    const storedStart = window.sessionStorage.getItem(SESSION_START_STORAGE_KEY)
    const start = storedStart ? Number(storedStart) : Date.now()

    if (!storedStart) {
      window.sessionStorage.setItem(SESSION_START_STORAGE_KEY, String(start))
    }

    const updateUsage = () => {
      setUsageSeconds(Math.floor((Date.now() - start) / 1000))
    }

    updateUsage()
    const intervalId = window.setInterval(updateUsage, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [currentUser])

  const handleLogin = (user) =>
    new Promise((resolve) => {
      setIsPreloaderVisible(true)

      window.setTimeout(() => {
        window.sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
        window.sessionStorage.setItem(SESSION_START_STORAGE_KEY, String(Date.now()))
        setCurrentUser(user)
        setUsageSeconds(0)
        setIsPreloaderVisible(false)
        resolve()
      }, PRELOADER_DELAY_MS)
    })

  const handleLogout = () => {
    const totalUsage = formatUsageDuration(usageSeconds)
    window.sessionStorage.removeItem(AUTH_STORAGE_KEY)
    window.sessionStorage.removeItem(SUBSCRIPTION_STORAGE_KEY)
    window.sessionStorage.removeItem(SESSION_START_STORAGE_KEY)
    window.sessionStorage.removeItem(MY_LIST_STORAGE_KEY)
    setCurrentUser(null)
    setCurrentPlan(null)
    setUsageSeconds(0)
    setSelectedMovieForLaunch(null)
    setMyList([])
    setSelectedMovieIds([])
    setUsageSummary(totalUsage)
  }

  const handleSelectPlan = (plan) => {
    if (!plan) {
      window.sessionStorage.removeItem(SUBSCRIPTION_STORAGE_KEY)
      setCurrentPlan(null)
      return
    }

    window.sessionStorage.setItem(SUBSCRIPTION_STORAGE_KEY, JSON.stringify(plan))
    setCurrentPlan(plan)
  }

  const handleOpenMovie = (movie, navigate) => {
    setSelectedMovieForLaunch(movie)

    window.setTimeout(() => {
      setSelectedMovieForLaunch(null)
      navigate(`/movie/${movie.id}`)
    }, MOVIE_PRELOADER_DELAY_MS)
  }

  const handleDownloadMovie = (movie) => {
    setMyList((currentMyList) => {
      if (currentMyList.some((savedMovie) => savedMovie.id === movie.id)) {
        return currentMyList
      }

      const nextMyList = [...currentMyList, movie]
      window.sessionStorage.setItem(MY_LIST_STORAGE_KEY, JSON.stringify(nextMyList))
      return nextMyList
    })
  }

  const handleToggleSelect = (movieId) => {
    setSelectedMovieIds((currentSelected) =>
      currentSelected.includes(movieId)
        ? currentSelected.filter((id) => id !== movieId)
        : [...currentSelected, movieId]
    )
  }

  const handleSelectAll = () => {
    setSelectedMovieIds(myList.map((movie) => movie.id))
  }

  const handleDeselectAll = () => {
    setSelectedMovieIds([])
  }

  const handleClearSelected = () => {
    setMyList((currentMyList) => {
      const nextMyList = currentMyList.filter((movie) => !selectedMovieIds.includes(movie.id))
      window.sessionStorage.setItem(MY_LIST_STORAGE_KEY, JSON.stringify(nextMyList))
      setSelectedMovieIds([])
      return nextMyList
    })
  }

  const handleClearAll = () => {
    setMyList([])
    setSelectedMovieIds([])
    window.sessionStorage.setItem(MY_LIST_STORAGE_KEY, JSON.stringify([]))
  }

  const handleRateMovie = (movieId, rating) => {
    setUserRatings((currentRatings) => {
      const nextRatings = { ...currentRatings, [movieId]: rating }
      window.sessionStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(nextRatings))
      return nextRatings
    })
  }

  const handleOpenRatingModal = (movieId) => {
    setRatingMovieId(movieId)
  }

  const handleCloseRatingModal = () => {
    setRatingMovieId(null)
  }

  return (
    <>
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
              <DashboardRouteAdapter
                currentUser={currentUser}
                currentPlan={currentPlan}
                usageSeconds={usageSeconds}
                onLogout={handleLogout}
                onSelectPlan={handleSelectPlan}
                onOpenMovie={handleOpenMovie}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-list"
          element={
            <ProtectedRoute isAuthenticated={Boolean(currentUser)}>
              <MyListRouteAdapter
                currentPlan={currentPlan}
                usageSeconds={usageSeconds}
                myList={myList}
                selectedMovieIds={selectedMovieIds}
                onToggleSelect={handleToggleSelect}
                onSelectAll={handleSelectAll}
                onDeselectAll={handleDeselectAll}
                onClearSelected={handleClearSelected}
                onClearAll={handleClearAll}
                onManagePlan={() => handleSelectPlan(null)}
                onLogout={handleLogout}
                onOpenMovie={handleOpenMovie}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movie/:movieId"
          element={
            <ProtectedRoute isAuthenticated={Boolean(currentUser)}>
              <MovieDetailRouteAdapter
                currentUser={currentUser}
                currentPlan={currentPlan}
                usageSeconds={usageSeconds}
                myList={myList}
                userRatings={userRatings}
                ratingMovieId={ratingMovieId}
                onDownloadMovie={handleDownloadMovie}
                onRateMovie={handleRateMovie}
                onOpenRatingModal={handleOpenRatingModal}
                onCloseRatingModal={handleCloseRatingModal}
                onManagePlan={() => handleSelectPlan(null)}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {isPreloaderVisible ? <NetflixPreloader /> : null}
      {selectedMovieForLaunch ? <MovieLaunchPreloader movie={selectedMovieForLaunch} /> : null}
      {usageSummary ? (
        <UsageSummaryModal
          usageText={usageSummary}
          onClose={() => setUsageSummary('')}
        />
      ) : null}
    </>
  )
}

function DashboardRouteAdapter(props) {
  const navigate = useNavigate()

  return (
    <DashboardPage
      {...props}
      onOpenMovie={(movie) => props.onOpenMovie(movie, navigate)}
      onOpenMyList={() => navigate('/my-list')}
    />
  )
}

function MovieDetailRouteAdapter(props) {
  const navigate = useNavigate()

  return (
    <MovieDetailPage
      {...props}
      onBackToBrowse={() => navigate('/dashboard')}
      onOpenMyList={() => navigate('/my-list')}
    />
  )
}

function MyListRouteAdapter(props) {
  const navigate = useNavigate()

  return (
    <MyListPage
      {...props}
      onSelectAll={props.onSelectAll}
      onDeselectAll={props.onDeselectAll}
      onOpenMyList={() => navigate('/my-list')}
      onBackToBrowse={() => navigate('/dashboard')}
      onOpenMovie={(movie) => props.onOpenMovie(movie, navigate)}
    />
  )
}

export default App


