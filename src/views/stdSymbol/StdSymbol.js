export default {
    name: 'lp_symbol',
    data() {
        return {
            tableData: [],
            new_tableData: [{
                std_symbol: '',
                lp: '',
                lp_symbol: '',
                weight: '',
                min_qty: '',
                contract_size: '',
                quote_enable: 'true',
                trade_enable: 'true'
            }],
            dialogTableVisible: false,
            visible: false
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
                            width: 120,
                            sortable: true,
                            scopedSlot: 'weight_attr',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'min_qty',
                            label: this.$t('Min Qty'),
                            width: 120,
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
                            align: 'left',
                            headerAlign: 'left'
                        }
                    }]
                }
            }
        },
        new_tableConfig: {
            get() {
                return {
                    table: {
                        attr: {
                            data: this.new_tableData,
                            maxHeight: '100%',
                            border: false
                        }
                    },
                    columns: [{
                        attr: {
                            prop: 'std_symbol',
                            label: this.$t('Std symbol'),
                            width: 90,
                            scopedSlot: 'std_symbol',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'lp',
                            label: this.$t('LP'),
                            width: 100,
                            scopedSlot: 'lp',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'lp_symbol',
                            label: this.$t('LP symbol'),
                            width: 90,
                            scopedSlot: 'lp_symbol',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'weight',
                            label: this.$t('Weight'),
                            width: 90,
                            scopedSlot: 'weight',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'min_qty',
                            label: this.$t('Min Qty'),
                            width: 90,
                            scopedSlot: 'min_qty',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'contract_size',
                            label: this.$t('Contract Size'),
                            width: 110,
                            scopedSlot: 'contract_size',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'quote_enable',
                            label: this.$t('Quote Enable'),
                            minWidth: 120,
                            scopedSlot: 'quote_enable',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'trade_enable',
                            label: this.$t('Trade Enable'),
                            minWidth: 120,
                            scopedSlot: 'trade_enable',
                            align: 'center'
                        }
                    }]
                }
            }
        }
    },
    methods: {
        add_symbol_submit(data) {
            var weight, min_qty, contract_size, quote_enable, trade_enable;
            weight = parseInt(data.weight);
            min_qty = parseInt(data.min_qty);
            contract_size = data.contract_size * 1;
            quote_enable = this.string_to_boolean(data.quote_enable);
            trade_enable = this.string_to_boolean(data.trade_enable);
            this.$$api_common_ajax({
                data: {
                    func_name: 'router_api.lp_add_symbol',
                    args: [data.lp, data.lp_symbol, data.std_symbol, quote_enable, trade_enable, weight, min_qty, contract_size],
                    kwargs: {}
                },
                fn: data => {
                    this.load_data();
                    this.get_global_std_symbols();
                    this.dialogTableVisible = false;
                },
                errFn: (err) => {
                    console.log('123', "错误了");
                    this.$message({
                        showClose: true,
                        message: err.response.data,
                        type: 'error'
                    });
                }
            });
        },
        edit_symbol_submit(row) {
            row.weight = parseInt(row.weight);
            row.min_qty = parseInt(row.min_qty);
            row.contract_size = row.contract_size * 1;
            var quote_enable = this.string_to_boolean(row.quote_enable);
            var trade_enable = this.string_to_boolean(row.trade_enable);
            this.$$api_common_ajax({
                data: {
                    func_name: 'router_api.lp_add_symbol',
                    args: [row.lp, row.lp_symbol, row.std_symbol, quote_enable, trade_enable, row.weight, row.min_qty, row.contract_size],
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
        delete_symbol(row, index) {
            // console.log('index', index, row, scope);
            this.$$api_common_ajax({
                data: {
                    func_name: 'router_api.lp_del_symbol',
                    args: [row.lp, row.lp_symbol, row.std_symbol],
                    kwargs: {}
                },
                fn: data => {
                    // for ()
                    this.init();
                    this.get_global_std_symbols();
                    row.visible = false;
                }
            });
        },
        editSymbol(row) {
            this.$set(row, 'editFlag', true);
            for (var item of['weight', 'min_qty', 'contract_size', 'quote_enable', 'trade_enable']) {
                row['orign-' + item] = row[item];
            }
        },
        backOrigin(row) {
            this.$set(row, 'editFlag', false);
            for (var item of['weight', 'min_qty', 'contract_size', 'quote_enable', 'trade_enable']) {
                row[item] = row['orign-' + item];
            }
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
                        item.visible = false;
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