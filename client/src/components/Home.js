import React, { useEffect, useState } from 'react'
import '../App.css'
import { Card } from 'antd';
import logo from '../img/marvel-logo.png'
import avatar from '../img/sm-avatar.jpg'
import { useNavigate } from 'react-router-dom';
import { getCharacters, searchCharacter } from '../api/marvelApi';

const { Meta } = Card;

const Home = () => {
  const navigate = useNavigate();
  const [chars, setChars] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    getCharacters().then((res) => {
      setChars(res.data.data.results)
    })
  },[]);

  const onSearch = (value) => {
    if(value === '') {
      getCharacters().then((res) => {
        setChars(res.data.data.results)
      })
    } else {
    searchCharacter(value).then((res) => {
      setChars(res.data.data.results)
    })
    }
    setText(value);
  }

  return (
    <div>
      <header className="center">
      <div className="dropdown">
        <p>{JSON.parse(localStorage.getItem('user')).fullname}</p>
        <img className='dropbtn' style={{marginRight: '15%', width: '15%'}} src={avatar} />
        <div className="dropdown-content">
          <a onClick={() => {localStorage.removeItem('user'); navigate('/login')}} href="#">Logout</a>
        </div>
      </div>        
        <img src={logo} />
      </header>
      <div style={{display: 'flex', marginLeft: '10%', flexWrap: 'wrap'}}>
      <input type="text"
                className="form-control"
                placeholder="Find a character"
                autoFocus
                onChange={(e)=>onSearch(e.target.value)}
                value={text}
                />
      {chars.map(char => 
      <div key={char.id} className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
                <Card
                key={char.id}
                hoverable
                style={{
                  width: 240, marginTop: '4%', marginRight: '3%'
                }}
                cover={<img alt="example" src={char.thumbnail.path + "/portrait_xlarge.jpg"} />}
              >
                <Meta title={char.name} />
                </Card>
                </div>
  <div className="flip-card-back">
      <h1>{char.name}</h1> 
      <p style={{color: 'red'}}>{char.description}</p> 
    </div>
  </div>
  </div>
      )}
      </div>

    </div>
  )
}

export default Home