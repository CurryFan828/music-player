const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 5000
const SECRET = "supersecretkey" // in production, use an env variable

// In-memory "database"
const users = []

// Root
app.get("/", (req, res) => {
  res.send("Hello World from the backend!")
})

// REGISTER
app.post("/register", async (req, res) => {
  const { username, password, role } = req.body

  if (!username || !password || !role) {
    return res.status(400).json({ message: "Missing fields" })
  }

  console.log(users)
  console.log(password)
  console.log(role)
  const exists = users.find(u => u.username === username)
  console.log(exists)
  if (exists) {
    return res.status(400).json({ message: "User already exists" })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  users.push({ username, password: hashedPassword, role })

  res.json({ success: true, message: "User registered" })
})

// LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body
  const user = users.find(u => u.username === username)
  console.log(users)
  if (!user) return res.status(401).json({ message: "Invalid username" })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(401).json({ message: "Invalid password" })

  const token = jwt.sign(
    { username: user.username, role: user.role },
    SECRET,
    { expiresIn: "1h" }
  )

  res.json({ success: true, token })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})