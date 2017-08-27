export default {
  name: 'current_order',
  data() {
    return {
      timer_interval_id: void 0,
      next_fresh_time: void 0,
      refresh_enable: 'true',
      data_loaded: true,
      remain_sec: 0,
      refresh_seconds: 5,
      isActive: true,
      deletePositionDialogVisible: false,
      addPositionDialogVisible: false,
      tradeLogDialogVisible: false,
      lp_orders: [],
      log_dicts:{},
      add_position: {
        show: false,
        title: {
          text: 'Add position',
        }
      },
      del_position: {
        show: false,
        title: {
          text: 'Delete position',
        }
      },
      nowTime: '',
      tableData: [],
      pagination: {
        current_page: 1,
        total: 0,
        page_size: 12,
        page_sizes: [3, 9, 12, 24],
        layout: "total, sizes, prev, pager, next, jumper"
      },
      keyValue: 1,
      form_dialog_show: true,
      page_func_name: 'router_api.page_positions',
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
                prop: 'order_id',
                order: 'descending'
              }
            }
          },
          columns: [{
            attr: {
              prop: 'source',
              label: this.$t('SOURCE'),
              minWidth: 80,
              // scopedSlot: 'date',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'order_id',
              label: this.$t('ORD ID'),
              minWidth: 60,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'trade_log.request.group',
              label: this.$t('GROUP'),
              minWidth: 120,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'trade_log.request.login',
              label: this.$t('CLIENT'),
              width: 80,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'std_symbol',
              label: this.$t('SYMBOL'),
              width: 80,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'status',
              label: this.$t('STATUS'),
              minWidth: 70,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'side',
              label: this.$t('SIDE'),
              minWidth: 60,
              align: 'center',
              formatter(item) {
                if (item.trade_log.request.settle == 0) {
                  if (item.trade_log.request.cmd == 0) {
                    return 'OB';
                  } else {
                    return 'OS';
                  }
                } else {
                  if (item.trade_log.request.cmd == 0) {
                    return 'SS';
                  } else {
                    return 'SB';
                  }
                };
              }
            }
          }, {
            attr: {
              prop: 'order_size',
              label: this.$t('ORDER SIZE'),
              minWidth: 80,
              align: 'center',
              renderHeader(createElement, {
                column
              }) {
                if (this.$store.state.global.locale == 'en-US') {
                  return createElement('div', [
                    'ORDER',
                    createElement('br'),
                    'SIZE'
                  ]);
                } else {
                  return createElement('div', [
                    '请求量/',
                    createElement('br'),
                    '执行量'
                  ]);
                }
              },
              formatter(item) {
                return item.quantity / item.trade_log.request.contract_size;
              }
            }
          }, {
            attr: {
              prop: 'bbook_size',
              label: this.$t('B BOOK SIZE'),
              minWidth: 100,
              align: 'center',
              formatter(item) {
                return item.bbook_quantity / item.trade_log.request.contract_size;
              }
            }
          }, {
            attr: {
              prop: 'trade_log.request.contract_size',
              label: this.$t('CON SIZE'),
              minWidth: 100,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'RSES',
              // label: this.$t('Req Size/Exec Size'),
              renderHeader(createElement, {
                column
              }) {
                if (this.$store.state.global.locale == 'en-US') {
                  return createElement('div', [
                    'REQ SIZE/',
                    createElement('br'),
                    'EXEC SIZE'
                  ]);
                } else {
                  return createElement('div', [
                    '请求量/',
                    createElement('br'),
                    '执行量'
                  ]);
                }
              },
              minWidth: 90,
              align: 'center',
              formatter(item) {
                return item.trade_log.request.size + '/' + item.trade_log.confirm.size;
              }
            }
          }, {
            attr: {
              prop: 'trade_log.confirm.price',
              label: this.$t('EXEC PRICE'),
              minWidth: 80,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'slippage',
              label: this.$t('SLIPPAGE'),
              minWidth: 50,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'trade_log.trade_rule.attributes.coverage',
              label: this.$t('COVERAGE'),
              minWidth: 80,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'lp_exec_orders',
              label: this.$t('LP EXEC ORDERS'),
              minWidth: 80,
              align: 'center',
              scopedSlot: 'lp_exec_orders'
            }
          }, {
            attr: {
              prop: 'cost',
              label: this.$t('COST'),
              minWidth: 80,
              align: 'center',
              formatter(item) {
                return parseInt((item.trade_log.end_time - item.trade_log.start_time) * 1000) + "ms";
              }
            }
          }, {
            attr: {
              prop: 'time',
              label: this.$t('TIME'),
              minWidth: 150,
              align: 'center',
              formatter(item) {
                return (new Date((item.trade_log.time + 8 * 3600) * 1000)).toISOString();
              }
            }
          }, {
            attr: {
              prop: 'done',
              label: this.$t('DONE'),
              minWidth: 50,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'operation',
              label: this.$t('DETAIL'),
              minWidth: 80,
              scopedSlot: 'detail',
              align: 'center'
            }
          }]
        }
      }
    }
  },
  methods: {
    show_add_position(){
      this.$store.dispatch("show_add_position");
    },
    show_delete_position(){
      this.$store.dispatch("show_delete_position");
    },
    interval_check() {
      var remain_mil_sec;
      if (this.isActive === false) {
        this.remain_sec = "-";
        return;
      };
      console.log('5555',this.next_fresh_time,this.data_loaded);
      if (this.next_fresh_time && !this.data_loaded) {
        remain_mil_sec = this.next_fresh_time - (new Date()).getTime();

        if (remain_mil_sec <= 0) {
          this.remain_sec = '0';
          this.load_data();
        } else {
          this.remain_sec = parseInt(remain_mil_sec * 0.001);
        }
      }

    },
    schedule_next_request() {
      this.next_fresh_time = (new Date()).getTime() + this.refresh_seconds * 1000;
      this.data_loaded = false;
      console.log('444',this.next_fresh_time,this.data_loaded);
    },
    auto_refresh_control() {
      this.isActive = !this.isActive;
      // if(this.isActive = false){}
    },
    //
    showLpOrdersTable(row){
        var param ={id:row.order_id,value:row.trade_log};
        this.$store.dispatch('update_lp_order_dicts',param);
    },

    onDetail(row) {
      var config = row.trade_log;
      var id = row.order_id;
      var title = {
        text: 'Trade Log' + row.order_id
      };
      var trade_log = {
        title,
        config,
        id
      };
      if (this.isDialogExist(this.trade_logs, row) == false) {
        this.trade_logs.push(trade_log);
      };
    },
    showTradeLog(row){
        this.tradeLogDialogVisible = true;
        this.log_dicts = row;
    },
    onCloseLpOrder(index) {
      this.lp_orders.splice(index, 1);
    },
    onChangeCurrentPage(page) {
      this.pagination.current_page = page;
      this.getCurrentPageTable();
    },
    onChangePageSize(page_size) {
      this.pagination.page_size = page_size;
      this.getCurrentPageTable();
    },
    getCurrentPageTable() {
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.page_positions',
          args: [this.pagination.current_page, this.pagination.page_size],
          kwargs: {}
        },
        fn: data => {
          this.tableData = data[0];
          this.pagination.total = data[1];
          this.schedule_next_request();
        },
        errFn: (err) => {
          // this.$message.error(err.msg);

        }
      });
    },
    load_data() {
      this.getCurrentPageTable();
    },
    init() {
      this.timer_interval_id = setInterval(() => {
        this.interval_check();
      }, 1000);
      this.load_data();
      this.nowTime = (new Date()).toGMTString();
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