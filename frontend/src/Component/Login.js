import React, { useContext, useState } from 'react'
import axios from 'axios'
import data from '../ContextApi'
import { useNavigate } from 'react-router-dom'
import './Login.css'


const Login = () => {
  const { setUserData } = useContext(data);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = user.email;
    const password = user.password;

    try {
      const response = await axios.post('http://127.0.0.1:8080/login', { email, password });
      console.log(response.data);
      setUserData(response.data);
      alert("Login Successful");
      // Redirect to the home page after successful login
      window.location.href = '/home';
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid email or password");
      } else if (error.response && error.response.status === 404) {
        alert("This email is not registered");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="container2">
      <h1>Login</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={user.email} onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={user.password} onChange={handleChange} />

      <div className="btn-container2">
        <button className="btn2" onClick={handleSubmit}>Login</button>
        <button className="btn2" onClick={() => navigate("/register")}>Register</button>
      </div>
    </form>
  </div>
  );
};

export { Login };