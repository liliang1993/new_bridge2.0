export default {
    name: 'lp_symbol',
    data() {
        return {
            add_lpsymbol_dialog: {
                show: false,
                isModal: true,
                title: {
                    text: 'Add LP Symbol'
                },
                fields: [{
                    type: 'input',
                    key: 'std_symbol',
                    label: 'STD symbol'
                }, {
                    key: 'lp',
                    type: 'select',
                    desc: '请选择',
                    label: 'LP',
                    list: (() => {
                        var i, len, lps, lp, result;
                        result = [];
                        lps = this.$store.state.global.lps;
                        for (i = 0, len = lps.length; i < len; i++) {
                            lp = lps[i];
                            result.push({
                                value: lp,
                                text: lp
                            });
                        }
                        return result;
                    })()
                }, {
                    type: 'input',
                    key: 'lp_symbol',
                    label: 'LP symbol'
                }, {
                    key: 'quote_enable',
                    type: 'select',
                    desc: '请选择',
                    label: 'Quote Enable',
                    list: [{
                        value: 'true',
                        text: 'true'
                    }, {
                        value: 'false',
                        text: 'false'
                    }]
                }, {
                    key: 'trade_enable',
                    type: 'select',
                    desc: '请选择',
                    label: 'Trade Enable',
                    list: [{
                        value: 'true',
                        text: 'true'
                    }, {
                        value: false,
                        text: 'false'
                    }]
                }, {
                    type: 'input',
                    key: 'weight',
                    label: 'Weight'
                }, {
                    type: 'input',
                    key: 'min_qty',
                    label: 'Min Qty'
                }, {
                    type: 'input',
                    key: 'contract_size',
                    label: 'Contract Size'
                }],
                default_value: {
                    lp: this.$store.state.global.lps[0],
                    quote_enable: 'true',
                    trade_enable: 'true'
                }
            },
            tableData: [],

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
                            defaultSort: {
                                prop: 'std_symbol'
                            }
                        }
                    },
                    columns: [{
                        attr: {
                            prop: 'std_symbol',
                            label: this.$t('STD symbol'),
                            minWidth: 180,
                            sortable: true,
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'lp',
                            label: this.$t('LP'),
                            minWidth: 180,
                            sortable: true,
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'lp_symbol',
                            label: this.$t('LP symbol'),
                            minWidth: 180,
                            sortable: true,
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'weight',
                            label: this.$t('Weight'),
                            width: 100,
                            sortable: true,
                            scopedSlot: 'weight_attr',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'min_qty',
                            label: this.$t('Min Qty'),
                            width: 100,
                            sortable: true,
                            scopedSlot: 'min_qty_attr',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'contract_size',
                            label: this.$t('Contract Size'),
                            minWidth: 180,
                            sortable: true,
                            scopedSlot: 'contract_size_attr',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'quote_enable',
                            label: this.$t('Quote Enable'),
                            minWidth: 180,
                            sortable: true,
                            scopedSlot: 'quote_attr',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'trade_enable',
                            label: this.$t('Trade Enable'),
                            minWidth: 180,
                            sortable: true,
                            scopedSlot: 'trade_attr',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            // prop: 'address',
                            label: this.$t('Operation'),
                            minWidth: 180,
                            scopedSlot: 'handler',
                            align: 'center'
                        }
                    }]
                }
            }
        }
    },
    methods: {
        open_dialog(type) {
            this[type].show = true;
        },
        close_dialog(type) {
            this[type].show = false;
        },
        add_lpsymbol_submit(data) {
            var weight, min_qty, contract_size, quote_enable, trade_enable;
            weight = parseInt(data.weight);
            min_qty = parseInt(data.min_qty);
            contract_size = data.contract_size * 1;
            quote_enable = this.string_to_boolean(data.quote_enable);
            trade_enable = this.string_to_boolean(data.trade_enable);
            this.$$api_common_ajax({
                data: {
                    func_name: 'router_api.lp_add_symbol',
                    args: [data.lp, data.std_symbol, data.lp_symbol, quote_enable, trade_enable, weight, min_qty, contract_size],
                    kwargs: {}
                },
                fn: data => {
                    this.load_data();
                    this.get_global_std_symbols();
                    this.close_dialog('add_lpsymbol_dialog');

                },
                errFn: (err) => {
                    this.$message({
                        showClose: true,
                        message: err.response.data,
                        type: 'error'
                    });
                }
            });
        },
        edit_lpsymbol_submit(row) {
            row.weight = parseInt(row.weight);
            row.min_qty = parseInt(row.min_qty);
            row.contract_size = row.contract_size * 1;
            var quote_enable = this.string_to_boolean(row.quote_enable);
            var trade_enable = this.string_to_boolean(row.trade_enable);
            this.$$api_common_ajax({
                data: {
                    func_name: 'router_api.lp_add_symbol',
                    args: [row.lp, row.std_symbol, row.lp_symbol, quote_enable, trade_enable, row.weight, row.min_qty, row.contract_size],
                    kwargs: {}
                },
                fn: data => {
                    row.editFlag = false;
                },
                errFn: (err) => {
                    this.$message({
                        showClose: true,
                        message: err.response.data,
                        type: 'error'
                    });
                }
            });
        },
        onEditSymbol(row) {
            this.$set(row, 'editFlag', true);
            console.log('row', row.editFlag);
        },
        detele_lpsymbol_handle(row, index) {
            console.log('index', index);
            this.$$api_common_ajax({
                data: {
                    func_name: 'router_api.lp_del_symbol',
                    args: [row.lp, row.lp_symbol, row.std_symbol],
                    kwargs: {}
                },
                fn: data => {
                    this.tableData.splice(index, 1);
                    this.get_global_std_symbols();
                }
            });
        },
        onDeleteSymbol(row, index) {
            this.$confirm('Are you sure you want to detele this?', 'prompt', {
                type: 'warning'
            }).then(() => {
                this.detele_lpsymbol_handle(row, index);
            });
        },
        load_data() {
            this.$$api_common_ajax({
                data: {
                    func_name: 'router_api.lp_get_symbols',
                    args: [],
                    kwargs: {}
                },
                fn: data => {
                    for (var item of data) {
                        item.trade_enable = this.boolean_to_string(item.trade_enable);
                        item.quote_enable = this.boolean_to_string(item.quote_enable);
                    }
                    this.tableData = data;
                }
            });
        },
        init() {
            this.load_data();
        }
    },
    mounted() {
        this.init();
    }
}