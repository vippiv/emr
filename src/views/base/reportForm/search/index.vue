<template>
	<div class="reportform-search">
		<h1 class="ck-subnav-caption">报表查询</h1>
		<ckBtn icon="ck-icon-search" @click="handleClicFn">查询</ckBtn>
		<ckBtn icon="ck-icon-reflesh" @click="handleClicFn">刷新</ckBtn>
		<ckBtn icon="ck-icon-add" @click="handleClicFn">新增</ckBtn>
		<ckBtn icon="ck-icon-print" @click="handleClicFn">打印</ckBtn>
		<ckInput v-model="doctorName"></ckInput>
		<p>{{doctorName}}</p>
		<el-input v-model="input" placeholder="请输入内容"></el-input>
		<p>{{input}}</p>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'ReportFormSearch',
		data () {
			return {
				doctorName: '胡医生',
				input: '李医生'
			}
		},
		methods: {
			handleClicFn () {
				alert('查询')
			}
		}
	}
</script>
