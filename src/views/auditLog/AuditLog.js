export default {
  name: 'audit_log',
  data() {
    return {
      tableData: [],
      pagination: {
        current_page: 1,
        total: 0,
        page_size: 12,
        page_sizes: [3, 9, 12, 24],
        layout: "total, sizes, prev, pager, next, jumper"
      },
      dialogTableVisible: false,
      dialog: {
        log_id: '',
        username: '',
        api: '',
        request: '',
        result: ''
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
                prop: 'lp'
              }
            }
          },
          columns: [{
            attr: {
              prop: 'log_id',
              label: this.$t('LOG_ID'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'username',
              label: this.$t('USERNAME'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'api',
              label: this.$t('API'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'request',
              label: this.$t('REQUEST'),
              width: 290,
              sortable: true,
              align: 'left',
              showOverflowTooltip: false,
              scopedSlot: 'request'
            }
          }, {
            attr: {
              prop: 'result',
              label: this.$t('RESULT'),
              width: 180,
              sortable: true,
              showOverflowTooltip: false,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'status',
              label: this.$t('STATUS'),
              width: 180,
              sortable: true,
              align: 'center',
              scopedSlot: 'status'
            }
          }, {
            attr: {
              prop: 'remote_ip',
              label: this.$t('IP'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'create_time',
              label: this.$t('TIME'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }]
        }
      }
    }
  },
  methods: {
    /*
     */
    openDetailDialog(row) {
      this.dialogTableVisible = true;
      console.log('row', row);
      Object.assign(this.dialog, row);
      this.dialog.request = JSON.parse(this.dialog.request);
      console.log('123', this.dialog);
    },
    onChangeCurrentPage(page) {
      this.pagination.current_page = page;
      this.find_page_aduitLog();
    },
    onChangePageSize(page_size) {
      this.pagination.page_size = page_size;
      this.find_page_aduitLog();
    },
    find_page_aduitLog() {
      this.$$api_common_ajax({
        data: {
          func_name: 'audit_log.page_log',
          args: [this.pagination.current_page, this.pagination.page_size],
          kwargs: {}
        },
        fn: data => {
          this.tableData = data[0];
          this.pagination.total = data[1];
        },
        errFn: (err) => {
          this.$message.error(err.msg);
        }
      });
    },

    init() {
      this.find_page_aduitLog();
      this.nowTime = (new Date()).toGMTString();
    }

  },
  mounted() {
    this.init();
  }
}