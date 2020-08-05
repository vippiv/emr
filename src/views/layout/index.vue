<template>
    <div class="layout">
        <Header />
        <!-- <div class="bread-nav"> -->
            <!-- <router-link v-for="(route, index) in routeMatched" :to="route.path" class="clear-underline">{{route.meta.title}} <span v-if='index < routeMatched.length - 1'>> </span> </router-link> -->
        <!-- </div> -->
        <div class="main" ref="mainContainer" v-if="showMainMenu">
            <menuBlock :navMenus="menu" :workStations="workStations"></menuBlock>
        </div>
        <router-view />
    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex'
    import NavMenu from './component/Menu.vue'
    import Header from './component/Header.vue'
    import menu from '../../router/menuRouter'
    import menuBlock from './component/menu-block.vue'
    import * as urls from '@/router/routePath'

    export default {
        name: 'layout',
        components: {
            NavMenu,
            Header,
            menuBlock
        },
        data() {
            return {
                urls,
                menu,
                showMainMenu: true,
                subNavText: '',
                routeMatched: []
            }
        },
        computed: {
            ...mapState({
                workStations: state => state.global.workStations
            })
        },
        created() {
            if (this.$route.path.indexOf('mainmenu') === -1) {
                this.$router.push({
                    path: this.$route.fullPath,
                    params: this.$route.params,
                    query: this.$route.query
                })
                this.showMainMenu = false
            }
            const routeMatch = JSON.parse(localStorage.getItem('routeMatched'))
            if (routeMatch && routeMatch.length > 0) {
                this.routeMatched = routeMatch
            } else {
                this.routeMatched = [{
                    meta: {title: "主页"},
                    path: "/mainmenu"
                }]
            }
        },
        watch: {
            $route(to, from) {
                this.routeMatched = this.$route.matched
                this.saveRouteMatch()
                if (to.path.indexOf('mainmenu') === -1) {
                    this.showMainMenu = false
                } else {
                    this.showMainMenu = true
                }
                if (to.fullPath.indexOf('base') > -1) {
                    this.subNavText = '基础数据维护'
                } else if (to.fullPath.indexOf('resident') > -1) {
                    this.subNavText = '住院医生工作站'
                } else if (to.fullPath.indexOf('outpatient') > -1) {
                    this.subNavText = '门诊医生工作站'
                } else if (to.fullPath.indexOf('nurse') > -1) {
                    this.subNavText = '住院护士工作站'
                }
            }
        },
        methods: {
            ...mapActions([
                'A_SAVE_ROUTE_MATCH'
            ]),
            saveRouteMatch() {
                const routeMatch = []
                this.routeMatched.forEach(item => {
                    routeMatch.push({
                        path: item.path,
                        meta: {
                            title: item.meta.title
                        }
                    })
                })
                localStorage.setItem('routeMatched', JSON.stringify(routeMatch))
            }
        }
    }
</script>

<style lang="scss" scoped>
    .layout {
        width: 100%;
        height: 100%;

        .bread-nav {
            background-color: #E8FCFF;
            height: 25px;
            line-height: 25px;
            padding-left: 20px;
        }
    }

    .header {
        padding: 0;
        border-bottom: 1px solid #d8dce5;
    }

    .menu {
        margin-top: 95px;
        z-index: 2;
        box-sizing: border-box;
        overflow-y: auto;
        height: calc(100% - 108px) !important;
    }

    .menu::-webkit-scrollbar {
        display: none
    }

    .main {
        background: #f0f2f5;
        position: relative;
        height: 100%;
    }

    .main>div {
        height: 100%;
        overflow-x: auto;
    }

    .main div::-webkit-scrollbar {
        display: none
    }

    .clear-underline {
        text-decoration: none;
    }
</style>