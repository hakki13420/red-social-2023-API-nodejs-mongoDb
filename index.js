const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const usersRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')

dotenv.config({ path: './config/.env' })
require('./config/database')

const app = express()

// middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

// Routes
app.get('/', (req, res) => res.send('hello'))
app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/posts', postsRoute)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`server runnig on ${PORT}`))
