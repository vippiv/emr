import zrender from 'zrender'

export const convertNumToCN = (val) => {
	switch (val) {
		case 1:
			return '一'
		case 2:
			return '二'
		case 3:
			return '三'
		case 4:
			return '四'
		case 5:
			return '五'
		case 6:
			return '六'
		case 7:
			return '七'
		case 8:
			return '八'
		case 9:
			return '九'
		case 0:
			return '零'
	}
}

// 线段
export const createLine = (x1, y1, x2, y2, style) => new zrender.Line({
		shape: {
			x1,
			y1,
			x2,
			y2
		},
		style
	})

// cx 横坐标 cy纵坐标 r半径 空心圆
export const createCircle = (cx, cy, r, style) => {
	let newStyle = {
		fill: '',
		stroke: ''
	}
	for(let p in style) {
		newStyle[p] = style[p]
	}
	return new zrender.Circle({
		shape: {
			cx,
			cy,
			r
		},
		style: newStyle,
		zlevel: 4
	})
}

// 添加horver事件 el 元素对象 config 一些配置项 x x轴坐标 y y轴坐标 shapeOn鼠标移入一些属性配置 shapeOn鼠标移出一些属性配置 shape配置项看官网
export const addHover = (el, config, x, y, shapeOn, shapeOut) => {
	const domTips = document.getElementsByClassName('tips')
	el.on('mouseover', () => {
		domTips[0].innerHTML = config.tips
		domTips[0].setAttribute('style', `position:absolute;top:${y - 13}px;left:${x}px;display:block;font-size:10px;background-color:rgba(0,0,0,.7);padding:3px;border-radius:3px;color:#fff`)
		el.animateTo({
			shape: shapeOn
		}, 100, 0)
	}).on('mouseout', () => {
		domTips[0].setAttribute('style', `display:none`)
		el.animateTo({
			shape: shapeOut
		}, 100, 0)
	})
}

// 多边形
export const createPolygon = (points, style) => new zrender.Polyline({
		shape: {
			points
		},
		style
	})

// 绘制纵向文本
export const drawText = (str, dx, dy) => {
	const group = new zrender.Group()
	for (let i = 0; i < str.length; i++) {
		const text = new zrender.Text({
			style: {
				text: str.charAt(i),
				fontSize: 14,
				textFill: '#FF4949',
				textBackgroundColor: '#FFF'
			}
		})
		const y = 14 * i
		text.attr('position', [0, y])
		group.add(text)
	}
	group.attr('position', [dx, dy])
	return group
}

// 绘制三角形
export const drawIsogon = (Obj, Color) => new zrender.Isogon({
		shape: {
			x: Obj.x,
			y: Obj.y,
			r: 6,
			n: 3
		},
		style: {
			fill: Color
		}
	})

// 计算闰年
export const isLeapYear = (year) => {
	if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
		return true
	}
		return false
}

export const DrawUtil = {
	drawHorizontalText (zr, str, x, y, style) {
		const text = new zrender.Text({
			style: {
				text: str,
				fontSize: 14,
				textFill: '#FF4949',
				textBackgroundColor: '#FFF',
				...style
			}
		})
		text.attr('position', [x, y])
		zr.add(text)
	},
	calcMiniDistance (index) {
		switch (index) {
			case 0:
				return 10
			case 1:
				return 10
			case 2:
				return 5
			case 3:
				return 5
			case 4:
				return 5
			case 5:
				return 5
			default:
				return 5
		}
	}
}
