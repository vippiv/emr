<template>
	<div class="menu-block-container">
		<div class="menu-item" v-for="(nav, index) in workStations" :key="index" @click="handleSaveBench(nav)">
			<router-link v-if="!workStationsDictory[nav.APPLICATION].hidden" :to="workStationsDictory[nav.APPLICATION].path" :class="workStationsDictory[nav.APPLICATION].imgCls">{{workStationsDictory[nav.APPLICATION].text}}</router-link>
			<span v-if="!workStationsDictory[nav.APPLICATION].hidden" class="text">{{workStationsDictory[nav.APPLICATION].text}}</span>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { mapState, mapActions } from 'vuex'
	import workStationsDictory from '@/router/dictionary/workStations'

	export default {
		name: 'MenuBlock',
		props: {
			navMenus: {
				type: Array,
				default () {
					return []
				}
			},
			workStations: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data () {
			return {
				workStationsDictory: workStationsDictory
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.global.userInfo
			})
		},
		mounted () {
			this.removeEmptyNode()
		},
		methods: {
			...mapActions([
				'A_SAVE_STATION',
				'A_GET_USER_ROLE'
			]),
			handleSaveBench (obj) {
				console.log('obj', this.userInfo)
				const stationID = obj.APPLICATION
				// 保存当前工作站ID
				this.A_SAVE_STATION({
					stationID
				})
				// 获取 用户角色权限
				this.A_GET_USER_ROLE({
					workbenchcode: obj.WORKBENCH_CODE,
					userid: this.userInfo.UserId
				})
			},
			removeEmptyNode () {
				const AllNode = document.getElementsByClassName('menu-item')
				Array.prototype.forEach.call(AllNode, (item) => {
					if (item.getElementsByTagName('a').length === 0) {
						item.className = 'menu-item empty-node'
					}
				})				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.menu-block-container {
		width: calc(100vw - 40px);
		margin: 0 auto;
		height: auto !important;
		padding-top: 15px;
		.menu-item {
			height: 145px;
			display: inline-block;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			margin-right: 15px;
			a {
				display: block;
				width: 100%;
				height: 108px;
				color: transparent;
				background-position: top center;
			}
			.text{
				display: block;
				line-height: 2;
				font-weight: bold;
				font-size: 18px;
				text-align: center;
			}
			.base {
				background-image: url('../../../assets/images/mainnav/base.png');
				background-repeat: no-repeat;
			}
			.outpatient {
				background-image: url('../../../assets/images/mainnav/outpatient.png');
				background-repeat: no-repeat;
			}
			.resident {
				background-image: url('../../../assets/images/mainnav/resident.png');
				background-repeat: no-repeat;
			}
			.nurse {
				background-image: url('../../../assets/images/mainnav/nurse.png');
				background-repeat: no-repeat;
			}
		}
		.empty-node {
			width: 0px	!important;
			height: 0px	!important;
			margin-right: 0px !important;
		}
	}
</style>
