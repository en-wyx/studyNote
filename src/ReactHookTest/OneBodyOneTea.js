import React, { useEffect, useState } from 'react'
import { Row, Col, Input, message, Button, Modal, Select } from 'antd'
import moment from 'moment'

function initClassRoom() {
  const grade = ['一', '二', '三', '四', '五', '六']
  const room = [10, 10, 10, 10, 10, 10]
  const classRoom = []
  grade.forEach((item, index) => {
    for (let i = 0; i < room[index]; i++) {
      classRoom.push({ id: `${index}_${i}`, name: `${item}(${i + 1})` })
    }
  })
  return classRoom
}

/**
 * 正常：黑底红字红方格
 * 双击：绿底白字
 * 长按三秒：黑底黑字
 * 点击：提示音
 * 全屏显示：退出全屏要求输入密码
 * 附加要求：
 *  修改文字内容和字体
 *  增加方格数量和长宽尺寸
 */
const OneBodyOneTea = () => {
  // 三种样式
  const style = {
    defaultStyle: { backgroundColor: 'black', color: 'red', borderColor: 'red' },
    firstClickStyle: { backgroundColor: 'green', color: 'white', borderColor: 'green' },
    pressThreeSecondsStyle: { backgroundColor: 'black', color: 'black', borderColor: 'black' },
  }
  // 时间
  const [showTime, setShowTime] = useState(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
  // 所有班级
  const [allClassRoom, setAllClassRoom] = useState(initClassRoom())
  // 双击过的班级id集合
  const [selectClassRoom, setSelectClassRoom] = useState([])
  // 长按过的班级id集合
  const [pressClassRoom, setPressClassRoom] = useState([])
  // 鼠标点击和放开的时间
  const [downTime, setDownTime] = useState('')
  // 新增的班级名称
  const [addClassRoom, setAddClassRoom] = useState('')
  // 当前是否为全屏状态
  const [isFullScreen, setIsFullScreen] = useState(false)
  //  时间每秒更新
  useEffect(() => {
    const timerId = setInterval(
      () => setShowTime(moment(new Date()).format('YYYY-MM-DD HH:mm:ss')),
      1000
    );
    return () => clearInterval(timerId);
  })
  // 点击两下，变成绿底白字
  const clickClassRoomHandler = (classRoomId) => {
    let newSelectClassRoom = []
    let newPressClassRoom = []
    if (selectClassRoom.includes(classRoomId)) {
      newSelectClassRoom = selectClassRoom.filter(item => item !== classRoomId)
    } else {
      newSelectClassRoom = [...selectClassRoom, classRoomId]
      newPressClassRoom = pressClassRoom.filter(item => item !== classRoomId)
    }
    setSelectClassRoom(newSelectClassRoom)
    setPressClassRoom(newPressClassRoom)
  }
  // 长按三秒， 变成黑底黑字
  const mouseUpHandler = (classRoomId) => {
    let upTimeStamp = new Date().getTime()
    let newSelectClassRoom = []
    let newPressClassRoom = []
    if (upTimeStamp - downTime > 3000) {
      newPressClassRoom = [...pressClassRoom, classRoomId]
      newSelectClassRoom = selectClassRoom.filter(item => item !== classRoomId)
      setSelectClassRoom(newSelectClassRoom)
      setPressClassRoom(newPressClassRoom)
    }
  }
  // onresize 事件会在窗口或框架被调整大小时发生。
  window.onresize = function () {
    if (!!(document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled)) {
      
      if (isFullScreen) {
        //要执行的动作
        message.warning('输入密码')
      }
      // 通过判断屏幕的高度和窗口的高度从而确定是否为全屏模式退出
      setIsFullScreen(!(window.innerHeight < window.screen.height))
    }
  }

  // 班级名称修改
  const changeHandler = (e, classRoomId) => {
    const newAllClassRoom = []
    allClassRoom.forEach(item => {
      if (item.id === classRoomId) {
        newAllClassRoom.push({...item, name: e.target.value})
      } else {
        newAllClassRoom.push({...item})
      }
    })
    setAllClassRoom(newAllClassRoom)
  }

  // 展示的班级
  const getAllClassRoom = () => {
    const showAllClassRoom = []
    allClassRoom.forEach(item => {
      if (pressClassRoom.includes(item.id)) {
        showAllClassRoom.push(
          <Col key={item.id} span={3}>
            <Input
              onDoubleClick={() => clickClassRoomHandler(item.id)}
              value={item.name}
              style={style.pressThreeSecondsStyle}
              onMouseDown={() => { message.warning('提示音：滴滴~'); setDownTime(new Date().getTime()) }}
              onMouseUp={() => mouseUpHandler(item.id)}
            />
          </Col>)
      } else if (selectClassRoom.includes(item.id)) {
        showAllClassRoom.push(
          <Col key={item.id} span={3}>
            <Input
              onDoubleClick={() => clickClassRoomHandler(item.id)}
              value={item.name}
              style={style.firstClickStyle}
              onMouseDown={() => { message.warning('提示音：滴滴~'); setDownTime(new Date().getTime()) }}
              onMouseUp={() => mouseUpHandler(item.id)}
            />
          </Col>)
      } else {
        showAllClassRoom.push(
          <Col key={item.id} span={3}>
            <Input
              onDoubleClick={() => clickClassRoomHandler(item.id)}
              value={item.name}
              style={style.defaultStyle}
              onMouseDown={() => { message.warning('提示音：滴滴~'); setDownTime(new Date().getTime()) }}
              onMouseUp={() => mouseUpHandler(item.id)}
              onChange={(e) => changeHandler(e, item.id) }
            />
          </Col>)
      }
    })
    return showAllClassRoom
  }

  return (
    <div>
      <Row>
        <Col span={12}>xxx小学</Col>
        <Col span={12}>{showTime}</Col>
      </Row>
      <Row>
        {getAllClassRoom()}
      </Row>
      <Row>
        <Col span={3}>
          <Input onChange={(e) => setAddClassRoom(e.target.value)} />
        </Col>
        <Col span={3}>
          <Button type="primary" onClick={() => { setAllClassRoom([...allClassRoom, { id: new Date().getTime(), name: addClassRoom }])}}>增加班级</Button>
        </Col>
      </Row>
    </div>
  )
}

export default OneBodyOneTea