export default {
  name: 'trade_log',
  data() {
    return {
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
    }
  },
  mounted() {
    this.init();
  }
}