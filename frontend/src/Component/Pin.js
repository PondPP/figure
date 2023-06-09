import React from 'react'

function Pin({pinSize, imgSrc, name, link }) {
  return (
    <div className={`pin ${pinSize}`}>
      <img className="mainPic" src={imgSrc} alt="" />
    
      <div className='content'>
        <h3>{name}</h3>
        <div className="search">
          <a href={link}>
            <img src="https://th.bing.com/th/id/OIP.U8zQrLQqoO0AU9xmTcHmwAHaHa?pid=ImgDet&rs=1"
            alt="" />
          </a>
        </div>  
      </div>
    </div>
  );
}

export default Pin