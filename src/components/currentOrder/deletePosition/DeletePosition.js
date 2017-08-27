export default {
  name: 'delete-position',
  data() {
    return {
      lp_symbols: {},
      orders_value: "",
      listData: [],
      editDialogTableVisible:false,
      lpPositionData:[],
      del_reason: '', 
      row_index:undefined,
    }
  },
  computed: {
    tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.listData,
              maxHeight: '100%',
              border: false,
              defaultSort: {
                prop: 'std_symbol'
              }
            }
          },
          columns: [{
            attr: {
              prop: 'order_id',
              label: this.$t('OrderID'),
              width: 90,
              // sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'group',
              label: this.$t('GROUP'),
              width: 90,
              // sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'client',
              label: this.$t('CLIENT'),
              width: 90,
              // sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'symbol',
              label: this.$t('SYMBOL'),
              width: 90,
              // sortable: true,
              align: 'center',
            }
          }, {
            attr: {
              prop: 'side',
              label: this.$t('SIDE'),
              width: 90,
              // sortable: true,
              align: 'center',
              formatter(item) {
                return item.side == "buy" ? "OB" : "OS";
              }
            }
          }, {
            attr: {
              prop: 'abook_qty',
              label: this.$t('ABOOK QTY'),
              width: 120,
              // sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'bbook_qty',
              label: this.$t('BBOOK QTY'),
              width: 120,
              // sortable: true,
              scopedSlot: 'price',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'lp_positions',
              label: this.$t('LP POSITIONS'),
              width: 120,
              // sortable: true,
              align: 'center',
              scopedSlot: 'lp_positions'
            }
          }, {
            attr: {
              // label: this.$t('Delete'),
              width: 80,
              // sortable: true,
              scopedSlot: 'delete',
              align: 'center'
            }
          }]
        }
      }
    },
    edit_tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.lpPositionData,
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
              minWidth: 90,
              align: 'center'
            }
          }, {
            attr: {
              label: this.$t('QTY'),
              minWidth: 90,
              align: 'center',
              scopedSlot:'qty'
            }
          }]
        }
      }
    }
  },
  methods: {
    load_order_data(orders) {
      this.listData = [];
      for (var order of orders) {
        var abook_qty = order.quantity - order.bbook_quantity
        var lp_positions = this.get_lp_positions(order, order.std_symbol)
        var row = {
          order_id: order.order_id,
          group: order.trade_log.request.group,
          client: order.trade_log.request.login,
          symbol: order.trade_log.request.symbol,
          side: order.side,
          abook_qty: abook_qty,
          bbook_qty: order.bbook_quantity,
          lp_positions: lp_positions,
        }
        this.listData.push(row);
      }
    },
    get_lp_positions(position, std_symbol) {
      var filled, i, j, len, len1, lp_filled, lp_orders, lp_positions, lps, order;
    lp_orders = position.trade_log.orders;
    lp_filled = {};
    lp_positions = {};
    lps = this.lp_symbols[std_symbol];
    if (lps === undefined) {
      return lp_positions;
    }
    for (i = 0, len = lp_orders.length; i < len; i++) {
      order = lp_orders[i];
      if (order.state === "filled" || order.state === "partial") {
        filled = lp_filled[order.lp];
        if (filled === undefined) {
          lp_filled[order.lp] = order.quantity;
        } else {
          lp_filled[order.lp] = filled + order.quantity;
        }
      }
    }
    for (j = 0, len1 = lps.length; j < len1; j++) {
     var lp = lps[j];
      filled = lp_filled[lp];
      if (filled !== undefined) {
        lp_positions[lp] = filled;
      } else {
        lp_positions[lp] = 0;
      }
    }
    lp_positions["bbook"] = position["bbook_quantity"];
    return lp_positions;
    },
    onSearch(){
        var i, len, order, order_str, orders, ref;
        orders = [];
        ref = this.orders_value.split(",");
        for (i = 0, len = ref.length; i < len; i++) {
          order_str = ref[i];
          order = parseInt(order_str);
          if (!isNaN(order)) {
            orders.push(order);
          }
        };
        if (orders.length === 0) {
         this.$message.warning('input value should be number');
          return;
        };
        this.$$api_common_ajax({
          data: {
            func_name: 'router_api.get_positions',
            args:[orders],
            kwargs: {}
          },
          fn: data => {
            this.load_order_data(data);
            console.log('listData', this.listData);
          },
          errFn: (err) => {
            // this.$message.error(err.msg);
          }
        });


    },
    onDeleteRow(row) {
      var index = this.listData.indexOf(row);
      if (index !== -1) {
        this.listData.splice(index, 1)
      }
      console.log('index', index);
    },
    onSubmit() {
      console.log('del_reason', this.del_reason);
      if (this.del_reason) {
        var datas = [];
        for (var order of this.listData) {
          var data = {};
          var sum = 0;
          var lp_positions = {};
          var order_id = parseInt(order.order_id);
          var abook_qty = parseInt(order.abook_qty);
          var bbook_qty = parseInt(order.bbook_qty);
          var total = abook_qty + bbook_qty;
          for (var key in order.lp_positions) {
            var qty = order.lp_positions[key];
            sum += qty;
            if (key != "bbook" && qty != 0) {
              lp_positions[key] = qty;
            };
          };
          if (sum != total) {
            this.$message.warning("order " + order_id + "total positions should be " + total);
          };
          data["order_id"] = order_id;
          if (Object.keys(lp_positions).length > 0) {
            data["lp_qtys"] = lp_positions;
          } else {
            data["lp_qtys"] = [];
          }
          datas.push(data);
        };
        this.$$api_common_ajax({
          data: {
            func_name: 'router_api.delete_positions',
            args: [datas, this.del_reason],
            kwargs: {}
          },
          fn: data => {
            if (data == 'ok') {
              this.$emit('onRestTableDate');
              this.del_reason = '';
              this.orders_value = '';
              this.listData = [];
              this.$message.success('Delete Positions Success!');
            } else {
              this.$message.warning('deleted failed, please retry!');
            }
          },
          errFn: (err) => {
            // this.$message.error(err.msg);
          }
        });
      } else {
        this.$message.warning('you should input reason!')
      }
    },
    get_alive_lp_symbols(symbols) {
      var lp_symbols = {}
      console.log('symbols', symbols);
      for (var symbol of symbols)
        if (symbol.trade_enable) {
          var lps = lp_symbols[symbol.std_symbol];
          if (lps != undefined) {
            lps.push(symbol.lp);
          } else {
            lp_symbols[symbol.std_symbol] = [symbol.lp]
          }
        }
      if (Object.keys(lp_symbols).length == 0) {
        this.$message.warning("no lps found! please check.");
        this.search_disabled = true;
      };
      this.lp_symbols = lp_symbols
    },
    editPosition(row,index){
        this.lpPositionData = [];
        this.row_index = index;
        this.editDialogTableVisible = true;
        for(var lp in row.lp_positions){
            var result = {}; 
            result.lp =lp;
            result.qty = row.lp_positions[lp];
            this.lpPositionData.push(result);
            console.log('lp_positions',row,this.lpPositionData);
        }
    },
    closeLpPosition(){
      this.editDialogTableVisible = false;
    },
    edit_position_submit(){
          var lp_positions = {};
          for(var item of this.lpPositionData){
              var lp = item.lp;
              var qty = item.qty;
              lp_positions[lp]=qty;
          }
          this.$set(this.listData[this.row_index],"lp_positions",lp_positions);
          // console.log('lp_positions',this.lpPositionData,lp_positions);
          this.editDialogTableVisible = false;
    },
    init() {
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.lp_get_all_alive_symbols',
          args: [],
          kwargs: {}
        },
        fn: data => {
          this.get_alive_lp_symbols(data);
        },
        errFn: (err) => {
          // this.$message.error(err.msg);
        }
      });
    }
  },
  mounted() {
    this.init();
  }
}