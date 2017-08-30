import {
    LANGS
} from 'i18n/lang';
import Vue from 'vue';
export default {
    name: 'head-nav',
    data() {
        return {
            dialogTableVisible: false,
            changePassDialog: {
                old_password: '',
                password: '',
                password_confirm: ''
            },
            locale: this.$store.state.global.locale,
            langs: LANGS
        }
    },
    mounted() {
        Vue.config.lang = this.$store.state.global.locale;
    },
    computed: {
        routesFilter: function() {
            var routesList = this.$router.options.routes;
            return routesList.filter(function(item) {
                return item.direction == 'landscape';
            })
        },
        headWidth: function() {
            console.log('123', );
            return document.documentElement.clientWidth - this.$store.state.leftmenu.width;
        }
    },
    methods: {
        /**
         * 退出登录
         */
        logout() {
            this.$confirm('你确定退出登录么?', '确认退出', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('remove_userinfo').then(() => {
                    this.$router.push('/login');
                });
            });
        },

        /**
         * 修改密码
         * @param  {object} userinfo 当前修改密码的表单信息
         */
        updUserPass(userinfo) {
            this.dialogTableVisible = true;
        },
        changePassSubmit() {
            this.$$api_common_ajax({
                data: {
                    func_name: 'user.change_password',
                    args: [this.$store.state.user.userinfo.user_id, this.changePassDialog.old_password, this.changePassDialog.password],
                    kwargs: {}
                },
                fn: data => {
                    this.dialogTableVisible = false;
                    store.dispatch('remove_userinfo');
                    this.$message.success('修改成功！');
                    this.$router.push('/login');
                }
            });
        },
        toggleLeftMenu() {
            this.$store.dispatch(this.$store.state.leftmenu.menu_flag ? 'set_menu_close' : 'set_menu_open');
        },
        handleCommand(command) {
            console.log('command', command);
            switch (command) {
                case 'logout':
                    this.logout();
                    break;
                case 'updUserPass':
                    this.updUserPass();
                    break;
            }
        },
        /**
         * 更改系统默认语言
         * @Author Dannis
         * @param  {[type]} command [description]
         * @return {[type]}         [description]
         */
        languageCommand(command) {
            this.$store.dispatch('update_global_locale', command).then(() => {
                this.locale = command;
                Vue.config.lang = command;
            });

        }
    }
}