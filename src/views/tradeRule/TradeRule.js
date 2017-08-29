export default {
    name: 'trade_rule',
    data() {
        return {
            tableData: [],
            remarks: [],
            groups: [],
            rules: [],
            dialogTableVisible: false,
            remarkDialogTableVisible: false,
            remarkDialog_dict: {
                group: '',
                remark: ''
            },
            copyNewGroup_dict: {
                source: this.$store.state.global.sources[0],
                group: '',
                new_group: ''
            },
            trade_rules: []
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
            this.dialogTableVisible = true;
            this.copyNewGroup_dict.source = row.source;
            this.copyNewGroup_dict.group = row.group;
        },
        copyGroupSumbit() {
            var args = [];
            console.log('trade_rule', this.trade_rules);
            for (var item of this.trade_rules) {
                if (item.source == this.copyNewGroup_dict.source && item.group == this.copyNewGroup_dict.group) {
                    item.group = this.copyNewGroup_dict.new_group;
                    args.push(item);
                }
            }
            this.$$api_common_ajax({
                data: {
                    func_name: 'router_api.trade_add_rules',
                    args: [args],
                    kwargs: {}
                },
                fn: data => {
                    this.load_data();
                    this.dialogTableVisible = false;
                },
                errFn: err => {

                }
            })
        },
        onEditRemark(row) {
            this.remarkDialog_dict.group = row.group;
            this.remarkDialog_dict.remark = row.remark;
            this.remarkDialogTableVisible = true;
        },
        remarkSumbit() {
            this.$$api_common_ajax({
                data: {
                    func_name: 'trade_rule_remark.update_remark',
                    args: [this.remarkDialog_dict.group, this.remarkDialog_dict.remark],
                    kwargs: {}
                },
                fn: data => {
                    this.load_data();
                    this.remarkDialogTableVisible = false;
                },
                errFn: err => {

                }
            })
        },
        open_create_new_group_dialog() {
            this.$store.dispatch('show_trade_group');
        },
        render_groups(rules) {
            var i, j, key, len, len1, rule, rule_key, source_group, source_groups, source_groups_dict;
            source_groups = [];
            this.trade_rules = rules;
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
        render_remarks() {
            var i, j, len, len1, remark_dict, remark, row;
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