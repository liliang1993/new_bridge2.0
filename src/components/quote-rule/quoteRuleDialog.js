export default {
  name: 'tradeRule-dia',
  data() {
    return {
      source: this.Common.source || this.$store.state.global.sources[0],
      group: this.Common.group || '',
      mt4_symbol: this.Common.mt4_symbol || '',
      std_symbol: this.Common.std_symbol || this.$store.state.global.std_symbols[0],
      type: this.Common.type,
      digits: this.Attributes.digits || '',
      aggregator: this.Attributes.aggregator || '',
      minimal_spread: this.Attributes.minimal_spread || '',
      maximal_spread: this.Attributes.maximal_spread || '',
      adjust: this.Attributes.adjust || '',
      markup: this.Attributes.markup || '',
      bid_delta: this.Attributes.bid_delta || '',
      ofr_delta: this.Attributes.ofr_delta || '',
      asian_delta: this.Attributes.asian_delta || '',
      spread: this.Attributes.spread || '',
    }
  },
  computed: {

  },
  props: {
    Attributes: {
      type: Object,
      default () {
        return {};
      }
    },
    Common: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  watch: {
    Attributes: {
      deep: true,
      handler(v) {
        if (v) {

        }
      }
    },
  },
  methods: {

  },
  mounted() {

  }
}