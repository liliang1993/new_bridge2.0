export default {
    name: 'audit_log',
        data () {
      return {
        nowTime: '',
        tableData: [],
        pagination: {
                current_page: 1,
                total: 0,
                page_size: 12,
                page_sizes: [3, 9, 12, 24],
                layout: "total, sizes, prev, pager, next, jumper"
            },
        page_func_name: 'audit_log.page_log'
      }
    },
    computed: {
      tableConfig: {
        get () {
          return {
            table: {
              attr: {
                data: this.tableData,
                maxHeight: '100%',
                defaultSort:{prop: 'std_symbol'}
              }
            },
            columns: [
              {
                attr: {
                  prop: 'log_id',
                  label: this.$t('log_id'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'username',
                  label: this.$t('username'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'api',
                  label:  this.$t('api'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'request',
                  label: this.$t('request'),
                  width: 180,
                  sortable: true,
                  align: 'center',
                }
              },{
                attr: {
                  prop: 'status',
                  label: this.$t('status'),
                  width: 180,
                  sortable: true,
                  align: 'center',
                  scopedSlot: 'status'
                }
              },{
                attr: {
                  prop: 'remote_ip',
                  label: this.$t('ip'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'create_time',
                  label: this.$t('time'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center'
                }
              }
            ]
          }
        }
      }
    },
    methods: {
    /*
    */
    onChangeCurrentPage(page){
        this.pagination.current_page = page;
        this.find_page_aduitLog();
    },
    onChangePageSize(page_size){
        this.pagination.page_size = page_size;
        this.find_page_aduitLog();
    },
    find_page_aduitLog(){
      this.$$api_common_ajax({
        data: {
          func_name:'audit_log.page_log',
          args:[this.pagination.current_page,this.pagination.page_size],
          kwargs:{}
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

        init(){
            this.find_page_aduitLog();
            this.nowTime=(new Date()).toGMTString();
        }

    },
    mounted() {
        this.init();
    }
}
