import React from 'react';
import './Profile.css'
import {
  Add,
  Chat,
  FavoriteRounded,
  Notifications,
  Person,
  QuestionMark
  
} from "@mui/icons-material";
import MenuContainer from './MenuContainer';


const Profile = () => {
  const user = {
    username: '_pxndpp',
    followers: 550,
    following: 777,
    posts : [
      {
        id : 1,
        imageUrl : 'https://cdn.pixabay.com/photo/2018/09/28/16/45/male-3709694_1280.jpg'
      },
      {
        id : 2,
        imageUrl : 'https://cdn.pixabay.com/photo/2018/11/30/11/18/small-3847558_1280.jpg'
      }
    ]
    };

  return (
    <div className='profile-container'>
      <div className="profile-header">
      {/* Display profile picture */}
        <img className="profile-picture" 
        src="https://scontent.fbkk22-8.fna.fbcdn.net/v/t39.30808-6/321500713_681308180069705_6122070162197157231_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Dek595i1GpUAX-XPMdv&_nc_ht=scontent.fbkk22-8.fna&oh=00_AfCI_I3Y-y9J4SfO5itIHxTMqxhM44kXqJ1JMFQOtE4Jlw&oe=6486D519" 
        alt="Profile" />

      {/* Display profile information */}
    </div>
    <div className='profile-stats'>
      <h1>{user.username}</h1>
      <div className="stats-container">
        <p className="stat">
          <span className="stat-label">Followers:</span> {user.followers}
        </p>
        <p className="stat">
          <span className="stat-label">Following:</span> {user.following}
        </p>
        </div>

        <div className="profile-info">
          <p>Bio: Tor Tae mak2</p>
          <p>Location: Thailand</p>
        </div>
    </div>
    <div className="post-container">
      {user.posts.map((post) => (
        <img 
          key={post.id} 
          className='post-image'
          src={post.imageUrl} 
          alt={`Post ${post.id}`} 
      />
    ))}
    </div> 
    <div className="menuContainer2">
        <img
          src="https://th.bing.com/th/id/OIP.Xv7the-KVHZgO2313bieKwHaHa?pid=ImgDet&rs=1"
          alt=''
          className="logo2" />
        <div className="subMenu2">
          <div>
          <MenuContainer icon={<Person />}>
              <Profile />
          </MenuContainer>
            <MenuContainer icon={<Notifications />} />
            <MenuContainer icon={<Chat />} />
          </div>

          <div>
            <MenuContainer icon={<FavoriteRounded />} />
          </div>

          <div>
            <MenuContainer icon={<QuestionMark />} />
            <MenuContainer icon={<Add />} />
          </div>
        </div>
      </div>
  </div> 
  );
};

export default Profile;
