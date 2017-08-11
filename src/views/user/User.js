/**
 * Created by sailengsi on 2017/5/11.
 */
export default {
  name: 'user_list',
  data() {
    return {
      dialogTableVisible: false,
      tableData: [],
      new_tableData: [{
        user: '',
        password: '',
        role: 'Admin',
        lps: '',
        groups: '',
        symbol: '',
        desc: ''
      }],
      pagination: {
        current_page: 1,
        total: 0,
        page_size: 12,
        page_sizes: [3, 9, 12, 24],
        layout: "total, sizes, prev, pager, next, jumper"
      },
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
              border: false,
              defaultSort: {
                prop: 'user_id'
              }
            }
          },
          columns: [{
            attr: {
              prop: 'user_id',
              label: this.$t('USER_ID'),
              minWidth: 100,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'username',
              label: this.$t('USERNAME'),
              minWidth: 100,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'role',
              label: this.$t('ROLE'),
              minWidth: 100,
              align: 'center',
              scopedSlot: 'roles'
            }
          }, {
            attr: {
              prop: 'lps',
              label: this.$t('LPS'),
              minWidth: 100,
              align: 'center',
              scopedSlot: 'lps'
            }
          }, {
            attr: {
              prop: 'groups',
              label: this.$t('GROUPS'),
              minWidth: 100,
              align: 'center',
              scopedSlot: 'groups'
            }
          }, {
            attr: {
              prop: 'symbols',
              label: this.$t('MT4 SYMBOLS'),
              minWidth: 100,
              align: 'center',
              scopedSlot: 'symbols'
            },
            // }, {
            attr: {
              prop: 'desc',
              label: this.$t('DESCRIPTION'),
              minWidth: 100,
              align: 'center',
              scopedSlot: 'desc'
            }
          }, {
            attr: {
              prop: 'status',
              label: this.$t('STATUS'),
              minWidth: 100,
              align: 'center',
              scopedSlot: 'status'
            }
          }, {
            attr: {
              prop: '',
              label: this.$t(''),
              minWidth: 130,
              align: 'center',
              scopedSlot: 'password'
            }
          }, {
            attr: {
              label: this.$t(''),
              minWidth: 100,
              scopedSlot: 'handler',
              align: 'left'
            }
          }]
        }
      }
    },
    new_tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.new_tableData,
              maxHeight: '100%',
              border: false,
              defaultSort: {
                prop: 'user_id'
              }
            }
          },
          columns: [{
            attr: {
              prop: 'username',
              label: this.$t('USERNAME'),
              minWidth: 100,
              align: 'center',
              scopedSlot: 'username'
            }
          }, {
            attr: {
              prop: 'username',
              label: this.$t('PASSWORD'),
              minWidth: 100,
              align: 'center',
              scopedSlot: 'password'
            }
          }, {
            attr: {
              prop: 'role',
              label: this.$t('ROLE'),
              minWidth: 100,
              align: 'center',
              scopedSlot: 'roles'
            }
          }, {
            attr: {
              prop: 'lps',
              label: this.$t('LPS'),
              minWidth: 100,
              align: 'center',
              scopedSlot: 'lps'
            }
          }, {
            attr: {
              prop: 'groups',
              label: this.$t('GROUPS'),
              minWidth: 100,
              align: 'center',
              scopedSlot: 'groups'
            }
          }, {
            attr: {
              prop: 'symbols',
              label: this.$t('MT4 SYMBOLS'),
              minWidth: 100,
              align: 'center',
              scopedSlot: 'symbols'
            },
            // }, {
            attr: {
              prop: 'desc',
              label: this.$t('DESCRIPTION'),
              minWidth: 100,
              align: 'center',
              scopedSlot: 'desc'
            }
          }]
        }
      }
    }
  },
  methods: {
    onCloseDialog(type) {
      this[type].show = false;

    },
    onAddUser() {
      this.add_user_dialog.show = true;
    },

    // onEditUser(row) {
    //   this.edit_user_dialog.show = true;
    //   this.$nextTick(() => {
    //     Object.assign(this.edit_user_dialog.default_value, row, {
    //       password: ''
    //     });
    //   });
    // },
    editUser(row) {
      this.$set(row, 'editFlag', true);
      for (var item of['role', 'lps', 'groups', 'symbols', 'desc', 'status']) {
        row['origin-' + item] = row[item];
      }
      console.log('row', row);
    },
    backOrigin(row) {
      this.$set(row, 'editFlag', false);
      for (var item of['role', 'lps', 'groups', 'symbols', 'desc', 'status']) {
        row[item] = row['origin-' + item];
      }
    },
    add_user_submit(data) {
      this.$$api_common_ajax({
        data: {
          func_name: 'user.create_user',
          args: [data.username, data.password, data.role, data.desc],
          kwargs: {
            groups: data.groups,
            lps: data.lps,
            symbols: data.symbols
          }
        },
        fn: data => {
          this.find_page_user();
          this.dialogTableVisible = false;
        },
        errFn: (err) => {}
      });
    },
    edit_user_submit(row) {
      this.$$api_common_ajax({
        data: {
          func_name: 'user.update_user',
          args: [row.user_id, row.password, row.role, row.status, row.desc],
          kwargs: {
            groups: row.groups,
            lps: row.lps,
            symbols: row.symbols
          }
        },
        fn: data => {
          this.$set(row, 'editFlag', false);

        },
        errFn: (err) => {
          this.$message({
            showClose: true,
            message: err.response.data,
            type: 'error'
          });
        }
      });
    },

    /*
      
    */
    onChangeCurrentPage(page) {
      this.pagination.current_page = page;
      this.find_page_user();
    },
    onChangePageSize(page_size) {
      this.pagination.page_size = page_size;
      this.find_page_user();
    },
    find_page_user() {
      this.$$api_common_ajax({
        data: {
          func_name: 'user.page_user',
          args: [this.pagination.current_page, this.pagination.page_size],
          kwargs: {}
        },
        fn: data => {
          for (var item of data[0]) {
            var attrs = JSON.parse(item.attrs);
            item.lps = attrs.lps;
            item.groups = attrs.groups;
            item.symbols = attrs.symbols;
            item.password = '';
            console.log('item', attrs, item);
          }
          this.tableData = data[0];
          console.log('1234', this.tableData);
          this.pagination.total = data[1];
        },
        errFn: (err) => {
          // this.$message.error(err.msg);
        }
      });
    },


    init() {
      this.find_page_user();
      console.log('store', this.$store.state.global.roles);
    }
  },
  mounted() {
    this.init();
  }
}