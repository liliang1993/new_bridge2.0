export default {
  name: 'dialognosis',
  data() {
    return {
      log_value: '',
      bridge_value: '',
      bridge_status: ''
    }
  },
  methods: {
    stringToXml(xmlString) {
      var xmlDoc;
      if (typeof xmlString == "string") {
        //FF     
        if (document.implementation.createDocument) {
          var parser = new DOMParser();
          xmlDoc = parser.parseFromString(xmlString, "text/xml");
        } else if (window.ActiveXObject) {
          xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async = false;
          xmlDoc.loadXML(xmlString);
        }
      } else {
        xmlDoc = xmlString;
      }
      return xmlDoc;
    },
    onGetErrLog() {
      this.$$api_common_ajax({
        data: {
          func_name: 'bridge_info.get_error_log',
          args: [],
          kwargs: {}
        },
        fn: data => {
          var xmlDate = this.stringToXml(data[1]);
          this.log_value = xmlDate.getElementsByTagName('body')[0].innerHTML;
        }
      });

    },
    onGetInfoLog() {
      this.$$api_common_ajax({
        data: {
          func_name: 'bridge_info.get_info_log',
          args: [],
          kwargs: {}
        },
        fn: data => {
          var xmlDate = this.stringToXml(data[1]);
          this.log_value = xmlDate.getElementsByTagName('body')[0].innerHTML;
        }
      });
    },
    onGetCurrentshopper() {
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.get_shoppers',
          args: [],
          kwargs: {}
        },
        fn: data => {
          this.log_value = JSON.stringify(data);
        }
      });
    },
    onGetBridgeStatus() {
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.get_status',
          args: [],
          kwargs: {}
        },
        fn: data => {
          this.bridge_status = JSON.stringify(data.valve);
          delete data.valve;
          this.bridge_value = data;
        }
      });
    },
    onSetMaxConcurrency() {
      this.$prompt('Please Write Max Concurrency', 'prompt', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^([2-9][0-9]|[1-9][0-9]{2,})$/,
        inputErrorMessage: '请输入大于等于20的数字'
      }).then(({
        value
      }) => {
        this.$$api_common_ajax({
          data: {
            func_name: 'router_api.set_max_concurrency',
            args: [value],
            kwargs: {}
          },
          fn: data => {
            this.onGetBridgeStatus();
          }
        });
      })
    },
    onStopBridge() {

      this.$confirm('Are you sure you want to stop?', 'prompt', {
        type: 'warning'
      }).then(() => {
        this.$$api_common_ajax({
          data: {
            func_name: 'router_api.close_valve',
            args: [value],
            kwargs: {}
          },
          fn: data => {
            this.bridge_value = 'close ' + data;
          }
        });
      })
    },
    onOpenBridge() {
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.open_valve',
          args: [],
          kwargs: {}
        },
        fn: data => {
          this.bridge_value = 'open' + data;
        }
      });
    },
    init() {}
  },
  mounted() {
    this.init();
  },
  '$route' (to, from) {

  }
}