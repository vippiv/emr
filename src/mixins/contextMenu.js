import '@/styles/style/contextMenu.css'

export default {
	data () {
		return {
			menuVisible: false,
			isEdit: false,
			IOList: [],
			isDisplay: false,
			cardData: {
				id: '',
				name: '',
				tierLevel: ''
			}
		}
	},
	methods: {
		rightKeyMenu (MouseEvent, object, Node, VueComponent) {
			this.menuVisible = false
			if (Node.level <= 3) {
				this.menuVisible = true
				var menu = document.querySelector('#menu')
				menu.style.left = MouseEvent.clientX - 160 + 'px'
				document.addEventListener('click', this.foo)
				menu.style.top = MouseEvent.clientY - 10 + 'px'
			} else {
				this.menuVisibleDelete = true
				var menuDelete = document.querySelector('#menu_delete')
				menuDelete.style.left = MouseEvent.clientX - 160 + 'px'
				document.addEventListener('click', this.fooDelete)
				menuDelete.style.top = MouseEvent.clientY - 10 + 'px'
			}
			console.log('右键被点击的MouseEvent:', MouseEvent)
			console.log('右键被点击的object:', object)
			console.log('右键被点击的Node:', Node)
			console.log('右键被点击的VueComponent:', VueComponent)
			console.log('鼠标点击了树形结构图')
			this.isEdit = false // 每次点击左侧让右侧按钮回复默认
			this.IOList = [] // 清空复选框数组
			this.isDisplay = true // 每次点击左侧 右侧显示
			this.cardData.name = object.tierName // 层级名称
			this.cardData.tierLevel = object.tierLevel // 层级
			switch (this.cardData.tierLevel) {
				case 1:
					this.cardData.layer = '小区层级'
					break
				case 2:
					this.cardData.layer = '楼栋层级'
					break
				case 3:
					this.cardData.layer = '单元层级'
					break
				case 4:
					this.cardData.layer = '门户层级'
				break
			}
			if (object.tierLevel >= 3) {
				this.isJump = false
			} else {
				this.isJump = true
			}
			this.cardData.id = object.id // 当前点击的id
			this.$request({ // 获取编辑项数据
				url: '/modules/tierRelation/tierRelationList',
				method: 'post',
				data: {
					id: this.cardData.id
				}
			}).then(response => {
				this.tableData = response.data
				this.form.type = response.data.skip || false
				response.data.forEach(item => { // 遍历循环
					if (item.must) {
						this.checkBox.push(item.id)
					}
				})
				this.checkBox.forEach(item => {
					this.IOList.push({ id: item, must: true })
				})
			}).catch(() => {
				console.log('error')
			})
		},
		foo() { // 取消鼠标监听事件 菜单栏
			this.menuVisible = false
			document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
		},
		fooDelete () {}
	}
}
