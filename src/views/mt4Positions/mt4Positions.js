export default {
  name: 'trade_log',
  data() {
    return {
      trade_rules: {},
      trade_rule_dict: {},
      tableData: []
    }
  },
  computed: {
    tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.tableData,
              maxHeight: '100%'
            }
          },
          columns: [{
            attr: {
              prop: 'std_symbol',
              label: this.$t('SYMBOL'),
              align: 'center',
            }
          }, {
            attr: {
              prop: 'net_vol',
              label: this.$t('NET VOL'),
              align: 'center',
            }
          }]
        }
      }
    }
  },
  methods: {
    init() {
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.trade_get_all_rules',
          args: [],
          kwargs: {}
        },
        fn: data => {
          this.on_trade_rules_loaded(data);
        },
        errFn: (err) => {}
      });
    },
    on_trade_rules_loaded(trade_rules) {
      var i, len, rule;
      this.trade_rules = trade_rules;
      for (i = 0, len = trade_rules.length; i < len; i++) {
        rule = trade_rules[i];
        this.trade_rule_dict[[rule.mt4_symbol, rule.group]] = rule.std_symbol;
      };
      console.log('rules');
      this.request_mt4_positions();
    },
    request_mt4_positions() {
      this.$$api_common_ajax({
        data: {
          func_name: 'mt4.get_group_positions',
          args: [],
          kwargs: {}
        },
        fn: data => {
          this.on_mt4_positions_loaded(data);
        },
        errFn: (err) => {}
      });
    },
    on_mt4_positions_loaded(rows) {
      var i, len, net_vol, row, std_symbol, std_symbol_vol;
      this.tableData = [];
      std_symbol_vol = new Object;
      for (i = 0, len = rows.length; i < len; i++) {
        row = rows[i];
        std_symbol = this.trade_rule_dict[[row.symbol, row.group]];
        if (std_symbol) {
          if (std_symbol_vol[std_symbol] === void 0) {
            std_symbol_vol[std_symbol] = 0;
          }
          std_symbol_vol[std_symbol] += row.net_vol;
        }
      };
      for (std_symbol in std_symbol_vol) {
        row.std_symbol = std_symbol;
        row.net_vol = std_symbol_vol[std_symbol];
        this.tableData.push(row);
      }
      console.log('tableData', this.tableData);
    },
    array_compare(arr1, arr2) {
      var arr1Str, arr2Str;
      if (arr1.length !== arr2.length) {
        return false;
      }
      arr1Str = arr1.slice().sort().join(",");
      arr2Str = arr2.slice().sort().join(",");
      if (arr1Str !== arr2Str) {
        return false;
      }
      return true;
    },
    request(count) {
      // this.$store.dispatch('update_mt4_positions_count', count);
      this.$$api_common_ajax({
        data: {
          func_name: 'check.get_mt4_bridge_diff_position_fast',
          args: [],
          kwargs: {}
        },
        fn: data => {
          this.result_handle(count, result);
        },
        errFn: (err) => {}
      });
    },
    request_after(count) {
      setTimeout(request(count), 5000);
    },
    show(result) {
      // this.$store.dispatch('hide_mt4_positions_loading');
      // this.$store.dispatch('update_mt4_positions_result', result);
    },
    result_handle(count, result) {
      var last_except_orders, ok, prev_bridge_orders, check_times, show;

      check_times = 3;
      prev_bridge_orders = [];
      last_except_orders = result.except_bridge_orders;
      if (last_except_orders.length === 0) {
        show(result);
        return;
      }
      ok = this.array_compare(prev_bridge_orders, last_except_orders);
      prev_bridge_orders = last_except_orders;
      if (count === 0) {
        this.request_after(count + 1);
      } else if (count === check_times - 1) {
        if (ok) {

        } else {
          this.request_after(0);
        }
      } else {
        if (ok) {
          this.request_after(count + 1);
        } else {
          this.request_after(0);
        }
      }
    },
    check_bridge_mt4_diff() {
      this.$store.dispatch('show_mt4_positions');
      // this.$store.dispatch('show_mt4_positions_loading');
      this.request(0);
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