export default {
  name: 'profit-log',
  data() {
    return {
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
              border: false

            }
          },
          columns: [{
            attr: {
              prop: 'symbol',
              label: this.$t('SYMBOL'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              label: this.$t('ABOOK SIZE'),
              minWidth: 180,
              sortable: true,
              formatter(item) {
                return item.abook_size.toFixed(2);
              },
              align: 'center'
            }
          }, {
            attr: {
              label: this.$t('BBOOK SIZE'),
              minWidth: 180,
              sortable: true,
              formatter(item) {
                return item.bbook_size.toFixed(2);
              },
              align: 'center'
            }
          }, {
            attr: {
              label: this.$t('ABOOK PROFIT'),
              width: 180,
              sortable: true,
              formatter(item) {
                return item.bbook.toFixed(2);
              },
              align: 'center',
            }
          }, {
            attr: {
              prop: 'target',
              label: this.$t('BBOOK PROFIT'),
              width: 180,
              sortable: true,
              align: 'center',
              formatter(item) {
                return (item.spread + item.bbook).toFixed(2);
              },
              scopedSlot: 'status'
            }
          }, {
            attr: {
              label: this.$t('PROFIT'),
              minWidth: 180,
              sortable: true,
              formatter(item) {
                return (item.spread + item.bbook).toFixed(2);
              },
              align: 'center'
            }
          }]
        }
      }
    }
  },
  methods: {

    render_lp_table() {
      var kwargs = this.$store.state.profitlog.kwargs;
      // console.log('kwargs1', this.$route, kwargs);
      this.$$api_common_ajax({
        data: {
          func_name: 'trade_log.trade_profit',
          args: [],
          kwargs
        },
        fn: data => {
          for (var key in data) {
            var row = {};
            row["symbol"] = key;
            Object.assign(row, data[key]);
            console.log('row', row);
            this.tableData.push(row);
          };
          console.log('table', this.tableData);
        }
      });
    },
    init() {
      this.render_lp_table();
    }
  },
  mounted() {
    this.init();
  }
}