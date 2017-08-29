export default {
  name: 'lp-order',
  data() {
    return {
      lp_order: this.LPOrder,
      digits: 0,
      tableData: [],
      apis: {
        func_name: 'audit_log.page_log',
        get_list: '$$getUserListPage'
      }
    }
  },
  props: {
    LPOrder: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    // LPOrder(v){
    //   if(v){ 

    //   }
    // }
    LPOrder: {
      deep: true,
      handler(v) {
        console.log('v', v);
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
              prop: 'lp',
              label: this.$t('LP'),
              minWidth: 70,
              align: 'left',
              headerAlign: 'left'
            }
          }, {
            attr: {
              prop: 'order_id',
              label: 'ORDID',
              minWidth: 130,
              align: 'left',
              headerAlign: 'left'
            }
          }, {
            attr: {
              prop: 'exec_price',
              label: 'EXEC PRICE',
              minWidth: 100,
              align: 'left',
              headerAlign: 'left'
            }
          }, {
            attr: {
              prop: 'exec_qty',
              label: 'EXEC QTY',
              minWidth: 80,
              align: 'left',
              headerAlign: 'left'
            }
          }, {
            attr: {
              prop: 'bid_size',
              label: 'BID SIZE',
              width: 80,
              align: 'left',
              headerAlign: 'left'
            }
          }, {
            attr: {
              prop: 'bid_price',
              label: 'BID',
              width: 70,
              align: 'left',
              headerAlign: 'left',
              scopedSlot: 'status'
            }
          }, {
            attr: {
              prop: 'price_diff',
              label: '!',
              minWidth: 50,
              align: 'left',
              headerAlign: 'left',
            }
          }, {
            attr: {
              prop: 'ofr_price',
              label: 'ASK',
              minWidth: 70,
              align: 'left',
              headerAlign: 'left'
            }
          }, {
            attr: {
              prop: 'ofr_size',
              label: 'ASK SIZE',
              minWidth: 80,
              align: 'left',
              headerAlign: 'left'
            }
          }, {
            attr: {
              prop: 'lp_slippage',
              label: 'LP Slippage ',
              minWidth: 100,
              align: 'left',
              headerAlign: 'left'
            }
          }, {
            attr: {
              prop: 'client_slippage',
              label: 'CLIENT SLIPPAGE',
              minWidth: 135,
              align: 'left',
              headerAlign: 'left'
            }
          }, {
            attr: {
              prop: 'exec_time',
              label: 'EXEC TIME',
              minWidth: 90,
              align: 'left',
              headerAlign: 'left'
            }
          }, {
            attr: {
              prop: 'status',
              label: 'status',
              minWidth: 60,
              align: 'left',
              headerAlign: 'left'
            }
          }]
        }
      }
    }
  },
  methods: {
    order_id_sort(a, b) {
      var a_id = this.order_format(a.order_id);
      var b_id = this.order_format(b.order_id);
      if (a_id !== b_id) {
        return a_id > b_id ? 1 : -1;
      } else {
        return a.exec_time > b.exec_time ? 1 : -1;
      }
    },
    render_row(order, lp, ord_price, ord_qty, ord_status, lp_slippage, client_spread) {
      var opts = {
        lp: order.lp,
        order_id: order.order_id,
        exec_price: this.num_format(ord_price, this.digits),
        exec_qty: this.num_format(ord_qty, 0),
        bid_size: this.num_format(lp.bid_size * order.lp_contract_size, 0),
        bid_price: this.num_format(lp.bid_price, this.digits),
        price_diff: this.num_format(lp.ofr_price - lp.bid_price, this.digits),
        ofr_price: this.num_format(lp.ofr_price, this.digits),
        ofr_size: this.num_format(lp.ofr_size * order.lp_contract_size, 0),
        lp_slippage: this.num_format(lp_slippage, this.digits),
        client_slippage: this.num_format(client_spread, this.digits),
        exec_time: this.num_format(order.exec_time - order.req_time, 3),
        status: ord_status
      }
      this.tableData.push(opts);
    }
  },
  mounted() {
    console.log('yijinggaibian');
    // this.lp_order = v;
    var r = this.lp_order;
    console.log('lp_order',this.lp_order);
    var reqprice = r.request.price;
    var lp_quote_dict = this.get_lp_quote_dict(r.lp_quote || {
            "bid": [],
            "ofr": []
          });
    r.orders.sort(this.order_id_sort);
    var traded_lps = {};
    this.digits = r.request.digits;
    this.tableData = [];
    for (var order of r.orders) {
      var lp = lp_quote_dict[order.lp] || {};
      traded_lps[order.lp] = true;

      var ord_status = order.exec_report ? order.exec_report.ord_status : order.state
      var ord_price = order.exec_report ? order.exec_report.last_px : '-'
      var ord_qty = order.exec_report ? order.exec_report.last_qty * order.lp_contract_size : '-'
      if (order.side == "buy") {
        var client_spread = ord_price - reqprice
        var lp_slippage = ord_price - lp.ofr_price
      } else {
        var client_spread = reqprice - ord_price
        var lp_slippage = lp.bid_price - ord_price
      };
      this.render_row(order, lp, ord_price, ord_qty, ord_status, lp_slippage, client_spread);
    };
    console.log('lp_quote',lp_quote_dict);
    for (var lp_name in lp_quote_dict) {
        var quote = lp_quote_dict[lp_name];
      if (traded_lps[lp_name] === undefined) {
        var order = {
          lp: lp_name,
          order_id: '-'
        };
        this.render_row(order, quote, '-', '-', '-', '-', '-');
      };
      
    };
  }
}