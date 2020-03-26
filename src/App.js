import React from 'react';
import './App.css';
import Leftpanel from './Leftpanel'
function App() {
  return (
    <div className='App'>
      <Leftpanel items={[{ title: 'book', color: 'red' }, { title: 'book2', color: 'blue' }, { title: 'book3', color: 'green' }, { title: 'book4', color: 'red' }]} />

    </div>
  );
}

export default App;
