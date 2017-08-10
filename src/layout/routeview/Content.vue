<template>
    <div class="">
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'content',
        data () {
            return {
                
            }
        },
        methods:{
           
        },
        created(){
            this.setSize();
            this.$$lib_$(window).resize(() => {
                this.setSize();
            });
        },
        mounted(){

        }
    }
</script>

<style scoped lang='less'>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s
    }
    
    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
</style>
