import React from 'react'
import "./clear.css"

const Clear = ({setList}) => {
    const removeAll = () =>{
        setList([])
    }
  return (
    <div>
      <button className="butonClear"onClick={removeAll}>Clear All</button>
    </div>
  )
}

export default Clear
