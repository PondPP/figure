import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';


const Register = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    const { firstName, lastName, email, password, repassword } = user;

    if (firstName && lastName && email && password) {
      if (password === repassword) {
        try {
          const response = await axios.post('http://127.0.0.1:8080/register', user);
          alert(response.data.message);
          console.log(response.data);
          navigate('/Login');
        } catch (error) {
          alert('An error occurred during registration. Please try again.');
          console.error(error);
        }
      } else {
        alert('Passwords do not match.');
      }
    } else {
      alert('Please enter all required fields.');
    }
  };

  return (
    <div className="container">
      <form>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleChange} />

        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" value={user.lastName} onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={user.email} onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={user.password} onChange={handleChange} />

        <label htmlFor="repassword">Confirm Password</label>
        <input type="password" id="repassword" name="repassword" value={user.repassword} onChange={handleChange} />

        <button className="btn" onClick={handleSubmit}>Register</button>
        <button className="btn" onClick={() => navigate('/login')}>Login</button>
      </form>
    </div>
  );
};

export default Register;
