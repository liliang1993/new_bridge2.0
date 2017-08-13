export default {
    name: 'lp_symbol',
    data() {
        return {
            tableData: [],
            new_tableData:[{

            }],
            dialogTableVisible:false,
            visible:false
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
                            headerAlign:'left'
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
                            width: 80,
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
                            label: this.$t('LP symbol'),
                            minWidth: 80,
                            scopedSlot: 'lp_symbol',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'weight',
                            label: this.$t('Weight'),
                            width: 80,
                            scopedSlot: 'weight',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'min_qty',
                            label: this.$t('Min Qty'),
                            width: 80,
                            scopedSlot: 'min_qty',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'contract_size',
                            label: this.$t('Contract Size'),
                            minWidth: 80,
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
        deteleSymbol(row, index) {
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
        editSymbol(row){
            this.$set(row,'editFlag',true);
            for(var item of ['weight','min_qty','contract_size','quote_enable','trade_enable']){
                row['orign-'+item] = row[item];
            }
        },
        backOrigin(row){
            this.$set(row,'editFlag',false);
            for(var item of ['weight','min_qty','contract_size','quote_enable','trade_enable']){
                row[item] = row['orign-'+item];
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