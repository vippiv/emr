<template>
    <div ref="material">
        <mainNav></mainNav>
        <div class="pd15 layout-content"><router-view></router-view></div>
    </div>
</template>

<script>
    import mainNav from '../components/mainNav'

    export default {
        name: 'File',
        data () {
            return {}
        },
        components: {
            mainNav
        },
        created () {},
        methods: {
            handleBack () {
                this.$router.push({
                    path: '/base/'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
