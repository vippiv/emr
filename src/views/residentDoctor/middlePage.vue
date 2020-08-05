<template>
	<keep-alive>
		<div class="item-box">
			<!-- <router-link class="item" v-for="route in residentDoctorRoute" :key="route.name" :to="route.path" :class="route.name">{{route.meta.title}}</router-link> -->
			<router-link class="item" v-for="route in residentialDoctorWorkBench" :key="route.WORKBENCH_CODE" :to="routePath" @click.native="handleLink(route)">{{route.WORKBENCH_NAME}}</router-link>
		</div>
		<router-view></router-view>
	</keep-alive>
</template>

<script>
import * as originAction from 'vuex'
import keepAlive from '@/mixins/keepAlive'
import residentDoctorRoute from '@/router/routes/residentDoctor'
import * as urls from '@/router/routePath'

export default {
	name: 'ResidentMiddlePage',
	mixins: [keepAlive],
	data () {
		return {
			residentialDoctorWorkBench: [],
			routePath: urls.RESIDENT_DOCTOR
		}
	},
	computed: {
		...originAction.mapState({
			workStationID: state => state.global.workStationID,
			userInfo: state => state.global.userInfo
		}),
		residentDoctorRoute () {
			return residentDoctorRoute
		}
	},
	created () {
		setTimeout(() => {
			this.getWorkBench()
		}, 500)
	},
	methods: {
		...originAction.mapActions([
			'A_GET_WORK_BENCHS',
			'A_SAVE_BENCH',
			'A_SAVE_DEPT'
		]),
		getWorkBench () {
			this.A_GET_WORK_BENCHS({
				code: this.workStationID,
				userid: this.userInfo.UserId
			}).then((res) => {
				this.residentialDoctorWorkBench = res.values
			})
		},
		handleLink (route) {
			const benchID = route.WORKBENCH_CODE
			const deptID = route.DEP_CODE
			this.A_SAVE_BENCH({
				benchID
			})
			this.A_SAVE_DEPT({
				deptID
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.item-box{
		padding: 15px;
		max-height: calc(100vh - 120px);
		overflow-y: auto;
		.item{
			width: 348px;
			line-height: 216px;
			height: 216px !important;
			border: 1px solid #E0E0E0;
			padding-left: 117px;
			display: inline-block;
			margin: 0 15px 15px 0px;
			text-decoration: none;
			color: black;
			text-align: left;
			font-weight: bold;
			background-image: url('../../assets/images/icon/doctor.png');
			background-repeat: no-repeat;
			background-position: 28px center;
			background-size: 82px;
			overflow: hidden;
			transition: all 0.5s;
		}
		.item:hover {
			border-color: #24B4CE;
			box-shadow: 0 0 5px gray;
		}
	}
</style>
