export default {
  name: 'view-rules',
  data() {
    return {
      editFlag: false,
      batch_flag: true,
      batch_datas: [],
      keyword: '',
      tableData: [],
      default_slippage: '',
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
                prop: 'group'
              }
            }
          },
          columns: [{
            attr: {
              type: 'selection',
              minWidth: 40,
              align: 'left',
              headerAlign: 'left'
            }
          }, {
            attr: {
              prop: 'mt4_symbol',
              label: this.$t('MT4 SYMBOL'),
              minWidth: 115,
              sortable: true,
              align: 'left',
              headerAlign: 'left'
            }
          }, {
            attr: {
              prop: 'std_symbol',
              label: this.$t('STD SYMBOL'),
              minWidth: 115,
              sortable: true,
              align: 'left',
              headerAlign: 'left'
            }
          }, {
            attr: {
              prop: 'route',
              label: this.$t('ROUTE'),
              minWidth: 120,
              className: 'route',
              sortable: true,
              align: 'left',
              headerAlign: 'left',
              scopedSlot: 'route_type',
            }
          }, {
            attr: {
              label: this.$t('LIMIT ORDERS TYPES'),
              minWidth: 90,
              renderHeader(createElement, {
                column
              }) {
                if (this.$store.state.global.locale == 'en-US') {
                  return createElement('span', ['LIMIT',
                    createElement('br'), 'ORDERS', createElement('br'), 'TYPES'
                  ]);
                } else {
                  return createElement('span', ['请求差价',
                    createElement('br'), '(pips)'
                  ]);
                }
              },
              sortable: true,
              align: 'left',
              headerAlign: 'left',
              scopedSlot: 'limit_order_types'
            }
          }, {
            attr: {
              prop: 'attributes.coverage',
              label: this.$t('COVERAGE'),
              minWidth: 105,
              sortable: true,
              align: 'left',
              headerAlign: 'left',
              scopedSlot: 'coverage',
            }
          }, {
            attr: {
              prop: 'attributes.better_fill',
              label: this.$t('BETTER FIll'),
              minWidth: 100,
              sortable: true,
              align: 'left',
              headerAlign: 'left',
              scopedSlot: 'better_fill'
            }
          }, {
            attr: {
              prop: 'attributes.slippages',
              label: this.$t('SLIPPAGES'),
              minWidth: 225,
              sortable: true,
              align: 'left',
              headerAlign: 'left',
              scopedSlot: 'slippages'
            }
          }, {
            attr: {
              label: this.$t('OPEN PARTIAL'),
              renderHeader(createElement, {
                column
              }) {
                if (this.$store.state.global.locale == 'en-US') {
                  return createElement('span', ['OPEN',
                    createElement('br'), 'PARTIAL'
                  ]);
                } else {
                  return createElement('span', ['允许开仓部分成交',
                    createElement('br'), '(pips)'
                  ]);
                }
              },
              minWidth: 100,
              sortable: true,
              align: 'left',
              headerAlign: 'left',
              scopedSlot: 'open_partial'
            }
          }, {
            attr: {
              label: this.$t('LP REJECTED RETRY'),
              renderHeader(createElement, {
                column
              }) {
                if (this.$store.state.global.locale == 'en-US') {
                  return createElement('span', ['LP',
                    createElement('br'), 'REJECTED',
                    createElement('br'), 'RETRY'
                  ]);
                } else {
                  return createElement('span', ['抛单失败重试',
                    createElement('br'), '(pips)'
                  ]);
                }
              },
              minWidth: 100,
              sortable: true,
              align: 'left',
              headerAlign: 'left',
              scopedSlot: 'open_lp_rejected_retry'
            }
          }, {
            attr: {
              prop: 'attributes.bbook_exec_type',
              label: this.$t('BBOOK EXEC TYPE'),
              renderHeader(createElement, {
                column
              }) {
                if (this.$store.state.global.locale == 'en-US') {
                  return createElement('span', ['BBOOK',
                    createElement('br'), 'EXEC TYPE'
                  ]);
                } else {
                  return createElement('span', ['BBOOK执行类型',
                    createElement('br'), '(pips)'
                  ]);
                }
              },
              minWidth: 100,
              sortable: true,
              align: 'left',
              headerAlign: 'left',
              scopedSlot: 'bbook_exec_type'
            }
          }, {
            attr: {
              prop: 'attributes.lps',
              label: this.$t('LPS'),
              minWidth: 60,
              sortable: true,
              align: 'left',
              headerAlign: 'left',
              scopedSlot: 'lps'
            }
          }, {
            attr: {
              label: this.$t('OPERATION'),
              minWidth: 80,
              align: 'center',
              scopedSlot: 'handler'
            }
          }]
        }
      }
    },
    lp_option() {
      var result = [];
      for (var item of this.$store.state.global.lps) {
        result.push({
          label: item,
          value: false
        })
      }
      return result;
    },
    tradeRules_update_flag() {
      return this.$store.state.traderule.update_trade_rules_flag;
    }
  },
  methods: {
    editTradeRule(row) {
      if (this.$store.state.traderule.edit_trade_rule == true) {
        this.$message.warning('please close current edit dialog!');
        return;
      }
      console.log('row', row);
      var dict = {};
      dict.common = {
        source: row.source,
        group: row.group,
        std_symbol: row.std_symbol,
        mt4_symbol: row.mt4_symbol
      };
      dict.attributes = row.attributes;
      this.$store.dispatch('show_edit_trade_rule');
      this.$store.dispatch('update_edit_rules_dict', dict);
    },
    addTradeRule() {
      this.$store.dispatch('show_trade_rule');
    },
    onInvertSelect() {
      this.toggleSelection(this.tableData);
    },
    group_rules_edited() {

    },
    toggleSelection(rows) {
      if (rows) {
        console.log('22222');
        rows.forEach(row => {
          console.log('555', this.$refs.table);
          this.$refs.table.toggleRowSelection(row);
        });
      } else {
        this.$refs.table.clearSelection(row)
      }
    },
    onSelectionChange(val) {
      if (val.length) {
        this.batch_flag = false;
        this.batch_datas = val;
      } else {
        this.batch_flag = true;
      }
    },
    onBatchDelete() {
      var selected_rules, i, len, rule;
      selected_rules = [];
      this.$confirm('你确定删除吗', 'prompt', {
        type: 'warning'
      }).then(() => {
        console.log('this.batch_datas', this.batch_datas);
        for (i = 0, len = this.batch_datas.length; i < len; i++) {
          rule = this.batch_datas[i];
          selected_rules.push({
            source: rule.source,
            group: rule.group,
            mt4_symbol: rule.mt4_symbol
          });
        }
        this.$$api_common_ajax({
          data: {
            func_name: 'router_api.trade_del_rules',
            args: [selected_rules],
            kwargs: {}
          },
          fn: data => {
            this.load_data();
          }
        });
      })
    },
    onEditRules() {
      this.editFlag = true;
      console.log('this.columns', this.columns);
    },
    get_slippages(target) {
      var result = [];
      console.log('target', target);
      for (var option of target) {
        var group = [];
        for (var item of option) {
          group.push(parseFloat(item.value));
        }
        result.push(group);
      }
      return result;
    },
    get_lps(target) {
      var result = [];
      for (var item of target) {
        if (item.value == true) {
          result.push(item.label);
        }
      }
      return result;
    },
    get_limit_order_types(target) {
      var result = [];
      target.forEach((item, index) => {
        if (item.isChecked == true) {
          result.push({
            'type': index,
            'tol': item.value
          })
        }
      });
      return result;
    },
    get_attributes(row) {
      var result = {};
      result.better_fill = row.attributes.better_fill;
      result.close_threshold = row.attributes.close_threshold;
      result.open_threshold = row.attributes.open_threshold;
      result.open_probe = row.attributes.open_probe;
      result.route_type = row.attributes.route_type;
      result.markup = row.markup;
      result.slippages = this.get_slippages(row.attributes.slippages_res);
      result.lps = this.get_lps(row.attributes.lps);
      result.limit_order_types = this.get_limit_order_types(row.attributes.limit_order_types_res);
      result.open_partial = this.string_to_boolean(row.attributes.open_partial);
      result.open_lp_rejected_retry = this.string_to_boolean(row.attributes.open_lp_rejected_retry);
      result.coverage = parseInt(row.attributes.coverage);
      result.close_probe = row.attributes.close_probe;
      result.bbook_exec_type = row.attributes.bbook_exec_type;
      return result;
    },
    onSubmitChanges() {
      var args = [];
      for (var item of this.tableData) {
        args.push({
          source: item.source,
          group: item.group,
          mt4_symbol: item.mt4_symbol,
          std_symbol: item.std_symbol,
          attributes: this.get_attributes(item)
        })
      };
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.trade_add_rules',
          args: [args],
          kwargs: {}
        },
        fn: data => {
          this.load_data();
          this.editFlag = false;
        },
        errFn: (err) => {
          console.log(err);
          this.$message({
            showClose: true,
            message: err.response.data,
            type: 'error'
          });
        }
      });
    },
    delete_symbol(row, index) {
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.trade_del_rule',
          args: [row.source, row.group, row.mt4_symbol],
          kwargs: {}
        },
        fn: data => {
          this.load_data();

          this.editFlag = false;
        },
        errFn: (err) => {
          console.log(err);
          this.$message({
            showClose: true,
            message: err.response.data,
            type: 'error'
          });
        }
      });
    },
    limit_order_types_init() {
      for (var row of this.tableData) {
        var option = [{
          label: 'Instant',
          isChecked: false,
          value: ''
        }, {
          label: 'Market',
          isChecked: false,
          value: ''
        }, {
          label: 'Pending',
          isChecked: false,
          value: ''
        }, {
          label: 'Stopout',
          isChecked: false,
          value: ''
        }, {
          label: 'Stop Loss',
          isChecked: false,
          value: ''
        }, {
          label: 'Take Profit',
          isChecked: false,
          value: ''
        }];
        this.$set(row.attributes, "limit_order_types_res", option);
        if (row.attributes.limit_order_types == undefined) {
          continue;
        }
        for (var item of row.attributes.limit_order_types) {
          row.attributes.limit_order_types_res[item.type].isChecked = true;
          row.attributes.limit_order_types_res[item.type].value = item.tol;
        }
      }
    },
    slippages_init() {
      var desc_dict = ['>= size', 'Min Slippages', 'Max Slippages'];
      for (var row of this.tableData) {
        this.$set(row.attributes, "slippages_res", []);
        if (row.attributes.slippages == undefined) {
          continue;
        }
        for (var group of row.attributes.slippages) {
          var list = [];
          for (var i = 0; i < group.length; i++) {
            var item = group[i];
            list.push({
              value: item,
              desc: desc_dict[i]
            })
          }
          row.attributes.slippages_res.push(list);
        }
      }
    },
    lps_init() {
      var row, result, lp, row, item;
      for (row of this.tableData) {
        result = (() => {
          var result = [];
          for (item of this.$store.state.global.lps) {
            result.push({
              label: item,
              value: false
            })
          };
          return result;
        })();
        this.$set(row.attributes, "lps_res", result);
        console.log('lp_res', row.attributes.lps_res);
        for (lp of row.attributes.lps) {
          for (item of row.attributes.lps_res) {
            if (item.label == lp) {
              item.value = true;
              break;
            }
          }
        }
      }
    },
    addNewRow(row) {
      row.attributes.slippages_res.push([{
        value: '',
        desc: '>= size'
      }, {
        value: '',
        desc: 'Min Slippages'
      }, {
        value: '',
        desc: 'Max Slippages'
      }])
    },
    deleteRow(row, index) {
      row.attributes.slippages_res.splice(index, 1);
    },
    on_quote_rules_loaded(quote_rules) {
      var delta, slippage, delta_slippage, i, j, len, len1, quote_rule_dict, ref, rule;
      slippage = parseInt(this.default_slippage);
      delta_slippage = !isNaN(slippage) ? slippage : 0;
      quote_rule_dict = new Object;
      for (var rule of quote_rules) {
        if (rule.type === "delta") {
          quote_rule_dict[rule.mt4_symbol] = [rule.attributes.bid_delta, rule.attributes.ofr_delta];
        };
      };
      for (var rule of this.tableData) {
        delta = quote_rule_dict[rule.mt4_symbol];
        if (delta) {
          rule.attributes.slippages_res = [
            [{
              value: 0,
              desc: '>= size'
            }, {
              value: delta[0] + delta_slippage,
              desc: 'Min Slippages'
            }, {
              value: delta[0] + delta_slippage,
              desc: 'Max Slippages'
            }]
          ];
        } else {
          rule.attributes.slippages_res = [
            [{
              value: 0,
              desc: '>= size'
            }, {
              value: delta_slippage,
              desc: 'Min Slippages'
            }, {
              value: delta_slippage,
              desc: 'Max Slippages'
            }]
          ];
        }
      }
    },
    revert_slippage_to_quote_default() {
      if (this.editFlag == false) {
        return;
      }
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.quote_get_all_rules',
          args: [],
          kwargs: {}
        },
        fn: data => {
          this.on_quote_rules_loaded(data);
        }
      });
    },
    load_data() {
      this.tableData = [];
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.trade_get_all_rules',
          args: [],
          kwargs: {}
        },
        fn: data => {
          for (var rule of data) {
            var source = this.$route.query.source;
            var group = this.$route.query.group;
            if (rule.source === source && rule.group === group) {
              rule.source = source;
              rule.group = group;
              rule.attributes.open_partial = this.boolean_to_string(rule.attributes.open_partial);
              rule.attributes.open_lp_rejected_retry = this.boolean_to_string(rule.attributes.open_lp_rejected_retry);
              console.log('rule1234', rule);
              this.tableData.push(rule);
            }
          }
          this.limit_order_types_init();
          this.slippages_init();
          this.lps_init();
          console.log('tableData', this.tableData);
        }
      });
    }
  },
  mounted() {
    this.load_data();
  },
  beforeRouteLeave(to, from, next) {
    if (this.editFlag == true) {
      this.$confirm('尚未提交当前编辑的规则, 是否继续?', '提示', {
        confirmButtonText: '继续前往',
        cancelButtonText: '留下来',
        type: 'warning'
      }).then(() => {
        next();
      }).catch(() => {
        next(false);
      });
    }else{
      next();
    }
  },
  props: {

  },
  watch: {
    tradeRules_update_flag(v) {
      console.log('tradeRules_update_flag', v);
      if (v == true) {
        this.load_data();
        this.$store.dispatch('update_trade_rules_table', false);
      }
    }
  }

}