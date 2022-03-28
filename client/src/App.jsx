import React, { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function App() {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room);
    }
  };

  const sendMessage = () => {
    socket.emit('send_message', { message, room });
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className='App'>
      <input
        className='Input'
        placeholder='Room ID...'
        onChange={ (event) => setRoom(event.target.value) }
      />

      <button
        className='Button'
        onClick={ () => joinRoom(room) }
      >
        Join Room
      </button>

      <br />

      <input
        className='Input'
        placeholder='Message...'
        onChange={ (event) => setMessage(event.target.value) }
      />

      <button
        className='Button'
        onClick={ () => sendMessage() }
      >
        Send Message
      </button>

      <div className='MessagesContainer'>
        <h3>Message:</h3>
        <p>{ messageReceived }</p>
      </div>
    </div>
  )
};

export default App;
