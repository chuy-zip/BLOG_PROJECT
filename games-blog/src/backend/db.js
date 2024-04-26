import conn from './conn.js'

export async function getPostByID(postId) {
  const [rows] = await conn.query('SELECT * FROM games WHERE id = ?', [postId])
  return rows.length ? rows[0] : null
}

export async function insertPost(
  title,
  gameDescription,
  genre,
  mainPlatform,
  multiplayerSupport,
  onlineFeatures,
) {
  const [result] = await conn.query(
    'INSERT INTO games (title, game_description, genre, main_platform, multiplayer_support, online_features) VALUES (?, ?, ?, ?, ?, ?)',
    [title, gameDescription, genre, mainPlatform, multiplayerSupport, onlineFeatures],
  )

  const insertedRow = await getPostByID(result.insertId)

  return insertedRow
}

export async function getAllPosts() {
  const [rows] = await conn.query('SELECT * FROM games')
  return rows
}

export async function updatePostByID(id, title, gameDescription, genre, mainPlatform, multiplayerSupport, onlineFeatures) {
  await conn.query(
    'UPDATE games SET title = ?, game_description = ?, genre = ?, main_platform = ?, multiplayer_support = ?, online_Features = ? WHERE id = ?', 
    [title, gameDescription, genre, mainPlatform, multiplayerSupport, onlineFeatures, id])

  const updatedRow = await getPostByID(id)

  return updatedRow
}

export async function deletePostByID(id) {
  const existingPost = await getPostByID(id)

  if (!existingPost) {
    return false // Return false if post is not found
  }

  await conn.query('DELETE FROM games WHERE id = ?', [id])
  return true // Return true if deletion was successful
}

export async function signInUser(username, email, password) {
  try {
      await conn.query(
          'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
          [username, email, password]
      );
  } catch (error) {
      // Handle duplicate entry error
      if (error.code === 'ER_DUP_ENTRY') {
          throw new Error('Username or email already exists');
      }
      throw error;
  }
}

export async function userLogin(username, password){
   const [user] = await conn.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password]
  )

  return user[0]
}