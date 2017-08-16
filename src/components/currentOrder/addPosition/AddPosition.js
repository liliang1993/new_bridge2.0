export default {
  name: 'add-position',
  data() {
    return {
      addPositionDialog: {
        show: false,
        title: {
          text: 'Add position result',
          className: ''
        },
        result: []
      },
      keyword: '',
      search_header: 'MT4 logins',
      tableData: [],
      apis: {
        mt4logins_func_name: 'mt4.get_logins_unclosed_trades',
        mt4orders_func_name: 'mt4.get_unclosed_trades_by_orders',
        createposition_func_name: 'router_api.create_positions',
        get_list: '$$getUserListPage'
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
              border:false,
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
              scopedSlot: this.$t('LOGIN'),
              align: 'center'
            }
          }, {
            attr: {
              prop: 'group',
              label: this.$t('GROUP'),
              width: 65,
              scopedSlot: this.$t('GROUP'),
              align: 'center'
            }
          }, {
            attr: {
              prop: 'city',
              label: this.$t('CITY'),
              width: 50,
              scopedSlot: this.$t('CITY'),
              align: 'center'
            }
          }, {
            attr: {
              prop: 'TICKET',
              label: this.$t('ORD_ID'),
              width: 65,
              scopedSlot: this.$t('ORD_ID'),
              align: 'center',
            }
          }, {
            attr: {
              prop: 'SYMBOL',
              label: this.$t('SYMBOL'),
              width: 75,
              align: 'center',
              scopedSlot: this.$t('SYMBOL')
            }
          }, {
            attr: {
              prop: 'CMD',
              label: this.$t('CMD'),
              width: 50,
              scopedSlot: this.$t('CMD'),
              align: 'center'
            }
          }, {
            attr: {
              prop: 'OPEN_PRICE',
              label: this.$t('PRICE'),
              width: 55,
              scopedSlot: this.$t('PRICE'),
              align: 'center'
            }
          }, {
            attr: {
              prop: 'VOLUME',
              label: this.$t('SIZE'),
              width: 50,
              scopedSlot: this.$t('SIZE'),
              align: 'center'
            }
          }, {
            attr: {
              prop: 'DIGITS',
              label: this.$t('DIGHTS'),
              width: 65,
              scopedSlot: this.$t('DIGHTS'),
              align: 'center'
            }
          }, {
            attr: {
              prop: 'CONTRACT_SIZE',
              label: this.$t('CON_SIZE'),
              width: 90,
              scopedSlot: this.$t('CON_SIZE'),
              align: 'center'
            }
          }, {
            attr: {
              prop: 'min_size',
              label: this.$t('MIN_SIZE'),
              width: 80,
              scopedSlot: this.$t('MIN_SIZE'),
              align: 'center'
            }
          }, {
            attr: {
              prop: 'step_size',
              label: this.$t('STEP_SIZE'),
              width: 90,
              scopedSlot: this.$t('STEP_SIZE'),
              align: 'center'
            }
          }, {
            attr: {
              prop: 'COMMENT',
              label: this.$t('COMMENT'),
              width: 90,
              scopedSlot: this.$t('COMMENT'),
              align: 'center'
            }
          }, {
            attr: {
              label: this.$t('DELETE'),
              width: 80,
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
    onSearch() {
      console.log('is_number', this.is_number(this.keyword));
      if (!this.is_number(this.keyword)) {
        this.$message.warning(this.search_header + ' should be a number');
        return;
      }
      if (this.keyword) {
        var args = [
          [Number(this.keyword)]
        ];
        var params = {};
        if (this.search_header == 'MT4 logins') {
          params = {
            func_name: this.apis.mt4logins_func_name,
            args
          }
        } else {
          params = {
            func_name: this.apis.mt4orders_func_name,
            args
          }
        }
        CommonApi.postFormAjax.call(this, params, data => {
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
          });
          console.log('table1', this.tableData);
        });
      }
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
      console.log('kv', k, v);
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
          if (result == false) {
            flag = false;
            console.log('false', k);
            row[k].class = 'warning';
          } else {
            row[k].class = 'success';
          }
        }
      });
      console.log('flag', flag);
      if (flag == true) {
        var position = {};
        var temp = [];
        this.tableData.forEach(row => {
          console.log('row', row);
          this.tableConfig.columns.forEach(column => {
            if (column.attr.prop) {
              var k = column.attr.prop
              var [result, v] = this.parse_input(k, row[k].value);
              position[column.attr.label] = v;
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
        var params = {
          func_name: this.apis.createposition_func_name,
          args: [temp]
        }
        CommonApi.postFormAjax.call(this, params, data => {
          this.addPositionDialog.show = true;
          this.addPositionDialog.result = data;
          console.log('create', data, this.addPositionDialog);

        })
      };
      console.log('table2', this.tableData);
    }
  },
  mounted() {}
}