export default {
    name: 'lp_symbol',
    data() {
        return {
            tableData: [],
            new_tableData: [{
                std_symbol: '',
                lp: (() => {
                    if (this.$store.state.global.lps.length <= 0) {
                        return '';
                    } else {
                        return this.$store.state.global.lps[0];
                    }
                })(),
                lp_symbol: '',
                weight: '',
                min_qty: '',
                contract_size: '',
                quote_enable: 'true',
                trade_enable: 'true'
            }],
            edit_tableData: [{
                std_symbol: '',
                lp: '',
                lp_symbol: '',
                weight: '',
                min_qty: '',
                contract_size: '',
                quote_enable: 'true',
                trade_enable: 'true'
            }],
            addDialogTableVisible: false,
            editDialogTableVisible: false,
            visible: false,
            add_loading: false,
            edit_loading: false
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
                            label: this.$t('STD SYMBOL'),
                            minWidth: 120,
                            sortable: true,
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'lp',
                            label: this.$t('LP'),
                            minWidth: 50,
                            sortable: true,
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'lp_symbol',
                            label: this.$t('LP SYMBOL'),
                            minWidth: 105,
                            sortable: true,
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'weight',
                            label: this.$t('WEIGHT'),
                            minWidth: 85,
                            sortable: true,
                            scopedSlot: 'weight_attr',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'min_qty',
                            label: this.$t('MIN QTY'),
                            minWidth: 90,
                            sortable: true,
                            scopedSlot: 'min_qty_attr',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'contract_size',
                            label: this.$t('CON SIZE'),
                            minWidth: 90,
                            sortable: true,
                            scopedSlot: 'contract_size_attr',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'quote_enable',
                            label: this.$t('QUOTE ENABLE'),
                            minWidth: 130,
                            sortable: true,
                            scopedSlot: 'quote_attr',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'trade_enable',
                            label: this.$t('TRADE ENABLE'),
                            minWidth: 130,
                            sortable: true,
                            scopedSlot: 'trade_attr',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            // prop: 'address',
                            label: this.$t('OPERATION'),
                            minWidth: 85,
                            scopedSlot: 'handler',
                            align: 'center',
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
                            label: this.$t('STD SYMBOL'),
                            minWidth: 90,
                            scopedSlot: 'std_symbol',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'lp',
                            label: this.$t('LP'),
                            minWidth: 100,
                            scopedSlot: 'lp',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'lp_symbol',
                            label: this.$t('LP SYMBOL'),
                            minWidth: 90,
                            scopedSlot: 'lp_symbol',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'weight',
                            label: this.$t('WEIGHT'),
                            minWidth: 90,
                            scopedSlot: 'weight',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'min_qty',
                            label: this.$t('MIN QTY'),
                            minWidth: 80,
                            scopedSlot: 'min_qty',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'contract_size',
                            label: this.$t('CON SIZE'),
                            minWidth: 90,
                            scopedSlot: 'contract_size',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'quote_enable',
                            label: this.$t('QUOTE ENABLE'),
                            minWidth: 100,
                            scopedSlot: 'quote_enable',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'trade_enable',
                            label: this.$t('TRADE ENABLE'),
                            minWidth: 100,
                            scopedSlot: 'trade_enable',
                            align: 'center'
                        }
                    }]
                }
            }
        },
        edit_tableConfig: {
            get() {
                return {
                    table: {
                        attr: {
                            data: this.edit_tableData,
                            maxHeight: '100%',
                            border: false
                        }
                    },
                    columns: [{
                        attr: {
                            prop: 'std_symbol',
                            label: this.$t('STD SYMBOL'),
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
                            label: this.$t('LP SYMBOL'),
                            width: 90,
                            scopedSlot: 'lp_symbol',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'weight',
                            label: this.$t('WEIGHT'),
                            width: 90,
                            scopedSlot: 'weight',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'min_qty',
                            label: this.$t('MIN QTY'),
                            width: 90,
                            scopedSlot: 'min_qty',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'contract_size',
                            label: this.$t('CON SIZE'),
                            width: 110,
                            scopedSlot: 'contract_size',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'quote_enable',
                            label: this.$t('QUOTE ENABLE'),
                            minWidth: 120,
                            scopedSlot: 'quote_enable',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'trade_enable',
                            label: this.$t('TRADE ENABLE'),
                            minWidth: 120,
                            scopedSlot: 'trade_enable',
                            align: 'center'
                        }
                    }]
                }
            }
        },
    },
    methods: {
        add_symbol_submit(data) {
            var weight, min_qty, contract_size, quote_enable, trade_enable;
            weight = parseInt(data.weight);
            min_qty = parseInt(data.min_qty);
            contract_size = data.contract_size * 1;
            quote_enable = this.string_to_boolean(data.quote_enable);
            trade_enable = this.string_to_boolean(data.trade_enable);
            this.add_loading = true;
            this.$$api_common_ajax({
                data: {
                    func_name: 'router_api.lp_add_symbol',
                    args: [data.lp, data.lp_symbol, data.std_symbol, quote_enable, trade_enable, weight, min_qty, contract_size],
                    kwargs: {}
                },
                fn: data => {
                    this.add_loading = false;
                    this.load_data();
                    this.get_global_std_symbols();
                    this.addDialogTableVisible = false;
                },
                errFn: (err) => {
                    this.add_loading = false;
                    this.$message({
                        showClose: true,
                        message: err.response.data,
                        type: 'error'
                    });
                }
            });
        },
        editSymbol(row) {
            this.editDialogTableVisible = true;
            Object.assign(this.edit_tableData[0], row);

        },
        edit_symbol_submit(row) {
            row.weight = parseInt(row.weight);
            row.min_qty = parseInt(row.min_qty);
            row.contract_size = row.contract_size * 1;
            var quote_enable = this.string_to_boolean(row.quote_enable);
            var trade_enable = this.string_to_boolean(row.trade_enable);
            this.edit_loading = true;
            this.$$api_common_ajax({
                data: {
                    func_name: 'router_api.lp_add_symbol',
                    args: [row.lp, row.lp_symbol, row.std_symbol, quote_enable, trade_enable, row.weight, row.min_qty, row.contract_size],
                    kwargs: {}
                },
                fn: data => {
                    this.edit_loading = true;
                    this.editDialogTableVisible = false;
                    this.load_data();
                },
                errFn: (err) => {
                    this.add_loading = false;
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