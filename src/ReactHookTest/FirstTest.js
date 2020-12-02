import React, { useState } from 'react'

const FirstTest = () => {
  const [count, setCount] = useState(0)
  const [string, setString] = useState('')
  const [array, setArray] = useState([])
  const [obj, setObj] = useState({ a: 'a', b: 'b'})
  const getArray = () => {
    console.log('array', array)
    const show = array.map(item => (<span>{item}_</span>))
    return show
  }
  const getObj = () => {
    const show = []
    for (let a in obj) {
      show.push(<span>{obj[a]}_</span>)
    }
    return show
  }

  return(
    <div>
      <p>You clicked {count}- {string} - {getArray()} - {getObj()}times</p>
      <button onClick={() => {
        array.push('array')
        setCount(count + 1);
        setString(string+'_string')
        setArray(array)
      }}>
        Click me
      </button>
    </div>
  )
}

export default FirstTest