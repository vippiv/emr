<template>
  <el-container class="layout">
    <div class="outBox">
      <el-aside class="side">
        <div class="logo">电子病历信息系统</div>
        <el-menu
          class="menu"
          :default-active="active"
          background-color="#076979"
          text-color="#fff"
          active-text-color="#fff"
          :unique-opened="true"
          router>
          <NavMenu :navMenus="menu"></NavMenu>
        </el-menu>
      </el-aside>
    </div>
    <el-container style="width:calc(100vw - 206px)">
      <el-header class="header">
        <Header />
      </el-header>
      <div class="main" ref="mainContainer">
        <router-view />
      </div>
    </el-container>
  </el-container>
</template>
<script>
import NavMenu from './component/Menu.vue'
import Header from './component/Header.vue'
import menu from '../../router/menuRouter'

export default {
  name: 'layout',
  components: {
    NavMenu,
    Header
  },
  data () {
    return {
      menu,
      active: this.$route.path
    }
  },
  computed: {},
  watch: {
    $route (to, from) {
      if (to.path.includes(from.path)) {
        this.active = from.path
        return
      }
      this.active = to.path
    }
  },
  created () {
  },
  methods: {}
}

</script>

<style lang="scss" scoped>
  .layout {
    width: 100%;
    height: 100%;
  }

  .header {
    height: 40px !important;
    padding: 0;
    border-bottom: 1px solid #d8dce5;
  }

  .outBox {
    width: 192px;
    overflow: hidden;
  }

  .side {
    background: #076979;
    // box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
    // overflow-x: hidden;
    width: 192px !important;
    height:100%;
    // padding-right:10px;
    overflow-y: scroll;
    scrollbar-color: transparent transparent;
    scrollbar-track-color: transparent;
    -moz-scrollbar-track-color: transparent;
    //ie
    -ms-scroll-chaining: chained;
    -ms-overflow-style: none;
    -ms-content-zooming: zoom;
    -ms-scroll-rails: none;
    -ms-content-zoom-limit-min: 100%;
    -ms-content-zoom-limit-max: 500%;
    -ms-scroll-snap-type: proximity;
    -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
    -ms-overflow-style: none;
    scrollbar-base-color: white;
    scrollbar-3dlight-color: white;
    scrollbar-highlight-color: white;
    scrollbar-track-color: white;
    scrollbar-arrow-color: white;
    scrollbar-shadow-color: white;
    // scrollbar-dark-shadow-color: white;
    position: relative;
  }
  .side::-webkit-scrollbar {display:none}
  .logo {
    width: 190px;
    padding: 21px;
    position: absolute;
    z-index: 3;
    background-color: #076979;
    font-size: 24px;
    color: white;
  }

  .menu {
    margin-top: 95px;
    z-index: 2;
    box-sizing: border-box;
    overflow-y: auto;
    height: calc(100% - 108px)!important;
  }
  .menu::-webkit-scrollbar {display:none}

  .main {
    height: calc(100vh - 40px);
    // overflow-y: auto;
    background: #f0f2f5;
    min-width: 1058px;
    // padding: 16px 16px 60px;
    position: relative;
  }
  .main > div {
    height: 100%;
    // width: 100%;
    // box-sizing: border-box;
    overflow-x: auto;
  }
  .main div::-webkit-scrollbar {display:none}

</style>
