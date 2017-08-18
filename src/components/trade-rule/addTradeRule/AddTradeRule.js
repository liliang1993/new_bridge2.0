export default {
  name: 'add-tradeRule',
  data() {
    return {
      dialog: {
        source: '',
        gourp: '',
        mt4_symbol: '',
        std_symbol: '',
        attributes: {
          route_type: {
            threshold: '0',
            left: 'ratio',
            right: 'bestright',
          },
          open_partial: 'true',
          open_lp_rejected_retry: 'true',
          bbook_exec_type: 'worst',
        }
      },
      limit_order_types_options: [{
        label: 'Instant',
        isChecked: false,
        value: ''
      }, {
        label: 'Market',
        isChecked: false,
        value: ''
      }, {
        label: 'Pending',
        isChecked: false,
        value: ''
      }, {
        label: 'Stopout:',
        isChecked: false,
        value: ''
      }, {
        label: 'StopLoss:',
        isChecked: false,
        value: ''
      }, {
        label: 'StopLoss:',
        isChecked: false,
        value: ''
      }],
      route_type_options: ['best', 'bestright', 'second', 'ratio'],
      bbook_exec_type_options: ['worst', 'vwap']
    }
  },
  methods: {
    addNewRow() {

    }
  },
  mounted() {}
}