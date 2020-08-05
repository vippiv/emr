const navRoutes = [
	{
		name: 'reportForm',
		path: ``,
		meta: {
			title: '病历质控'
		},
		children: [
			{
				name: 'reportFormSearch',
				path: ``,
				meta: {
					title: '自动质控明细'
				}
			},
			{
				name: 'reportFormLoadLog',
				path: ``,
				meta: {
					title: '优势病种临床路径中医病历书写情况'
				}
			}
		]
	},
	{
		name: 'syncManage',
		path: ``,
		meta: {
			title: '图库管理'
		},
		children: [
			{
				name: 'datagroupandtpl',
				path: ``,
				meta: {
					title: '图库管理'
				}
			}
		]
	},
	{
		name: 'syncManage',
		path: ``,
		meta: {
			title: 'ICD管理'
		},
		children: [
			{
				name: 'datagroupandtpl',
				path: ``,
				meta: {
					title: 'ICD管理'
				}
			},
			{
				name: 'datagroupandtpl',
				path: ``,
				meta: {
					title: '手术编码维护'
				}
			}
		]
	}
]

export default navRoutes
