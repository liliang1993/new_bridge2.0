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
  },
  /**
   * [deepCopy description]
   * @Author   liang
   * @DateTime 2017-07-13
   * @param    {[type]}   p [description]
   * @param    {[type]}   c [description]
   * @return   {[type]}     [description]
   */
  deepCopy(p, c) {　　　　
    var c = c || {};　　　　
    for (var i in p) {　　　　　　
      if (typeof p[i] === 'object') {　　　　　　　　
        c[i] = (p[i].constructor === Array) ? [] : {};　　　　　　　　
        this.deepCopy(p[i], c[i]);　　　　　　
      } else {　　　　　　　　　
        c[i] = p[i];　　　　　　
      }　　　　
    }　　　　
    return c;　　
  },
  num_zfill(num, size) {
    var s = num + ""
    while (s.length < size) {
      s = "0" + s
    }
    return s;
  },
  time_format(t) {
    if (isNaN(t)) {
      return "-";
    } else {
      return (new Date(t * 1000)).toISOString();
    }
  },
  dateTime_format(dateTime) {
    var res = [];
    var d = new Date(dateTime[0]);
    res[0] = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + '00:00:00';
    d = new Date(dateTime[1]);
    res[1] = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + '23:59:59';
    return res;
  },
  num_format(n, digits) {
    if (isNaN(n)) {
      return "-";
    } else {
      return n.toFixed(digits)
    };
  },
  order_format(order_id) {
    [req_uuid, lp, id] = order_id.split('_')
    return req_uuid + "_" + lp + "_" + this.num_zfill(id, 8);
  },
  get_median(values) {
    values.sort((a, b) => {
      return a - b
    })
    var half = Math.floor(values.length / 2);
    if (values.length % 2) {
      return values[half];
    } else {
      return (values[half - 1] + values[half]) / 2.0;
    }
  },
  is_int(n) {
    return Number(n) == n && n % 1 == 0;
  },
  is_number(n) {
    if (!n) {
      return false;
    }
    return Number(n) == n;
  },
  isDialogExist(dialogList, row) {
    console.log('row', row, dialogList);
    if (dialogList.length <= 0) {
      return false;
    }
    for (var item of dialogList) {
      if (item.id == row.id) {
        return true;
      };
    };
    return false;
  },
  get_pips(num, digits) {
    return Math.round(num * (Math.pow(10, digits)));
  },
  lp_side(request) {
    var j, len, order, ref;
    ref = request.orders;
    for (j = 0, len = ref.length; j < len; j++) {
      order = ref[j];
      if (order.side) {
        return order.side;
      }
    }
    if (request.settle === 0) {
      if (request.cmd === 0) {
        return "buy";
      } else {
        return "sell";
      }
    } else {
      if (request.cmd === 0) {
        return "sell";
      } else {
        return "buy";
      }
    }
  },
  get_lp_quote_dict(quotes = {
    'bid': [],
    'ofr': []
  }) {
    var bid_lps, bid_prices, i, j, k, l, len, len1, len2, lp, lp_quote, lp_quotes, lps, ofr_lps, ofr_prices, ref, ref1, side, side_quote;
    lp_quotes = new Object;
    bid_lps = (function() {
      var j, len, ref, results;
      ref = quotes.bid;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        results.push(i.lp);
      }
      return results;
    })();
    ofr_lps = (function() {
      var j, len, ref, results;
      ref = quotes.ofr;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        results.push(i.lp);
      }
      return results;
    })();
    bid_prices = (function() {
      var j, len, ref, results;
      ref = quotes.bid;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        results.push(i.price);
      }
      return results;
    })();
    ofr_prices = (function() {
      var j, len, ref, results;
      ref = quotes.ofr;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        results.push(i.price);
      }
      return results;
    })();
    lps = [].concat(bid_lps).concat(ofr_lps);
    lps.sort();
    for (j = 0, len = lps.length; j < len; j++) {
      lp = lps[j];
      lp_quote = new Object;
      lp_quotes[lp] = lp_quote;
    }
    ref = ['bid', 'ofr'];
    for (k = 0, len1 = ref.length; k < len1; k++) {
      side = ref[k];
      ref1 = quotes[side];
      for (l = 0, len2 = ref1.length; l < len2; l++) {
        side_quote = ref1[l];
        lp_quotes[side_quote.lp][side + "_price"] = side_quote.price;
        lp_quotes[side_quote.lp][side + "_size"] = side_quote.size;
        lp_quotes[side_quote.lp][side + "_time"] = side_quote.time;
      }
    }
    return lp_quotes;
  },
  getKwargs() {
    var val = {}
    var datetime = [];
    console.log('keywords', this.keywords);
    for (var key in this.keywords) {
      var keyword = this.keywords[key];
      switch (keyword.type) {
        case 'list':
          if (keyword.value && keyword.value !== 'all') {
            val[keyword.name] = keyword.value;
          }
          break;
        case 'int':
          var value = parseInt(keyword.value);
          if (value || value === 0) {
            val[keyword.name] = value;
          };
          break;
        case 'float':
          var value = parseFloat(keyword.value);
          if (value || value === 0) {
            val[keyword.name] = value;
          };
          break;
        case 'datetime':
          var value = keyword.value;
          if (value.length < 2 || !value) {
            break;
          };
          val[keyword.name] = this.dateTime_format(value);
          break;
      };
    };
    return val
  }


}