import app from './app.js'

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Mock auth server listening on port ${port}`)
})
