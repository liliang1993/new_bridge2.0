export default {
  name: 'quote_rule',
  data() {
    return {
      add_rule_dialog: {
        show: false,
        isModal: true,
        title: {
          text: this.$t('Add rule'),
        },
        fields: [{
          key: 'source',
          type: 'select',
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
          })(),
          desc: '请选择',
          label: this.$t('source')
        }, {
          key: 'mt4_symbol',
          type: 'input',
          value: '',
          label: this.$t('MT4 Symbol')
        }, {
          key: 'std_symbol',
          type: 'select',
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
          })(),
          desc: '请选择',
          label: this.$t('STD Symbol')
        }, {
          type: 'input',
          key: 'digits',
          value: '',
          label: this.$t('digits')
        }, {
          type: 'input',
          key: 'minimal_spread',
          value: '',
          label: this.$t('min spread')
        }, {
          type: 'input',
          key: 'maximal_spread',
          value: '',
          label: this.$t('max spread')
        }, {
          key: 'aggregator',
          type: 'select',
          list: [{
            value: 'median',
            text: 'median'
          }, {
            value: 'bestright',
            text: 'bestright'
          }, {
            value: 'bestright-option',
            text: 'bestright-option'
          }],
          desc: '请选择',
          label: 'aggregator'
        }, {
          type: 'number',
          key: 'adjust',
          value: '',
          label: 'adjust'
        }, {
          key: 'type',
          type: 'select',
          list: (() => {
            var i, len, results;
            results = [];
            var quote_types = this.$store.state.global.quote_types;
            for (i = 0, len = quote_types.length; i < len; i++) {
              var quote_type = quote_types[i];
              results.push({
                value: quote_type,
                text: quote_type
              });
            }
            console.log('1111', results);
            return results;
          })(),
          desc: '请选择',
          label: this.$t('type')
        }],
        default_value: {
          source: this.$store.state.global.sources[0],
          mt4_symbol: '',
          std_symbol: this.$store.state.global.std_symbols[0],
          digits: '',
          minimal_spread: '',
          maximal_spread: '',
          aggregator: 'median',
          adjust: '',
          type: this.$store.state.global.quote_types[0]
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
              prop: 'source',
              label: this.$t('source'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'mt4_symbol',
              label: this.$t('MT4 symbol'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'std_symbol',
              label: this.$t('STD symbol'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'type',
              label: this.$t('type'),
              width: 100,
              sortable: true,
              scopedSlot: 'type_attr',
              align: 'center'
            }
          }, {
            attr: {
              label: this.$t('Digits'),
              width: 100,
              sortable: true,
              scopedSlot: 'digits_attr',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.bid_delta',
              label: this.$t('Bid Delta'),
              minWidth: 120,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.ofr_delta',
              label: this.$t('Ofr Delta'),
              minWidth: 120,
              sortable: true,
              scopedSlot: 'ofr_delta_attr',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.minimal_spread',
              label: this.$t('Min Spread'),
              minWidth: 120,
              sortable: true,
              scopedSlot: 'min_spread_attr',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.maximal_spread',
              label: this.$t('Max Spread'),
              minWidth: 120,
              sortable: true,
              scopedSlot: 'max_spread_attr',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.adjust',
              label: this.$t('Adjust'),
              minWidth: 120,
              sortable: true,
              scopedSlot: 'adjust_attr',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.aggregator',
              label: this.$t('Aggregator'),
              minWidth: 120,
              sortable: true,
              scopedSlot: 'aggregator_attr',
              align: 'center'
            }
          }, {
            attr: {
              // prop: 'address',
              label: this.$t('Operation'),
              minWidth: 120,
              scopedSlot: 'handler',
              align: 'center'
            }
          }]
        }
      }
    }
  },
  methods: {
    onCloseRuleDialog() {
      this.add_rule_dialog.show = false;
    },
    onAddRule() {
      this.add_rule_dialog.show = true;
    },

    add_rule_submit(data) {
      var attributes = {
        digits: parseInt(data.digits),
        minimal_spread: parseInt(data.minimal_spread),
        maximal_spread: parseInt(data.maximal_spread),
        aggregator: data.aggregator,
        adjust: parseInt(data.adjust)
      }
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.quote_add_rule',
          args: [data.source, data.mt4_symbol, data.std_symbol, data.type, attributes],
          kwargs: {}
        },
        fn: data => {
          this.load_data();
          this.onCloseRuleDialog();
        }
      });
    },
    onEditRule(row) {
      this.$set(row, 'editFlag', true);
    },
    edit_rule_submit(row) {
      console.log('row', row);
      var attributes = {
        digits: parseInt(row.attributes.digits),
        minimal_spread: parseInt(row.attributes.minimal_spread),
        maximal_spread: parseInt(row.attributes.maximal_spread),
        aggregator: row.attributes.aggregator,
        adjust: parseInt(row.attributes.adjust)
      }
      console.log('attr', attributes);
      if (row.type == 'delta') {
        Object.assign(attributes, {
          bid_delta: row.attributes.bid_delta,
          ofr_delta: row.attributes.ofr_delta,
          random: row.attributes.random
        });
      } else if (row.type == 'asian') {
        Object.assign(attributes, {
          asian_delta: row.attributes.asian_delta,
          random: row.attributes.random
        });
      } else if (row.type == 'spread') {
        Object.assign(attributes, {
          spread_delta: row.attributes.spread_delta,
          random: row.attributes.random
        });
      }
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.quote_update_rule',
          args: [row.source, row.mt4_symbol, row.std_symbol, row.type, attributes],
          kwargs: {}
        },
        fn: data => {
          this.$set(row, 'editFlag', false);
        }
      });
    },
    onDeleteQutoeRule(row, index) {
      this.$confirm('Are you sure you want to detele this?', 'prompt', {
        type: 'warning'
      }).then(() => {
        this.$$api_common_ajax({
          data: {
            func_name: 'router_api.quote_del_rule',
            args: [row.source, row.mt4_symbol],
            kwargs: {}
          },
          fn: data => {
            console.log('index', index);
            this.tableData.splice(index, 1);
          }
        });
      })
    },
    load_data() {
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.quote_get_all_rules',
          args: [],
          kwargs: {}
        },
        fn: data => {
          console.log('555', data);
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