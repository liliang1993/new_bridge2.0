<template>
    <div>

        <header class="head-nav" :style="{marginLeft:$store.state.leftmenu.width}">
            <el-row>
                <el-col :span="4" class="userinfo">
                    <!-- <span class='username'><i class='fa fa-user'></i>{{this.$store.state.user.userinfo.username}}</span> -->
                    <span class='username'>
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
                    </span>
                    <i class="fa fa-sign-out logout" @click='logout'></i>
                </el-col>
                 <div class='logo-container'>
                    <img src="../../assets/logo-sm.png" class='logo' alt="">
                </div>
                <el-col :span="2" class="langinfo">
                <el-dropdown @command="handleCommand" trigger="click">
                        <span class="el-dropdown-link lang">{{$t('locales.' + locale)}}</span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-for="(item,key,index) in langs" :key="index" :command="key">{{$t('locales.' + key)}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
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
    .logo-container {
        height: 60px;
    }

    .logo {
        height: 50px;
        width: auto;
        margin-top: 5px;
    }

    .fa-user {
        position: relative;
        top: -2px;
        margin-right: 4px;
    }

    .head-nav {
        width: 100%;
        height: 100px;
        background: #4150b6;
        position: fixed;
        top: 0px;
        left: 0px;

        z-index: 99;
        color: #FFF;
        border-bottom: 1px solid #1F2D3D;

    .logout {
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        float: right;
        cursor: pointer;
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
