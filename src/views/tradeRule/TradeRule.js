export default {
    name: 'trade_rule',
    data() {
        return {
            tableData: [],
            remarks: [],
            groups: [],
            rules: [],
            dialogTableVisible: false,
            create_new_group_dialog: {
                fields: [{
                    key: 'source',
                    type: 'select',
                    desc: '请选择',
                    label: 'source',
                    list: (() => {
                        var i, len, sources, source, result;
                        result = [];
                        sources = this.$store.state.global.sources;
                        for (i = 0, len = sources.length; i < len; i++) {
                            source = sources[i];
                            result.push({
                                value: source,
                                text: source
                            });
                        }
                        return result;
                    })()
                }, {
                    type: 'input',
                    key: 'group',
                    label: 'Group'
                }, {
                    type: 'input',
                    key: 'mt4_symbol',
                    label: 'MT4 Symbol'
                }, {
                    key: 'std_symbol',
                    type: 'select',
                    desc: '请选择',
                    label: 'status',
                    list: (() => {
                        var i, len, std_symbols, std_symbol, result;
                        result = [];
                        std_symbols = this.$store.state.global.std_symbols;
                        for (i = 0, len = std_symbols.length; i < len; i++) {
                            std_symbol = std_symbols[i];
                            result.push({
                                value: std_symbol,
                                text: std_symbol
                            });
                        }
                        return result;
                    })()
                }, {
                    key: 'route_type',
                    type: 'RouteType',
                    label: 'route_type',
                    default: {
                        threshold: 0,
                        right: 'ratio',
                        left: 'bestright'
                    }
                }, {
                    type: 'input',
                    key: 'coverage',
                    value: '',
                    label: 'coverage'
                }, {
                    type: 'input',
                    key: 'better_fill',
                    value: '',
                    label: 'better_fill'
                }, {
                    key: 'open_partial',
                    type: 'select',
                    value: {
                        default: true,
                        list: [{
                            value: true,
                            text: 'true'
                        }, {
                            value: false,
                            text: 'false'
                        }]
                    },
                    desc: '请选择',
                    label: 'open_partial'
                }, {
                    key: 'open_lp_rejected_retry',
                    type: 'select',
                    value: {
                        default: false,
                        list: [{
                            value: true,
                            text: 'true'
                        }, {
                            value: false,
                            text: 'false'
                        }]
                    },
                    desc: '请选择',
                    label: 'open_lp_rejected_retry  '
                }, {
                    type: 'input',
                    key: 'open_threshold',
                    label: 'open_threshold'
                }, {
                    type: 'input',
                    key: 'open_probe',
                    label: 'open_probe'
                }, {
                    type: 'input',
                    key: 'close_threshold',
                    label: 'close_threshold'
                }, {
                    type: 'input',
                    key: 'close_probe',
                    label: 'close_probe'
                }, {
                    type: 'input',
                    key: 'close_probe',
                    label: 'close_probe'
                }, {
                    type: 'input',
                    key: 'markup',
                    label: 'markup'
                }, {
                    key: 'limit_order_types',
                    type: 'CheckboxAndInputList',
                    label: 'limit_order_types',
                    desc: "Do not change MT4's request price",
                    spec: ["Instant", "Market", "Pending", "Stopout", "StopLoss", "TakeProfit"]
                }, {
                    label: 'lps',
                    type: 'CheckBoxList',
                    key: 'lps',
                    value: [],
                    list: (() => {
                        var i, len, results;
                        results = [];
                        var lps = this.$store.state.global.lps;
                        for (i = 0, len = lps.length; i < len; i++) {
                            var lp = lps[i];
                            console.log('lps', lps);
                            results.push(lp);
                        }
                        console.log('results', results);
                        return results;
                    })()
                }, {
                    key: 'bbook_exec_type',
                    type: 'select',
                    desc: '请选择',
                    label: 'bbook_exec_type',
                    list: [{
                        value: 'vwap',
                        text: 'vwap'
                    }, {
                        value: 'worst',
                        text: 'worst'
                    }]

                }, {
                    key: 'slippages',
                    type: 'MultipleInput',
                    label: 'slippages',
                    spec: [{
                        type: 'float',
                        desc: '> =size'
                    }, {
                        type: 'float',
                        desc: 'min slippage'
                    }, {
                        type: 'float',
                        desc: 'max slippage'
                    }]
                }],
                default_value: {}
            },
            // copy new group
            copy_to_new_group: {
                fields: [{
                    key: 'source',
                    type: 'select',
                    desc: '请选择',
                    label: 'source',
                    list: (() => {
                        var i, len, sources, source, result;
                        result = [];
                        sources = this.$store.state.global.sources;
                        for (i = 0, len = sources.length; i < len; i++) {
                            source = sources[i];
                            result.push({
                                value: source,
                                text: source
                            });
                        }
                        return result;
                    })()
                }, {
                    type: 'input',
                    key: 'group',
                    label: 'Group'
                }],
                default_value: {}
            },
            copy_group_dialog: {
                source: '',
                group: ''
            }
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
                            border: false
                        }
                    },
                    columns: [{
                        attr: {
                            prop: 'source',
                            label: this.$t('SOURCE'),
                            // width: 120,
                            sortable: true,
                            // scopedSlot: 'date',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'group',
                            label: this.$t('GROUP'),
                            // width: 120,
                            sortable: true,
                            align: 'center'
                        }
                    }, {
                        attr: {
                            label: this.$t('MT4 SYMBOL'),
                            // width: 150,
                            sortable: true,
                            formatter(item) {
                                return item.mt4_symbols.length;
                            },
                            align: 'center',
                        }
                    }, {
                        attr: {
                            // prop: 'weight',
                            label: this.$t('VIEW RULES'),
                            // width: 100,
                            sortable: true,
                            align: 'center',
                            scopedSlot: 'rulesdetail',
                        }
                    }, {
                        attr: {
                            label: this.$t('CREATE TO NEW RULES'),
                            // width: 180,
                            sortable: true,
                            align: 'center',
                            scopedSlot: 'copygroup',
                        }
                    }, {
                        attr: {
                            prop: 'remark',
                            label: this.$t('Remark'),
                            // width: 100,
                            sortable: true,
                            align: 'center',
                            scopedSlot: 'remark',
                        }
                    }]
                }
            },
        },
        get_up_traderule_table() {
            return this.$store.state.traderule.update_traderule_table;
        }
    },
    methods: {
        
        copy_new_group(row) {
            console.log('row', row);
            this.dialogTableVisible = true;
            this.copy_group_dialog.source = row.source;
            this.copy_group_dialog.group = row.group;
        },
        copyGroupSumbit(data) {

        },
        render_groups(rules) {
            var i, j, key, len, len1, rule, rule_key, source_group, source_groups, source_groups_dict;
            source_groups = [];
            console.log('trade_rules', rules);
            this.$store.dispatch('update_trade_rules', rules);
            source_groups_dict = new Object;
            for (i = 0, len = rules.length; i < len; i++) {
                rule = rules[i];
                rule_key = [rule.source, rule.group];
                if (!(rule_key in source_groups_dict)) {
                    source_groups_dict[rule_key] = new Object({
                        source: rule.source,
                        group: rule.group,
                        mt4_symbols: [rule.mt4_symbol]
                    });
                } else {
                    source_groups_dict[rule_key].mt4_symbols.push(rule.mt4_symbol);
                }
            }
            for (key in source_groups_dict) {
                source_group = source_groups_dict[key];
                source_groups.push(source_group);
            }
            for (j = 0, len1 = source_groups.length; j < len1; j++) {
                source_group = source_groups[j];
                source_group.mt4_symbols.sort();
            }
            source_groups.sort(function(a, b) {
                if (a.source > b.source) {
                    return 1;
                } else if (a.source < b.source) {
                    return -1;
                } else {
                    if (a.group > b.group) {
                        return 1;
                    } else if (a.group < b.group) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            });
            this.tableData = source_groups;
            console.log('tableData', this.tableData);
        },
        open_create_new_group_dialog(){

        },
        render_remarks() {
            var i, j, len, len1, remark_dict, remark, row;
            var params = {
                func_name: 'trade_rule_remark.get_all_remarks'
            }
            remark_dict = new Object;
            // this.$$api_common_ajax(this, params, remarks => {
            //     for (i = 0, len = remarks.length; i < len; i++) {
            //         remark = remarks[i];
            //         remark_dict[remark.group] = remark.remark;
            //     };
            //     console.log('remark_dict', remark_dict);
            //     for (j = 0, len1 = this.tableData.length; j < len1; j++) {
            //         row = this.tableData[j];
            //         if (row.group in remark_dict) {
            //             remark = remark_dict[row.group];
            //             this.$set(row, 'remark', remark);
            //         } else {
            //             Object.assign(row, {
            //                 remark: '----------------'
            //             });
            //         }
            //     };
            //     console.log('remark', this.tableData);
            // }, {
            //     errFn(err) {
            //         for (j = 0, len1 = this.tableData.length; j < len1; j++) {
            //             row = this.tableData[j];
            //             Object.assign(row, {
            //                 remark: 'Load remark error'
            //             });
            //         }
            //     }
            // });
            this.$$api_common_ajax({
                data: {
                    func_name: 'trade_rule_remark.get_all_remarks',
                    args: [],
                    kwargs: {}
                },
                fn: remarks => {
                    for (i = 0, len = remarks.length; i < len; i++) {
                        remark = remarks[i];
                        remark_dict[remark.group] = remark.remark;
                    };
                    console.log('remark_dict', remark_dict);
                    for (j = 0, len1 = this.tableData.length; j < len1; j++) {
                        row = this.tableData[j];
                        if (row.group in remark_dict) {
                            remark = remark_dict[row.group];
                            this.$set(row, 'remark', remark);
                        } else {
                            Object.assign(row, {
                                remark: '-------------------'
                            });
                        }
                    };
                    console.log('remark', this.tableData);
                },
                errFn: err => {
                    for (j = 0, len1 = this.tableData.length; j < len1; j++) {
                        row = this.tableData[j];
                        Object.assign(row, {
                            remark: 'Load remark error'
                        });
                    }
                }
            })
        },
        load_data() {
            this.$$api_common_ajax({
                data: {
                    func_name: 'router_api.trade_get_all_rules',
                    args: [],
                    kwargs: {}
                },
                fn: data => {
                    this.trade_rules = data;
                    console.log('trade_rules', this.trade_rules);
                    this.render_groups(data);
                    this.render_remarks();
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