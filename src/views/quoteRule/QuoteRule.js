export default {
  name: 'quote_rule',
  data() {
    return {
      tableData: [],
      // add_tableData:[{
      //   source:'',
      //   mt4_symbol:'',
      //   std_symbol:'',
      //   type:'raw',
      //   attributes:{
      //     digits:'',
      //     aggregator:'median',
      //     minimal_spread:'',
      //     maximal_spread:'',
      //     adjust:'',
      //     markup:'',
      //     bid_delta:'',
      //     ofr_delta:'',
      //     asian_delta:'',
      //     spread:'',
      //     random:'',

      //     }
      //   },{
      //   source:'',
      //   mt4_symbol:'',
      //   std_symbol:'',
      //   type:'raw',
      //   attributes:{
      //     digits:'',
      //     aggregator:'median',
      //     minimal_spread:'',
      //     maximal_spread:'',
      //     adjust:'',
      //     markup:'',
      //     bid_delta:'',
      //     ofr_delta:'',
      //     asian_delta:'',
      //     spread:'',
      //     random:'',

      //     }
      //   }],
      editDialogTableVisible: false,
      addDialogTableVisible: false,
      addDialog: {
        source: this.$store.state.global.sources[0],
        mt4_symbol: '',
        std_symbol: this.$store.state.global.std_symbols[0],
        type: 'raw',
        attributes: {
          digits: '',
          aggregator: 'median',
          minimal_spread: '',
          maximal_spread: '',
          adjust: '',
          markup: '',
          bid_delta: '',
          ofr_delta: '',
          asian_delta: '',
          spread: '',
          random: ''
        }
      },
      editDialog: {
        source: '',
        mt4_symbol: '',
        std_symbol: '',
        type: 'raw',
        attributes: {
          digits: '',
          aggregator: '',
          minimal_spread: '',
          maximal_spread: '',
          adjust: '',
          markup: '',
          bid_delta: '',
          ofr_delta: '',
          asian_delta: '',
          spread: '',
          random: ''
        }
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
              border: false,

              defaultSort: {
                prop: 'std_symbol'
              }
            }
          },
          columns: [{
            attr: {
              prop: 'source',
              label: this.$t('SOURCE'),
              minWidth: 100,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'mt4_symbol',
              label: this.$t('MT4 SYMBOL'),
              minWidth: 120,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'std_symbol',
              label: this.$t('STD SYMBOL'),
              minWidth: 120,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'type',
              label: this.$t('TYPE'),
              minWidth: 120,
              sortable: true,
              scopedSlot: 'type_attr',
              align: 'center'
            }
          }, {
            attr: {
              label: this.$t('DIGITS'),
              minWidth: 120,
              sortable: true,
              scopedSlot: 'digits_attr',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.bid_delta',
              label: this.$t('BID DELTA'),
              minWidth: 100,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.ofr_delta',
              label: this.$t('OFR DELTA'),
              minWidth: 100,
              sortable: true,
              scopedSlot: 'ofr_delta_attr',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.minimal_spread',
              label: this.$t('MIN SPREAD'),
              minWidth: 100,
              sortable: true,
              scopedSlot: 'min_spread_attr',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.maximal_spread',
              label: this.$t('MAX SPREAD'),
              minWidth: 100,
              sortable: true,
              scopedSlot: 'max_spread_attr',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.adjust',
              label: this.$t('ADJUST'),
              minWidth: 100,
              sortable: true,
              scopedSlot: 'adjust_attr',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.markup',
              label: this.$t('MARKUP'),
              minWidth: 100,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.aggregator',
              label: this.$t('AGGREGATOR'),
              minWidth: 100,
              sortable: true,
              scopedSlot: 'aggregator_attr',
              align: 'center'
            }
          }, {
            attr: {
              // prop: 'address',
              label: this.$t('OPERATION'),
              minWidth: 100,
              scopedSlot: 'handler',
              align: 'center'
            }
          }]
        }
      }
    },
    add_tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.add_tableData,
              maxHeight: '100%',
              border: false,

              defaultSort: {
                prop: 'std_symbol'
              }
            }
          },
          columns: [{
            attr: {
              prop: 'source',
              label: this.$t('SOURCE'),
              minWidth: 90,
              sortable: true,
              align: 'center',
              scopedSlot: 'source'
            }
          }, {
            attr: {
              prop: 'mt4_symbol',
              label: this.$t('MT4 SYMBOL'),
              minWidth: 120,
              sortable: true,
              align: 'center',
              scopedSlot: 'mt4_symbol'
            }
          }, {
            attr: {
              prop: 'std_symbol',
              label: this.$t('STD SYMBOL'),
              minWidth: 120,
              sortable: true,
              align: 'center',
              scopedSlot: 'std_symbol'
            }
          }, {
            attr: {
              prop: 'type',
              label: this.$t('TYPE'),
              minWidth: 100,
              sortable: true,
              scopedSlot: 'type_attr',
              align: 'center'
            }
          }, {
            attr: {
              label: this.$t('DIGITS'),
              minWidth: 80,
              sortable: true,
              scopedSlot: 'digits_attr',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.minimal_spread',
              label: this.$t('MIN SPREAD'),
              minWidth: 110,
              sortable: true,
              scopedSlot: 'min_spread_attr',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.maximal_spread',
              label: this.$t('MAX SPREAD'),
              minWidth: 120,
              sortable: true,
              scopedSlot: 'max_spread_attr',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.adjust',
              label: this.$t('ADJUST'),
              minWidth: 100,
              sortable: true,
              scopedSlot: 'adjust_attr',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.markup',
              label: this.$t('MARKUP'),
              minWidth: 100,
              sortable: true,
              scopedSlot: 'adjust_attr',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.aggregator',
              label: this.$t('AGGREGATOR'),
              minWidth: 120,
              sortable: true,
              scopedSlot: 'aggregator_attr',
              align: 'center'
            }
          }]
        }
      }
    }
  },
  methods: {
    showAddQuoteRule() {
      this.$store.dispatch('show_add_quoteRule_table');

    },
    add_quoteRule_submit() {
      var attributes = {
        digits: parseInt(this.addDialog.attributes.digits),
        minimal_spread: parseInt(this.addDialog.attributes.minimal_spread),
        maximal_spread: parseInt(this.addDialog.attributes.maximal_spread),
        aggregator: this.addDialog.attributes.aggregator,
        adjust: parseInt(this.addDialog.attributes.adjust),
        markup: parseInt(this.addDialog.attributes.markup),
      }
      console.log('attr', attributes);
      if (this.editDialog.type == 'delta') {
        Object.assign(attributes, {
          bid_delta: parseInt(this.addDialog.attributes.bid_delta),
          ofr_delta: parseInt(this.addDialog.attributes.ofr_delta),
          random: parseInt(this.addDialog.attributes.random)
        });
      } else if (this.addDialog.type == 'asian') {
        Object.assign(attributes, {
          asian_delta: parseInt(this.addDialog.attributes.asian_delta),
          random: parseInt(this.addDialog.attributes.random)
        });
      } else if (this.addDialog.type == 'spread') {
        Object.assign(attributes, {
          spread: parseInt(this.addDialog.attributes.spread),
          random: parseInt(this.addDialog.attributes.random)
        });
      }
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.quote_add_rule',
          args: [this.addDialog.source, this.addDialog.mt4_symbol, this.addDialog.std_symbol, this.addDialog.type, attributes],
          kwargs: {}
        },
        fn: data => {
          this.load_data();
          this.addDialogTableVisible = false;
        }
      });
    },
    edit_quote_rule(row) {
      this.editDialogTableVisible = true;
      Object.assign(this.editDialog, row);
    },
    edit_quoteRule_submit() {
      var attributes = {
        digits: parseInt(this.editDialog.attributes.digits),
        minimal_spread: parseInt(this.editDialog.attributes.minimal_spread),
        maximal_spread: parseInt(this.editDialog.attributes.maximal_spread),
        aggregator: this.editDialog.attributes.aggregator,
        adjust: parseInt(this.editDialog.attributes.adjust),
        markup: parseInt(this.editDialog.attributes.markup),
      }
      console.log('attr', attributes);
      if (this.editDialog.type == 'delta') {
        Object.assign(attributes, {
          bid_delta: parseInt(this.editDialog.attributes.bid_delta),
          ofr_delta: parseInt(this.editDialog.attributes.ofr_delta),
          random: parseInt(this.editDialog.attributes.random)
        });
      } else if (this.editDialog.type == 'asian') {
        Object.assign(attributes, {
          asian_delta: parseInt(this.editDialog.attributes.asian_delta),
          random: parseInt(this.editDialog.attributes.random)
        });
      } else if (this.editDialog.type == 'spread') {
        Object.assign(attributes, {
          spread: parseInt(this.editDialog.attributes.spread),
          random: parseInt(this.editDialog.attributes.random)
        });
      }
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.quote_update_rule',
          args: [this.editDialog.source, this.editDialog.mt4_symbol, this.editDialog.std_symbol, this.editDialog.type, attributes],
          kwargs: {}
        },
        fn: data => {
          this.load_data();
          this.editDialogTableVisible = false;
        }
      });
    },
    delete_quote_rule(row, index) {
      console.log('index', index);
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.quote_del_rule',
          args: [row.source, row.mt4_symbol],
          kwargs: {}
        },
        fn: data => {
          this.load_data();
          row.visible = false;
        }
      });
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
          for (var item of data) {
            item.visible = false;
            switch (item.type) {
              case 'delta':
                item.hoverContent = [{
                  label: 'bid_delta',
                  value: item.attributes.bid_delta || 'null'
                }, {
                  label: 'ofr_delta',
                  value: item.attributes.ofr_delta || 'null'
                }, {
                  label: 'random',
                  value: item.attributes.random || 'null'
                }];
                break;
              case 'asian':
                item.hoverContent = [{
                  label: 'asian_delta',
                  value: item.attributes.asian_delta || 'null'
                }, {
                  label: 'random',
                  value: item.attributes.random || 'null'
                }];
              case 'spread':
                item.hoverContent = [{
                  label: 'spread',
                  value: item.attributes.spread || 'null'
                }, {
                  label: 'random',
                  value: item.attributes.random || 'null'
                }];
            }
          };
          this.tableData = data;
          console.log('QuoteRule', this.tableData);
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