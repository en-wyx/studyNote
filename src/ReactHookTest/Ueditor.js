import React from 'react'
import Ueditor from '../components/ueditor';
import RcUeditor from 'react-ueditor-wrap'

/**
 * Ueditor -- 百度富文本
 */
class TestUeditor extends React.Component {

  hanldeChage(value) {
      console.log('RcUeditor', value);
  }

  render() {

      return (
          <div>
            <Ueditor  id="content1" height="500" ref="content1" />
            <Ueditor  id="content2" height="500" ref="content2" />
          </div>
      );
  }
}

export default TestUeditor;