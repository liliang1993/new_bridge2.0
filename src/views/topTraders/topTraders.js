export default {
  name: 'top-traders',
  data() {
    return {
      keywords: {
        time_range: {
          type: 'datetime',
          value: [],
          name: 'time'
        },
        top: {
          type: 'int',
          value: 50,
          name: 'top'
        }
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
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
          columns: [

            {
              attr: {
                prop: 'login',
                label: this.$t('LOGIN'),
                minWidth: 100,
                sortable: true,
                align: 'center'
              }
            }, {
              attr: {
                prop: 'name',
                label: this.$t('Name'),
                minWidth: 100,
                sortable: true,
                align: 'center'
              }
            }, {
              attr: {
                prop: 'group',
                label: this.$t('Group'),
                minWidth: 100,
                sortable: true,
                align: 'center'
              }
            }, {
              attr: {
                prop: 'profit',
                label: this.$t('Profit'),
                minWidth: 100,
                sortable: true,
                align: 'center',
              }
            }, {
              attr: {
                prop: 'size',
                label: this.$t('Size'),
                width: 100,
                sortable: true,
                align: 'center',
                scopedSlot: 'status'
              }
            }
          ]
        }
      }
    }
  },
  methods: {
    onSearch() {
      var kwargs = this.getKwargs();
      console.log('kwargs123', kwargs);
      if (kwargs['time'] == undefined) {
        this.$message.warning('Please select time first !');
        return;
      };
      this.$$api_common_ajax({
        data: {
          func_name: 'mt4.get_top_traders',
          args: [kwargs.time[0], kwargs.time[1], kwargs.top]
        },
        fn: data => {
          this.tableData = data;
        },
        errFn: (err) => {}
      });
    }
  },
  mounted() {

  }
}