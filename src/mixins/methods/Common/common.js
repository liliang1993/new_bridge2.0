module.exports = {
  string_to_boolean: function(string) {
    return string == 'true' ? true : false;
  },
  boolean_to_string: function(bool) {
    return bool == true ? 'true' : 'false';
  },
  get_global_lps() {
    var arr_lps, params, global_lps;
    arr_lps = [];
    this.$$api_common_ajax({
      data: {
        func_name: 'router_api.lp_host_get_all_conf',
        args: [],
        kwargs: {}
      },
      fn: data => {
        for (var item of data) {
          arr_lps.push(item.lp);
        }
        global_lps = Array.from(new Set(arr_lps));
        this.$store.dispatch('update_global_lps', global_lps);
      }
    });
  },
  get_global_std_symbols() {
    var arr_std_symbols, params, global_std_symbols;
    arr_std_symbols = [];
    this.$$api_common_ajax({
      data: {
        func_name: 'router_api.lp_get_symbols',
        args: [],
        kwargs: {}
      },
      fn: data => {
        for (var item of data) {
          arr_std_symbols.push(item.std_symbol);
        }
        global_std_symbols = Array.from(new Set(arr_std_symbols));
        console.log('global_std_symbols', arr_std_symbols, global_std_symbols);
        this.$store.dispatch('update_global_std_symbols', global_std_symbols);
      }
    });
  }

}