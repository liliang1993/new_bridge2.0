export default {
        name: 'trade_log',
        data() {
                return {
                        tradeLog_dialogVisible: false,
                        log_dicts: {},
                        timer_interval_id: void 0,
                        next_fresh_time: void 0,
                        refresh_enable: 'true',
                        data_loaded: true,
                        remain_sec: 0,
                        refresh_seconds: 5,
                        isActive: true,
                        keywords: {
                                client: {
                                        value: '',
                                        type: 'int',
                                        name: 'login',
                                },
                                ord_id: {
                                        value: '',
                                        type: 'int',
                                        name: 'order_id'
                                },
                                group: {
                                        value: '',
                                        type: 'list',
                                        name: 'group'
                                },
                                symbol: {
                                        value: '',
                                        type: 'list',
                                        name: 'symbol'
                                },
                                size: {
                                        value: '',
                                        type: 'int',
                                        name: 'size'
                                },
                                status: {
                                        value: 'all',
                                        type: 'list',
                                        name: 'status'
                                },
                                time_range: {
                                        value: '',
                                        type: 'datetime',
                                        name: 'time',
                                },
                        },
                        download_file_body: '123',
                        lp_orders: [],
                        trade_logs: [],
                        refresh_time: 4,
                        refresh_enable: 'true',
                        nowTime: '',
                        trade_profit: {
                                show: false,
                                title: {
                                        text: 'Trade Profit',
                                        className: ''
                                },
                                config: []
                        },
                        tableData: [],
                        pagination: {
                                current_page: 1,
                                total: 0,
                                page_size: 12,
                                page_sizes: [3, 9, 12, 24],
                                layout: "total, sizes, prev, pager, next, jumper"
                        },
                        keyValue: 1,
                        page_func_name: 'trade_log.page_trade_log',
                }
        },
        computed: {
                tableConfig: {
                        get() {
                                return {
                                        table: {
                                                attr: {
                                                        data: this.tableData,
                                                        maxHeight: '100%',
                                                        border: false,
                                                        defaultSort: {
                                                                prop: 'time',
                                                                order: "descending"

                                                        }
                                                }
                                        },
                                        columns: [{
                                                attr: {
                                                        prop: 'order_id',
                                                        label: this.$t('ORDID'),
                                                        minWidth: 60,
                                                        scopedSlot: 'ord_id',
                                                        align: 'center',
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'request.group',
                                                        label: this.$t('GROUP'),
                                                        minWidth: 60,
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'request.login',
                                                        label: this.$t('CLIENT'),
                                                        minWidth: 60,
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'request.symbol',
                                                        label: this.$t('SYMBOL'),
                                                        width: 70,
                                                        align: 'center',
                                                }
                                        }, {
                                                attr: {
                                                        label: this.$t('SIDE'),
                                                        width: 80,
                                                        formatter: (item) => {
                                                                if (item.request.settle === 0) {
                                                                        return "O" + (item.request.cmd === 0 ? "B" : "S");
                                                                } else {
                                                                        return "S" + (item.request.cmd === 0 ? "S" : "B");
                                                                }
                                                        },
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'request.size',
                                                        label: this.$t('ORDER SIZE'),
                                                        minWidth: 80,
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'confirm.size',
                                                        label: this.$t('EXEC SIZE'),
                                                        minWidth: 80,
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        label: this.$t('B BOOK SIZE'),
                                                        minWidth: 80,
                                                        formatter: (item) => {
                                                                var l, order, qty;
                                                                l = (function() {
                                                                        var i, len, ref, results;
                                                                        ref = item.orders;
                                                                        var results = [];
                                                                        for (i = 0, len = ref.length; i < len; i++) {
                                                                                order = ref[i];
                                                                                if (order.lp === "bbook") {
                                                                                        results.push(order.quantity);
                                                                                }
                                                                        }
                                                                        return results;
                                                                })();
                                                                qty = 0;
                                                                if (l.length > 0) {
                                                                        qty = l.reduce(function(a, b) {
                                                                                return a + b;
                                                                        });
                                                                }
                                                                return qty / item.request.contract_size;
                                                        },
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: 'address',
                                                        label: '%',
                                                        minWidth: 50,
                                                        formatter: (item) => {
                                                                try {
                                                                        if (item.request.settle === 1 && item.open_log) {
                                                                                if (!item.open_log.trade_rule.attributes) {
                                                                                        return 'view_consolelog';
                                                                                }
                                                                                return item.open_log.trade_rule.attributes.coverage;
                                                                        } else if (item.request.settle === 0) {
                                                                                console.log('attributes', item.trade_rule.attributes);
                                                                                return item.trade_rule.attributes.coverage;
                                                                        } else {
                                                                                return 0;
                                                                        }
                                                                } catch (error) {
                                                                        return 'view_consolelog'
                                                                };
                                                        },
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'confirm.price',
                                                        label: this.$t('EXEC PRICE'),
                                                        minWidth: 80,
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: 'exec_price',
                                                        label: 'Req Price  Spread(pips)',
                                                        renderHeader(createElement, {
                                                                column
                                                        }) {
                                                                if (this.$store.state.global.locale == 'en-US') {
                                                                        return createElement('div', ['REQ',
                                                                                createElement('br'), 'PRICE',
                                                                                createElement('br'), 'SPREAD',
                                                                                createElement('br'), '(pips)'
                                                                        ]);
                                                                } else {
                                                                        return createElement('div', ['请求差价',
                                                                                createElement('br'), '(pips)'
                                                                        ]);
                                                                }
                                                        },
                                                        formatter: (item) => {
                                                                var digits, req;
                                                                req = item.request;
                                                                digits = item.request.digits;
                                                                return "" + (this.get_pips(Math.abs(req.quote_bid - req.quote_ask), digits));
                                                        },
                                                        minWidth: 60,
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: 'exec_price',
                                                        label: 'Company Spread(pips)',
                                                        minWidth: 65,
                                                        renderHeader(createElement, {
                                                                column
                                                        }) {
                                                                if (this.$store.state.global.locale == 'en-US') {
                                                                        return createElement('div', ['COMPANY',
                                                                                createElement('br'), 'SPREAD',
                                                                                createElement('br'), '(pips)'
                                                                        ]);
                                                                } else {
                                                                        return createElement('div', ['利润点数',
                                                                                createElement('br'), '(pips)'
                                                                        ]);
                                                                }
                                                        },
                                                        formatter: (r) => {
                                                                var slippage;
                                                                if (this.lp_side(r) === "buy") {
                                                                        slippage = r.confirm.price - r.confirm.orig_price;
                                                                } else {
                                                                        slippage = r.confirm.orig_price - r.confirm.price;
                                                                }
                                                                return this.get_pips(slippage, r.request.digits);
                                                        },
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: '',
                                                        label: 'Client Slippage(pips)',
                                                        minWidth: 60,
                                                        renderHeader(createElement, {
                                                                column
                                                        }) {
                                                                if (this.$store.state.global.locale == 'en-US') {
                                                                        return createElement('div', ['CLIENT',
                                                                                createElement('br'), 'SLIPPAGE',
                                                                                createElement('br'), '(pips)'
                                                                        ]);
                                                                } else {
                                                                        return createElement('div', ['客户滑点',
                                                                                createElement('br'), '(pips)'
                                                                        ]);
                                                                }
                                                        },
                                                        formatter: (r) => {
                                                                var slippage;
                                                                if (this.lp_side(r) === "buy") {
                                                                        slippage = r.confirm.price - r.request.price;
                                                                } else {
                                                                        slippage = r.request.price - r.confirm.price;
                                                                }
                                                                return this.get_pips(slippage, r.request.digits);
                                                        },
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: 'exec_price',
                                                        label: 'Price Adjust(pips)',
                                                        minWidth: 45,
                                                        renderHeader(createElement, {
                                                                column
                                                        }) {
                                                                if (this.$store.state.global.locale == 'en-US') {
                                                                        return createElement('div', ['Price',
                                                                                createElement('br'), 'Adjust',
                                                                                createElement('br'), '(pips)'
                                                                        ]);
                                                                } else {
                                                                        return createElement('div', ['价格调整',
                                                                                createElement('br'), '(pips)'
                                                                        ]);
                                                                }
                                                        },
                                                        formatter: (r) => {
                                                                var quote_rule;
                                                                quote_rule = r.quote_rule;
                                                                if (quote_rule) {
                                                                        return quote_rule.attributes.adjust;
                                                                } else {
                                                                        return "-";
                                                                }
                                                        },
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: 'exec_price',
                                                        label: 'Avg LP Slippage(pips)',
                                                        minWidth: 55,
                                                        renderHeader(createElement, {
                                                                column
                                                        }) {
                                                                if (this.$store.state.global.locale == 'en-US') {
                                                                        return createElement('div', ['Avg',
                                                                                createElement('br'), 'LP',
                                                                                createElement('br'), 'Slippage',
                                                                                createElement('br'), '(pips)'
                                                                        ]);
                                                                } else {
                                                                        return createElement('div', ['LP 平均滑点',
                                                                                createElement('br'), '(pips)'
                                                                        ]);
                                                                }
                                                        },
                                                        formatter: (r) => {
                                                                var i, len, lp_quote_dict, lp_slippage, ord_price, ord_qty, order, ref, ref1, sum_qty, sum_slippage;
                                                                lp_quote_dict = this.get_lp_quote_dict(r.lp_quote || {
                                                                        "bid": [],
                                                                        "ofr": []
                                                                });
                                                                ref = [0, 0], sum_qty = ref[0], sum_slippage = ref[1];
                                                                ref1 = r.orders;
                                                                for (i = 0, len = ref1.length; i < len; i++) {
                                                                        order = ref1[i];
                                                                        var lp = lp_quote_dict[order.lp];
                                                                        if (order.exec_report && lp) {
                                                                                ord_price = order.exec_report.last_px;
                                                                                ord_qty = order.exec_report.last_qty * order.lp_contract_size;
                                                                                if (ord_qty === 0) {
                                                                                        continue;
                                                                                }
                                                                                if (order.side === "buy") {
                                                                                        lp_slippage = ord_price - lp.ofr_price;
                                                                                } else {
                                                                                        lp_slippage = lp.bid_price - ord_price;
                                                                                }
                                                                                sum_qty += ord_qty;
                                                                                sum_slippage += lp_slippage * ord_qty;
                                                                        }
                                                                }
                                                                if (sum_qty) {
                                                                        return this.get_pips(sum_slippage / sum_qty, r.request.digits);
                                                                } else {
                                                                        return "-";
                                                                }
                                                        },
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: 'exec_price',
                                                        label: 'LP Exec Orders',
                                                        minWidth: 45,
                                                        renderHeader(createElement, {
                                                                column
                                                        }) {
                                                                if (this.$store.state.global.locale == 'en-US') {
                                                                        return createElement('div', ['LP',
                                                                                createElement('br'), 'Exec',
                                                                                createElement('br'), 'Orders',
                                                                                createElement('br'), '(pips)'
                                                                        ]);
                                                                } else {
                                                                        return 'LP订单成交情况';
                                                                }
                                                        },
                                                        scopedSlot: 'lp_orders',
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: 'exec_price',
                                                        label: 'Cost(ms)',
                                                        renderHeader(createElement, {
                                                                column
                                                        }) {
                                                                if (this.$store.state.global.locale == 'en-US') {
                                                                        return createElement('div', ['Cost',
                                                                                createElement('br'), '(ms)'
                                                                        ]);
                                                                } else {
                                                                        return createElement('div', ['耗时',
                                                                                createElement('br'), '(ms)'
                                                                        ]);
                                                                }
                                                        },
                                                        minWidth: 40,
                                                        formatter: (r) => {
                                                                return parseInt((r.end_time - r.start_time) * 1000);
                                                        },
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: 'exec_price',
                                                        label: this.$t('STATUS'),
                                                        minWidth: 60,
                                                        align: 'center',
                                                        scopedSlot: 'status'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'time',
                                                        label: this.$t('Time'),
                                                        minWidth: 80,
                                                        formatter: (r) => {
                                                                return (new Date(r.time * 1000)).toLocaleString();
                                                        },
                                                        align: 'center'
                                                }
                                        }]
                                }
                        }
                },
                status() {
                        var status_list = [];
                        for (var row of this.tableData) {
                                var status = {};
                                var status_key = row.confirm.status;
                                status.text = this.$store.state.global.ord_status[status_key];
                                if (status_key === 0 || status_key === 9 || status_key === 11) {
                                        status.class = "success";
                                } else {
                                        status.class = "error";
                                }
                                status_list.push(status);
                        }
                        return status_list;
                }
        },
        methods: {
                get_order_id(r) {
                        if (r.request.settle === 0 && r.add_request.order_id) {
                                return r.add_request.order_id;
                        } else {
                                return r.request.order_id;
                        }
                },
                onSearchKeyWord() {
                        this.load_data();
                },

                refreshTable() {
                        console.log('refresh_enable', this.refresh_enable);
                        if (this.refresh_enable === "false") {
                                return;
                        };
                        this.timer = setInterval(() => {
                                console.log('refresh_time', this.refresh_time);
                                if (this.refresh_time == 0) {
                                        this.refresh_time = 4;
                                        clearInterval(this.timer);
                                        return;
                                };
                                this.refresh_time--;
                        }, 1000)
                },
                download_file(kwargs) {
                        var params = {
                                func_name: 'trade_log.download_trade_log_details',
                                args: [],
                                kwargs
                        }
                        this.download_file_body = JSON.stringify(params);
                        this.$nextTick(() => {
                                this.$refs['download_file'].submit();
                        })
                        this.$refs['download_file'].submit();
                },
                onDownLoad() {
                        this.$prompt('Please input save filename:', 'prompt', {
                                confirmButtonText: 'OK',
                                cancelButtonText: ' Cancel',
                        }).then(({
                                value
                        }) => {
                                var opts = this.getKwargs();
                                var kwargs = Object.assign({}, opts, {
                                        filename: value
                                });
                                this.download_file(kwargs);
                        });
                },
                show_lp_orders(row) {
                        console.log('row', row);


                        // var id = ord_id + "-" + row.time;
                        // var config = row;
                        // var lp_order = {
                        //         title,
                        //         config,
                        //         id
                        // };
                        // if (this.isDialogExist(this.lp_orders, lp_order) == false) {
                        //         this.lp_orders.push(lp_order);
                        // };
                        var ord_id = this.get_order_id(row);
                        var title = {
                                text: '#' + ord_id + ' LP Orders Settle:' + row.request.settle
                        };
                        var param = {
                                id: [ord_id, row.time],
                                value: row
                        };
                        this.$store.dispatch('update_tlog_lp_order_dicts', param);
                },
                onCloseLpOrder(index) {
                        this.lp_orders.splice(index, 1);
                },
                show_trade_log(row) {
                        this.tradeLog_dialogVisible = true;
                        this.log_dicts = row;
                },
                onCloseTradeLog(index) {
                        this.trade_logs.splice(index, 1);
                },
                onShowProfit() {
                        var kwargs = this.getKwargs();
                        if (kwargs.time == undefined) {
                                this.$message.warning('Select time first');
                                return;
                        }
                        this.$store.dispatch('update_profitLog_kwargs', kwargs);
                        this.$router.push({
                                name: 'Profit Log',
                                params: kwargs
                        });
                        // var params = {
                        //         func_name: 'trade_log.trade_profit',
                        //         kwargs
                        // }
                        // CommonApi.postFormAjax.call(this, params, data => {
                        //         this.show_profit_dialog(data);
                        // })
                        // this.$$api_common_ajax({
                        //         data: {
                        //                 func_name: 'trade_log.trade_profit',
                        //                 args: [],
                        //                 kwargs:
                        //         },
                        //         fn: data => {
                        //                 this.tableData = data[0];
                        //                 this.pagination.total = data[1];
                        //                 this.schedule_next_request();
                        //         },
                        //         errFn: (err) => {
                        //                 this.$message({
                        //                         showClose: true,
                        //                         message: err.message,
                        //                         type: 'error'
                        //                 });
                        //         }
                        // });

                },
                show_profit_dialog(profit_dict) {
                        this.trade_profit.config = [];
                        for (var key in profit_dict) {
                                var row = profit_dict[key];
                                row["symbol"] = key;
                                this.trade_profit.config.push(row);
                        };
                        this.trade_profit.show = true;
                },
                onCloseProfit() {
                        this.trade_profit.show = false;
                },

                interval_check() {
                        var remain_mil_sec;
                        if (this.isActive === false) {
                                this.remain_sec = "-";
                                return;
                        };

                        if (this.next_fresh_time && !this.data_loaded) {
                                console.log('5555', this.next_fresh_time, this.data_loaded);
                                remain_mil_sec = this.next_fresh_time - (new Date()).getTime();
                                if (remain_mil_sec <= 0) {
                                        this.remain_sec = '0';
                                        this.load_data();
                                } else {
                                        this.remain_sec = parseInt(remain_mil_sec * 0.001);
                                }
                        }
                },
                schedule_next_request() {
                        this.next_fresh_time = (new Date()).getTime() + this.refresh_seconds * 1000;
                        this.data_loaded = false;
                },
                auto_refresh_control() {
                        this.isActive = !this.isActive;
                        // if (this.isActive == false) {
                        //         this.$store.dispatch('cancel_global_ajax_source');
                        // }
                },
                onChangeCurrentPage(page) {
                        this.pagination.current_page = page;
                        this.getCurrentPageTable();
                },
                onChangePageSize(page_size) {
                        this.pagination.page_size = page_size;
                        this.getCurrentPageTable();
                },
                getCurrentPageTable() {
                        var kwargs = this.getKwargs();
                        this.$$api_common_ajax({
                                data: {
                                        func_name: 'trade_log.page_trade_log',
                                        args: [this.pagination.current_page, this.pagination.page_size],
                                        kwargs
                                },
                                fn: data => {
                                        this.tableData = data[0];
                                        this.pagination.total = data[1];
                                        this.schedule_next_request();
                                },
                                errFn: (err) => {
                                        this.$message({
                                                showClose: true,
                                                message: err.message,
                                                type: 'error'
                                        });
                                }
                        });
                },
                load_data() {
                        this.getCurrentPageTable();
                },
                init() {
                        this.timer_interval_id = setInterval(() => {
                                this.interval_check();
                        }, 1000);
                        this.load_data();
                        this.nowTime = (new Date()).toGMTString();
                }
        },
        mounted() {
                this.init();
        },
        beforeRouteLeave(to, from, next) {
                if (this.timer_interval_id) {
                        clearInterval(this.timer_interval_id);
                }
                next();
        }
}