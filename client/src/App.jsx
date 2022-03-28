import React from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function App() {
  const sendMessage = () => {
    socket.emit(
      'send_message',
      { message: 'Hello' },
    );
  };

  return (
    <div className='App'>
      <input
        className='Input'
        placeholder='Message...'
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
