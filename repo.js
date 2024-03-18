const pool = require('../db/db');
const bcrypt = require('crypto');


async function createUser(userData) {
  const query = 'INSERT INTO user_info (name, email, password, phonenumber) VALUES (?, ?, ?, ?)';
  const values = [userData.name, userData.email, userData.password, userData.phonenumber];

  try {
    const [result] = await pool.execute(query, values);
    console.log('User Created:', result);

    // Assuming your database returns the inserted user, adjust accordingly
    const newUser = {
      // id: result.insertId,
      name: userData.name,
      email: userData.email,
    };
    console.log('User Created:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Function to get user by email
async function loginByEmail(email) {
  console.log("logicease",email)
  const query = 'SELECT * FROM user_info WHERE email = ?';
  const values = [email];

  try {
    const [results] = await pool.execute(query, values);
    console.log("login",results)
    // Assuming your database returns an array of results, adjust accordingly
    const user = results[0];
    console.log("login",user)
    return user;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
}

async function deleteById(user_id) {
  const query = 'DELETE FROM user_info WHERE user_id = ?';

  try {
    const [result] = await pool.execute(query, [user_id]);
    console.log('User deleted:', result);
    return result;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}


async function getAllUser() {
  const query = 'SELECT * FROM user_info';

  try {
    const [results] = await pool.execute(query);
    console.log('Fetched all users successfully:', results);
    return results;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

module.exports = {
  createUser,
  loginByEmail,
  deleteById,
  getAllUser,

  // You might want to implement more methods here
};