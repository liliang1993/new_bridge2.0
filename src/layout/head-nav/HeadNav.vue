<template>
    <div>

        <header class="head-nav">
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
                    <i class='icon icon_logo'></i>
                    <i class='icon icon_align_justify'></i>  
                </el-col>
                <div  class='nav_menu'>
                        <div class="role">
                            <el-dropdown
                                trigger="click"
                            >
                                <span class="el-dropdown-link">
                                    {{this.$store.state.user.userinfo.username}}
                                    <i class='icon icon_dropDown'></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
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

<!--         <drag-dialog
            v-if="changePassDialog.show"
            :isModal = "changePassDialog.isModal"
            title="Change Password"
            @close = "onclose('changePassDialog')"
        >   
                <form-data
                 ref='changePass-form'
                  style="padding:20px 40px 20px 20px"
                  :LabelWidth = 'changePassDialog.labelWidth' 
                  :FieldList='fieldlist'
                  :DefaultValue='changePassDialog.default_value'
                  :Rules='changePassDialog.rules'
                  @onSubmit='updUserPass'
                  >
                  </form-data>
        </drag-dialog>    --> 

    </div>
</template>

<script>
	import HeadNavJs from './HeadNav.js';
	export default HeadNavJs;
</script>

<style scoped lang='less'>
    .head-nav {
        width:100%;
        height: 100px;
        background: #2c3544;
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 99;
        color: #FFF;
         line-height: 100px;
        .logo{
            width:240px;
            height:100px;
            background-color: #1c202a;        
            .icon_logo{
                display:inline-block;
                vertical-align: middle;
                width: 165px;
                height: 40px;
                margin-left: 18px;
                background-position:-11px -8px;
            }
            .icon_align_justify{
                display:inline-block;
                vertical-align: middle;
                width: 29px;
                height: 24px;
                margin-left: 15px;
                background-position:-79px -53px;
            }
        }
        .nav_menu{
            float:right;
            margin-right:47px;
            ul{  
                float:right;
                li{ 
                    height:100px;
                    line-height:100px;
                }
            }
            .role{
                height:100px;
                line-height:100px;
                float:right;
            }
            em{ 
                font-style:normal;
                float:right;
                margin-right:34px;
            }
        }
    }
    .userinfo {
        text-align: right;
    }

    .username {
        height: 60px;
        line-height: 60px;
        cursor: pointer;

        .el-dropdown {
            color: #FFF;
        }
    }
    .lang {
          height: 60px;
          line-height: 60px;
          cursor: pointer;
          color: #fff;
        }
</style>
