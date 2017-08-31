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
              border: false,
              maxHeight: '100%',
              showHeader:false

            }
          },
          columns: [{
            attr: {
              prop: 'key',
              label: this.$t('SYMBOL'),
               minWidth:130,
              align: 'center',
            }
          }, {
            attr: {
              prop: 'value',
              label: this.$t('NET VOL'),
              width:400,
              showOverflowTooltip:false,
              align: 'left',
            }
          }]
        }
      }
    }
  },
  props: {
    Data: {
      type: Object,
      default () {
        return [];
      }
    }
  },
  methods: {
    init() {
      var row={};
      for (var key in this.Data) {
        row.key = key;
        row.value = this.Data[key].join(',');
        this.tableData.push(row);
        console.log('tableData',this.tableData);
      }
    }
  },
  mounted() {
    this.init();
  }
}