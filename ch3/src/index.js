import { app } from './app.js'
import dotenv from 'dotenv'
import { initDatabase } from './db/init.js'
dotenv.config()
const PORT = process.env.PORT

try {
    await initDatabase()
    app.listen(PORT)
    console.info(`express server running on http://localhost:${PORT}`)
  } catch (err) {
    console.error('error connecting to database:', err)
  }