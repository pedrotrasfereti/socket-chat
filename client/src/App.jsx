import React, { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function App() {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    socket.emit(
      'send_message',
      { message },
    );
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      alert(data.message);
    });
  }, [socket]);

  return (
    <div className='App'>
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
    </div>
  )
};

export default App;
