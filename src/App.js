import React from 'react';
import './App.css';
import Leftpanel from './Leftpanel'
import db from './assets/db.json';
function App() {
  console.log(db)
  return (
    < div className='App' >
      <Leftpanel db={db} />
    </div >
  );
}

export default App;
