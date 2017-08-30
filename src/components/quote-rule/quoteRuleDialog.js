export default {
  name: 'tradeRule-dia',
  data() {
    return {
      dialogType: this.DialogType ||'',
      source: this.Common.source || this.$store.state.global.sources[0],
      group: this.Common.group || '',
      mt4_symbol: this.Common.mt4_symbol || '',
      std_symbol: this.Common.std_symbol || this.$store.state.global.std_symbols[0],
      type: this.Common.type || 'raw',
      digits: this.Attributes.digits || '',
      aggregator: this.Attributes.aggregator || 'median',
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
    },
    DialogType:{
      type: String,
      default () {
        return '';
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
      submit() {
      var attributes= {
        digits: parseInt(this.digits),
        minimal_spread: parseInt(this.minimal_spread),
        maximal_spread: parseInt(this.maximal_spread),
        aggregator: this.aggregator,
        adjust: parseInt(this.adjust),
        markup: parseInt(this.markup),
      }
      console.log('attr',);
      if (this.type == 'delta') {
        Object.assign(attributes, {
          bid_delta: parseInt(this.bid_delta),
          ofr_delta: parseInt(this.ofr_delta),
          random: parseInt(this.random)
        });
      } else if (this.type == 'asian') {
        Object.assign(attributes, {
          asian_delta: parseInt(this.asian_delta),
          random: parseInt(this.random)
        });
      } else if (this.type == 'spread') {
        Object.assign(attributes, {
          spread: parseInt(this.spread),
          random: parseInt(this.random)
        });
      };
      var args = [this.source, this.mt4_symbol, this.std_symbol, this.type,attributes];
      this.$emit("submit",args);
    }
  },
  mounted() {

  }
}