import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'
const server = createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(readFileSync('ch2/backend/users.json'))
})
const host = 'localhost'
const port = 4000
server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`)
})
