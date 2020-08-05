<!-- 农药中毒报告书 -->
<template>
	<div class="agriculturalChemicalsPoisoningReport-container">
		<div>
			<input id="File1" type="file" />
			<input id="btnOpen" type="button" value="打开" @click="openDoc"
			title="先点击左边的“浏览”按钮，选择要打开的病历文件" />
			<el-button type="primary" size="mini" @click="handleSave">保存</el-button>
			<object classid="clsid:43C3EF10-8FE6-45CD-A65B-1792FD3FB9DE" codebase="NsoOffice.dll"
			id="oframe" width="100%" height="620"></object>

		</div>
	</div>
</template>

<script type="text/javascript">
	import { mapActions } from 'vuex'

	export default {
		name: 'agriculturalChemicalsPoisoningReport',
		data () {
			return {
				patientName: '',
				cardSerias: '',
				file: ''
			}
		},
		mounted () {
			// alert('creteNew')
			setTimeout(() => {
				this.createNew()
			}, 500)
		},
		created () {
			// this.getDocFile()
		},
		methods: {
			...mapActions([
				'GET_DOC_FILE'
			]),
			getDocFile () {
				this.GET_DOC_FILE({
					fileName: 'welcome.odt'
				}).then((res) => {
					console.log(res.values)
					this.file = res.values
					this.openDoc()
				})
			},
			openDoc () {
				// TODO 如果没有文档就新建一个文档
				// if (document.all.File1.value == "") {
				// 	alert("请先选择要打开的文档！");
				// 	return;
				// }
				// var url = window.location.href.replace("file:///", "")
				// url = url.substring(0, url.lastIndexOf("/") + 1).replace(/\//g, "\\")
				// document.all.oframe.OpenDocument(document.all.File1.value, 2)
				document.all.oframe.OpenDocument(this.file, 2)
				document.all.oframe.SetMenuBarVisible(true)
				document.all.oframe.ShowMenuItem('Save')
			},
			createNew () {
				document.all.oframe.CreateNew('swriter')
				document.all.oframe.SetMenuBarVisible(true)
			},
			handleSave () {
				document.all.oframe.Save()
				// TODO 执行上传
			}
		}
	}
</script>

<style lang="scss" scoped>
	.agriculturalChemicalsPoisoningReport-container {}
</style>
