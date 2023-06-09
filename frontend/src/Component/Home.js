import {
  Add,
  Chat,
  FavoriteRounded,
  Notifications,
  Person,
  QuestionMark 
} from "@mui/icons-material";
import MenuContainer from './MenuContainer';
import Pin from './Pin';
import Data from "./Data";
import './Home.css'
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react'
import data from '../ContextApi'
import { useEffect, useState } from 'react';
import Profile from './Profile';
import AddItem from "./AddItem";
import { Link } from "react-router-dom";

function Home() {
  const { userdata, setUserData } = useContext(data)
  console.log(userdata.firstName)

  const logout = () => {
    setUserData({}); // Clear user data here, or navigate to the appropriate route
    navigate('/login'); // Navigate to the desired route after logout
  }
  const navigate = useNavigate();

  useEffect(() => {
    const allIcon = document.querySelectorAll(".iconContainer");

    function setMenuActive() {
      allIcon.forEach((n) => n.classList.remove("active"))
      this.classList.add("active");
    }

    allIcon.forEach(n => n.addEventListener('click', setMenuActive));
  }, []);
  return (
    <div className="App" >
      <div className="menuContainer">
        <img
          src="https://th.bing.com/th/id/OIP.Xv7the-KVHZgO2313bieKwHaHa?pid=ImgDet&rs=1"
          alt=''
          className="logo" />
        <div className="subMenu">
          <Link to = {'/Profile'}>
          <MenuContainer icon={<Person />}/>
          </Link>
            <MenuContainer icon={<Notifications />} />
            <MenuContainer icon={<Chat />} />
          
          <div>
            <MenuContainer icon={<FavoriteRounded />} />
          </div>

          <div>
            <MenuContainer icon={<QuestionMark />} />
          </div>
          
          <Link to = {'/AddItem'}>
          <MenuContainer icon={<Add />} />
          </Link>
         
        </div>
      </div>

      <main>
        <div className="searchBox">
          <input type="text" placeholder='Search' />
          <div className="search">
            <img src="https://clipground.com/images/arrow-icon-png-free-5.jpg" 
            alt="" />
          </div>
        </div>
        <div className='mainContainer'>
          {
            Data && 
              Data.map((data) => (
                <Pin 
                  key ={data.id} 
                  pinSize={data.size}
                  imgSrc = {data.imgSrc}
                  name = {data.name}
                  link = {data.link}
                />

            ))
          }
        </div>
      </main>
      <div className='container3' container-home1>
        <button className='btn' onClick={logout}>Logout</button>
      </div>
    </div>
  )
}


export default Home

