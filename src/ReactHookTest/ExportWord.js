import React, { useState } from 'react'
import { exportWord } from 'mhtml-to-word'

const ExportWord = () => {
  const showHtml = `<div className="App">
    <header className="App-header">
      <img src={} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
    </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
    </a>
    </header>
  </div>`

  const clickHandler = () => {
    exportWord({
      mhtml: showHtml,
      data: { title: "exportword" },
      filename: "exportTest",
      style: "span{ font-size:30px; }"
    })
  }
  return (
    <div>
      <button onClick={() => clickHandler()}>
        Click me
      </button>
    </div>
  )
}

export default ExportWord