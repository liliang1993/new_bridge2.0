<template>
    <div>

        <header class="head-nav" >
            <el-row>
                <el-col :span="10" class="logo">
                   <!--  <span class='username'>
                        <el-dropdown
                                trigger="click"
                            >
                            <span class="el-dropdown-link">
                                {{this.$store.state.user.userinfo.username}}<i
                                    class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item
                                        command='pass'
                                        >修改密码</el-dropdown-item>
                                <el-dropdown-item
                                        command='logout'>退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span> -->
                    <div class="logo">
                        <i class='icon icon_logo'></i>
                        <i class='icon icon_align_justify' @click='toggleLeftMenu'></i>  
                    </div>
                </el-col>
                <div  class='nav_menu'>
                         <div class="lang">
                            <el-dropdown @command="handleCommand" trigger="click">
                                <span class="el-dropdown-link">{{$t('locales.' + locale)}}
                                <i class='icon icon_drop_down'></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                  <el-dropdown-item v-for="(item,key,index) in langs" :key="index" :command="key">{{$t('locales.' + key)}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <em class='line'>|</em>
                        <div class="role">
                            <el-dropdown
                                trigger="click"
                            >
                                <span class="el-dropdown-link">
                                    {{this.$store.state.user.userinfo.username}}
                                    <i class='icon icon_drop_down'></i>
                                </span>
                                <el-dropdown-menu class='role_drop_down' slot="dropdown">
                                    <el-dropdown-item
                                            command='pass'
                                            >修改密码</el-dropdown-item>
                                    <el-dropdown-item
                                            command='logout'>退出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <em>|</em>
                         <el-menu   theme="dark" :default-active="$route.path" class="el-menu-demo" mode="horizontal" unique-opened  router >
                        <template
                                v-for="(item,index) in routesFilter"
                                v-if="!item.hidden">
                                    <el-submenu
                                        :index="item.path"
                                        v-if="!item.leaf"
                                    >
                                    <template slot="title">{{$t(item.name)}} </template>
                                        <el-menu-item
                                            v-for='(child,cindex) in item.children'
                                            v-if="!child.hidden"
                                            :index='item.path+"/"+child.path'>
                                           {{$t(child.name)}}
                                        </el-menu-item>
                                    </el-submenu>
                                    <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.path+'/'+item.children[0].path"  >
                                        {{$t(item.children[0].name)}}
                                    </el-menu-item>
                            </template>
                        </el-menu>
                       
                </div>
            </el-row>
        </header>
        
    </div>
</template>

<script>
	import HeadNavJs from './HeadNav.js';
	export default HeadNavJs;
</script>

<style lang='less'>
@import url(./HeadNav.less);
</style>
