//这段每个都加了数据处理成的格式备注，很容易明白
import React, { useState } from 'react'
import toExcel from '../utils/export/toExcel' //导入封装好的方法

const ExportExcel = () => {
	const th = ["姓名", "年龄", "年级", "分数"];
	const filterVal = ["name", "age", "grade", "score"];
	const dataSource = [
		{ name: "小绵羊", age: "12", grade: "六年级", score: "100" },
		{ name: "小猪猪", age: "23", grade: "五年级", score: "98" }
	]
	var data = formatJson(filterVal, dataSource);
	//data得到的值为[["小绵羊","12","六年级","100"],["小猪猪,"23","五年级","98"]]
	//注意：二维数组里的每一个元素都应是字符串类型，否则导出的表格对应单元格为空
	//调用封装好的方法，秒下载，至此，事成了,导出文件:设备导出数据.xlsx
	function formatJson(filterVal, jsonData) {
		return jsonData.map(v => filterVal.map(j => v[j]))
	}
	return (
		<div>
			<button onClick={() => toExcel({ th, data, fileName: "设备导出数据", fileType: "xlsx", sheetName: "sheet名" })}>
				Click me
      </button>
		</div>
	)
}

export default ExportExcel