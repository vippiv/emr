<!-- 农药中毒报告书 -->
<template>
	<div class="agriculturalChemicalsPoisoningReport-container">
		<h2 class="report-caption">农药中毒报告书</h2>
		<div class='report-table'>
			<div class="tr">
				<div class="border-right">
					<span>卡片序号：</span>
					<input type="text" v-model="cardSerias">
				</div>
				<div>
					<input type="text" v-model="cardSerias">
					<span>省(自治区，直辖市)</span>
					<input type="text" v-model="cardSerias">
					<span>地、市</span>
					<input type="text" v-model="cardSerias">
					<span>县</span>
					<input type="text" v-model="cardSerias">
					<span>乡(镇)</span>
					<input type="text" v-model="cardSerias">
					<span>村</span>
				</div>
			</div>
			<div class="tr half">
				<div class="border-right">
					<span>身份证号：</span>
					<input type="text" v-model="cardSerias">
				</div>
				<div>
					<span>姓名：</span>
					<input type="text" v-model="cardSerias">
				</div>
			</div>
			<div class="tr half">
				<div class="border-right">
					<span>性别：</span>
					<input type="text" v-model="cardSerias">
				</div>
				<div>
					<span>年龄：</span>
					<input type="text" v-model="cardSerias">
				</div>
			</div>
			<div class="tr half">
				<div class="border-right">
					<span>中毒农药名称：</span>
					<input type="text" v-model="cardSerias">
				</div>
				<div>
					<span>中毒农药种类：</span>
					<input type="text" v-model="cardSerias">
				</div>
			</div>
			<div class="tr pd10">
				中毒农药类型：
				<label for="typeA">1、生产性自用<input type="checkbox" name="" id="typeA"></label>
				<label for="typeB">2、生产性受雇<input type="checkbox" name="" id="typeB"></label>
				<label for="typeC">3、生活性误(服)用<input type="checkbox" name="" id="typeC"></label>
				<label for="typeD">4、生活性自服<input type="checkbox" name="" id="typeD"></label>
			</div>
			<div class="tr pd10">
				转归：
				<label for="zgA">1、治愈<input type="checkbox" name="" id="zgA"></label>
				<label for="zgB">2、好转<input type="checkbox" name="" id="zgB"></label>
				<label for="zgC">3、死亡(服)用<input type="checkbox" name="" id="zgC"></label>
			</div>
			<div class="tr half">
				<div class="border-right">
					<span>诊断日期：</span>
					<input type="text" v-model="cardSerias">
				</div>
				<div>
					<span>死亡日期：</span>
					<input type="text" v-model="cardSerias">
				</div>
			</div>
		</div>
		<div class='report-table report-table-no-border'>
			<div class="tr half">
				<div>
					<span>诊断单位盖章：</span>
				</div>
				<div>
					<span>单位负责人：</span>
				</div>
			</div>
			<div class="tr half">
				<div>
					<span>填表人：</span>
				</div>
				<div>
					<span>填表日期：</span>
					<input type="text" name=""> 年
					<input type="text" name=""> 月
					<input type="text" name=""> 日
				</div>
			</div>
			<div class="tr">
				非必填项：
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import '@/styles/style/report-table.scss'

	export default {
		name: 'agriculturalChemicalsPoisoningReport',
		data () {
			return {
				patientName: '',
				cardSerias: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.agriculturalChemicalsPoisoningReport-container {}
</style>
