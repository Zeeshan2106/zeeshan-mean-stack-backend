const bcrypt = require('bcrypt');
const pool = require('../config/mysql');

exports.register = async (req, res, next) => {
  let connection;
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters long' 
      });
    }

    connection = await pool.getConnection();

    const [existingUsers] = await connection.query(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ 
        success: false, 
        message: 'Username already exists' 
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await connection.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully',
      data: {
        userId: result.insertId,
        username: username
      }
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

exports.login = async (req, res, next) => {
  let connection;
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }

    connection = await pool.getConnection();

    const [users] = await connection.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Login successful',
      data: {
        userId: user.id,
        username: user.username
      }
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

exports.getAllUsers = async (req, res, next) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [users] = await connection.query(
      'SELECT id, username, created_at FROM users'
    );
    
    res.json({ 
      success: true, 
      count: users.length,
      data: users 
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
