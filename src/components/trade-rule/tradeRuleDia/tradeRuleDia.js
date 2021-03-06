export default {
  name: 'tradeRule-dia',
  data() {
    return {
      source: this.Common.source || this.$store.state.global.sources[0],
      group: this.Common.group || '',
      mt4_symbol: this.Common.mt4_symbol || '',
      std_symbol: this.Common.std_symbol || this.$store.state.global.std_symbols[0],
      route_type: this.Attributes.route_type || {
        threshold: '0',
        left: 'ratio',
        right: 'bestright',
      },
      coverage: this.Attributes.coverage || '',
      better_fill: this.Attributes.better_fill || '',
      open_threshold: this.Attributes.open_threshold || '',
      open_probe: this.Attributes.open_probe || '',
      close_probe: this.Attributes.close_probe || '',
      close_threshold: this.Attributes.close_threshold || '',
      markup: this.Attributes.markup || '',
      open_partial: this.Attributes.open_partial || 'true',
      open_lp_rejected_retry: this.Attributes.open_lp_rejected_retry || 'true',
      bbook_exec_type: this.Attributes.bbook_exec_type || 'worst',
      limit_order_types_options: [{
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
      }],
      route_type_select_options: ['best', 'bestright', 'second', 'ratio'],
      bbook_exec_type_options: ['worst', 'vwap'],
      lps_options: (() => {
        var result = [];
        for (var item of this.$store.state.global.lps) {
          result.push({
            label: item,
            value: false
          })
        }
        return result;
      })(),
      slippages_options: []
    }
  },
  computed: {
    limit_order_types_res() {
      var result = [];
      this.limit_order_types_options.forEach((item, index) => {
        if (item.isChecked == true) {
          result.push({
            'type': index,
            'tol': item.value == '' ? 0 : parseInt(item.value)
          })
        }
      });
      console.log('123');
      return result;
    },
    lps_res() {
      var result = [];
      for (var item of this.lps_options) {
        if (item.value == true) {
          result.push(item.label);
        }
      }
      return result;
    },
    slippages_res() {
      var result = [];
      for (var option of this.slippages_options) {
        var group = [];
        for (var item of option) {
          group.push(parseFloat(item.value));
        }
        result.push(group);
      }
      return result;
    }
  },
  props: {
    Attributes: {
      type: Object,
      default () {
        return {};
      }
    },
    Common: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  watch: {
    Attributes: {
      deep: true,
      handler(v) {
        if (v) {
          console.log('v', v);
        }
      }
    },
  },
  methods: {
    initObj() {
      this.limit_order_types_init();
      // this.lps_init();
      this.slippages_init();
    },
    limit_order_types_init() {
      if (this.Attributes.limit_order_types !== undefined) {
        for (var item of this.Attributes.limit_order_types) {
          var index = item.type;
          var value = item.tol;
          this.limit_order_types_options[index].isChecked = true;
          this.limit_order_types_options[index].value = value;
        };
      }
    },
    lps_init() {
      if (this.Attributes.lps !== undefined) {
        for (var item of this.lps_options) {
          for (var lp of this.Attributes.lps) {
            if (lp === item.label) {
              item.value = true;
              break;
            }
          }
        }
      }
    },
    slippages_init() {
      if (this.Attributes.slippages !== undefined) {
        var desc_dict = ['>= size', 'Min Slippages', 'Max Slippages'];
        for (var group of this.Attributes.slippages) {
          var row = [];
          for (var i = 0; i < group.length; i++) {
            var item = group[i];
            row.push({
              value: item,
              desc: desc_dict[i]
            })
          }
          this.slippages_options.push(row);
        }
      }
    },
    addNewRow() {
      this.slippages_options.push([{
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
    deleteRow(index) {
      this.slippages_options.splice(index, 1);
    },
    get_trade_rule_attrs() {
      var result = {};
      console.log('better_fill', this.better_fill);
      result.route_type = this.route_type;
      result.coverage = parseInt(this.coverage);
      result.better_fill = parseInt(this.better_fill);
      result.open_partial = this.string_to_boolean(this.open_partial);
      result.open_lp_rejected_retry = this.string_to_boolean(this.open_lp_rejected_retry);
      result.open_threshold = parseInt(this.open_threshold);
      result.open_probe = parseInt(this.open_probe);
      result.close_threshold = parseInt(this.close_threshold);
      result.close_probe = parseInt(this.close_probe);
      result.markup = parseInt(this.markup);
      result.limit_order_types = this.limit_order_types_res;
      result.lps = this.lps_res;
      result.bbook_exec_type = this.bbook_exec_type;
      result.slippages = this.slippages_res;
      return result;
    },
    check_trade_rule_attrs(attr) {
      var i, is_int, is_number, j, len, len1, max_slippage, min_size, min_slippage, o, ref, ref1, ref2;
      is_int = function(n) {
        return Number(n) === n && n % 1 === 0;
      };
      is_number = function(n) {
        return Number(n) === n;
      };
      if (!(is_number(attr.open_threshold)) || !(is_number(attr.close_threshold)) || !(is_number(attr.open_probe)) || !(is_number(attr.close_probe))) {
        this.$message.error("All values should be number");
        return false;
      }
      if (attr.open_threshold < 0 || attr.open_probe < 0 || attr.close_threshold < 0 || attr.close_probe < 0 || attr.markup < 0) {
        this.$message.error("threshold, open probe, close probe, markup should bigger or equal to 0");
        return false;
      }
      if (!(is_int(attr.coverage))) {
        this.$message.error("Coverage should be an interger");
        return false;
      }
      if (attr.coverage > 100 || attr.coverage < 0) {
        this.$message.error("Coverage should between 0 and 100");
        return false;
      }
      ref = attr.limit_order_types;
      for (i = 0, len = ref.length; i < len; i++) {
        o = ref[i];
        if (!(is_int(o.tol))) {
          this.$message.error("tolerate percentage should be a integer");
          return false;
        }
      }
      ref1 = attr.slippages;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        ref2 = ref1[j], min_size = ref2[0], min_slippage = ref2[1], max_slippage = ref2[2];
        if (isNaN(min_size)) {
          this.$message.error("Min size should be a numebr");
          return false;
        }
        if (!(is_int(min_slippage)) || !(is_int(max_slippage))) {
          this.$message.error("Max sllipage and min sllipage should be integer");
          return false;
        }
        if (min_size < 0 || min_slippage < 0 || max_slippage < 0) {
          this.$message.error("Min size should greater than 0");
          return false;
        }
        if (min_slippage > max_slippage) {
          this.$message.error("Max size should greater or equal with min size");
          return false;
        }
      }
      attr.slippages.sort(function(a, b) {
        return a[0] - b[0];
      });
      return true;
    },
    submit() {
      var attrs = this.get_trade_rule_attrs();
      console.log('attrs', attrs, this.check_trade_rule_attrs(attrs));
      if (this.check_trade_rule_attrs(attrs) == false) {
        return;
      }
      var args = [this.source, this.group, this.mt4_symbol, this.std_symbol, attrs];
      console.log('check_trade_rule_attrs', this.check_trade_rule_attrs(attrs), args);
      this.$emit('submit', args);
    }
  },
  mounted() {
    this.initObj();
    console.log('123', this.limit_order_types_set);
  }
}