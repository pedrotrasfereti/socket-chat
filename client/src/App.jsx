import React, { useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect('https://localhost/3001');

function App() {
  const sendMessage = () => {
    socket.emit(
      'send_message',
      { message: 'Hello' },
    );
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      alert(data.message);
    });
  }, [socket]);

  return (
    <div className='App'>
      <input className='Input' placeholder='Message...' />
      <button onClick={ () => sendMessage }>
        Send Message
      </button>
    </div>
  )
};

export default App;
