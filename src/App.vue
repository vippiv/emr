<template>
    <div id="app">
        <router-view />
    </div>
</template>
<style lang="scss">
    html,
    body,
    #app {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        overflow-x: auto;
    }

    body .el-table th.gutter {
        //解决el-table单元格错位
        display: table-cell !important;
    }
</style>