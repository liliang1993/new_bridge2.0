export default {
  name: 'lp',
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
              border: false,
              defaultSort: {
                prop: 'std_symbol'
              }
            }
          },
          columns: [{
            attr: {
              prop: 'lp',
              label: this.$t('LP'),
              minWidth: 100,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'type',
              label: this.$t('TYPE'),
              minWidth: 100,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'username',
              label: this.$t('USERNAME'),
              minWidth: 100,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'sender',
              label: this.$t('SENDER'),
              minWidth: 100,
              sortable: true,
              align: 'center',
            }
          }, {
            attr: {
              prop: 'target',
              label: this.$t('TARGET'),
              minWidth: 100,
              sortable: true,
              align: 'center',
              scopedSlot: 'status'
            }
          }, {
            attr: {
              prop: 'host',
              label: this.$t('HOST'),
              minWidth: 150,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'debug',
              label: this.$t('DEBUG'),
              minWidth: 180,
              sortable: true,
              align: 'center',
              formatter: function(item) {
                return item.debug == false ? 'false' : 'true'
              }
            }
          }]
        }
      }
    }
  },
  methods: {
    render_lp_table() {
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.lp_host_get_all_conf',
          args: [],
          kwargs: {}
        },
        fn: data => {
          this.tableData = data;
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