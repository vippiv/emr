<template>
    <keep-alive>
        <div class="item-box">
            <router-link class="item" v-for="route in residentialNurseWorkBench" :key="route.WORKBENCH_CODE" :to="routePath" @click.native="handleLink(route)">{{route.WORKBENCH_NAME}}</router-link>
        </div>
        <router-view></router-view>
    </keep-alive>
</template>

<script>
    import * as originAction from 'vuex'
    import keepAlive from '@/mixins/keepAlive'
    import residentNurseRoute from '@/router/routes/residentNurse'
    import * as urls from '@/router/routePath'

    export default {
        name: 'ResidentNurseMiddlePage',
        mixins: [keepAlive],
        data() {
            return {
                residentialNurseWorkBench: [],
                routePath: urls.NURSE_EMERGENCY
            }
        },
        computed: {
            ...originAction.mapState({
                workStationID: state => state.global.workStationID,
                userInfo: state => state.global.userInfo
            }),
            residentNurseRoute() {
                return residentNurseRoute
            }
        },
        created() {
            console.log(this.routePath)
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
            getWorkBench() {
                this.A_GET_WORK_BENCHS({
                    code: this.workStationID,
                    userid: this.userInfo.UserId
                }).then((res) => {
                    this.residentialNurseWorkBench = res.values
                })
            },
            handleLink(route) {
                console.log('route', route)
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
    .item-box {
        padding: 15px;
        max-height: calc(100vh - 120px);
        overflow-y: auto;

        .item {
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
            background-image: url('../../assets/images/icon/nurse.png');
            background-repeat: no-repeat;
            background-position: 28px center;
            background-size: 82px;
            overflow: hidden;
            transition-duration: 1s;
            transition-property: border-color, box-shadow;

            &:hover {
                border-color: #24B4CE;
                box-shadow: 0 0 5px gray;
            }
        }
    }
</style>