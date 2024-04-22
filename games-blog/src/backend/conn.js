import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'db',
  user: 'blog_user',
  database: 'blog_db',
  password: 'blog_pass44',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default pool