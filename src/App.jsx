import { useState } from 'react'
import './App.css'
import { Example } from './components/ExampleTM'
import SyncTM from './components/SyncTM'

function App() {
  return (
    <div className="App">
      {/* <Example width={1000} height={800} /> */}
      <SyncTM />
    </div>
  )
}

export default App
