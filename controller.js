// controllers/studentController.js
const students = require('../repo/repo');
const bcrypt = require('bcrypt');

async function createUser(req, res) {
  try {
      // Destructure the required fields from req.body
      const { name, email, password, phonenumber } = req.body;
      
      // Log the request body for debugging
      console.log('Request Body:', req.body);

      // Validate input
      if (!name || !email || !password || !phonenumber) {
          return res.status(400).json({ error: 'Invalid data format' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Hashed Password:', hashedPassword);

      // Assuming `students.createUser` is an asynchronous function for creating a new user
      const newUser = await students.createUser({
          name,
          email,
          password: hashedPassword,
          phonenumber
      });

      // Log the new user created
      console.log('New User Created:', newUser);

      // Return success response with user data
      return res.json({ success: true, data: newUser });
  } catch (error) {
      // Log any errors that occur during user creation
      console.error('Error creating user:', error);
      // Return internal server error response
      return res.status(500).json({ error: 'Internal server error' });
  }
}
  
  // Function for user login
  async function loginUser(req, res) {
    const { email, password } = req.body;
    console.log('Request Body:', req.body);
  
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    try {
      // Check if the user exists in the data store
      const existingUser = await students.loginByEmail(email);
      
      if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Successful login
      res.json({ success: true, message: 'Login successful', data: existingUser });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  
  function deleteUser(req, res) {
    const user_id = req.params.user_id; // Assuming the student ID is provided as a route parameter
  
    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    try {
      students.deleteById(user_id); // Assuming students.deleteById is a promise-based function
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

async function getAllUser(req, res) {
  try {
    const allUser= await students.getAllUser();
    res.json({ success: true, data: allUser });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
}

  module.exports = {
    createUser,
    loginUser,
    deleteUser,
    getAllUser,
};
