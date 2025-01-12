import React from 'react';
import './App.css'
import { Search } from 'lucide-react';
function App() {
  return (

    <React.Fragment>
      <div className='w-screen h-screen flex flex-col items-center justify-center'>
        <div className="w-10/12 flex flex-row items-center border rounded-xl">
          <input
            type="text"
            className="flex-1 p-2 focus:outline-none"
            placeholder="Digite a receita ou o ingrediente"
          />
          <button
            className="flex items-center justify-center w-20 h-12 bg-blue-400 rounded-xl">
            <Search style={{
              color: '#fff'
            }}/>
          </button>
        </div>

      </div>
    </React.Fragment>
  )
}

export default App
