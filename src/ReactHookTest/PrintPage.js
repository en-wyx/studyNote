import React from 'react'
import './PrintPage.css'

let printRef
const PrintPage = () => {

  const printHandler = () => {
    let printView = printRef  //获取待打印元素
    document.querySelector('#root').className = 'print-hide'  //将根元素隐藏
    document.body.appendChild(printView) //将待打印元素追加到body中
    window.print() //调用浏览器的打印预览
    document.body.removeChild(printView) //将待打印元素从body中移除
    document.querySelector('#root').className = '' //将原始页面恢复
  }

  return (
    <div className="App">
      <header className="App-header">
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
      <button onClick={() => { printHandler() }}>打印</button>
      <div style={{ display: 'none' }}>
        <div ref={el => (printRef = el)}>
          {/* 打印内容 */}
          222222222222
        </div>
      </div>
    </div >
  );
}

export default PrintPage;
