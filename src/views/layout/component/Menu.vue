<template>
    <div class="navMenu">
        <template v-for="(nav, index) in navMenus">
            <el-menu-item
                v-if="nav && !nav.meta.hidden"
                :key="index"
                :data="nav"
                :index="nav.path"
                :route="nav.path"
                :class="{activeClass: nav.meta.isSingle}"
            >
                <i v-if="nav.meta.icon" class="icon-menu1 tz-button-icon" :class="nav.meta.icon"></i>
                <span slot="title">{{nav.meta.title}}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'NavMenu',
        props: {
            navMenus: {
                type: Array,
                default () {
                    return []
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .navMenu {
        .icon-menu1 {
            width: 18px;
            height: 18px;
            margin-right: 8px;
        }
        .el-menu-item {
            padding-left: 32px !important;
        }
        .el-menu-item.is-active {
            background-color: #409EFF !important;
        }
        .el-icon-arrow-down::before {
            color: #fff;
        }
    }
    .el-menu {
        border-right: 0 !important;
    }
    .menu {
        height: auto!important;
    }
</style>

