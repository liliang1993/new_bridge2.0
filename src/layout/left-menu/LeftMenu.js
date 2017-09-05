export default {
    name: 'left-menu',
    data() {
        return {
            menu_list: [],
            win_size: {
                height: '',
            }
        }
    },
    methods: {
        setSize() {
            this.win_size.height = this.$$lib_$(window).height() + "px";
        },
        updateCurMenu(route) {
            var route = route || this.$route;
            if (route.matched.length) {
                var rootPath = route.matched[0].path,
                    fullPath = route.path;
                this.$store.dispatch('set_cur_route', {
                    rootPath,
                    fullPath
                });
                var routes = this.$router.options.routes;
                for (var i = 0; i < routes.length; i++) {
                    if (routes[i].path === rootPath && !routes[i].hidden) {
                        this.menu_list = routes[i].children;
                        break;
                    }
                }
            } else {
                this.$router.push('/404');
            }
        }
    },
    created() {
        this.setSize();
        this.$$lib_$(window).resize(() => {
            this.setSize();
        });
        this.updateCurMenu();
    },
    mounted() {
        // console.log(this.$store.state.user.userinfo.access);
    },
    computed: {
        routesFilter: function() {
            var routesList = this.$router.options.routes;
            var routers = routesList.filter(item => {
                //     if (this.$store.state.user.userinfo.role == 'RulesEditor') {
                //         return (item.direction == 'vertical' && item.children[0].path != 'users' && item.children[0].path != 'aduit_log')
                //     } else {
                //         return item.direction == 'vertical';
                //     }
                // });
            console.log('routers', routers);
            return routers;
        }
    },
    watch: {
        $route(to, from) {
            this.updateCurMenu(to);
        }
    }
}