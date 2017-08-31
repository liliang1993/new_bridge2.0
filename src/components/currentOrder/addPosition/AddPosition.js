export default {
  name: 'add-position',
  data() {
    return {
      search_orders_loading: false,
      search_login_loading: false,
      resultTableVisible: false,
      logKeyword: '',
      ordKeyword: '',
      tableData: [],
      addPositionResult: ''

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
              prop: 'LOGIN',
              label: this.$t('LOGIN'),
              width: 60,
              scopedSlot: 'login',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'group',
              label: this.$t('GROUP'),
              width: 75,
              scopedSlot: 'group',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'city',
              label: this.$t('CITY'),
              width: 50,
              scopedSlot: 'city',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'TICKET',
              label: this.$t('ORD ID'),
              width: 65,
              scopedSlot: 'order_id',
              align: 'center',
            }
          }, {
            attr: {
              prop: 'SYMBOL',
              label: this.$t('SYMBOL'),
              width: 75,
              align: 'center',
              scopedSlot: 'symbol'
            }
          }, {
            attr: {
              prop: 'CMD',
              label: this.$t('CMD'),
              width: 50,
              scopedSlot: 'CMD',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'OPEN_PRICE',
              label: this.$t('PRICE'),
              width: 55,
              scopedSlot: 'price',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'VOLUME',
              label: this.$t('SIZE'),
              width: 50,
              scopedSlot: 'size',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'DIGITS',
              label: this.$t('DIGITS'),
              width: 70,
              scopedSlot: 'digits',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'CONTRACT_SIZE',
              label: this.$t('CONT SIZE'),
              width: 90,
              scopedSlot: 'contract_size',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'min_size',
              label: this.$t('MIN SIZE'),
              width: 80,
              scopedSlot: 'min_size',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'step_size',
              label: this.$t('STEP SIZE'),
              width: 90,
              scopedSlot: 'step_size',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'COMMENT',
              label: this.$t('COMMENT'),
              width: 90,
              scopedSlot: 'comment',
              align: 'center'
            }
          }, {
            attr: {
              label: this.$t('DELETE'),
              minWidth: 80,
              scopedSlot: 'delete',
              align: 'center'
            }
          }]
        }
      }
    },
    newRowData() {
      var obj = {};
      this.tableConfig.columns.forEach(item => {
        obj[item.attr.prop] = {};
        obj[item.attr.prop].value = '';
        obj[item.attr.prop].class = '';
      });
      return obj;
    }
  },
  methods: {
    onclose(type) {
      this[type].show = false;
    },
    search_login_mt4_orders() {
      var login, login_str, logins, ref;
      logins = [];
      ref = this.logKeyword.split(",");
      for (login_str of ref) {
        login = parseInt(login_str);
        if (!isNaN(login)) {
          logins.push(login);
        }
      }
      if (logins.length === 0) {
        this.$message.error(this.$t("logins should be a number"));
        return;
      }
      this.search_login_loading = true;
      this.$$api_common_ajax({
        data: {
          func_name: 'mt4.get_logins_unclosed_trades',
          args: [logins],
          kwargs: {}
        },
        fn: data => {
          this.search_login_loading = false;
          this.on_orders_load(data);
        },
        errFn: err => {

        }
      });
    },
    search_mt4_orders() {
      var order, order_str, orders, ref;
      orders = [];
      ref = this.ordKeyword.split(",");
      for (order_str of ref) {
        order = parseInt(order_str);
        if (!isNaN(order)) {
          orders.push(order);
        }
      }
      if (orders.length === 0) {
        this.$message.error(this.$t("orders should be a serial numbers"));
        return;
      }
      this.search_orders_loading = true;
      this.$$api_common_ajax({
        data: {
          func_name: 'mt4.get_unclosed_trades_by_orders',
          args: [orders],
          kwargs: {}
        },
        fn: data => {
          this.search_orders_loading = false;
          this.on_orders_load(data);
        },
        errFn: err => {

        }
      });
    },
    on_orders_load(data) {
      this.tableData = [];
      data.forEach(item => {
        var temp = {};
        for (var k in item) {
          temp[k] = {};
          if (k === 'VOLUME') {
            temp[k].value = Number(item[k]) / 100;
          } else {
            temp[k].value = item[k];
          }
          temp[k].class = '';
        }
        var spacialAttr = {
          min_size: {
            value: '0.01',
            class: ''
          },
          step_size: {
            value: '0.01',
            class: ''
          }
        }
        Object.assign(temp, spacialAttr);
        this.tableData.push(temp);
      })
    },
    addNewRow() {
      console.log('row', this.newRowData);
      this.tableData.push(this.newRowData);
    },
    onDeleteRow(row) {
      var index = this.tableData.indexOf(row);
      if (index !== -1) {
        this.tableData.splice(index, 1)
      }
      console.log('index', index);
    },
    parse_input(k, v) {
      // console.log('kv', k, v);
      if (-1 != ["LOGIN", "TICKET", "CMD", "DIGITS", "CONTRACT_SIZE"].indexOf(k)) {
        console.log('parseint', parseInt(v));
        var result = parseInt(v);
        if (isNaN(result)) {
          console.log('result', result);
          return [false, v];
        }
        console.log('result', result);
        return [true, result]
      } else if (-1 != ["OPEN_PRICE", "min_size", "step_size", "VOLUME"].indexOf(k)) {
        var result = parseFloat(v)
        if (isNaN(result)) {
          return [false, v];
        } else {
          return [true, result];
        }
      } else if (-1 != ["group", "SYMBOL"].indexOf(k)) {
        var result = v.trim();
        if (result == "") {
          return [false, v];
        } else {
          return [true, result];
        }
      } else {
        return [true, v];
      }
    },
    onSubmit() {
      var flag = true;
      console.log('tableData', this.tableData);
      this.tableData.forEach(row => {
        for (var k in row) {
          var [result, v] = this.parse_input(k, row[k].value);
          console.log('result', result);
          if (result == false) {
            flag = false;
            console.log('false', k);
            row[k].class = 'warning';
          } else {
            row[k].class = 'success';
          }
        }
      });
      if (flag == true) {
        var position = {};
        var temp = [];
        this.tableData.forEach(row => {
          console.log('row', row);
          this.tableConfig.columns.forEach(column => {
            if (column.attr.prop) {
              var k = column.attr.prop
              var [result, v] = this.parse_input(k, row[k].value);
              position[column.attr.scopedSlot] = v;
            };
          });
          var spacialAttr = {
            source: 'risehills',
            time: parseInt((new Date()).getTime() / 1000),
            request_id: 0,
            request_uuid: '',
            settle: 0,
            timeout: 8000,
            quantity: position.size * position.contract_size,
            exec_type: 1,
            ie_deviation: 0
          };
          Object.assign(position, spacialAttr);
          temp.push(position);
        });
        this.$$api_common_ajax({
          data: {
            func_name: 'router_api.create_positions',
            args: [temp],
            kwargs: {}
          },
          fn: data => {
            // this.$store.dispatch('hide_add_position');
            this.addPositionResult = JSON.stringify(data);
            // this.resultTableVisible = true;
          },
          errFn: (err) => {
            this.$message({
              showClose: true,
              message: err.response.data,
              type: 'error'
            });
          }
        });

      };
      console.log('table2', this.tableData);
    }
  },
  mounted() {}
}