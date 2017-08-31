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

            }
          },
          columns: [{
            attr: {
              prop: 'key',
              label: this.$t('SYMBOL'),
              align: 'center',
            }
          }, {
            attr: {
              prop: 'value',
              label: this.$t('NET VOL'),
              align: 'center',
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
      var row
      for (var key in this.Data) {
        row.key = key;
        row.value = this.Data[key];
        this.tableData.push(row);
      }
    }
  },
  mounted() {
    this.init();
  }
}