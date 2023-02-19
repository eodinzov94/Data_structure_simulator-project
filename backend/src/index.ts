import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { sequelize } from './db.js'
import UserRouter from './routes/UserRoutes.js'
import LecturerRouter from './routes/LecturerRoutes.js'
import ErrorHandlingMiddleware from './middleware/ErrorHandlingMiddleware.js'

dotenv.config()


const app = express()
const PORT = 3001
app.use(cors())
app.use(express.json())
app.use('/api/user', UserRouter)
app.use('/api/lecturer',LecturerRouter)

//Error Handler - Last middleware
app.use(ErrorHandlingMiddleware)
const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

export default app
start()
