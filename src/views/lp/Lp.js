export default {
    name: 'lp',
    data () {
      return {
        tableData: [],
      }
    },
    computed: {
      tableConfig: {
        get () {
          return {
            table: {
              attr: {
                data: this.tableData,
                maxHeight: '100%',
                defaultSort:{prop: 'std_symbol'}
              }
            },
            columns: [
              {
                attr: {
                  prop: 'lp',
                  label: this.$t('lp'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'type',
                  label: this.$t('type'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'username',
                  label: this.$t('username'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'sender',
                  label: this.$t('sender'),
                  width: 180,
                  sortable: true,
                  align: 'center',
                }
              },{
                attr: {
                  prop: 'target',
                  label:  this.$t('target'),
                  width: 180,
                  sortable: true,
                  align: 'center',
                  scopedSlot: 'status'
                }
              },{
                attr: {
                  prop: 'host',
                  label: this.$t('host'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'debug',
                  label: this.$t('debug'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center',
                  formatter: function(item){
                    return item.debug ==  false ? 'false' : 'true'
                  }
                }
              }
            ]
          }
        }
      }
    },
    methods: {
        render_lp_table(){
           this.$$api_common_ajax({
                    data: {
                      func_name:'router_api.lp_host_get_all_conf',
                      args:[],
                      kwargs:{}
                    },
                    fn: data => {
                      this.tableData = data;
                    }
                  });      
        },
        init(){
            this.render_lp_table();
        }
    },
    mounted() {
        this.init();
    }
}
