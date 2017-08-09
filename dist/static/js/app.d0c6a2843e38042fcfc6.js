webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by sailengsi on 2017/7/2.
 */

/* harmony default export */ __webpack_exports__["a"] = (function (name) {
	return {
		name: name,
		data() {
			return {};
		},
		computed: {
			data() {
				return this.Data;
			},
			events() {
				return this.Data.events || {};
			},
			submit_data() {
				return this.SubmitData;
			},
			submit_info() {
				return this.SubmitInfo;
			},
			temp_field_obj() {
				return this.TempFieldObj;
			},
			custom_attrs() {
				return this.Data.custom_attrs || {};
			},
			label_attr() {
				return this.custom_attrs.label || 'text';
			},
			value_attr() {
				return this.custom_attrs.value || 'value';
			}
		},
		props: {
			Data: {
				type: Object,
				default() {
					return {};
				}
			},
			SubmitData: {
				type: Object,
				default() {
					return {};
				}
			},
			SubmitInfo: {
				type: Object,
				default() {
					return {};
				}
			},
			TempFieldObj: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		methods: {
			/**
    * 处理表单控件值复数类型，比如，获取的值和显示的文本不同时，除了返回需要提交表单的value值，还需要返回显示的文本，以防不时之需
    * @author    赛冷思
    * @date    2017-7-2
    */
			setArrayValue() {
				//把存储value和text的数组转成对象格式，有利于提高根据值取文本的效率
				if (!this.temp_field_obj[this.data.key]) {
					this.temp_field_obj[this.data.key] = {};
				}

				console.log(this.custom_attrs);

				//当存在value和text数组时，才可调用
				if (this.data.list && Array.isArray(this.data.list)) {

					//遍历value和text数组，组装成对象格式
					this.data.list.forEach(item => {
						this.temp_field_obj[this.data.key][item[this.value_attr] !== undefined ? item[this.value_attr] : item[this.label_attr]] = item[this.label_attr] !== undefined ? item[this.label_attr] : item[this.value_attr];
					});

					//如果当前默认值为真，默认先提取一下默认值对应的文本
					if (this.submit_data[this.data.key] !== undefined) {
						//默认值分两种：数组(多选)，字符串或整形(单选)
						if (Array.isArray(this.submit_data[this.data.key])) {
							//循环数组值，把每个对应的文本取出来
							this.submit_info[this.data.key] = [];
							this.submit_data[this.data.key].forEach(item => {
								if (this.temp_field_obj[this.data.key][item]) {
									this.submit_info[this.data.key].push(this.temp_field_obj[this.data.key][item]);
								}
							});
						} else {
							//不是数组，直接提取对应的值得文本
							this.submit_info[this.data.key] = '';
							if (this.temp_field_obj[this.data.key][this.submit_data[this.data.key]]) {
								this.submit_info[this.data.key] = this.temp_field_obj[this.data.key][this.submit_data[this.data.key]];
							}
						}
					}
				}
			},

			/**
    * 当没有传默认值或者连default_value都不存在时(添加的时候确实是不需要传default_value,如果不这样操作一下，绑定将会失败)
    * 此时，组件中定义的default_value只是一个空对象，这时，v-model是无法绑定的，所以这个函数用来设置默认字段。
    */
			setDefaultFieldByNoDefaultValue() {
				if (this.submit_data[this.data.key] === undefined) {
					this.$set(this.submit_data, this.data.key, '');
				}
			},

			init() {}
		},
		created() {
			this.setDefaultFieldByNoDefaultValue();
			this.setArrayValue();
		},
		mounted() {
			this.init();
		},
		watch: {
			$route() {
				this.init();
			}
		}
	};
});

/*
 export default {
 name    : name,
 data(){
 return {};
 },
 computed: {
 data(){
 return this.Data;
 },
 events(){
 return this.Data.events || {};
 },
 group_attrs(){
 return this.Data.group_attrs || {};
 },
 submit_data(){
 return this.SubmitData;
 },
 submit_info(){
 return this.SubmitInfo;
 },
 temp_field_obj(){
 return this.TempFieldObj;
 }
 },
 props   : {
 Data        : {
 type: Object,
 default(){
 return {};
 }
 },
 SubmitData  : {
 type: Object,
 default(){
 return {};
 }
 },
 SubmitInfo  : {
 type: Object,
 default(){
 return {};
 }
 },
 TempFieldObj: {
 type: Object,
 default(){
 return {};
 }
 }
 },
 methods : {
 /!**
 * 处理表单控件值复数类型，比如，获取的值和显示的文本不同时，除了返回需要提交表单的value值，还需要返回显示的文本，以防不时之需
 * @author    赛冷思
 * @date    2017-7-2
 *!/
 setArrayValue(){
 //把存储value和text的数组转成对象格式，有利于提高根据值取文本的效率
 this.temp_field_obj[this.data.key] = {};

 //当存在value和text数组时，才可调用
 if (this.data.list && Array.isArray(this.data.list)) {

 //遍历value和text数组，组装成对象格式
 this.data.list.forEach(item => {
 this.temp_field_obj[this.data.key][item.value || item.text] = item.text || item.value;
 });

 //如果当前默认值为真，默认先提取一下默认值对应的文本
 if (this.submit_data[this.data.key]) {
 //默认值分两种：数组(多选)，字符串或整形(单选)
 if (Array.isArray(this.submit_data[this.data.key])) {
 //循环数组值，把每个对应的文本取出来
 this.submit_info[this.data.key] = [];
 this.submit_data[this.data.key].forEach(item => {
 if (this.temp_field_obj[this.data.key][item]) {
 this.submit_info[this.data.key].push(this.temp_field_obj[this.data.key][item]);
 }
 });
 } else {
 //不是数组，直接提取对应的值得文本
 this.submit_info[this.data.key] = '';
 if (this.temp_field_obj[this.data.key][this.submit_data[this.data.key]]) {
 this.submit_info[this.data.key] = this.temp_field_obj[this.data.key][this.submit_data[this.data.key]];
 }
 }
 }
 }
 },
 init(){
 }
 },
 created(){
 this.setArrayValue();
 console.log(this.submit_info);
 },
 mounted(){
 this.init();
 },
 watch   : {
 $route(){
 this.init();
 }
 }
 }*/

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bread_Bread_vue__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bread_Bread_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__bread_Bread_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__head_nav_HeadNav_vue__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__head_nav_HeadNav_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__head_nav_HeadNav_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__left_menu_LeftMenu_vue__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__left_menu_LeftMenu_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__left_menu_LeftMenu_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__routeview___ = __webpack_require__(330);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__routeview___["a"]; });
/* unused harmony reexport Content */
/* unused harmony reexport Bread */
/* unused harmony reexport HeadNav */
/* unused harmony reexport LeftMenu */








/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login___ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user___ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auditLog___ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lp___ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lpSymbol___ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tradeRule___ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__quoteRule___ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__currentOrder___ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tradeLog___ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lpPosition___ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__quoteAdjust___ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__stdSymbolPosition___ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__dialognosis___ = __webpack_require__(400);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__login___["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_1__user___["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_2__auditLog___["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_3__lp___["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_4__lpSymbol___["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_5__tradeRule___["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_6__quoteRule___["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_7__currentOrder___["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_8__tradeLog___["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_9__lpPosition___["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_10__quoteAdjust___["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_11__stdSymbolPosition___["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_12__dialognosis___["a"]; });
/**
 * Created by sailengsi on 2017/5/10.
 */


// import Function from './function/';















/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store___ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ajax___ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__string___ = __webpack_require__(394);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__store___["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__ajax___["a"]; });
/* unused harmony reexport string */





/***/ }),
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__en_US_json__ = __webpack_require__(855);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__en_US_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__en_US_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__zh_CN_json__ = __webpack_require__(856);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__zh_CN_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__zh_CN_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_element_ui_lib_locale_lang_en__ = __webpack_require__(672);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_element_ui_lib_locale_lang_en___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_element_ui_lib_locale_lang_en__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_element_ui_lib_locale_lang_zh_CN__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_element_ui_lib_locale_lang_zh_CN___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_element_ui_lib_locale_lang_zh_CN__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jquery__);





const LANGS = {
    'en-US': __WEBPACK_IMPORTED_MODULE_4_jquery___default.a.extend(__WEBPACK_IMPORTED_MODULE_0__en_US_json___default.a, __WEBPACK_IMPORTED_MODULE_2_element_ui_lib_locale_lang_en___default.a),
    'zh-CN': __WEBPACK_IMPORTED_MODULE_4_jquery___default.a.extend(__WEBPACK_IMPORTED_MODULE_1__zh_CN_json___default.a, __WEBPACK_IMPORTED_MODULE_3_element_ui_lib_locale_lang_zh_CN___default.a)
};
/* harmony export (immutable) */ __webpack_exports__["a"] = LANGS;


/***/ }),
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by sailengsi on 2017/7/2.
 */

/* harmony default export */ __webpack_exports__["a"] = ({
	name: '',
	computed: {
		attrs() {
			return this.Data.attrs || {};
		}
	},

	methods: {
		onClick(e) {
			this.events.click && this.events.click(e);
		},
		onBlur(e) {
			this.events.blur && this.events.blur(e);
		},
		onFocus(e) {
			this.events.focus && this.events.focus(e);
		},
		onChange(value) {
			this.events.change && this.events.change(value);
		}
	}
});

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings__ = __webpack_require__(327);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__settings__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__settings__["b"]; });
/**
 * Created by sailengsi on 2017/5/10.
 */





/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//显示加载
const SHOW_LOADING = 'SHOW_LOADING';
/* harmony export (immutable) */ __webpack_exports__["a"] = SHOW_LOADING;


//关闭加载
const HIDE_LOADING = 'HIDE_LOADING';
/* harmony export (immutable) */ __webpack_exports__["b"] = HIDE_LOADING;


//update_global_context
const UPDATE_GLOBAL_CONTEXT = 'UPDATE_GLOBAL_CONTEXT';
/* harmony export (immutable) */ __webpack_exports__["c"] = UPDATE_GLOBAL_CONTEXT;


const UPDATE_GLOBAL_USER_INFO = 'UPDATE_GLOBAL_USER_INFO';
/* harmony export (immutable) */ __webpack_exports__["k"] = UPDATE_GLOBAL_USER_INFO;

const UPDATE_GLOBAL_ROLES = 'UPDATE_GLOBAL_ROLES';
/* harmony export (immutable) */ __webpack_exports__["d"] = UPDATE_GLOBAL_ROLES;

const UPDATE_GLOBAL_QUOTE_TYPES = 'UPDATE_GLOBAL_QUOTE_TYPES';
/* harmony export (immutable) */ __webpack_exports__["e"] = UPDATE_GLOBAL_QUOTE_TYPES;

const UPDATE_GLOBAL_SOURCES = 'UPDATE_GLOBAL_SOURCES';
/* harmony export (immutable) */ __webpack_exports__["f"] = UPDATE_GLOBAL_SOURCES;

const UPDATE_GLOBAL_LPS = 'UPDATE_GLOBAL_LPS';
/* harmony export (immutable) */ __webpack_exports__["g"] = UPDATE_GLOBAL_LPS;

const UPDATE_GLOBAL_STD_SYMBOLS = 'UPDATE_GLOBAL_STD_SYMBOLS';
/* harmony export (immutable) */ __webpack_exports__["h"] = UPDATE_GLOBAL_STD_SYMBOLS;

//update_global_dialog_zIndex
const UPDATE_GLOBAL_ZINDEX = 'UPDATE_GLOBAL_ZINDEX';
/* harmony export (immutable) */ __webpack_exports__["i"] = UPDATE_GLOBAL_ZINDEX;


//update_global_LOCALE
const UPDATE_GLOBAL_LOCALE = 'UPDATE_GLOBAL_LOCALE';
/* harmony export (immutable) */ __webpack_exports__["j"] = UPDATE_GLOBAL_LOCALE;


/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//展开菜单
const SET_MENU_OPEN = 'SET_MENU_OPEN';
/* harmony export (immutable) */ __webpack_exports__["a"] = SET_MENU_OPEN;


//关闭菜单
const SET_MENU_CLOSE = 'SET_MENU_CLOSE';
/* harmony export (immutable) */ __webpack_exports__["b"] = SET_MENU_CLOSE;


/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//设置当前路由
const SET_CUR_ROUTE = 'SET_CUR_ROUTE';
/* harmony export (immutable) */ __webpack_exports__["a"] = SET_CUR_ROUTE;


/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const UPDATE_TRADE_RULES = 'UPDATE_TRADE_RULES';
/* harmony export (immutable) */ __webpack_exports__["a"] = UPDATE_TRADE_RULES;


const UPDATE_REMARK_DIALOGS = 'UPDATE_REMARK_DIALOGS';
/* harmony export (immutable) */ __webpack_exports__["b"] = UPDATE_REMARK_DIALOGS;


const DELETE_REMARK_DIALOGS = 'DELETE_REMARK_DIALOGS';
/* harmony export (immutable) */ __webpack_exports__["c"] = DELETE_REMARK_DIALOGS;


const UPDATE_TRADERULE_REMARK = 'UPDATE_TRADERULE_REMARK';
/* harmony export (immutable) */ __webpack_exports__["i"] = UPDATE_TRADERULE_REMARK;


const UPDATE_COPY_TO_NEW__GROUP_DIALOGS = 'UPDATE_COPY_TO_NEW__GROUP_DIALOGS';
/* harmony export (immutable) */ __webpack_exports__["d"] = UPDATE_COPY_TO_NEW__GROUP_DIALOGS;


const DELETE_COPY_TO_NEW__GROUP_DIALOGS = 'DELETE_COPY_TO_NEW__GROUP_DIALOGS';
/* harmony export (immutable) */ __webpack_exports__["e"] = DELETE_COPY_TO_NEW__GROUP_DIALOGS;


const UPDATE_TRADERULE_TABLE = 'UPDATE_TRADERULE_TABLE';
/* harmony export (immutable) */ __webpack_exports__["f"] = UPDATE_TRADERULE_TABLE;


const UPDATE_VIEW_RULES_DIALOGS = 'UPDATE_VIEW_RULES_DIALOGS';
/* harmony export (immutable) */ __webpack_exports__["g"] = UPDATE_VIEW_RULES_DIALOGS;


const DELETE_VIEW_RULES_DIALOGS = 'DELETE_VIEW_RULES_DIALOGS';
/* harmony export (immutable) */ __webpack_exports__["h"] = DELETE_VIEW_RULES_DIALOGS;


/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//更新用户信息
const UPDATE_USERINFO = 'UPDATE_USERINFO';
/* harmony export (immutable) */ __webpack_exports__["a"] = UPDATE_USERINFO;


//清空用户信息
const REMOVE_USERINFO = 'REMOVE_USERINFO';
/* harmony export (immutable) */ __webpack_exports__["b"] = REMOVE_USERINFO;


//更新记录密码相关信息
const UPDATE_REMUMBER = 'UPDATE_REMUMBER';
/* harmony export (immutable) */ __webpack_exports__["c"] = UPDATE_REMUMBER;


//清空记录密码相关信息
const REMOVE_REMUMBER = 'REMOVE_REMUMBER';
/* harmony export (immutable) */ __webpack_exports__["d"] = REMOVE_REMUMBER;


/***/ }),
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(693)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(281),
  /* template */
  __webpack_require__(784),
  /* scopeId */
  "data-v-368eed6b",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(706)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(282),
  /* template */
  __webpack_require__(800),
  /* scopeId */
  "data-v-62b50c30",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(690)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(283),
  /* template */
  __webpack_require__(780),
  /* scopeId */
  "data-v-2d406596",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_i18n__ = __webpack_require__(722);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_i18n___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_i18n__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lang__ = __webpack_require__(76);




__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_i18n___default.a);

// export default new VueI18n({
//   locale: 'en-US',
//   messages: LANGS,
//   // silentTranslationWarn: true
// })

// set lang
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].config.lang = 'en-US';

// set locales
Object.keys(__WEBPACK_IMPORTED_MODULE_2__lang__["a" /* LANGS */]).forEach(function (lang) {
  __WEBPACK_IMPORTED_MODULE_0_vue__["default"].locale(lang, __WEBPACK_IMPORTED_MODULE_2__lang__["a" /* LANGS */][lang]);
});

/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_utils___ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_js__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__component_js__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixin__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__plugin__ = __webpack_require__(339);
/**
 * Created by sailengsi on 2017/5/11.
 */








// console.log(plugins);
// console.log(libs);
console.log('cps', __WEBPACK_IMPORTED_MODULE_4__component_js__["a" /* default */]);
console.log(__WEBPACK_IMPORTED_MODULE_5__mixin__["a" /* default */]);

/**
 * 把一些全局对象和一些全局方法，注册到Vue原型上
 */
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use({
    install(Vue, options) {
        Vue.mixin(__WEBPACK_IMPORTED_MODULE_5__mixin__["a" /* default */]);

        //注册第三方库
        __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(__WEBPACK_IMPORTED_MODULE_3__lib_js__["a" /* default */], (item, key) => {
            Vue.prototype['$$' + key] = item;
        });

        //注册全局方法，如常用的接口方法，工具方法等。
        __WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(__WEBPACK_IMPORTED_MODULE_6__plugin__["a" /* default */], (item, key) => {
            Vue.prototype['$$' + key] = item;
        });
    }
});

__WEBPACK_IMPORTED_MODULE_1_underscore___default.a.each(__WEBPACK_IMPORTED_MODULE_4__component_js__["a" /* default */], (item, key) => {
    var cp_name = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    if (cp_name && cp_name[0] === '-') {
        cp_name = cp_name.replace('-', '');
    }
    __WEBPACK_IMPORTED_MODULE_0_vue__["default"].component(cp_name, item);
});

/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(819);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_layout___ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_views___ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user___ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__aduitLog___ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lp___ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lpSymbol___ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tradeRule___ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__quoteRule___ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__currentOrder___ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__tradeLog___ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__lpPosition___ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__quoteAdjust___ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__stdSymbolPosition___ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__diagnosis___ = __webpack_require__(345);
/**
 * Created by sailengsi on 2017/5/11.
 */


__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);
















/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
	routes: [{
		path: '/',
		name: 'Hello',
		hidden: true,
		redirect(to) {
			return 'login';
		}
	}, {
		path: '/login',
		name: '登录',
		hidden: true,
		component: __WEBPACK_IMPORTED_MODULE_3_views___["a" /* Login */]
	}, __WEBPACK_IMPORTED_MODULE_4__user___["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__aduitLog___["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__lp___["a" /* default */], __WEBPACK_IMPORTED_MODULE_7__lpSymbol___["a" /* default */], __WEBPACK_IMPORTED_MODULE_8__tradeRule___["a" /* default */], __WEBPACK_IMPORTED_MODULE_9__quoteRule___["a" /* default */], __WEBPACK_IMPORTED_MODULE_10__currentOrder___["a" /* default */], __WEBPACK_IMPORTED_MODULE_11__tradeLog___["a" /* default */], __WEBPACK_IMPORTED_MODULE_12__lpPosition___["a" /* default */], __WEBPACK_IMPORTED_MODULE_13__quoteAdjust___["a" /* default */], __WEBPACK_IMPORTED_MODULE_14__stdSymbolPosition___["a" /* default */], __WEBPACK_IMPORTED_MODULE_15__diagnosis___["a" /* default */]]
}));

/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(821);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router___ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__leftmenu___ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__userinfo___ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__global___ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__traderule___ = __webpack_require__(381);


__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);







/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({
    modules: {
        global: __WEBPACK_IMPORTED_MODULE_5__global___["a" /* default */],
        router: __WEBPACK_IMPORTED_MODULE_2__router___["a" /* default */],
        leftmenu: __WEBPACK_IMPORTED_MODULE_3__leftmenu___["a" /* default */],
        user: __WEBPACK_IMPORTED_MODULE_4__userinfo___["a" /* default */],
        traderule: __WEBPACK_IMPORTED_MODULE_6__traderule___["a" /* default */]
    }
}));

/***/ }),
/* 205 */,
/* 206 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 207 */,
/* 208 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(714)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(249),
  /* template */
  __webpack_require__(812),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app',
  components: {},
  data() {
    return {};
  },
  methods: {
    init() {}
  },
  mounted() {
    this.init();
  },
  watch: {
    $route(to, from) {}
  }
});

/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DialogInfo_js__ = __webpack_require__(302);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__DialogInfo_js__["a" /* default */]);

/***/ }),
/* 251 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var drag = (dragBox, moveBox = dragBox) => {
	dragBox.onmousedown = e => {
		var disX = e.clientX - moveBox.offsetLeft;
		var disY = e.clientY - moveBox.offsetTop;
		document.onmousemove = e => {
			e.preventDefault();
			var l = e.clientX - disX;
			var t = e.clientY - disY;
			var x = document.documentElement.clientWidth - moveBox.offsetWidth;
			var y = document.documentElement.clientHeight - moveBox.offsetHeight;
			l = l < 0 ? 0 : l > x ? x : l;
			t = t < 0 ? 0 : t > y ? y : t;
			moveBox.style.left = l + 'px';
			moveBox.style.top = t + 'px';
			return false;
		};
		document.onmouseup = () => {
			document.onmousemove = null;
			document.onmouseup = null;
			return false;
		};
		return false;
	};
};
/* harmony default export */ __webpack_exports__["default"] = ({
	data() {
		return {
			show: true
		};
	},
	methods: {
		// 弹框适配屏幕居中
		autosize() {
			this.$nextTick(() => {
				var dom = this.$refs.popup;
				var CHeight = document.documentElement.clientHeight;
				var CWidth = document.documentElement.clientWidth;
				var PHeight = dom.offsetHeight;
				var PWidth = dom.offsetWidth;
				this.$refs.main.style.maxHeight = CHeight - 100 + 'px';
				dom.style.top = (CHeight > PHeight ? (CHeight - PHeight) / 2 : 0) + 'px';
				dom.style.left = (CWidth - PWidth) / 2 + 'px';
			});
		},
		setEvent(btn) {
			this.$emit(btn.clickEvent);
			this.$emit('onbtnclick', btn);
		},
		close() {
			// this.show = false;
			this.$emit('close');
		},
		click() {
			this.setTopShow();
			this.$emit('click');
		},
		setTopShow() {
			this.$store.dispatch('update_global_zIndex').then(() => {
				// console.log('dialog_zIndex', ref,this.$store.state.global.dialog_zIndex);
				this.$refs["popup"].style.zIndex = this.$store.state.global.dialog_zIndex;
				if (this.isModal) {
					this.$refs["popup-modal"].style.zIndex = this.$store.state.global.dialog_zIndex;
				}
			});
		}

	},
	props: {
		title: {
			default: ''
		},
		// show: {
		// 	type: Boolean,
		// 	default: false
		// },
		buttons: {
			type: Array,
			default() {
				return [];
			}
		},
		isModal: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		// Show () {
		// 	return this.show
		// }
	},
	watch: {
		show(val) {
			val && this.autosize();
		}
	},
	created() {
		// $(window).resize(() => {
		//           this.autosize();
		//       });
		this.autosize();
		this.setTopShow();
		this.$nextTick(() => {
			drag(this.$refs.title, this.$refs.popup);
		});
	}
});

/***/ }),
/* 252 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Default_js__ = __webpack_require__(305);
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__Default_js__["a" /* default */]);

/***/ }),
/* 253 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Horizontal_js__ = __webpack_require__(307);
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__Horizontal_js__["a" /* default */]);

/***/ }),
/* 254 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Default_js__ = __webpack_require__(311);
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__Default_js__["a" /* default */]);

/***/ }),
/* 255 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Default_js__ = __webpack_require__(314);
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__Default_js__["a" /* default */]);

/***/ }),
/* 256 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormData_js__ = __webpack_require__(317);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__FormData_js__["a" /* default */]);

/***/ }),
/* 257 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Common__ = __webpack_require__(11);
//
//
//
//
//
//
//
//
//
//
//


var Js = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* default */])('sls-cascader');
Js.mixins = [{
	data() {
		return {};
	},
	computed: {
		cascader_attrs() {
			return this.Data.cascader_attrs || {};
		}
	},
	methods: {
		/**
   * 根据数组的长度，来决定需要递归几次，最终取出需要的结果，我曹，没法解释，解释不清的玩意。
   * @param  {array} 	areas 地区列表，无线分类结构
   * @param  {array} 	temps 一维数组,如果只有一个，代表取顶级;如果两个，取顶级的子级；如果三个，顶级的子级的子级....以此类推
   * @param  {number} k     递归次数，当这个值等于temps的长度时，就代表结束了
   * @return {string}       地区名称
   */
		onDeepGetCityName(list, temps, k) {
			for (var i = 0; i < list.length; i++) {
				if (list[i].id + '' === temps[k] + "") {
					if (k < temps.length - 1) {
						k = k + 1;
						this.temp_field_obj[this.data.key].push(list[i].city);
						this.onDeepGetCityName(list[i].children, temps, k);
					} else {
						// console.log(list[i]);
						this.temp_field_obj[this.data.key].push(list[i].city);
						return;
					}
				}
			}
		},

		/**
            * 最后一级选择完后触发
   * @param v 选中的值数组，根据这个数组取出对应的文本
   */
		onChange(v) {
			this.temp_field_obj[this.data.key] = [];
			this.onDeepGetCityName(this.data.options, v, 0);
			this.submit_info[this.data.key] = this.temp_field_obj[this.data.key];

			this.events.change && this.events.change({ value: v, info: this.submit_info[this.data.key] });
		},

		/**
            * 每选择一项时就触发这个
            * 场景：当选择的条件不允许继续选择时，可以使用这个事件
   * @param v 选中的值数组，根据这个数组取出对应的文本
   */
		onActiveItemChange(v) {
			this.temp_field_obj[this.data.key] = [];
			this.onDeepGetCityName(this.data.options, v, 0);
			this.submit_info[this.data.key] = this.temp_field_obj[this.data.key];
			this.events['active-item-change'] && this.events['active-item-change']({ value: v, info: this.submit_info[this.data.key] });
		}
	},
	created() {
		this.temp_field_obj[this.data.key] = [];
	},
	mounted() {}
}];
/* harmony default export */ __webpack_exports__["default"] = (Js);

/***/ }),
/* 258 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Common__ = __webpack_require__(11);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var Js = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* default */])('sls-checkbox');
Js.mixins = [{
	computed: {
		checkbox_group_attrs() {
			return this.Data.checkbox_group_attrs || {};
		},
		checkbox_attrs() {
			return this.Data.checkbox_attrs || {};
		}
	},
	methods: {
		onChange(v) {
			if (Array.isArray(v)) {
				this.submit_info[this.data.key] = [];
				v.forEach(item => {
					this.submit_info[this.data.key].push(this.temp_field_obj[this.data.key][item]);
				});
			}
			this.events.change && this.events.change({ value: v, info: this.submit_info[this.data.key] });
		}
	}
}];
/* harmony default export */ __webpack_exports__["default"] = (Js);

/***/ }),
/* 259 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Common__ = __webpack_require__(11);
//
//
//
//
//
//
//
//
//
//
//


var Js = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* default */])('sls-date');
Js.mixins = [{
	computed: {
		date_attrs() {
			return this.Data.date_attrs || {};
		}
	},
	methods: {
		onChange(v) {
			this.events.change && this.events.change(v);
		}
	},
	created() {}
}];
/* harmony default export */ __webpack_exports__["default"] = (Js);

/***/ }),
/* 260 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Common__ = __webpack_require__(11);
//
//
//
//
//
//
//
//
//
//
//


var Js = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* default */])('sls-date-month');
Js.mixins = [{
	computed: {
		date_attrs() {
			return this.Data.date_attrs || {};
		}
	},
	methods: {
		onChange(v) {
			this.events.change && this.events.change(v);
		}
	}
}];
/* harmony default export */ __webpack_exports__["default"] = (Js);

/***/ }),
/* 261 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Common__ = __webpack_require__(11);
//
//
//
//
//
//
//
//
//
//
//


var Js = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* default */])('sls-date-range');
Js.mixins = [{
	computed: {
		date_attrs() {
			return this.Data.date_attrs || {};
		},

		/**
            * 范围分隔符，默认为 ' - '
   * @returns {*|string}
   */
		range_separator() {
			return this.Data.date_attrs['range-separator'] || ' - ';
		}
	},
	methods: {
		onChange(v) {
			this.submit_info[this.data.key] = v.split(this.range_separator);
			this.events.change && this.events.change({ value: v, info: this.submit_info[this.data.key] });
		},

		/**
            * 如果传的默认值为字符串，自动转为数组
   */
		setValueStringToArray() {
			//传了默认值且为字符串再处理
			if (typeof this.submit_data[this.data.key] === 'string' && this.submit_data[this.data.key]) {
				//默认值必须包含分隔符
				if (this.submit_data[this.data.key].indexOf(this.range_separator) !== -1) {
					this.submit_data[this.data.key] = this.submit_data[this.data.key].split(this.range_separator);
				} else {
					console.error('日期范围默认值为数组。如果设置成了字符串，范围分隔符必须和设置的一样，默认分隔符为 " - "！');
				}
			}
		}
	},
	created() {
		this.setValueStringToArray();
	}
}];
/* harmony default export */ __webpack_exports__["default"] = (Js);

/***/ }),
/* 262 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Common__ = __webpack_require__(11);
//
//
//
//
//
//
//
//
//
//
//


var Js = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* default */])('sls-date-time');
Js.mixins = [{
	computed: {
		date_time_attrs() {
			return this.Data.date_time_attrs || {};
		}
	},
	methods: {
		onChange(v) {
			this.events.change && this.events.change(v);
		}
	}
}];
/* harmony default export */ __webpack_exports__["default"] = (Js);

/***/ }),
/* 263 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Common__ = __webpack_require__(11);
//
//
//
//
//
//
//
//
//
//
//


var Js = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* default */])('sls-date-time-range');
Js.mixins = [{
	computed: {
		date_time_attrs() {
			return this.Data.date_time_attrs || {};
		}
	},
	methods: {
		onChange(v) {
			this.events.change && this.events.change(v);
		}
	}
}];
/* harmony default export */ __webpack_exports__["default"] = (Js);

/***/ }),
/* 264 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Common__ = __webpack_require__(11);
//
//
//
//
//
//
//
//
//
//
//


var Js = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* default */])('sls-date-week');
Js.mixins = [{
	computed: {
		date_attrs() {
			return this.Data.date_attrs || {};
		}
	},
	methods: {
		onChange(v) {
			this.events.change && this.events.change(v);
		}
	}
}];
/* harmony default export */ __webpack_exports__["default"] = (Js);

/***/ }),
/* 265 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Common__ = __webpack_require__(11);
//
//
//
//
//
//
//
//
//
//
//


var Js = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* default */])('sls-date-year');
Js.mixins = [{
	computed: {
		date_attrs() {
			return this.Data.date_attrs || {};
		}
	},
	methods: {
		onChange(v) {
			this.events.change && this.events.change(v);
		}
	}
}];
/* harmony default export */ __webpack_exports__["default"] = (Js);

/***/ }),
/* 266 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_wangeditor__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_wangeditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_wangeditor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_Common__ = __webpack_require__(11);
//
//
//
//
//
//
//
//



var Js = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__js_Common__["a" /* default */])('sls-textarea');
Js.mixins = [{
	data() {
		return {
			is_init: true,

			editor: null,

			id: '',

			menus: ['head', // 标题
			'bold', // 粗体
			'italic', // 斜体
			'underline', // 下划线
			'strikeThrough', // 删除线
			'foreColor', // 文字颜色
			'backColor', // 背景颜色
			'link', // 插入链接
			'list', // 列表
			'justify', // 对齐方式
			'quote', // 引用
			'emoticon', // 表情
			'image', // 插入图片
			'table', // 表格
			'video', // 插入视频
			'code', // 插入代码
			'undo', // 撤销
			'redo' // 重复
			],

			attrs: {
				zIndex: 90,

				uploadImgShowBase64: false, // 使用 base64 保存图片
				uploadImgServer: '', // 上传图片到服务器
				showLinkImg: true, //隐藏“网络图片”tab
				uploadImgMaxSize: 5 * 1024 * 1024, //默认限制图片大小是 5M
				uploadImgMaxLength: 10000, //限制一次最多能传几张图片,默认为 10000 张（即不限制），需要限制可自己配置
				uploadImgParams: {}, //上传图片时可自定义传递一些参数，例如传递验证的token等。这些参数会拼接到 url 的参数中，也会被添加到formdata中。
				uploadFileName: '', //上传图片时，可自定义filename，即在使用formdata.append(name, file)添加图片文件时，自定义第一个参数。
				uploadImgHeaders: {}, //上传图片时刻自定义设置 header
				withCredentials: false, //跨域上传中如果需要传递 cookie 需设置 withCredentials
				uploadImgTimeout: 5000 //默认的 timeout 时间是 5 秒钟
			},

			event: {
				// 图片上传之前触发
				// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
				//before: function (xhr, editor, files) {},


				// 图片上传并返回结果，图片插入成功之后触发
				// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
				//success: function (xhr, editor, result) {},


				// 图片上传并返回结果，但图片插入错误时触发
				// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
				//fail: function (xhr, editor, result) {},


				// 图片上传出错时触发
				// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
				//error: function (xhr, editor) {},


				// 图片上传超时时触发
				// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
				//timeout: function (xhr, editor) {},


				// 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
				// （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
				// 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
				// insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
				// 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
				// result 必须是一个 JSON 格式字符串！！！否则报错
				/*customInsert: function (insertImg, result, editor) {
     var url = result.url
     insertImg(url)
     //						}*/
			}
		};
	},
	computed: {
		config() {
			return this.Data.config || {};
		}
	},
	methods: {
		/**
   * 初始化参数
   */
		initParams() {
			this.id = this.data.id || this.data.key;

			if (this.config.show_menus && Array.isArray(this.config.show_menus)) {
				this.menus = this.menus.filter(item => {
					return this.config.show_menus.indexOf(item) !== -1;
				});
			} else {
				if (this.config.hide_menus && Array.isArray(this.config.hide_menus)) {
					this.menus = this.menus.filter(item => {
						return this.config.hide_menus.indexOf(item) === -1;
					});
				}
			}
		},

		/**
   * 初始化实例编辑器
   */
		initWangEditor() {
			this.editor = new __WEBPACK_IMPORTED_MODULE_0_wangeditor___default.a('#' + this.id);
			this.editor.customConfig = {};
			this.editor.customConfig.menus = this.menus;
			this.editor.customConfig = Object.assign(this.editor.customConfig, this.attrs, this.config.attrs);
			this.editor.customConfig.uploadImgHooks = {};
			this.editor.customConfig.uploadImgHooks = Object.assign(this.editor.customConfig.uploadImgHooks, this.config.events);
			this.editor.customConfig.onchange = html => {
				this.submit_data[this.data.key] = html;
				this.submit_info[this.data.key] = this.editor.txt.text();
				this.config.onchange && this.config.onchange({
					value: this.submit_data[this.data.key],
					info: this.submit_info[this.data.key]
				});
			};
			this.editor.create();
		}
	},
	created() {
		this.initParams();
	},
	mounted() {
		this.initWangEditor();
	},
	watch: {
		submit_data: {
			deep: true,
			handler(v) {
				this.submit_data = v;
				if (this.editor && this.is_init === true) {
					this.is_init = false;
					this.editor.txt.html(this.submit_data[this.data.key]);
				}
			}
		}
	}
}];
/* harmony default export */ __webpack_exports__["default"] = (Js);

/***/ }),
/* 267 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Common__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_InputTextarea__ = __webpack_require__(115);
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var Js = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* default */])('sls-input');
Js.mixins = [__WEBPACK_IMPORTED_MODULE_1__js_InputTextarea__["a" /* default */]];
/* harmony default export */ __webpack_exports__["default"] = (Js);

/***/ }),
/* 268 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Common__ = __webpack_require__(11);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var Js = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* default */])('sls-radio');
Js.mixins = [{
								computed: {
																radio_group_attrs() {
																								return this.Data.radio_group_attrs || {};
																},
																radio_attrs() {
																								return this.Data.radio_attrs || {};
																}
								},
								methods: {
																onChange(v) {
																								this.submit_info[this.data.key] = '';
																								this.submit_info[this.data.key] = this.temp_field_obj[this.data.key][v];
																								this.events.change && this.events.change({ value: v, info: this.submit_info[this.data.key] });
																}
								}
}];
/* harmony default export */ __webpack_exports__["default"] = (Js);

/***/ }),
/* 269 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Common__ = __webpack_require__(11);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var Js = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* default */])('sls-select');
Js.mixins = [{
	data() {
		return {};
	},
	computed: {
		select_attrs() {
			return this.Data.select_attrs || {};
		},
		option_attrs() {
			return this.Data.option_attrs || {};
		}
	},
	methods: {
		onChange(v) {
			//				console.log(v);
			if (v) {
				if (Array.isArray(v)) {
					this.submit_info[this.data.key] = [];
					v.forEach(item => {
						this.submit_info[this.data.key].push(this.temp_field_obj[this.data.key][item]);
					});
				} else {
					this.submit_info[this.data.key] = '';
					this.submit_info[this.data.key] = this.temp_field_obj[this.data.key][v];
				}
			}

			this.events.change && this.events.change({ value: v, info: this.submit_info[this.data.key] });
		},
		onVisibleChange() {
			this.events['visible-change'] && this.events['visible-change']();
		},
		onRemoveTag() {
			this.events['remove-tag'] && this.events['remove-tag']();
		},
		onClear() {
			this.events.clear && this.events.clear();
		}
	},
	created() {}
}];
/* harmony default export */ __webpack_exports__["default"] = (Js);

/***/ }),
/* 270 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Common__ = __webpack_require__(11);
//
//
//
//
//
//
//
//
//
//
//


var Js = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* default */])('sls-switch');
Js.mixins = [{
	computed: {
		switch_attrs() {
			return this.Data.switch_attrs || {};
		}
	},
	methods: {
		onChange(v) {
			this.submit_info[this.data.key] = '';
			this.submit_info[this.data.key] = this.temp_field_obj[this.data.key][v ? 'on' : 'off'];

			this.events.change && this.events.change({
				value: v,
				info: this.submit_info[this.data.key]
			});
		}
	},
	created() {
		this.temp_field_obj[this.data.key] = {};
		this.temp_field_obj[this.data.key].on = this.data.value.on;
		this.temp_field_obj[this.data.key].off = this.data.value.off;

		this.submit_info[this.data.key] = this.temp_field_obj[this.data.key][this.submit_data[this.data.key] ? 'on' : 'off'];
	},
	mounted() {}
}];
/* harmony default export */ __webpack_exports__["default"] = (Js);

/***/ }),
/* 271 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Common__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_InputTextarea__ = __webpack_require__(115);
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var Js = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* default */])('sls-textarea');
Js.mixins = [__WEBPACK_IMPORTED_MODULE_1__js_InputTextarea__["a" /* default */]];
/* harmony default export */ __webpack_exports__["default"] = (Js);

/***/ }),
/* 272 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Common__ = __webpack_require__(11);
//
//
//
//
//
//
//
//
//
//


var Js = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* default */])('sls-time');
Js.mixins = [{
	computed: {
		time_attrs() {
			return this.Data.time_attrs || {};
		}
	},
	methods: {
		onChange(v) {
			this.events.change && this.events.change(v);
		}
	}
}];
/* harmony default export */ __webpack_exports__["default"] = (Js);

/***/ }),
/* 273 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Common__ = __webpack_require__(11);
//
//
//
//
//
//
//
//
//
//


var Js = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* default */])('sls-time');
Js.mixins = [{
	computed: {
		time_attrs() {
			return this.Data.time_attrs || {};
		}
	},
	methods: {
		onChange(v) {
			this.events.change && this.events.change(v);
		}
	}
}];
/* harmony default export */ __webpack_exports__["default"] = (Js);

/***/ }),
/* 274 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Common__ = __webpack_require__(11);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var Js = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* default */])('sls-time');
Js.mixins = [{
	computed: {
		time_attrs() {
			return this.Data.time_attrs || {};
		}
	},
	methods: {
		onChange(v) {
			this.events.change && this.events.change(v);
		}
	}
}];
/* harmony default export */ __webpack_exports__["default"] = (Js);

/***/ }),
/* 275 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_Common__ = __webpack_require__(11);
//
//
//
//
//
//
//
//
//
//
//


var Js = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__js_Common__["a" /* default */])('sls-time');
Js.mixins = [{
	computed: {
		time_attrs() {
			return this.Data.time_attrs || {};
		}
	},
	methods: {
		onChange(v) {
			this.events.change && this.events.change(v);
		}
	}
}];
/* harmony default export */ __webpack_exports__["default"] = (Js);

/***/ }),
/* 276 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_i18n_lang__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      locale: 'zh-CN',
      langs: __WEBPACK_IMPORTED_MODULE_0_i18n_lang__["a" /* LANGS */],
      skins: [{ name: 'default', label: this.$t('default') }, { name: 'purple', label: this.$t('purple') }]
    };
  },
  mounted() {
    // this.$i18n.locale = this.locale;
    __WEBPACK_IMPORTED_MODULE_1_vue__["default"].config.lang = this.locale;
  },
  methods: {
    handleCommand(command) {
      this.locale = command;
      __WEBPACK_IMPORTED_MODULE_1_vue__["default"].config.lang = this.locale;
    },
    handleCommandSkin(command) {
      switch (command) {
        case 'purple':
          $('.container').addClass('custom-theme');
          $('.header').css('background-color', '#7B7DE5');
          break;
        default:
          $('.container').removeClass().addClass('el-row container');
          $('.header').css('background-color', '#20A0FF');
          break;
      }
    }
  }
  // watch: {
  //   locale (val) {
  //     // this.$i18n.locale = val
  //     Vue.config.lang = val
  //   }
  // }
});

/***/ }),
/* 277 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ListData_js__ = __webpack_require__(321);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__ListData_js__["a" /* default */]);

/***/ }),
/* 278 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            disabled: true
        };
    },
    computed: {
        batch() {
            return this.Batch;
        },
        btn_info() {
            return this.BtnInfo;
        },
        fields() {
            return this.Search.fields || [];
        },
        default_value() {
            return this.Search.default_value || {};
        },
        setting() {
            return this.Search.setting || { inline: true };
        }
    },
    props: {
        Batch: {
            type: Object,
            default() {
                return {};
            }
        },
        BtnInfo: {
            type: Object,
            default() {
                return {};
            }
        },
        Search: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    methods: {
        onBtnEvent(opts) {
            this.$emit('onBtnEvent', opts);
        },
        onSearch(opts) {
            this.$emit('onSearch', opts);
        }
    },
    created() {},
    mounted() {},
    watch: {}
});

/***/ }),
/* 279 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TraderuleDialog_js__ = __webpack_require__(323);
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__TraderuleDialog_js__["a" /* default */]);

/***/ }),
/* 280 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TradeRuleTable_js__ = __webpack_require__(324);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__TradeRuleTable_js__["a" /* default */]);

/***/ }),
/* 281 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'bread',
    data() {
        return {
            strong: ''
        };
    },
    methods: {
        getPageText(name) {
            return name = name.replace('编辑', this.$route.query.id ? '修改' : '添加');
        }
    },
    mounted() {},
    created() {
        if (this.$route.matched.length) {
            var name = this.$route.matched[this.$route.matched.length - 1].name;
            this.strong = this.getPageText(name);
        }
    },
    watch: {
        $route(to, from) {
            this.strong = this.getPageText(to.name);
        }
    }
});

/***/ }),
/* 282 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HeadNav_js__ = __webpack_require__(328);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__HeadNav_js__["a" /* default */]);

/***/ }),
/* 283 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__LeftMenu_js__ = __webpack_require__(329);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__LeftMenu_js__["a" /* default */]);

/***/ }),
/* 284 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'content',
    data() {
        return {};
    },
    methods: {},
    created() {},
    mounted() {}
});

/***/ }),
/* 285 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__head_nav_HeadNav_vue__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__head_nav_HeadNav_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__head_nav_HeadNav_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__left_menu_LeftMenu_vue__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__left_menu_LeftMenu_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__left_menu_LeftMenu_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bread_Bread_vue__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bread_Bread_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__bread_Bread_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'home',
    components: {
        HeadNav: __WEBPACK_IMPORTED_MODULE_0__head_nav_HeadNav_vue___default.a, LeftMenu: __WEBPACK_IMPORTED_MODULE_1__left_menu_LeftMenu_vue___default.a, Bread: __WEBPACK_IMPORTED_MODULE_2__bread_Bread_vue___default.a
    }
});

/***/ }),
/* 286 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AuditLog_js__ = __webpack_require__(395);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__AuditLog_js__["a" /* default */]);

/***/ }),
/* 287 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CurrentOrder_js__ = __webpack_require__(397);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__CurrentOrder_js__["a" /* default */]);

/***/ }),
/* 288 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dialognosis_js__ = __webpack_require__(399);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__Dialognosis_js__["a" /* default */]);

/***/ }),
/* 289 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Login_js__ = __webpack_require__(401);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__Login_js__["a" /* default */]);

/***/ }),
/* 290 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__LpPosition_js__ = __webpack_require__(403);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__LpPosition_js__["a" /* default */]);

/***/ }),
/* 291 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__LpSymbol_js__ = __webpack_require__(405);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__LpSymbol_js__["a" /* default */]);

/***/ }),
/* 292 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Lp_js__ = __webpack_require__(407);
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__Lp_js__["a" /* default */]);

/***/ }),
/* 293 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__QuoteAdjust_js__ = __webpack_require__(409);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__QuoteAdjust_js__["a" /* default */]);

/***/ }),
/* 294 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__QuoteRule_js__ = __webpack_require__(411);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__QuoteRule_js__["a" /* default */]);

/***/ }),
/* 295 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__StdSymbolPosition_js__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__StdSymbolPosition_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__StdSymbolPosition_js__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__StdSymbolPosition_js___default.a);

/***/ }),
/* 296 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TradeLog_js__ = __webpack_require__(415);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__TradeLog_js__["a" /* default */]);

/***/ }),
/* 297 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TradeRule_js__ = __webpack_require__(417);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__TradeRule_js__["a" /* default */]);

/***/ }),
/* 298 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__User_js__ = __webpack_require__(419);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__User_js__["a" /* default */]);

/***/ }),
/* 299 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ([{
	name: '通用',
	method: 'ajax',
	path: '/ajax/api',
	type: 'post'
}]);

/***/ }),
/* 300 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user___ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common___ = __webpack_require__(299);
/**
 * Created by sailengsi on 2017/5/11.
 */

/**
 * 导出所有模块需要用到接口
 * 一级属性：模块名
 * 一级属性中的方法：当前模块需要用的接口
 * @type {Object}
 */





/* harmony default export */ __webpack_exports__["a"] = ([{
  module: 'user',
  name: '用户管理',
  list: __WEBPACK_IMPORTED_MODULE_0__user___["a" /* default */]
}, {
  module: 'common',
  name: '订单管理',
  list: __WEBPACK_IMPORTED_MODULE_1__common___["a" /* default */]
}]);

/***/ }),
/* 301 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 用户模块
 * @type {Object}
 */
/* harmony default export */ __webpack_exports__["a"] = ([{
	name: '登录',
	method: 'login',
	path: '/ajax_login',
	type: 'post'
}, {
	name: '登出',
	method: 'logout',
	path: '/ajax_logout',
	type: 'post'
}, {
	name: '获取用户列表',
	method: 'findUserPage',
	path: '/ajax/api',
	type: 'post'
}, {
	name: '创建用户',
	method: 'createUser',
	path: '/ajax/api',
	type: 'post'
}, {
	name: '更新用户',
	method: 'updateUser',
	path: '/ajax/api',
	type: 'post'
}]);

/***/ }),
/* 302 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'dialog-info',
    data() {
        return {
            dialog: this.Dialog || {}
        };
    },
    methods: {
        onClose() {
            this.dialog.show = false;
        }
    },

    computed: {
        show() {
            return this.dialog.show;
        }
    },

    mounted() {
        // console.log(this.Show);
    },

    /**
     * 接收参数
     * @type {Object}
     */
    props: {
        Dialog: {
            type: Object,
            validator: v => {
                return true;
            }
        }
    },

    /**
     * 监控参数
     * @type {Object}
     */
    watch: {}
});

/***/ }),
/* 303 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DialogInfo_vue__ = __webpack_require__(723);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DialogInfo_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__DialogInfo_vue__);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__DialogInfo_vue___default.a);

/***/ }),
/* 304 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DragDialog_vue__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DragDialog_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__DragDialog_vue__);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__DragDialog_vue___default.a);

/***/ }),
/* 305 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_echarts__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_echarts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_echarts__);

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'echarts',
    data() {
        return {
            chartDom: null,
            data: {
                id: this.id,
                title: this.title,
                subtext: this.subtext,
                hover_title: this.hoverTitle,
                text_list: this.textList,
                value_list: this.valueList
            }
        };
    },
    methods: {
        init() {
            //基于准备好的dom，初始化echarts实例
            if (this.data.id) {
                this.chartDom = __WEBPACK_IMPORTED_MODULE_0_echarts___default.a.init(document.getElementById(this.data.id));
            }
            return this;
        },
        update() {
            if (this.chartDom === null) {
                this.init();
            }

            if (this.chartDom) {
                this.chartDom.setOption({
                    title: {
                        text: this.data.title,
                        subtext: this.data.subtext
                    },
                    tooltip: {},
                    xAxis: {
                        data: this.data.text_list
                    },
                    yAxis: {},
                    series: [{
                        name: this.data.hover_title,
                        type: 'bar',
                        data: this.data.value_list
                    }]
                });
            }
        }
    },
    mounted: function () {
        this.init().update(this.data);
    },
    props: {
        id: [String],
        title: [String, Number],
        subtext: [String, Number],
        hoverTitle: [String, Number],
        textList: {
            type: Array,
            required: true
        },
        valueList: {
            type: Array,
            required: true
        }
    },
    watch: {
        valueList(v) {
            this.data.value_list = v;
            this.update();
        },
        textList(v) {
            this.data.text_list = v;
            this.update();
        },
        title(v) {
            this.data.title = v;
            this.update();
        },
        subtext(v) {
            this.data.subtext = v;
            this.update();
        },
        hoverTitle(v) {
            this.data.hover_title = v;
            this.update();
        }
    }
});

/***/ }),
/* 306 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Default_vue__ = __webpack_require__(725);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Default_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Default_vue__);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__Default_vue___default.a);

/***/ }),
/* 307 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_echarts__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_echarts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_echarts__);

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'echarts',
    data() {
        return {
            chartDom: null,
            data: {}
        };
    },
    methods: {
        init() {
            //基于准备好的dom，初始化echarts实例
            this.chartDom = __WEBPACK_IMPORTED_MODULE_0_echarts___default.a.init(document.getElementById('chartDom'));
            return this;
        },
        update() {
            if (this.chartDom === null) {
                this.init();
            }
            this.chartDom.setOption({
                title: {
                    text: 'bar Chart',
                    subtext: '数据来自网络'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['2011年', '2012年']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
                },
                series: [{
                    name: '2011年',
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 630230]
                }, {
                    name: '2012年',
                    type: 'bar',
                    data: [19325, 23438, 31000, 121594, 134141, 681807]
                }]
            });
        }
    },
    mounted: function () {
        this.init().update(this.data);
    }
});

/***/ }),
/* 308 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Horizontal_vue__ = __webpack_require__(726);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Horizontal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Horizontal_vue__);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__Horizontal_vue___default.a);

/***/ }),
/* 309 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__default___ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__horizontal___ = __webpack_require__(308);



/* harmony default export */ __webpack_exports__["a"] = ({
    Default: __WEBPACK_IMPORTED_MODULE_0__default___["a" /* default */],
    Horizontal: __WEBPACK_IMPORTED_MODULE_1__horizontal___["a" /* default */]
});

/***/ }),
/* 310 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bar___ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pie___ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__line___ = __webpack_require__(313);




/* harmony default export */ __webpack_exports__["a"] = ({
    Bar: __WEBPACK_IMPORTED_MODULE_0__bar___["a" /* default */],
    Pie: __WEBPACK_IMPORTED_MODULE_1__pie___["a" /* default */],
    Line: __WEBPACK_IMPORTED_MODULE_2__line___["a" /* default */]
});

/***/ }),
/* 311 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_echarts__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_echarts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_echarts__);

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'echarts',
    data() {
        return {
            chartDom: null,
            data: {
                title: '垂直方向柱状标题',
                subtext: '子标题描述信息'
            }
        };
    },
    methods: {
        init() {
            //基于准备好的dom，初始化echarts实例
            this.chartDom = __WEBPACK_IMPORTED_MODULE_0_echarts___default.a.init(document.getElementById('chartDom'));
            return this;
        },
        update() {
            if (this.chartDom === null) {
                this.init();
            }
            this.chartDom.setOption({
                title: {
                    text: 'line Chart'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['邮件营销', '联盟广告', '搜索引擎']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210]
                }, {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310]
                }, {
                    name: '搜索引擎',
                    type: 'line',
                    stack: '总量',
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }]
            });
        }
    },
    mounted: function () {
        this.init().update();
    }
});

/***/ }),
/* 312 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Default_vue__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Default_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Default_vue__);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__Default_vue___default.a);

/***/ }),
/* 313 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__default___ = __webpack_require__(312);


/* harmony default export */ __webpack_exports__["a"] = ({
    Default: __WEBPACK_IMPORTED_MODULE_0__default___["a" /* default */]
});

/***/ }),
/* 314 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_echarts__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_echarts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_echarts__);

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'echarts',
    data() {
        return {
            chartDom: null,
            data: {
                id: this.id,
                title: this.title,
                subtext: this.subtext,
                hover_title: this.hoverTitle,
                data_list: this.dataList,
                text_list: []
            }
        };
    },
    methods: {
        init() {
            //基于准备好的dom，初始化echarts实例
            if (this.data.id) {
                this.chartDom = __WEBPACK_IMPORTED_MODULE_0_echarts___default.a.init(document.getElementById(this.data.id));
            }
            return this;
        },
        update() {
            if (this.chartDom === null) {
                this.init();
            }
            this.chartDom.setOption({
                title: {
                    text: this.data.title,
                    subtext: this.data.subtext,
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: this.data.text_list
                },
                series: [{
                    name: this.data.hover_title,
                    type: 'pie',
                    radius: '55%',
                    // center: ['50%', '60%'],
                    data: this.data.data_list,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            });
        },

        updateTextList() {
            var data = this.data.data_list;
            this.data.text_list = [];
            for (var i = 0; i < data.length; i++) {
                this.data.text_list.push(data[i].name);
            }
            return this;
        }
    },
    mounted: function () {
        this.updateTextList().init().update();
    },
    props: {
        id: {
            type: String,
            required: true
        },
        title: [String, Number],
        subtext: [String, Number],
        hoverTitle: [String, Number],
        dataList: {
            type: Array,
            required: true
        }
    },
    watch: {
        dataList(v) {
            this.data.value_list = v;
            this.updateTextList().update();
        },
        title(v) {
            this.data.title = v;
            this.update();
        },
        subtext(v) {
            this.data.subtext = v;
            this.update();
        },
        hoverTitle(v) {
            this.data.hover_title = v;
            this.update();
        }
    }
});

/***/ }),
/* 315 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Default_vue__ = __webpack_require__(728);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Default_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Default_vue__);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__Default_vue___default.a);

/***/ }),
/* 316 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__default___ = __webpack_require__(315);


/* harmony default export */ __webpack_exports__["a"] = ({
	Default: __WEBPACK_IMPORTED_MODULE_0__default___["a" /* default */]
});

/***/ }),
/* 317 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_wangeditor__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_wangeditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_wangeditor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fields___ = __webpack_require__(318);
// import {wangEditor} from 'libs/wangeditor/wangEditor.js';


// console.log(wangEditor);




/* harmony default export */ __webpack_exports__["a"] = ({
	components: __WEBPACK_IMPORTED_MODULE_1__fields___["a" /* default */],
	name: 'form-data',
	data() {
		return {
			setting: this.Setting,
			primary_key: this.PrimaryKey,
			fields: this.FieldList,
			components: {
				input: 'SlsInput',
				textarea: 'SlsTextarea',
				select: 'SlsSelect',
				radio: 'SlsRadio',
				switch: 'SlsSwitch',
				cascader: 'SlsCascader',
				checkbox: 'SlsCheckbox',
				date: 'SlsDate',
				daterange: 'SlsDateRange',
				year: 'SlsDateYear',
				month: 'SlsDateMonth',
				week: 'SlsDateWeek',
				time: 'SlsTime',
				timerange: 'SlsTimeRange',
				timefixed: 'SlsTimeFixed',
				timefixedrange: 'SlsTimeFixedRange',
				datetime: 'SlsDateTime',
				datetimerange: 'SlsDateTimeRange',
				editor: 'SlsEditor'
			},
			cur_component: '',
			temp_field_obj: {},
			submit_data: this.DefaultValue,
			submit_info: {},
			rules: this.Rules || {}
		};
	},
	methods: {
		/**
   * 表单提交事件
   */
		onSubmit(ref) {

			// var data = {
			// 	data: this.submit_data,
			// 	info: this.submit_info
			// };
			var data = this.submit_data;
			if (this.rules) {
				this.$refs[ref].validate(valid => {
					if (valid) {
						this.$emit('onSubmit', data);
					}
				});
			} else {
				this.$emit('onSubmit', data);
			}
		}
	},
	created() {},
	mounted() {
		// console.log(this.fields);

	},
	props: {
		FieldList: {
			type: Array,
			required: true,
			default() {
				return [];
			}
		},
		Editor: {
			type: Object,
			default() {
				return {};
			}
		},
		Rules: {
			type: Object,
			default() {
				return {};
			}
		},
		DefaultValue: {
			type: Object,
			default() {
				return {};
			}
		},
		Setting: {
			type: Object,
			default() {
				return {};
			}
		},
		PrimaryKey: {
			type: String,
			default: 'id'
		}
	},

	/**
  * 监控参数
  * @type {Object}
  */
	watch: {
		FieldList: {
			deep: true,
			handler(v) {
				if (v) {
					this.fields = v;
				}
			}
		},
		submit_data: {
			deep: true,
			handler(v) {}
		},
		DefaultValue: {
			deep: true,
			handler(v) {
				this.default_value = v;
			}
		},
		wangeditor_update(v) {},
		Setting(v) {
			this.setting = v;
		},
		PrimaryKey(v) {
			this.primary_key = v;
		}
	}
});

/***/ }),
/* 318 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SlsInput_vue__ = __webpack_require__(740);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SlsInput_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__SlsInput_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SlsTextarea_vue__ = __webpack_require__(744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SlsTextarea_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__SlsTextarea_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SlsCheckbox_vue__ = __webpack_require__(731);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SlsCheckbox_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__SlsCheckbox_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SlsRadio_vue__ = __webpack_require__(741);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SlsRadio_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__SlsRadio_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__SlsSelect_vue__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__SlsSelect_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__SlsSelect_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SlsSwitch_vue__ = __webpack_require__(743);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SlsSwitch_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__SlsSwitch_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__SlsCascader_vue__ = __webpack_require__(730);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__SlsCascader_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__SlsCascader_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__SlsDate_vue__ = __webpack_require__(732);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__SlsDate_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__SlsDate_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__SlsDateRange_vue__ = __webpack_require__(734);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__SlsDateRange_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__SlsDateRange_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__SlsDateYear_vue__ = __webpack_require__(738);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__SlsDateYear_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__SlsDateYear_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__SlsDateMonth_vue__ = __webpack_require__(733);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__SlsDateMonth_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__SlsDateMonth_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__SlsDateWeek_vue__ = __webpack_require__(737);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__SlsDateWeek_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__SlsDateWeek_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__SlsTime_vue__ = __webpack_require__(745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__SlsTime_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__SlsTime_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__SlsTimeRange_vue__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__SlsTimeRange_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__SlsTimeRange_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__SlsTimeFixed_vue__ = __webpack_require__(746);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__SlsTimeFixed_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__SlsTimeFixed_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__SlsTimeFixedRange_vue__ = __webpack_require__(747);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__SlsTimeFixedRange_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__SlsTimeFixedRange_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__SlsDateTime_vue__ = __webpack_require__(735);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__SlsDateTime_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__SlsDateTime_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__SlsDateTimeRange_vue__ = __webpack_require__(736);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__SlsDateTimeRange_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__SlsDateTimeRange_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__SlsEditor_vue__ = __webpack_require__(739);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__SlsEditor_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__SlsEditor_vue__);
/**
 * Created by sailengsi on 2017/7/1.
 */





















/* harmony default export */ __webpack_exports__["a"] = ({
	SlsInput: __WEBPACK_IMPORTED_MODULE_0__SlsInput_vue___default.a,
	SlsTextarea: __WEBPACK_IMPORTED_MODULE_1__SlsTextarea_vue___default.a,
	SlsCheckbox: __WEBPACK_IMPORTED_MODULE_2__SlsCheckbox_vue___default.a,
	SlsRadio: __WEBPACK_IMPORTED_MODULE_3__SlsRadio_vue___default.a,
	SlsSelect: __WEBPACK_IMPORTED_MODULE_4__SlsSelect_vue___default.a,
	SlsSwitch: __WEBPACK_IMPORTED_MODULE_5__SlsSwitch_vue___default.a,
	SlsCascader: __WEBPACK_IMPORTED_MODULE_6__SlsCascader_vue___default.a,
	SlsDate: __WEBPACK_IMPORTED_MODULE_7__SlsDate_vue___default.a,
	SlsDateRange: __WEBPACK_IMPORTED_MODULE_8__SlsDateRange_vue___default.a,
	SlsDateYear: __WEBPACK_IMPORTED_MODULE_9__SlsDateYear_vue___default.a,
	SlsDateMonth: __WEBPACK_IMPORTED_MODULE_10__SlsDateMonth_vue___default.a,
	SlsDateWeek: __WEBPACK_IMPORTED_MODULE_11__SlsDateWeek_vue___default.a,
	SlsTime: __WEBPACK_IMPORTED_MODULE_12__SlsTime_vue___default.a,
	SlsTimeRange: __WEBPACK_IMPORTED_MODULE_13__SlsTimeRange_vue___default.a,
	SlsTimeFixed: __WEBPACK_IMPORTED_MODULE_14__SlsTimeFixed_vue___default.a,
	SlsTimeFixedRange: __WEBPACK_IMPORTED_MODULE_15__SlsTimeFixedRange_vue___default.a,
	SlsDateTime: __WEBPACK_IMPORTED_MODULE_16__SlsDateTime_vue___default.a,
	SlsDateTimeRange: __WEBPACK_IMPORTED_MODULE_17__SlsDateTimeRange_vue___default.a,
	SlsEditor: __WEBPACK_IMPORTED_MODULE_18__SlsEditor_vue___default.a
});

/***/ }),
/* 319 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormData_vue__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormData_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__FormData_vue__);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__FormData_vue___default.a);

/***/ }),
/* 320 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__echarts___ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__list_data___ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__form_data___ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dialog_info___ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__drag_dialog___ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__traderule_dialog___ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lang___ = __webpack_require__(749);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lang____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__lang___);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__echarts___["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__list_data___["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__form_data___["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__dialog_info___["a"]; });
/* unused harmony reexport TraderuleDialog */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__drag_dialog___["a"]; });







console.log('trader', __WEBPACK_IMPORTED_MODULE_5__traderule_dialog___["a" /* default */]);


/***/ }),
/* 321 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SlsTableHead_vue__ = __webpack_require__(751);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SlsTableHead_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__SlsTableHead_vue__);

/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'list-data',
	components: { SlsTableHead: __WEBPACK_IMPORTED_MODULE_0__SlsTableHead_vue___default.a },
	data() {
		return {
			batch_flag: true, //符合批量删除为true,否则为false
			batch_datas: [],
			batch_ids: [],

			batch: {
				flag: true,
				datas: [],
				ids: []
			},

			list: this.List, //列表数组
			fields: this.FieldList, //字段数组
			expand: this.Expand, //折叠
			btn_info: this.BtnInfo, //按钮信息

			pagination: this.Pagination, //分页

			search: this.Search //搜索
		};
	},
	methods: {
		/**
   * 表格列表触发CheckBox的事件
   * @param  {array} val 当前选中的用户信息数组，每个元素是用户信息对象
   */
		onSelectionChange(val) {
			this.batch.datas = val;

			this.batch.ids = [];
			if (val.length) {
				this.batch.flag = false;
				for (var i = 0; i < val.length; i++) {
					this.batch.ids.push(val[i].id);
				}
			} else {
				this.batch.flag = true;
			}

			/**
    * 改变CheckBox事件，第一个参数是ID数组，第二个参数二维数组，每个数组是选中的对象
    */
			this.$emit('onSelectionChange', {
				ids: this.batch.ids,
				datas: this.batch.datas
			});
			this.$emit('onSelectionChangeObj', {
				ids: this.batch.ids,
				datas: this.batch.datas
			});
		},

		/**
   * 搜索事件
   * @param data    搜索表单的值
   */
		onSearch(opts) {
			this.$emit('onSearch', opts);
		},

		/**
   * 删除事件
   * @param  {object || boolean} user  当前信息对象或者为布尔值,为布尔值时，代表是批量删除
   * @param  {number} index 当前列表索引
   */
		onBatchDelete() {
			this.$emit('onClickBtnBatchDelete', {
				ids: this.batch.ids,
				datas: this.batch.datas
			});
		},

		/**
   * 点击按钮事件
   * @param opts  组装的返回参数
   * @param.attr  opts.type   string      按钮类型，内置四个(添加，查看，修改，删除)
   * @param.attr  opts.index  number      当点击列表中的按钮时，此值为当前行的索引
   * @param.attr  opts.data   object      当点击列表中的按钮时，此值为当前行数据
   * @param.attr  opts.list   array       当点击列别中的按钮时，此值为当前列表数据
   */
		onBtnEvent(opts) {
			switch (opts.type) {
				case 'Add':
					this.$emit('onClickBtnAdd', opts);
					break;
				case 'Update':
					this.$emit('onClickBtnUpdate', opts);
					break;
				case 'Delete':
					this.$emit('onClickBtnDelete', opts);
					break;
				case 'BatchDelete':
					this.onBatchDelete();
					break;
				case 'Select':
					this.$emit('onClickBtnSelect', opts);
					break;
				default:
					this.$emit('onClickBtn', opts);
			}
		},

		/**
   * 自定义按钮事件
   * @param opts
   */
		onCustomBtnEvent(opts) {
			if (opts.btn.fn) {
				opts.btn.fn(opts);
			} else {
				this.$emit('onClickBtn', opts);
			}
		},

		/**
   * 改变当前页码事件
   * @param  {number} page 当前页面
   */
		onChangeCurrentPage(page) {
			this.$emit('onChangeCurrentPage', page);
		},

		/**
   * 改变每页显示的数量事件
   * @param  {number} page_size 每页显示的数量
   */
		onChangePageSize(page_size) {
			this.$emit('onChangePageSize', page_size);
		}
	},

	mounted() {
		// console.log(this.list);
	},

	/**
  * 接收参数
  * @type {Object}
  */
	props: {
		List: {
			type: Array,
			required: true
		},
		FieldList: {
			type: Array,
			required: true
		},
		BtnInfo: {
			type: Object,
			default() {
				return {};
			}
		},
		Selection: {
			type: Boolean,
			default: false
		},
		Expand: {
			type: Object,
			default() {
				return {
					show: false,
					position: "left"
				};
			}
		},
		Pagination: {
			type: Object,
			default() {
				return {};
			}
		},
		Search: {
			type: Object,
			default() {
				return {};
			}
		}
	},

	/**
  * 监控参数
  * @type {Object}
  */
	watch: {
		List(v) {
			if (v) {
				this.list = v;
			}
		},
		FieldList(v) {
			if (v) {
				this.fields = v;
			}
		},
		Selection(v) {
			this.selection = v;
		},
		Expand(v) {
			this.expand = v;
		},
		BtnInfo(v) {
			this.btn_info = v;
		},
		Pagination(v) {
			this.pagination = v;
		},
		Search(v) {
			this.search = v;
		}
	}
});

/***/ }),
/* 322 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ListData_vue__ = __webpack_require__(750);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ListData_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ListData_vue__);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__ListData_vue___default.a);

/***/ }),
/* 323 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fields___ = __webpack_require__(325);

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'traderuledialog',
  components: {
    TraderuleTable: __WEBPACK_IMPORTED_MODULE_0__fields___["a" /* default */]
  },
  methods: {
    onCloseDialog(key) {
      this.$store.dispatch('delete_view_rules_dialogs', key);
    }
  }
});

/***/ }),
/* 324 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'view-rules',
  data() {
    return {
      editFlag: false,
      batch_flag: true,
      batch_datas: [],
      keyword: '',
      tableData: [],
      config: this.Config,
      columns: [{
        attr: {
          type: 'selection',
          width: 60,
          align: 'center'
        }
      }, {
        attr: {
          prop: 'mt4_symbol',
          label: this.$t('MT4 symbol'),
          width: 90,
          sortable: true,
          align: 'center'
        }
      }, {
        attr: {
          prop: 'std_symbol',
          label: this.$t('STD symbol'),
          width: 90,
          sortable: true,
          align: 'center'
        }
      }, {
        attr: {
          prop: 'route',
          label: this.$t('Route'),
          width: 120,
          sortable: true,
          align: 'center',
          scopedSlot: 'route_type'
        }
      }, {
        attr: {
          prop: '',
          label: this.$t('Limit orders types'),
          width: 150,
          sortable: true,
          align: 'center',
          scopedSlot: 'limit_order_types_normal'
        }
      }, {
        attr: {
          prop: 'attributes.coverage',
          label: this.$t('Coverage'),
          width: 100,
          sortable: true,
          align: 'center',
          scopedSlot: 'coverage'
        }
      }, {
        attr: {
          prop: 'attributes.better_fill',
          label: this.$t('BetterFill'),
          width: 100,
          sortable: true,
          align: 'center',
          scopedSlot: 'better_fill'
        }
      }, {
        attr: {
          prop: 'attributes.slippages',
          label: this.$t('slippages'),
          width: 80,
          sortable: true,
          align: 'center',
          formatter: function (item) {
            var res = '';
            item.attributes.slippages.forEach(group => {
              res += group.join(',') + '\n';
            });
            return res;
          },
          scopedSlot: 'slippages'
        }
      }, {
        attr: {
          prop: 'attributes.open_partial',
          label: this.$t('Open Partial'),
          minWidth: 100,
          sortable: true,
          align: 'center',
          scopedSlot: 'open_partial'
        }
      }, {
        attr: {
          prop: 'attributes.open_lp_rejected_retry',
          label: this.$t('LP Rejected Retry'),
          width: 120,
          sortable: true,
          align: 'center',
          scopedSlot: 'open_lp_rejected_retry'
        }
      }, {
        attr: {
          prop: 'attributes.bbook_exec_type',
          label: this.$t('BBook Exec Type'),
          width: 120,
          sortable: true,
          align: 'center',
          scopedSlot: 'bbook_exec_type'
        }
      }, {
        attr: {
          prop: 'attributes.lps',
          label: this.$t('LPs'),
          minWidth: 60,
          sortable: true,
          align: 'center',
          scopedSlot: 'lps'
        }
      }, {
        attr: {
          label: this.$t('Operation'),
          minWidth: 80,
          align: 'center',
          scopedSlot: 'handler'
        }
      }]
    };
  },
  computed: {
    tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.tableData,
              maxHeight: '100%',
              defaultSort: {
                prop: 'group'
              }
            }
          },
          columns: this.columns
        };
      }
    },
    get_trade_rules() {
      return this.$store.state.traderule.trade_rules;
    }
  },
  methods: {
    closeDialog(key) {
      this.$store.dispatch('delete_view_rules_dialogs', key);
    },
    onInvertSelect() {
      this.toggleSelection(this.tableData);
    },

    onSingleDelete(row) {
      this.$confirm('你确定删除吗', 'prompt', {
        type: 'warning'
      }).then(() => {
        var params = {
          func_name: 'router_api.trade_del_rule',
          args: [row.source, row.group, row.mt4_symbol]
        };
        CommonApi.postFormAjax.call(this, params, data => {
          this.$store.dispatch('update_traderule_table', true);
        });
      });
    },

    group_rules_edited() {},
    toggleSelection(rows) {
      if (rows) {
        console.log('22222');
        rows.forEach(row => {
          console.log('555', this.$refs.table);
          this.$refs.table.toggleRowSelection(row);
        });
      } else {
        this.$refs.table.clearSelection(row);
      }
    },
    onSelectionChange(val) {
      if (val.length) {
        this.batch_flag = false;
        this.batch_datas = val;
      } else {
        this.batch_flag = true;
      }
    },
    onBatchDelete() {
      var selected_rules, i, len, rule;
      selected_rules = [];
      this.$confirm('你确定删除吗', 'prompt', {
        type: 'warning'
      }).then(() => {
        console.log('this.batch_datas', this.batch_datas);
        for (i = 0, len = this.batch_datas.length; i < len; i++) {
          rule = this.batch_datas[i];
          selected_rules.push({
            source: rule.source,
            group: rule.group,
            mt4_symbol: rule.mt4_symbol
          });
        }
        var params = {
          func_name: 'router_api.trade_del_rules',
          args: [selected_rules]
        };
        CommonApi.postFormAjax.call(this, params, data => {
          this.$store.dispatch('update_traderule_table', true);
        });
      });
    },
    onEditRules() {
      this.editFlag = true;
      console.log('this.columns', this.columns);
    },
    onSubmitChanges() {
      this.editFlag = false;
      console.log('this.columns', this.columns);
    },
    load_data() {
      this.tableData = [];
      for (var k in this.$store.state.traderule.trade_rules) {
        var rule = this.$store.state.traderule.trade_rules[k];
        var source = this.config.source;
        var group = this.config.group;
        if (rule.source === source && rule.group === group) {
          var new_rule = this.deepCopy(rule);
          new_rule.source = source;
          new_rule.group = group;
          this.tableData.push(new_rule);
        }
      }
    }
  },
  mounted() {
    this.load_data();
  },
  props: {
    Config: {
      type: Object,
      required: true
    }
  },
  watch: {
    Config(v) {
      if (v) {
        this.config = v;
      }
    },
    get_trade_rules(v) {
      console.log('config', v);
      if (v) {
        this.load_data();
      }
    }
  }
});

/***/ }),
/* 325 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TradeRuleTable_vue__ = __webpack_require__(753);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TradeRuleTable_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__TradeRuleTable_vue__);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__TradeRuleTable_vue___default.a);

/***/ }),
/* 326 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TraderuleDialog_vue__ = __webpack_require__(752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TraderuleDialog_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__TraderuleDialog_vue__);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__TraderuleDialog_vue___default.a);

/***/ }),
/* 327 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return gbs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return cbs; });
var env = __webpack_require__.i({"NODE_ENV":"production"});

var gbs = {
	// host: '//slsadmin.api.' + (env.NODE_ENV === 'development' ? 'sls' : 'sailengsi') + '.com',
	host: '', //接口根地址。本地代理到slsadmin.api.sls.com,线上使用的是Nginx代理
	db_prefix: 'sls_admin_', //本地存储的key

	//状态码字段
	api_status_key_field: 'status',
	//状态码value
	api_status_value_field: 200,

	api_data_field: 'data',

	api_custom: {
		404: function (res) {
			this.$store.dispatch('remove_userinfo').then(() => {
				this.$alert(res.status + ',' + res.msg + '！', '登录错误', {
					confirmButtonText: '确定',
					callback: action => {
						this.$router.push('/login');
					}
				});
			});
		}
	}
};

var cbs = {
	/**
  * ajax请求成功，返回的状态码不是200时调用
  * @param  {object} err 返回的对象，包含错误码和错误信息
  */
	statusError(err) {
		console.log('err');
		if (err.status !== 404) {
			this.$message({
				showClose: true,
				message: '返回错误：' + err.msg,
				type: 'error'
			});
		} else {
			this.$store.dispatch('remove_userinfo').then(() => {
				this.$alert(err.status + ',' + err.msg + '！', '登录错误', {
					confirmButtonText: '确定',
					callback: action => {
						this.$router.push('/login');
					}
				});
			});
		}
	},

	/**
  * ajax请求网络出错时调用
  */
	requestError(err) {
		this.$message({
			showClose: true,
			message: '请求错误：' + (err.response ? err.response.status : '') + ',' + (err.response ? err.response.statusText : ''),
			type: 'error'
		});
	}
};



/***/ }),
/* 328 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_i18n_lang__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(10);


/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'head-nav',
    data() {
        return {
            changePassDialog: {
                show: false,
                isModal: true,
                default_value: {},
                labelWidth: "180px",
                rules: {
                    ori_password: [{
                        required: true,
                        message: '旧密码不能为空！',
                        trigger: 'blur'
                    }],
                    new_password: [{
                        required: true,
                        message: '新密码不能为空！',
                        trigger: 'blur'
                    }, {
                        trigger: 'blur',
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请再次输入密码'));
                            } else {
                                if ('' !== this.changePassDialog.default_value.new_password) {
                                    this.$refs["changePass-form"].$refs["form-data"].validateField('confirm_password');
                                }
                                callback();
                            }
                        }
                    }],
                    confirm_password: [{
                        required: true,
                        message: '确认密码不能为空！',
                        trigger: 'blur'
                    }, {
                        trigger: 'blur',
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请再次输入密码'));
                            } else if (value !== this.changePassDialog.default_value.new_password) {
                                callback(new Error('两次输入密码不一致!'));
                            } else {
                                callback();
                            }
                        }
                    }]
                }
            },
            locale: this.$store.state.global.locale,
            langs: __WEBPACK_IMPORTED_MODULE_0_i18n_lang__["a" /* LANGS */]
        };
    },
    mounted() {
        // this.setDialogInfo('access');
        // this.onGetSetting();
    },
    methods: {
        /**
         * 退出登录
         */
        logout() {
            this.$confirm('你确定退出登录么?', '确认退出', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('remove_userinfo').then(() => {
                    this.$router.push('/login');
                });
            });
        },

        /**
         * 修改密码
         * @param  {object} userinfo 当前修改密码的表单信息
         */
        updUserPass(userinfo) {
            this.$refs[userinfo].validate(valid => {
                if (valid) {
                    this.$$api_common_ajax({
                        data: {
                            old_password: this.dialog[userinfo].old_password,
                            password: this.dialog[userinfo].password,
                            password_confirm: this.dialog[userinfo].password_confirm
                        },
                        fn: data => {
                            this.dialog.show_pass = false;
                            this.$message.success('修改成功！');
                        }
                    });
                }
            });
        },

        /**
         * 更改系统默认语言
         * @Author Dannis
         * @param  {[type]} command [description]
         * @return {[type]}         [description]
         */
        handleCommand(command) {
            this.$store.dispatch('update_global_locale', command).then(() => {
                this.locale = command;
                __WEBPACK_IMPORTED_MODULE_1_vue__["default"].config.lang = command;
            });
        }
    }
});

/***/ }),
/* 329 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'left-menu',
    data() {
        return {
            menu_list: [],
            win_size: {
                height: ''
            }
        };
    },
    methods: {
        setSize() {
            this.win_size.height = this.$$lib_$(window).height() + "px";
        },
        toggleMenu() {
            this.$store.dispatch(this.$store.state.leftmenu.menu_flag ? 'set_menu_close' : 'set_menu_open');
        },
        updateCurMenu(route) {
            var route = route || this.$route;
            if (route.matched.length) {
                var rootPath = route.matched[0].path,
                    fullPath = route.path;
                this.$store.dispatch('set_cur_route', {
                    rootPath,
                    fullPath
                });
                var routes = this.$router.options.routes;
                for (var i = 0; i < routes.length; i++) {
                    if (routes[i].path === rootPath && !routes[i].hidden) {
                        this.menu_list = routes[i].children;
                        break;
                    }
                }
            } else {
                this.$router.push('/404');
            }
        }
    },
    created() {
        this.setSize();
        this.$$lib_$(window).resize(() => {
            this.setSize();
        });
        this.updateCurMenu();
    },
    mounted() {
        // console.log(this.$store.state.user.userinfo.access);
    },
    watch: {
        $route(to, from) {
            this.updateCurMenu(to);
        }
    }
});

/***/ }),
/* 330 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Content_vue__ = __webpack_require__(754);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Content_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Content_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Home_vue__ = __webpack_require__(755);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Home_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Home_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__Home_vue___default.a; });
/* unused harmony reexport Content */
/**
 * Created by sailengsi on 2017/5/11.
 */





/***/ }),
/* 331 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__i18n__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_element_ui__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_element_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_element_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_element_ui_lib_theme_default_index_css__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_element_ui_lib_theme_default_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_element_ui_lib_theme_default_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_router___ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_register___ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_store___ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vue_bel_table__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vue_bel_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_vue_bel_table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__App__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__App__);


// element-ui


__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_2_element_ui___default.a);

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].config.productionTip = true;
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].config.devtools = true;





//bel-table

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_7_vue_bel_table___default.a);



new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
    el: '#app',
    router: __WEBPACK_IMPORTED_MODULE_4_router___["a" /* default */],
    store: __WEBPACK_IMPORTED_MODULE_6_store___["a" /* default */],
    template: '<App/>',
    components: { App: __WEBPACK_IMPORTED_MODULE_8__App___default.a }
});

/***/ }),
/* 332 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__methods___ = __webpack_require__(335);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__methods___["a"]; });
//导入自定义的全局混合



/***/ }),
/* 333 */
/***/ (function(module, exports) {

module.exports = {
  string_to_boolean: function (string) {
    return string == 'true' ? true : false;
  },
  boolean_to_string: function (bool) {
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
        c[i] = p[i].constructor === Array ? [] : {};
        this.deepCopy(p[i], c[i]);
      } else {
        c[i] = p[i];
      }
    }
    return c;
  },
  num_zfill(num, size) {
    var s = num + "";
    while (s.length < size) {
      s = "0" + s;
    }
    return s;
  },
  time_format(t) {
    if (isNaN(t)) {
      return "-";
    } else {
      return new Date(t * 1000).toISOString();
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
      return n.toFixed(digits);
    };
  },
  order_format(order_id) {
    [req_uuid, lp, id] = order_id.split('_');
    return req_uuid + "_" + lp + "_" + this.num_zfill(id, 8);
  },
  get_median(values) {
    values.sort((a, b) => {
      return a - b;
    });
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
    return Math.round(num * Math.pow(10, digits));
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
  get_lp_quote_dict(quotes = { 'bid': [], 'ofr': [] }) {
    var lp_quotes = {};
    var bid_lps = [];
    var ofr_lps = [];
    var bid_prices = [];
    var ofr_prices = [];
    for (var item of quotes.bid) {
      bid_lps.push(item.lp);
      bid_prices.push(item.price);
    };
    for (var item of quotes.ofr) {
      ofr_lps.push(item.lp);
      ofr_prices.push(item.price);
    };
    var lps = [].concat(bid_lps).concat(ofr_lps);
    lps.sort();
    for (var lp of lps) {
      var lp_quote = {};
      lp_quotes[lp] = lp_quote;
    };
    for (var side of ['bid', 'ofr']) {
      for (var side_quote of quotes[side]) {
        lp_quotes[side_quote.lp][side + "_price"] = side_quote.price;
        lp_quotes[side_quote.lp][side + "_size"] = side_quote.size;
        lp_quotes[side_quote.lp][side + "_time"] = side_quote.time;
      }
    };
    return lp_quotes;
  }

};

/***/ }),
/* 334 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_js__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__common_js__);

console.log('string', __WEBPACK_IMPORTED_MODULE_0__common_js__["string_to_boolean"], __WEBPACK_IMPORTED_MODULE_0__common_js__["string_to_boolean"]);
/* harmony default export */ __webpack_exports__["a"] = ({
  string_to_boolean: __WEBPACK_IMPORTED_MODULE_0__common_js__["string_to_boolean"],
  boolean_to_string: __WEBPACK_IMPORTED_MODULE_0__common_js__["boolean_to_string"],
  get_global_lps: __WEBPACK_IMPORTED_MODULE_0__common_js__["get_global_lps"],
  get_global_std_symbols: __WEBPACK_IMPORTED_MODULE_0__common_js__["get_global_std_symbols"],
  deepCopy: __WEBPACK_IMPORTED_MODULE_0__common_js__["deepCopy"],
  num_zfill: __WEBPACK_IMPORTED_MODULE_0__common_js__["num_zfill"],
  time_format: __WEBPACK_IMPORTED_MODULE_0__common_js__["time_format"],
  dateTime_format: __WEBPACK_IMPORTED_MODULE_0__common_js__["dateTime_format"],
  num_format: __WEBPACK_IMPORTED_MODULE_0__common_js__["num_format"],
  order_format: __WEBPACK_IMPORTED_MODULE_0__common_js__["order_format"],
  get_median: __WEBPACK_IMPORTED_MODULE_0__common_js__["get_median"],
  is_int: __WEBPACK_IMPORTED_MODULE_0__common_js__["is_int"],
  is_number: __WEBPACK_IMPORTED_MODULE_0__common_js__["is_number"],
  get_pips: __WEBPACK_IMPORTED_MODULE_0__common_js__["get_pips"],
  lp_side: __WEBPACK_IMPORTED_MODULE_0__common_js__["lp_side"],
  get_lp_quote_dict: __WEBPACK_IMPORTED_MODULE_0__common_js__["get_lp_quote_dict"]
});

/***/ }),
/* 335 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Common___ = __webpack_require__(334);

console.log('common', __WEBPACK_IMPORTED_MODULE_0__Common___["a" /* default */]);
/* harmony default export */ __webpack_exports__["a"] = ({
	Common: __WEBPACK_IMPORTED_MODULE_0__Common___["a" /* default */]
});

/***/ }),
/* 336 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cps___ = __webpack_require__(320);
/**
 * Created by sailengsi on 2017/5/11.
 */



// console.log(Echarts);

/* harmony default export */ __webpack_exports__["a"] = ({
  ListData: __WEBPACK_IMPORTED_MODULE_0_cps___["a" /* ListData */],
  FormData: __WEBPACK_IMPORTED_MODULE_0_cps___["b" /* FormData */],
  DialogInfo: __WEBPACK_IMPORTED_MODULE_0_cps___["c" /* DialogInfo */],
  DragDialog: __WEBPACK_IMPORTED_MODULE_0_cps___["d" /* DragDialog */],

  EchartsBarDefault: __WEBPACK_IMPORTED_MODULE_0_cps___["e" /* Echarts */].Bar.Default,
  EchartsBarHorizontal: __WEBPACK_IMPORTED_MODULE_0_cps___["e" /* Echarts */].Bar.Horizontal,
  EchartsLineDefault: __WEBPACK_IMPORTED_MODULE_0_cps___["e" /* Echarts */].Line.Default,
  EchartsPieDefault: __WEBPACK_IMPORTED_MODULE_0_cps___["e" /* Echarts */].Pie.Default
});

/***/ }),
/* 337 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_underscore__);



// console.log(lib__);

/* harmony default export */ __webpack_exports__["a"] = ({
	lib_$: __WEBPACK_IMPORTED_MODULE_0_jquery___default.a,
	lib__: __WEBPACK_IMPORTED_MODULE_1_underscore___default.a
});

/***/ }),
/* 338 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_underscore__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mixins___ = __webpack_require__(332);



console.log(__WEBPACK_IMPORTED_MODULE_1_mixins___["a" /* methods */]);

/* harmony default export */ __webpack_exports__["a"] = ({
	methods: mergeManyObjToOneObj(__WEBPACK_IMPORTED_MODULE_1_mixins___["a" /* methods */])
});

/**
 * 递归提取一个对象中的所有函数
 * @param  {object} obj 对象
 * @return {object}     所有函数都将被包装到这个对象中
 */
function mergeManyObjToOneObj(obj) {
	var newObj = {};
	if (obj && typeof obj === 'object') {
		for (var f in obj) {
			if (typeof obj[f] === 'function') {
				newObj[f] = obj[f];
			}
			if (typeof obj[f] === 'object') {
				Object.assign(newObj, mergeManyObjToOneObj(obj[f]));
			}
		}
	}
	return newObj;
}

/***/ }),
/* 339 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_utils___ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_apis___ = __webpack_require__(300);
/**
 * Created by sailengsi on 2017/5/14.
 */




var plugins = {};
for (var i = 0; i < __WEBPACK_IMPORTED_MODULE_1_apis___["a" /* default */].length; i++) {
	if (typeof __WEBPACK_IMPORTED_MODULE_1_apis___["a" /* default */][i] === 'object' && __WEBPACK_IMPORTED_MODULE_1_apis___["a" /* default */][i].list && Array.isArray(__WEBPACK_IMPORTED_MODULE_1_apis___["a" /* default */][i].list)) {
		for (var j = 0; j < __WEBPACK_IMPORTED_MODULE_1_apis___["a" /* default */][i].list.length; j++) {
			plugins['api_' + __WEBPACK_IMPORTED_MODULE_1_apis___["a" /* default */][i].module + '_' + __WEBPACK_IMPORTED_MODULE_1_apis___["a" /* default */][i].list[j].method] = function (n, m) {
				return function ({
					type = __WEBPACK_IMPORTED_MODULE_1_apis___["a" /* default */][n].list[m].type,
					path = __WEBPACK_IMPORTED_MODULE_1_apis___["a" /* default */][n].list[m].path,
					data,
					fn,
					errFn,
					headers,
					opts
				} = {}) {
					//request[n].list[m].type, request[n].list[m].path, data, fn, opts
					__WEBPACK_IMPORTED_MODULE_0_utils___["b" /* ajax */].call(this, {
						type,
						path,
						data,
						fn,
						errFn,
						headers,
						opts
					});
				};
			}(i, j);
		}
	}
}

// console.log(plugins);

/* harmony default export */ __webpack_exports__["a"] = (plugins);

/***/ }),
/* 340 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_views___ = __webpack_require__(21);
/**
 * Created by sailengsi on 2017/5/11.
 */

// import {
// 	Content
// } from 'layout/';



/* harmony default export */ __webpack_exports__["a"] = ({
	path: 'audit_log',
	name: 'Audit Log',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_views___["l" /* AuditLog */]
});

/***/ }),
/* 341 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_layout___ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__aduitLog__ = __webpack_require__(340);
/**
 * Created by sailengsi on 2017/5/11.
 */





/* harmony default export */ __webpack_exports__["a"] = ({
	path: '/home',
	name: 'home',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_layout___["a" /* Home */],
	redirect: '/home/audit_log',
	leaf: true,
	children: [__WEBPACK_IMPORTED_MODULE_1__aduitLog__["a" /* default */]]
});

/***/ }),
/* 342 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_views___ = __webpack_require__(21);
/**
 * Created by sailengsi on 2017/5/11.
 */

// import {
// 	Content
// } from 'layout/';



/* harmony default export */ __webpack_exports__["a"] = ({
	path: 'current_order',
	name: 'Current Order',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_views___["g" /* CurrentOrder */]
});

/***/ }),
/* 343 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_layout___ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__currentOrder__ = __webpack_require__(342);
/**
 * Created by sailengsi on 2017/5/11.
 */





/* harmony default export */ __webpack_exports__["a"] = ({
	path: '/home',
	name: 'home',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_layout___["a" /* Home */],
	redirect: '/home/current_order',
	leaf: true,
	children: [__WEBPACK_IMPORTED_MODULE_1__currentOrder__["a" /* default */]]
});

/***/ }),
/* 344 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_views___ = __webpack_require__(21);
/**
 * Created by sailengsi on 2017/5/11.
 */

// import {
// 	Content
// } from 'layout/';



/* harmony default export */ __webpack_exports__["a"] = ({
	path: 'diagnosis',
	name: 'Diagnosis',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_views___["b" /* Diagnosis */]
});

/***/ }),
/* 345 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_layout___ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__diagnosis__ = __webpack_require__(344);
/**
 * Created by sailengsi on 2017/5/11.
 */





/* harmony default export */ __webpack_exports__["a"] = ({
	path: '/home',
	name: 'home',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_layout___["a" /* Home */],
	redirect: '/home/diagnosis',
	leaf: true,
	children: [__WEBPACK_IMPORTED_MODULE_1__diagnosis__["a" /* default */]]
});

/***/ }),
/* 346 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_layout___ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lpPosition__ = __webpack_require__(347);
/**
 * Created by sailengsi on 2017/5/11.
 */





/* harmony default export */ __webpack_exports__["a"] = ({
	path: '/home',
	name: 'home',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_layout___["a" /* Home */],
	redirect: '/home/lp_position',
	leaf: true,
	children: [__WEBPACK_IMPORTED_MODULE_1__lpPosition__["a" /* default */]]
});

/***/ }),
/* 347 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_views___ = __webpack_require__(21);
/**
 * Created by sailengsi on 2017/5/11.
 */

// import {
// 	Content
// } from 'layout/';



/* harmony default export */ __webpack_exports__["a"] = ({
	path: 'lp_position',
	name: 'LP Position',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_views___["e" /* LpPosition */]
});

/***/ }),
/* 348 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_layout___ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lpSymbol__ = __webpack_require__(349);
/**
 * Created by sailengsi on 2017/5/11.
 */





/* harmony default export */ __webpack_exports__["a"] = ({
	path: '/home',
	name: 'home',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_layout___["a" /* Home */],
	redirect: '/home/lp_symbol',
	leaf: true,
	children: [__WEBPACK_IMPORTED_MODULE_1__lpSymbol__["a" /* default */]]
});

/***/ }),
/* 349 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_views___ = __webpack_require__(21);
/**
 * Created by sailengsi on 2017/5/11.
 */

// import {
// 	Content
// } from 'layout/';



/* harmony default export */ __webpack_exports__["a"] = ({
	path: 'lp_symbol',
	name: 'LP Symbol',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_views___["j" /* LpSymbol */]
});

/***/ }),
/* 350 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_layout___ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lp__ = __webpack_require__(351);
/**
 * Created by sailengsi on 2017/5/11.
 */





/* harmony default export */ __webpack_exports__["a"] = ({
	path: '/home',
	name: 'home',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_layout___["a" /* Home */],
	redirect: '/home/lp',
	leaf: true,
	children: [__WEBPACK_IMPORTED_MODULE_1__lp__["a" /* default */]]
});

/***/ }),
/* 351 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_views___ = __webpack_require__(21);
/**
 * Created by sailengsi on 2017/5/11.
 */

// import {
// 	Content
// } from 'layout/';



/* harmony default export */ __webpack_exports__["a"] = ({
	path: 'lp',
	name: 'LP',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_views___["k" /* Lp */]
});

/***/ }),
/* 352 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_layout___ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__quoteAdjust__ = __webpack_require__(353);
/**
 * Created by sailengsi on 2017/5/11.
 */





/* harmony default export */ __webpack_exports__["a"] = ({
	path: '/home',
	name: 'home',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_layout___["a" /* Home */],
	redirect: '/home/quote_adjust',
	leaf: true,
	children: [__WEBPACK_IMPORTED_MODULE_1__quoteAdjust__["a" /* default */]]
});

/***/ }),
/* 353 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_views___ = __webpack_require__(21);
/**
 * Created by sailengsi on 2017/5/11.
 */

// import {
// 	Content
// } from 'layout/';



/* harmony default export */ __webpack_exports__["a"] = ({
	path: 'quote_adjust',
	name: 'Quote Adjust',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_views___["d" /* QuoteAdjust */]
});

/***/ }),
/* 354 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_layout___ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__quoteRule__ = __webpack_require__(355);
/**
 * Created by sailengsi on 2017/5/11.
 */





/* harmony default export */ __webpack_exports__["a"] = ({
	path: '/home',
	name: 'home',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_layout___["a" /* Home */],
	redirect: '/home/quote_rule',
	leaf: true,
	children: [__WEBPACK_IMPORTED_MODULE_1__quoteRule__["a" /* default */]]
});

/***/ }),
/* 355 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_views___ = __webpack_require__(21);
/**
 * Created by sailengsi on 2017/5/11.
 */

// import {
// 	Content
// } from 'layout/';



/* harmony default export */ __webpack_exports__["a"] = ({
	path: 'quote_rule',
	name: 'Quote Rule',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_views___["h" /* QuoteRule */]
});

/***/ }),
/* 356 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_layout___ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stdSymbolPosition__ = __webpack_require__(357);
/**
 * Created by sailengsi on 2017/5/11.
 */





/* harmony default export */ __webpack_exports__["a"] = ({
	path: '/home',
	name: 'home',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_layout___["a" /* Home */],
	redirect: '/home/stdsymbol_position',
	leaf: true,
	children: [__WEBPACK_IMPORTED_MODULE_1__stdSymbolPosition__["a" /* default */]]
});

/***/ }),
/* 357 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_views___ = __webpack_require__(21);
/**
 * Created by sailengsi on 2017/5/11.
 */

// import {
// 	Content
// } from 'layout/';



/* harmony default export */ __webpack_exports__["a"] = ({
	path: 'stdsymbol_position',
	name: 'Std Symbol Position',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_views___["c" /* StdSymbolPosition */]
});

/***/ }),
/* 358 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_layout___ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tradeLog__ = __webpack_require__(359);
/**
 * Created by sailengsi on 2017/5/11.
 */





/* harmony default export */ __webpack_exports__["a"] = ({
	path: '/home',
	name: 'home',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_layout___["a" /* Home */],
	redirect: '/home/trade_log',
	leaf: true,
	children: [__WEBPACK_IMPORTED_MODULE_1__tradeLog__["a" /* default */]]
});

/***/ }),
/* 359 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_views___ = __webpack_require__(21);
/**
 * Created by sailengsi on 2017/5/11.
 */

// import {
// 	Content
// } from 'layout/';



/* harmony default export */ __webpack_exports__["a"] = ({
	path: 'trade_log',
	name: 'Trade Log',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_views___["f" /* TradeLog */]
});

/***/ }),
/* 360 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_layout___ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tradeRule__ = __webpack_require__(361);
/**
 * Created by sailengsi on 2017/5/11.
 */





/* harmony default export */ __webpack_exports__["a"] = ({
	path: '/home',
	name: 'home',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_layout___["a" /* Home */],
	redirect: '/home/trade_rule',
	leaf: true,
	children: [__WEBPACK_IMPORTED_MODULE_1__tradeRule__["a" /* default */]]
});

/***/ }),
/* 361 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_views___ = __webpack_require__(21);
/**
 * Created by sailengsi on 2017/5/11.
 */

// import {
// 	Content
// } from 'layout/';



/* harmony default export */ __webpack_exports__["a"] = ({
	path: 'trade_rule',
	name: 'Trade Rule',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_views___["i" /* TradeRule */]
});

/***/ }),
/* 362 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_layout___ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user__ = __webpack_require__(363);
/**
 * Created by sailengsi on 2017/5/11.
 */





/* harmony default export */ __webpack_exports__["a"] = ({
	path: '/home',
	name: 'home',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_layout___["a" /* Home */],
	redirect: '/home/user',
	leaf: true,
	children: [__WEBPACK_IMPORTED_MODULE_1__user__["a" /* default */]]
});

/***/ }),
/* 363 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_views___ = __webpack_require__(21);
/**
 * Created by sailengsi on 2017/5/11.
 */

// import {
// 	Content
// } from 'layout/';



/* harmony default export */ __webpack_exports__["a"] = ({
	path: 'user',
	name: 'Users',
	icon: 'inbox',
	component: __WEBPACK_IMPORTED_MODULE_0_views___["m" /* User */]
});

/***/ }),
/* 364 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutations_types__ = __webpack_require__(117);


/* harmony default export */ __webpack_exports__["a"] = ({
	show_loading: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["a" /* SHOW_LOADING */]);
			resolve();
		});
	},

	hide_loading: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["b" /* HIDE_LOADING */]);
			resolve();
		});
	},

	update_global_context: ({
		commit
	}, {
		lps,
		std_symbols
	}) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["c" /* UPDATE_GLOBAL_CONTEXT */], {
				lps,
				std_symbols
			});
			resolve();
		});
	},
	// update_global_user_info: ({
	// 	commit
	// }, {
	//    	user_id,
	//    	username,
	//    	role,
	//    	rights
	// }) => {
	// 	return new Promise((resolve, reject) => {
	// 		commit(types.UPDATE_GLOBAL_USER_INFO, username);
	// 		resolve()
	// 	});
	// },
	update_global_roles: ({
		commit
	}, roles) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["d" /* UPDATE_GLOBAL_ROLES */], roles);
			resolve();
		});
	},
	update_global_quote_types: ({
		commit
	}, quote_types) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["e" /* UPDATE_GLOBAL_QUOTE_TYPES */], quote_types);
			resolve();
		});
	},
	update_global_sources: ({
		commit
	}, sources) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["f" /* UPDATE_GLOBAL_SOURCES */], sources);
			resolve();
		});
	},
	update_global_lps: ({
		commit
	}, lps) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["g" /* UPDATE_GLOBAL_LPS */], lps);
			resolve();
		});
	},
	update_global_std_symbols: ({
		commit
	}, std_symbols) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["h" /* UPDATE_GLOBAL_STD_SYMBOLS */], std_symbols);
			resolve();
		});
	},
	update_global_zIndex: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["i" /* UPDATE_GLOBAL_ZINDEX */]);
			resolve();
		});
	},
	update_global_locale: ({ commit
	}, locale) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["j" /* UPDATE_GLOBAL_LOCALE */], locale);
			resolve();
		});
	}
});

/***/ }),
/* 365 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 366 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mutations__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getters__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getters___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__getters__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(364);





/* harmony default export */ __webpack_exports__["a"] = ({
    state: __WEBPACK_IMPORTED_MODULE_0__state__["a" /* default */],
    mutations: __WEBPACK_IMPORTED_MODULE_1__mutations__["a" /* default */],
    getters: __WEBPACK_IMPORTED_MODULE_2__getters___default.a,
    actions: __WEBPACK_IMPORTED_MODULE_3__actions__["a" /* default */]
});

/***/ }),
/* 367 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutations_types__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_utils___ = __webpack_require__(37);




/* harmony default export */ __webpack_exports__["a"] = ({
    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["a" /* SHOW_LOADING */]](state) {
        state.ajax_loading = true;
    },

    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["b" /* HIDE_LOADING */]](state) {
        state.ajax_loading = false;
    },
    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["c" /* UPDATE_GLOBAL_CONTEXT */]](state, global_context) {
        state.context = global_context;
        __WEBPACK_IMPORTED_MODULE_1_utils___["a" /* store */].set('context', state.context);
    },

    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["k" /* UPDATE_GLOBAL_USER_INFO */]](state, global_user_info) {
        state.user_info = global_user_info;
        __WEBPACK_IMPORTED_MODULE_1_utils___["a" /* store */].set('user_info', state.user_info);
    },
    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["d" /* UPDATE_GLOBAL_ROLES */]](state, global_roles) {
        state.roles = global_roles;
        __WEBPACK_IMPORTED_MODULE_1_utils___["a" /* store */].set('roles', state.roles);
    },
    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["e" /* UPDATE_GLOBAL_QUOTE_TYPES */]](state, global_quote_types) {
        state.quote_types = global_quote_types;
        __WEBPACK_IMPORTED_MODULE_1_utils___["a" /* store */].set('quote_types', state.quote_types);
    },
    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["f" /* UPDATE_GLOBAL_SOURCES */]](state, global_sources) {
        state.sources = global_sources;
        __WEBPACK_IMPORTED_MODULE_1_utils___["a" /* store */].set('sources', state.sources);
    },
    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["g" /* UPDATE_GLOBAL_LPS */]](state, global_lps) {
        state.lps = global_lps;
        __WEBPACK_IMPORTED_MODULE_1_utils___["a" /* store */].set('lps', state.lps);
    },
    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["h" /* UPDATE_GLOBAL_STD_SYMBOLS */]](state, global_std_symbols) {
        state.std_symbols = global_std_symbols;
        __WEBPACK_IMPORTED_MODULE_1_utils___["a" /* store */].set('std_symbols', state.std_symbols);
    },

    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["i" /* UPDATE_GLOBAL_ZINDEX */]](state) {
        state.dialog_zIndex += 1;
        // store.set('context', state.context);
    },
    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["j" /* UPDATE_GLOBAL_LOCALE */]](state, locale) {
        state.locale = locale;
        __WEBPACK_IMPORTED_MODULE_1_utils___["a" /* store */].set('locale', state.locale);
    }
});

/***/ }),
/* 368 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_utils___ = __webpack_require__(37);


/* harmony default export */ __webpack_exports__["a"] = ({
    ajax_loading: false,
    context: __WEBPACK_IMPORTED_MODULE_0_utils___["a" /* store */].get('context') || {},
    user_info: __WEBPACK_IMPORTED_MODULE_0_utils___["a" /* store */].get('user_info'),
    roles: ["Admin", "RulesEditor", "Whitelabel", "WhitelabelPro"],
    quote_types: ["asian", "spread", "raw", "delta"],
    sources: ['risehills', 'solid'],
    lps: __WEBPACK_IMPORTED_MODULE_0_utils___["a" /* store */].get('lps'),
    std_symbols: __WEBPACK_IMPORTED_MODULE_0_utils___["a" /* store */].get('std_symbols'),
    dialog_zIndex: 1000,
    locale: __WEBPACK_IMPORTED_MODULE_0_utils___["a" /* store */].get('locale') || 'en-US',
    ord_status: {
        0: "ok",
        1: "confirm_nothing",
        2: "request_error",
        3: "no_shoplist",
        4: "order_running",
        5: "valve_overload",
        6: "valve_closed",
        7: "valve_error",
        8: "position_existed",
        9: "mend",
        10: "no_position_existed",
        11: "mt4 direct"
    },
    limit_order_types: ['Instant', 'Market', 'Pending', 'Stopout', 'StopLoss', 'TakePro']
});

/***/ }),
/* 369 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutations_types__ = __webpack_require__(118);


/* harmony default export */ __webpack_exports__["a"] = ({
    set_menu_open: ({
        commit
    }) => {
        commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["a" /* SET_MENU_OPEN */]);
    },
    set_menu_close: ({
        commit
    }) => {
        commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["b" /* SET_MENU_CLOSE */]);
    }
});

/***/ }),
/* 370 */
/***/ (function(module, exports) {

module.exports = {
    // getCartList(state) {
    //     return state.cartList;
    // }
};

/***/ }),
/* 371 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mutations__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getters__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getters___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__getters__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(369);





/* harmony default export */ __webpack_exports__["a"] = ({
    state: __WEBPACK_IMPORTED_MODULE_0__state__["a" /* default */],
    mutations: __WEBPACK_IMPORTED_MODULE_1__mutations__["a" /* default */],
    getters: __WEBPACK_IMPORTED_MODULE_2__getters___default.a,
    actions: __WEBPACK_IMPORTED_MODULE_3__actions__["a" /* default */]
});

/***/ }),
/* 372 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutations_types__ = __webpack_require__(118);


/* harmony default export */ __webpack_exports__["a"] = ({
    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["a" /* SET_MENU_OPEN */]](state) {
        state.width = '190px';
        state.menu_flag = true;
    },
    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["b" /* SET_MENU_CLOSE */]](state) {
        state.width = '50px';
        state.menu_flag = false;
    }
});

/***/ }),
/* 373 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    //左侧菜单宽度
    width: '210px',
    menu_flag: true
});

/***/ }),
/* 374 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutations_types__ = __webpack_require__(119);


/* harmony default export */ __webpack_exports__["a"] = ({
    set_cur_route: ({
        commit
    }, paths) => {
        commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["a" /* SET_CUR_ROUTE */], paths);
    }
});

/***/ }),
/* 375 */
/***/ (function(module, exports) {

module.exports = {
    // getCartList(state) {
    //     return state.cartList;
    // }
};

/***/ }),
/* 376 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mutations__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getters__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getters___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__getters__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(374);





/* harmony default export */ __webpack_exports__["a"] = ({
    state: __WEBPACK_IMPORTED_MODULE_0__state__["a" /* default */],
    mutations: __WEBPACK_IMPORTED_MODULE_1__mutations__["a" /* default */],
    getters: __WEBPACK_IMPORTED_MODULE_2__getters___default.a,
    actions: __WEBPACK_IMPORTED_MODULE_3__actions__["a" /* default */]
});

/***/ }),
/* 377 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutations_types__ = __webpack_require__(119);


/* harmony default export */ __webpack_exports__["a"] = ({
    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["a" /* SET_CUR_ROUTE */]](state, paths) {
        // console.log(paths);
        state.headerCurRouter = paths.rootPath;
        state.leftCurRouter = paths.fullPath;
    }
});

/***/ }),
/* 378 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    //头部当前路由，匹配高亮所用
    headerCurRouter: '',

    //左侧当前路由，匹配高亮所用
    leftCurRouter: ''
});

/***/ }),
/* 379 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutations_types__ = __webpack_require__(120);


/* harmony default export */ __webpack_exports__["a"] = ({
	update_trade_rules: ({
		commit
	}, trade_rules) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["a" /* UPDATE_TRADE_RULES */], trade_rules);
			resolve();
		});
	},

	update_remark_dialogs: ({
		commit
	}, remark_dialog) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["b" /* UPDATE_REMARK_DIALOGS */], remark_dialog);
			resolve();
		});
	},
	delete_remark_dialogs: ({
		commit
	}, dialog_id) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["c" /* DELETE_REMARK_DIALOGS */], dialog_id);
			resolve();
		});
	},
	update_traderule_remark: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["c" /* DELETE_REMARK_DIALOGS */]);
			resolve();
		});
	},

	update_copy_to_new_group_dialogs: ({
		commit
	}, copy_to_new_goup_dialog) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["d" /* UPDATE_COPY_TO_NEW__GROUP_DIALOGS */], copy_to_new_goup_dialog);
			resolve();
		});
	},
	delete_copy_to_new_group_dialogs: ({
		commit
	}, dialog_id) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["e" /* DELETE_COPY_TO_NEW__GROUP_DIALOGS */], dialog_id);
			resolve();
		});
	},

	update_traderule_table: ({
		commit
	}, flag) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["f" /* UPDATE_TRADERULE_TABLE */], flag);
			resolve();
		});
	},
	update_view_rules_dialogs: ({
		commit
	}, view_rules_dialog) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["g" /* UPDATE_VIEW_RULES_DIALOGS */], view_rules_dialog);
			resolve();
		});
	},
	delete_view_rules_dialogs: ({
		commit
	}, view_rules_dialog_id) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["h" /* DELETE_VIEW_RULES_DIALOGS */], view_rules_dialog_id);
			resolve();
		});
	}

});

/***/ }),
/* 380 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 381 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mutations__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getters__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getters___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__getters__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(379);





/* harmony default export */ __webpack_exports__["a"] = ({
    state: __WEBPACK_IMPORTED_MODULE_0__state__["a" /* default */],
    mutations: __WEBPACK_IMPORTED_MODULE_1__mutations__["a" /* default */],
    getters: __WEBPACK_IMPORTED_MODULE_2__getters___default.a,
    actions: __WEBPACK_IMPORTED_MODULE_3__actions__["a" /* default */]
});

/***/ }),
/* 382 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutations_types__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(10);


/* harmony default export */ __webpack_exports__["a"] = ({
    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["a" /* UPDATE_TRADE_RULES */]](state, trade_rules) {
        console.log('remark_dialog', trade_rules);
        // Vue.set(state.trade_rules,remark_dialo.key,remark_dialog.config);
        state.trade_rules = trade_rules;
    },

    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["b" /* UPDATE_REMARK_DIALOGS */]](state, remark_dialog) {
        console.log('remark_dialog', remark_dialog);
        __WEBPACK_IMPORTED_MODULE_1_vue__["default"].set(state.remark_dialogs, remark_dialog.key, remark_dialog.config);
    },
    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["c" /* DELETE_REMARK_DIALOGS */]](state, remark_dialog_id) {
        for (var k in state.remark_dialogs) {
            if (remark_dialog_id === k) {
                __WEBPACK_IMPORTED_MODULE_1_vue__["default"].delete(state.remark_dialogs, k);
            }
        }
    },
    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["i" /* UPDATE_TRADERULE_REMARK */]](state) {
        state.update_traderule_remark = true;
    },

    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["d" /* UPDATE_COPY_TO_NEW__GROUP_DIALOGS */]](state, copy_to_new_group_dialog) {
        __WEBPACK_IMPORTED_MODULE_1_vue__["default"].set(state.copy_to_new_group_dialogs, copy_to_new_group_dialog.key, copy_to_new_group_dialog.config);
    },

    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["e" /* DELETE_COPY_TO_NEW__GROUP_DIALOGS */]](state, copy_to_new_group_dialog_id) {
        for (var k in state.copy_to_new_group_dialogs) {
            if (copy_to_new_group_dialog_id === k) {
                __WEBPACK_IMPORTED_MODULE_1_vue__["default"].delete(state.copy_to_new_group_dialogs, k);
            }
        }
    },

    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["f" /* UPDATE_TRADERULE_TABLE */]](state, flag) {
        state.update_traderule_table = flag;
    },
    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["g" /* UPDATE_VIEW_RULES_DIALOGS */]](state, view_rules_dialog) {
        __WEBPACK_IMPORTED_MODULE_1_vue__["default"].set(state.view_rules_dialogs, view_rules_dialog.key, view_rules_dialog.config);
    },
    [__WEBPACK_IMPORTED_MODULE_0__mutations_types__["h" /* DELETE_VIEW_RULES_DIALOGS */]](state, view_rules_dialog_id) {
        for (var k in state.view_rules_dialogs) {
            console.log('view_rules_dialog_id', view_rules_dialog_id);
            if (view_rules_dialog_id === k) {
                __WEBPACK_IMPORTED_MODULE_1_vue__["default"].delete(state.view_rules_dialogs, k);
            }
        }
    }
});

/***/ }),
/* 383 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_utils___ = __webpack_require__(37);


/* harmony default export */ __webpack_exports__["a"] = ({
    trade_rules: [],
    remark_dialogs: {},
    update_traderule_remark: false,
    update_traderule_table: false,
    copy_to_new_group_dialogs: {},
    view_rules_dialogs: {}
});

/***/ }),
/* 384 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutations_types__ = __webpack_require__(121);


/* harmony default export */ __webpack_exports__["a"] = ({
	update_userinfo: ({
		commit
	}, {
		userinfo
	}) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["a" /* UPDATE_USERINFO */], {
				userinfo
			});
			resolve();
		});
	},

	remove_userinfo: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["b" /* REMOVE_USERINFO */]);
			resolve();
		});
	},

	update_remumber: ({
		commit
	}, {
		remumber_flag,
		remumber_login_info
	}) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["c" /* UPDATE_REMUMBER */], {
				remumber_flag,
				remumber_login_info
			});
			resolve();
		});
	},

	remove_remumber: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(__WEBPACK_IMPORTED_MODULE_0__mutations_types__["d" /* REMOVE_REMUMBER */]);
			resolve();
		});
	}
});

/***/ }),
/* 385 */
/***/ (function(module, exports) {

module.exports = {
	getUserinfo(state) {
		return state.userinfo;
	},

	getToken(state) {
		return state.userinfo && state.userinfo.token ? state.userinfo.token : '';
	},

	getRemumber(state) {
		return state.remumber;
	}
};

/***/ }),
/* 386 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mutations__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getters__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getters___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__getters__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(384);





/* harmony default export */ __webpack_exports__["a"] = ({
    state: __WEBPACK_IMPORTED_MODULE_0__state__["a" /* default */],
    mutations: __WEBPACK_IMPORTED_MODULE_1__mutations__["a" /* default */],
    getters: __WEBPACK_IMPORTED_MODULE_2__getters___default.a,
    actions: __WEBPACK_IMPORTED_MODULE_3__actions__["a" /* default */]
});

/***/ }),
/* 387 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutations_types__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_utils___ = __webpack_require__(37);




/* harmony default export */ __webpack_exports__["a"] = ({
	[__WEBPACK_IMPORTED_MODULE_0__mutations_types__["a" /* UPDATE_USERINFO */]](state, user_db) {
		state.userinfo = user_db.userinfo || {};
		console.log('state', user_db.userinfo);
		__WEBPACK_IMPORTED_MODULE_1_utils___["a" /* store */].set('userinfo', state.userinfo);
	},

	[__WEBPACK_IMPORTED_MODULE_0__mutations_types__["b" /* REMOVE_USERINFO */]](state) {
		__WEBPACK_IMPORTED_MODULE_1_utils___["a" /* store */].remove('userinfo');
		state.userinfo = {};
	},

	[__WEBPACK_IMPORTED_MODULE_0__mutations_types__["c" /* UPDATE_REMUMBER */]](state, user_db) {
		state.remumber.remumber_flag = user_db.remumber_flag;
		state.remumber.remumber_login_info = user_db.remumber_login_info;

		__WEBPACK_IMPORTED_MODULE_1_utils___["a" /* store */].set('remumber_flag', state.remumber.remumber_flag);
		__WEBPACK_IMPORTED_MODULE_1_utils___["a" /* store */].set('remumber_login_info', state.remumber.remumber_login_info);
	},

	[__WEBPACK_IMPORTED_MODULE_0__mutations_types__["d" /* REMOVE_REMUMBER */]](state) {
		__WEBPACK_IMPORTED_MODULE_1_utils___["a" /* store */].remove('remumber_flag');
		__WEBPACK_IMPORTED_MODULE_1_utils___["a" /* store */].remove('remumber_login_info');

		state.remumber.remumber_flag = false;
		state.remumber.remumber_login_info = {
			username: '',
			token: ''
		};
	}
});

/***/ }),
/* 388 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_utils___ = __webpack_require__(37);


/* harmony default export */ __webpack_exports__["a"] = ({
	//登录成功后的用户信息
	userinfo: __WEBPACK_IMPORTED_MODULE_0_utils___["a" /* store */].get('userinfo') || {},

	//记住密码相关信息，现在暂且只做记住一个账号密码
	//后期：每次登录成功一次，就缓存到列表中，然后在登录表单，输入时，会出现下拉列表选择之前登录过得用户
	remumber: {
		remumber_flag: __WEBPACK_IMPORTED_MODULE_0_utils___["a" /* store */].get('remumber_flag') ? true : false,
		remumber_login_info: __WEBPACK_IMPORTED_MODULE_0_utils___["a" /* store */].get('remumber_login_info') || {
			username: '',
			token: ''
		}
	}
});

/***/ }),
/* 389 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_axios__ = __webpack_require__(721);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_config___ = __webpack_require__(116);




__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_2_vue_axios___default.a, __WEBPACK_IMPORTED_MODULE_1_axios___default.a);

// 导入封装的回调函数


// 动态设置本地和线上接口域名
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].axios.defaults.baseURL = __WEBPACK_IMPORTED_MODULE_3_config___["a" /* gbs */].host;

/**
 * 封装axios的通用请求
 * @param  {string}   type      get或post
 * @param  {string}   url       请求的接口URL
 * @param  {object}   data      传的参数，没有则传空对象
 * @param  {Function} fn        回调函数
 * @param  {boolean}   tokenFlag 是否需要携带token参数，为true，不需要；false，需要。一般除了登录，都需要
 */
/* harmony default export */ __webpack_exports__["a"] = (function ({
	type,
	path,
	data,
	fn,
	errFn,
	tokenFlag,
	headers,
	opts
} = {}) {

	var options = {
		method: type,
		url: path,
		headers: headers && typeof headers === 'object' ? headers : {}
	};

	//检测接口权限
	var api_flag = true;
	// if (options.url && options.url.indexOf(gbs.host) && this.$store.state.user.userinfo.access_status === 1) {
	// 	var url         = options.url.replace(gbs.host, '');
	// 	var api_routers = this.$store.state.user.userinfo.api_routers;
	// 	if (!api_routers || !api_routers.constructor === Object || !api_routers[url]) {
	// 		api_flag = false;
	// 	}
	// }

	if (api_flag === true) {
		options[type === 'get' ? 'params' : 'data'] = data;

		// 分发显示加载样式任务
		this.$store.dispatch('show_loading');

		// if (tokenFlag !== true) {
		// 	//如果你们的后台不会接受headers里面的参数，打开这个注释，即实现token通过普通参数方式传
		// 	// data.token = this.$store.state.user.userinfo.token;

		// 	options.headers.token = this.$store.state.user.userinfo.token;
		// }

		//axios内置属性均可写在这里
		if (opts && typeof opts === 'object') {
			for (var f in opts) {
				options[f] = opts[f];
			}
		}

		// console.log(options);

		//发送请求
		__WEBPACK_IMPORTED_MODULE_0_vue__["default"].axios(options).then(res => {
			this.$store.dispatch('hide_loading');
			console.log('res', res);
			if (res[__WEBPACK_IMPORTED_MODULE_3_config___["a" /* gbs */].api_status_key_field] === __WEBPACK_IMPORTED_MODULE_3_config___["a" /* gbs */].api_status_value_field) {
				if (__WEBPACK_IMPORTED_MODULE_3_config___["a" /* gbs */].api_data_field) {
					fn(res[__WEBPACK_IMPORTED_MODULE_3_config___["a" /* gbs */].api_data_field]);
				} else {
					fn(res.data);
				}
			} else {
				if (__WEBPACK_IMPORTED_MODULE_3_config___["a" /* gbs */].api_custom[res.data[__WEBPACK_IMPORTED_MODULE_3_config___["a" /* gbs */].api_status_key_field]]) {
					__WEBPACK_IMPORTED_MODULE_3_config___["a" /* gbs */].api_custom[res.data[__WEBPACK_IMPORTED_MODULE_3_config___["a" /* gbs */].api_status_key_field]].call(this, res.data);
				} else {
					console.log('res1', res);
					if (errFn) {
						console.log('res2', res);
						errFn.call(this, res.data);
					} else {
						__WEBPACK_IMPORTED_MODULE_3_config___["b" /* cbs */].statusError.call(this, res.data);
					}
				}
			}
		}).catch(err => {
			console.dir(err);
			this.$store.dispatch('hide_loading');
			if (errFn) {
				console.log('this', this);
				errFn.call(this, err);
			} else {
				__WEBPACK_IMPORTED_MODULE_3_config___["b" /* cbs */].requestError.call(this, err);
			}
			// cbs.requestError.call(this, err);
		});
	} else {
		this.$alert('您没用权限请求该接口！', '请求错误', {
			confirmButtonText: '确定',
			type: 'warning'
		});
	}
});;

/***/ }),
/* 390 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_js__ = __webpack_require__(389);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */]);

/***/ }),
/* 391 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store_js__ = __webpack_require__(392);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__store_js__["a" /* default */]);

/***/ }),
/* 392 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_config___ = __webpack_require__(116);


class Store {
    constructor() {
        this.store = window.localStorage;
        this.prefix = __WEBPACK_IMPORTED_MODULE_0_config___["a" /* gbs */].db_prefix;
    }
    set(key, value, fn) {
        try {
            value = JSON.stringify(value);
        } catch (e) {
            value = value;
        }

        this.store.setItem(this.prefix + key, value);

        fn && fn();
    }
    get(key, fn) {
        if (!key) {
            throw new Error('没有找到key。');
            return;
        }
        if (typeof key === 'object') {
            throw new Error('key不能是一个对象。');
            return;
        }
        var value = this.store.getItem(this.prefix + key);
        if (value !== null) {
            try {
                value = JSON.parse(value);
            } catch (e) {
                value = value;
            }
        }

        return value;
    }
    remove(key) {
        this.store.removeItem(this.prefix + key);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (new Store());

/***/ }),
/* 393 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by sailengsi on 2017/5/11.
 */

/**
 * 把字符串驼峰转用特殊符号隔开
 * @param string
 * @returns {string}
 * @constructor
 */
/* harmony default export */ __webpack_exports__["a"] = (function (string, type) {
	var arr = string.split(''),
	    tempArr = string.split(''),
	    type = type || '-',
	    name = '';

	for (var i = 0; i < tempArr.length; i++) {
		if (/[A-Z]/.test(tempArr[i]) && i > 0) {
			arr.splice(i, 0, type);
		}
	}
	name = arr.join('');
	return name.toLowerCase();
});

/***/ }),
/* 394 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__humpToLowercase__ = __webpack_require__(393);
/**
 * Created by sailengsi on 2017/5/11.
 */



/* unused harmony default export */ var _unused_webpack_default_export = ({
  humpToLowercase: __WEBPACK_IMPORTED_MODULE_0__humpToLowercase__["a" /* default */]
});

/***/ }),
/* 395 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'audit_log',
  data() {
    return {
      nowTime: '',
      tableData: [],
      pagination: {
        current_page: 1,
        total: 0,
        page_size: 12,
        page_sizes: [3, 9, 12, 24],
        layout: "total, sizes, prev, pager, next, jumper"
      },
      page_func_name: 'audit_log.page_log'
    };
  },
  computed: {
    tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.tableData,
              maxHeight: '100%',
              defaultSort: { prop: 'std_symbol' }
            }
          },
          columns: [{
            attr: {
              prop: 'log_id',
              label: this.$t('log_id'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'username',
              label: this.$t('username'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'api',
              label: this.$t('api'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'request',
              label: this.$t('request'),
              width: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'status',
              label: this.$t('status'),
              width: 180,
              sortable: true,
              align: 'center',
              scopedSlot: 'status'
            }
          }, {
            attr: {
              prop: 'remote_ip',
              label: this.$t('ip'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'create_time',
              label: this.$t('time'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }]
        };
      }
    }
  },
  methods: {
    /*
    */
    onChangeCurrentPage(page) {
      this.pagination.current_page = page;
      this.find_page_aduitLog();
    },
    onChangePageSize(page_size) {
      this.pagination.page_size = page_size;
      this.find_page_aduitLog();
    },
    find_page_aduitLog() {
      this.$$api_common_ajax({
        data: {
          func_name: 'audit_log.page_log',
          args: [this.pagination.current_page, this.pagination.page_size],
          kwargs: {}
        },
        fn: data => {
          this.tableData = data[0];
          this.pagination.total = data[1];
        },
        errFn: err => {
          this.$message.error(err.msg);
        }
      });
    },

    init() {
      this.find_page_aduitLog();
      this.nowTime = new Date().toGMTString();
    }

  },
  mounted() {
    this.init();
  }
});

/***/ }),
/* 396 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AuditLog_vue__ = __webpack_require__(756);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AuditLog_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__AuditLog_vue__);
/**
 * Created by sailengsi on 2017/5/10.
 */



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__AuditLog_vue___default.a);

/***/ }),
/* 397 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'current_order',
  data() {
    return {
      timer_interval_id: void 0,
      next_fresh_time: void 0,
      refresh_enable: 'true',
      data_loaded: true,
      remain_sec: void 0,
      refresh_seconds: 5,

      lp_orders: [],
      trade_logs: [],
      add_position: {
        show: false,
        title: {
          text: 'Add position'
        }
      },
      del_position: {
        show: false,
        title: {
          text: 'Delete position'
        }
      },
      nowTime: '',
      tableData: [],
      pagination: {
        current_page: 1,
        total: 0,
        page_size: 12,
        page_sizes: [3, 9, 12, 24],
        layout: "total, sizes, prev, pager, next, jumper"
      },
      keyValue: 1,
      form_dialog_show: true,
      page_func_name: 'router_api.page_positions'
    };
  },
  computed: {
    tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.tableData,
              maxHeight: '100%',
              defaultSort: { prop: 'order_id', order: 'descending' }
            }
          },
          columns: [{
            attr: {
              prop: 'source',
              label: this.$t('source'),
              minWidth: 80,
              // scopedSlot: 'date',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'order_id',
              label: this.$t('OrdID'),
              minWidth: 80,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'trade_log.request.group',
              label: this.$t('Group'),
              minWidth: 120,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'trade_log.request.login',
              label: 'Client',
              width: 80,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'std_symbol',
              label: 'Symbol',
              width: 80,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'status',
              label: 'status',
              minWidth: 60,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'side',
              label: 'side',
              minWidth: 60,
              align: 'center',
              formatter(item) {
                if (item.trade_log.request.settle == 0) {
                  if (item.trade_log.request.cmd == 0) {
                    return 'OB';
                  } else {
                    return 'OS';
                  }
                } else {
                  if (item.trade_log.request.cmd == 0) {
                    return 'SS';
                  } else {
                    return 'SB';
                  }
                };
              }
            }
          }, {
            attr: {
              prop: 'order_size',
              label: this.$t('Order Size'),
              minWidth: 80,
              align: 'center',
              formatter(item) {
                return item.quantity / item.trade_log.request.contract_size;
              }
            }
          }, {
            attr: {
              prop: 'bbook_size',
              label: this.$t('B Book Size'),
              minWidth: 90,
              align: 'center',
              formatter(item) {
                return item.bbook_quantity / item.trade_log.request.contract_size;
              }
            }
          }, {
            attr: {
              prop: 'trade_log.request.contract_size',
              label: this.$t('Contract Size'),
              minWidth: 100,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'RSES',
              // label: this.$t('Req Size/Exec Size'),
              renderHeader(createElement, { column }) {
                if (this.$store.state.global.locale == 'en-US') {
                  return createElement('div', ['Req Size/', createElement('br'), 'Exec Size']);
                } else {
                  return createElement('div', ['请求量/', createElement('br'), '执行量']);
                }
              },
              minWidth: 80,
              align: 'center',
              formatter(item) {
                return item.trade_log.request.size + '/' + item.trade_log.confirm.size;
              }
            }
          }, {
            attr: {
              prop: 'trade_log.confirm.price',
              label: this.$t('Exec Price'),
              minWidth: 80,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'slippage',
              label: this.$t('slippage'),
              minWidth: 50,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'trade_log.trade_rule.attributes.coverage',
              label: this.$t('Coverage'),
              minWidth: 80,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'lp_exec_orders',
              label: this.$t('LP exec orders'),
              minWidth: 80,
              align: 'center',
              scopedSlot: 'lp_exec_orders'
            }
          }, {
            attr: {
              prop: 'cost',
              label: this.$t('cost'),
              minWidth: 80,
              align: 'center',
              formatter(item) {
                return parseInt((item.trade_log.end_time - item.trade_log.start_time) * 1000) + "ms";
              }
            }
          }, {
            attr: {
              prop: 'time',
              label: this.$t('Time'),
              minWidth: 150,
              align: 'center',
              formatter(item) {
                return new Date((item.trade_log.time + 8 * 3600) * 1000).toISOString();
              }
            }
          }, {
            attr: {
              prop: 'done',
              label: this.$t('Done'),
              minWidth: 50,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'operation',
              label: this.$t('Operation'),
              minWidth: 80,
              scopedSlot: 'detail',
              align: 'center'
            }
          }]
        };
      }
    }
  },
  methods: {

    interval_check() {
      var remain_mil_sec;
      if (this.refresh_enable === 'false') {
        this.remain_sec = "-";
        return;
      };
      if (this.next_fresh_time && !this.data_loaded) {
        remain_mil_sec = this.next_fresh_time - new Date().getTime();
        if (remain_mil_sec <= 0) {
          this.remain_sec = '0';
          this.load_data();
        } else {
          this.remain_sec = parseInt(remain_mil_sec * 0.001);
        }
      }
    },
    schedule_next_request() {
      this.next_fresh_time = new Date().getTime() + this.refresh_seconds * 1000;
      this.data_loaded = false;
    },
    changeSwitch(val) {
      if (val === 'true') {
        this.remain_sec = "0";
      }
      if (val === 'false') {
        this.remain_sec = "-";
      }
    },

    //

    onAddPosition() {
      this.add_position.show = true;
    },
    onDeletePosition() {
      this.del_position.show = true;
    },
    onCloseOnlyDialog(type) {
      this[type].show = false;
    },
    onCloseTradeLog(index) {
      this.trade_logs.splice(index, 1);
    },

    onDetail(row) {
      var config = row.trade_log;
      var id = row.order_id;
      var title = {
        text: 'Trade Log' + row.order_id
      };
      var trade_log = {
        title,
        config,
        id
      };
      if (this.isDialogExist(this.trade_logs, row) == false) {
        this.trade_logs.push(trade_log);
      };
    },
    onLPOrdersDetail(row) {
      var title = {
        text: '#' + row.order_id + ' LP Orders Settle:' + row.trade_log.request.settle
      };
      var id = row.order_id;
      var config = row.trade_log;
      var lp_order = {
        title,
        config,
        id
      };
      if (this.isDialogExist(this.lp_orders, lp_order) == false) {
        this.lp_orders.push(lp_order);
      }
    },

    onCloseLpOrder(index) {
      this.lp_orders.splice(index, 1);
    },
    onChangeCurrentPage(page) {
      this.pagination.current_page = page;
      this.getCurrentPageTable();
    },
    onChangePageSize(page_size) {
      this.pagination.page_size = page_size;
      this.getCurrentPageTable();
    },
    getCurrentPageTable() {
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.page_positions',
          args: [this.pagination.current_page, this.pagination.page_size],
          kwargs: {}
        },
        fn: data => {
          this.tableData = data[0];
          this.pagination.total = data[1];
          this.data_loaded = true;
        },
        errFn: err => {
          this.$message.error(err.msg);
        }
      });
    },
    load_data() {
      this.getCurrentPageTable();
      this.schedule_next_request();
    },
    init() {
      this.timer_interval_id = setInterval(() => {
        this.interval_check();
      }, 1000);
      this.load_data();
      this.nowTime = new Date().toGMTString();
    }

  },
  mounted() {
    this.init();
  },
  beforeRouteLeave(to, from, next) {
    if (this.timer_interval_id) {
      clearInterval(this.timer_interval_id);
    }
    next();
  }
});

/***/ }),
/* 398 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CurrentOrder_vue__ = __webpack_require__(757);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CurrentOrder_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__CurrentOrder_vue__);
/**
 * Created by sailengsi on 2017/5/10.
 */



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__CurrentOrder_vue___default.a);

/***/ }),
/* 399 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'dialognosis',
  data() {
    return {
      log_value: '',
      bridge_value: '',
      bridge_status: ''
    };
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
      });
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
      });
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
  '$route'(to, from) {}
});

/***/ }),
/* 400 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dialognosis_vue__ = __webpack_require__(758);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dialognosis_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Dialognosis_vue__);
/**
 * Created by sailengsi on 2017/5/10.
 */



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__Dialognosis_vue___default.a);

/***/ }),
/* 401 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by sailengsi on 2017/5/11.
 */
/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'login',
	data() {
		return {
			winSize: {
				width: '',
				height: ''
			},

			formOffset: {
				position: 'absolute',
				left: '',
				top: ''
			},
			login_actions: {
				disabled: false
			},
			data: {
				username: '',
				password: ''
				// token: ''
			},

			rule_data: {
				username: [{
					validator: (rule, value, callback) => {
						if (value === '') {
							callback(new Error('请输入用户名'));
						} else {
							if (/^[a-zA-Z0-9_-]{1,16}$/.test(value)) {
								callback();
							} else {
								callback(new Error('用户名至少6位,由大小写字母和数字,-,_组成'));
							}
						}
					},
					trigger: 'blur'
				}]
				// password: [{
				// 	validator: (rule, value, callback) => {
				// 		if (value === '') {
				// 			callback(new Error('请输入密码'));
				// 		} else {
				// 			if (!(/^[a-zA-Z0-9_-]{6,16}$/.test(value))) {
				// 				callback(new Error('密码至少6位,由大小写字母和数字,-,_组成'));
				// 			} else {
				// 				if (this.register === true) {
				// 					if (this.data.repassword !== '') {
				// 						this.$refs.data.validateField('repassword');
				// 					}
				// 				}
				// 				callback();
				// 			}

				// 		}
				// 	},
				// 	trigger: 'blur'
				// }]
			}
		};
	},
	methods: {
		setSize() {
			this.winSize.width = this.$$lib_$(window).width() + "px";
			this.winSize.height = this.$$lib_$(window).height() + "px";

			this.formOffset.left = parseInt(this.winSize.width) / 2 - 175 + 'px';
			this.formOffset.top = parseInt(this.winSize.height) / 2 - 178 + 'px';
		},

		onLogin(ref, type) {
			this.$refs[ref].validate(valid => {
				if (valid) {
					this.login_actions.disabled = true;
					this.$$api_user_login({
						data: this[ref],
						fn: data => {
							if (data.result == true) {
								console.log('1234', data);
								this.$store.dispatch('update_userinfo', {
									userinfo: data.data
								}).then(() => {
									this.get_global_lps();
									this.get_global_std_symbols();
									this.login_actions.disabled = false;
									if (data.data.role === 'Admin') {
										this.$router.push({
											path: '/home/user'
										});
									} else if (data.data.role === 'RulesEditor') {
										this.$router.push({
											path: '/home/lp'
										});
									}
								});
							} else {
								this.login_actions.disabled = false;
								this.$message.error(data.message);
							}
						},
						errFn: err => {
							this.$message.error(err.msg);
							this.login_actions.disabled = false;
						}
					});
				}
			});
		},

		resetForm(ref) {
			this.$refs[ref].resetFields();
		}
	},
	created() {
		this.setSize();
		this.$$lib_$(window).resize(() => {
			this.setSize();
		});
	},
	mounted() {}
});

/***/ }),
/* 402 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Login_vue__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Login_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Login_vue__);
/**
 * Created by sailengsi on 2017/5/10.
 */



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__Login_vue___default.a);

/***/ }),
/* 403 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'lp_position',
  data() {
    return {
      columns: [],
      tableData: [],
      lp_names: [],
      next_fresh_time: 0,
      remain_sec: '',
      load_status: 'loading...',
      load_text_color: 'black',
      api_requested: true,
      timer_interval_id: 0,
      std_symbols: {}
    };
  },
  computed: {
    tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.tableData,
              maxHeight: '100%',
              defaultSort: { prop: 'std_symbol' }
            }
          },
          columns: this.columns
        };
      }
    }
  },
  methods: {

    interval_check() {
      var remain_mil_sec;
      if (this.next_fresh_time && !this.api_requested) {
        remain_mil_sec = this.next_fresh_time - new Date().getTime();
        if (remain_mil_sec <= 0) {
          this.remain_sec = 0;
          console.log('remain_sec', this.remain_sec);
          this.request_symbol_positions();
        } else {
          this.remain_sec = parseInt(remain_mil_sec * 0.001);
        }
      }
    },
    // load_symbols(){
    //   var params = {
    //     func_name:'router_api.lp_get_symbols'
    //   }
    //   CommonApi.postFormAjax.call(this,params,data=>{
    //       var fn, i, j, len, len1, lp, ref, ref1, s, std_symbol;
    //       var lp_symbols = data;
    //       console.log('lp_symbols',lp_symbols);

    //       fn =(s)=>{
    //         var lp, lp_symbol;
    //         s.quantity = 0;
    //         lp = s.lp;
    //         console.log('std_symbols',this.std_symbols);
    //         if (s.std_symbol in this.std_symbols) {
    //           this.std_symbols[s.std_symbol][s.lp] = s;
    //         } else {
    //           lp_symbol = new Object();
    //           lp_symbol[s.lp] = s;
    //           this.std_symbols[s.std_symbol] = lp_symbol;
    //         }
    //       };
    //       for (i = 0, len = lp_symbols.length; i < len; i++) {
    //         s = lp_symbols[i];
    //         fn(s);
    //       }
    //       ref = this.std_symbols;

    //       for (std_symbol in ref) {
    //         lp_symbols = ref[std_symbol];
    //         ref1 = ["bbook", "unexpect_bbook"];
    //         for (j = 0, len1 = ref1.length; j < len1; j++) {
    //           lp = ref1[j];
    //           lp_symbols[lp] = new Object({
    //             "lp": lp,
    //             "std_symbol": std_symbol,
    //             "weight": 0,
    //             "lp_symbol": "-",
    //             "trade_enable": true,
    //             "quantity": 0
    //           });
    //         }
    //       }
    //       this.render_symbols_table();
    //       this.request_symbol_positions();
    //   });
    // },
    load_symbols() {
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.lp_get_symbols',
          args: [],
          kwargs: {}
        },
        fn: data => {
          var fn, i, j, len, len1, lp, ref, ref1, s, std_symbol;
          var lp_symbols = data;
          console.log('lp_symbols', lp_symbols);

          fn = s => {
            var lp, lp_symbol;
            s.quantity = 0;
            lp = s.lp;
            console.log('std_symbols', this.std_symbols);
            if (s.std_symbol in this.std_symbols) {
              this.std_symbols[s.std_symbol][s.lp] = s;
            } else {
              lp_symbol = new Object();
              lp_symbol[s.lp] = s;
              this.std_symbols[s.std_symbol] = lp_symbol;
            }
          };
          for (i = 0, len = lp_symbols.length; i < len; i++) {
            s = lp_symbols[i];
            fn(s);
          }
          ref = this.std_symbols;

          for (std_symbol in ref) {
            lp_symbols = ref[std_symbol];
            ref1 = ["bbook", "unexpect_bbook"];
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              lp = ref1[j];
              lp_symbols[lp] = new Object({
                "lp": lp,
                "std_symbol": std_symbol,
                "weight": 0,
                "lp_symbol": "-",
                "trade_enable": true,
                "quantity": 0
              });
            }
          }
          this.render_symbols_table();
          this.request_symbol_positions();var fn, i, j, len, len1, lp, ref, ref1, s, std_symbol;
          var lp_symbols = data;
          console.log('lp_symbols', lp_symbols);

          fn = s => {
            var lp, lp_symbol;
            s.quantity = 0;
            lp = s.lp;
            console.log('std_symbols', this.std_symbols);
            if (s.std_symbol in this.std_symbols) {
              this.std_symbols[s.std_symbol][s.lp] = s;
            } else {
              lp_symbol = new Object();
              lp_symbol[s.lp] = s;
              this.std_symbols[s.std_symbol] = lp_symbol;
            }
          };
          for (i = 0, len = lp_symbols.length; i < len; i++) {
            s = lp_symbols[i];
            fn(s);
          }
          ref = this.std_symbols;

          for (std_symbol in ref) {
            lp_symbols = ref[std_symbol];
            ref1 = ["bbook", "unexpect_bbook"];
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              lp = ref1[j];
              lp_symbols[lp] = new Object({
                "lp": lp,
                "std_symbol": std_symbol,
                "weight": 0,
                "lp_symbol": "-",
                "trade_enable": true,
                "quantity": 0
              });
            }
          }
          this.render_symbols_table();
          this.request_symbol_positions();
        },
        errFn: err => {
          this.$message.error(err.msg);
        }
      });
    },
    render_symbols_table() {
      var i, j, k, len, len1, len2, row, lp_name, lp_names, lp_symbol, lp_symbols, ref, std_name, std_symbol_name, std_symbol_names;
      this.tableData = [];
      this.columns = [];
      this.lp_names = [];
      std_symbol_names = [];
      ref = this.std_symbols;
      for (std_symbol_name in ref) {
        lp_symbols = ref[std_symbol_name];
        for (lp_name in lp_symbols) {
          lp_symbol = lp_symbols[lp_name];
          console.log('lp_names', this.lp_names, std_symbol_names);
          if (this.lp_names.indexOf(lp_name) < 0) {
            this.lp_names.push(lp_name);
          }
          // if (std_symbol_names.indexOf(std_symbol_name) < 0) {
          //   std_symbol_names.push(std_symbol_name);
          // }
        }
      }
      this.lp_names.sort(function (a, b) {
        if (a === "bbook" || a === "unexpect_bbook") {
          return -1;
        }
        if (b === "bbook" || b === "unexpect_bbook") {
          return 1;
        }
        return a > b;
      });
      std_symbol_names.sort(function (a, b) {
        return a > b;
      });
      this.columns.push({
        attr: {
          prop: 'std_symbol',
          label: 'STD SYMBOL',
          sortable: true,
          minwidth: '220',
          align: 'center'
        }
      });
      this.lp_names.forEach((lp_name, index) => {
        this.columns.push({
          attr: {
            prop: lp_name,
            label: lp_name.toUpperCase(),
            sortable: true,
            scopedSlot: lp_name,
            align: 'center'
          }
        });
      });
      this.columns.push({
        attr: {
          prop: 'total',
          label: 'Total',
          sortable: true,
          scopedSlot: 'total',
          minwidth: '220',
          align: 'center'
        }
      });
      for (j = 0, len1 = std_symbol_names.length; j < len1; j++) {
        std_name = std_symbol_names[j];
        // this.tableData.push({
        //   std_symbol: std_name
        // });
      }
    },
    // request_symbol_positions(){
    //  this.load_status = 'Reqesting positions ...';
    //  this.load_text_color= 'black';
    //   var params ={
    //     func_name: "router_api.get_symbol_positions"
    //   };
    //   CommonApi.postFormAjax.call(this,params,data=>{
    //     console.log('data',data);
    //     console.log('123',this.std_symbols);
    //     this.render_symbol_positions(data);
    //     this.next_fresh_time = (new Date()).getTime() + 2000;
    //     this.api_requested = false;
    //     this.load_status = 'Reqested position OK!';
    //     this.load_text_color = 'green';
    //   });
    //   this.api_requested = true;
    // },
    request_symbol_positions() {
      this.load_status = 'Reqesting positions ...';
      this.load_text_color = 'black';
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.get_symbol_positions',
          args: [],
          kwargs: {}
        },
        fn: data => {
          this.render_symbol_positions(data);
          this.next_fresh_time = new Date().getTime() + 2000;
          this.api_requested = false;
          this.load_status = 'Reqested position OK!';
          this.load_text_color = 'green';
        },
        errFn: err => {
          this.$message.error(err.msg);
        }
      });
      this.api_requested = true;
    },
    render_symbol_positions(lp_symbol_positions) {
      var i, len, lp, lp_pos, lp_symbol, lp_symbols, row, ref, std_symbol, total;
      this.tableData = [];
      for (i = 0, len = lp_symbol_positions.length; i < len; i++) {
        lp_pos = lp_symbol_positions[i];
        std_symbol = this.std_symbols[lp_pos.std_symbol];
        if (std_symbol === 0) {
          console.log("Unkown std symbol: " + lp_pos.std_symbol + ", Check lp symbol");
          continue;
        }
        lp_symbol = std_symbol[lp_pos.lp];
        if (!lp_symbol) {
          console.log("Unkown lp_pos: " + lp_pos);
          continue;
        }
        lp_symbol.quantity = lp_pos.quantity;
      }
      ref = this.std_symbols;

      console.log('555', this.std_symbols);
      for (std_symbol in ref) {
        lp_symbols = ref[std_symbol];
        total = 0;
        row = {};
        row.std_symbol = std_symbol;
        for (lp in lp_symbols) {
          lp_symbol = lp_symbols[lp];
          row[lp] = lp_symbol.quantity;
          total += lp_symbol.quantity;
        }
        row.total = total;
        this.tableData.push(row);
      }
      console.log('tableData', this.tableData);
    },
    init() {
      this.timer_interval_id = setInterval(() => {
        this.interval_check();
      }, 100);
      this.load_symbols();
    }
  },
  mounted() {
    this.init();
  },
  destroy() {
    if (this.timer_interval_id) {
      return clearInterval(this.timer_interval_id);
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.timer_interval_id) {
      clearInterval(this.timer_interval_id);
    }
    next();
  }
});

/***/ }),
/* 404 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__LpPosition_vue__ = __webpack_require__(760);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__LpPosition_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__LpPosition_vue__);
/**
 * Created by sailengsi on 2017/5/10.
 */



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__LpPosition_vue___default.a);

/***/ }),
/* 405 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'lp_symbol',
    data() {
        return {
            add_lpsymbol_dialog: {
                show: false,
                isModal: true,
                title: {
                    text: 'Add LP Symbol'
                },
                fields: [{
                    type: 'input',
                    key: 'std_symbol',
                    label: 'STD symbol'
                }, {
                    key: 'lp',
                    type: 'select',
                    desc: '请选择',
                    label: 'LP',
                    list: (() => {
                        var i, len, lps, lp, result;
                        result = [];
                        lps = this.$store.state.global.lps;
                        for (i = 0, len = lps.length; i < len; i++) {
                            lp = lps[i];
                            result.push({
                                value: lp,
                                text: lp
                            });
                        }
                        return result;
                    })()
                }, {
                    type: 'input',
                    key: 'lp_symbol',
                    label: 'LP symbol'
                }, {
                    key: 'quote_enable',
                    type: 'select',
                    desc: '请选择',
                    label: 'Quote Enable',
                    list: [{
                        value: 'true',
                        text: 'true'
                    }, {
                        value: 'false',
                        text: 'false'
                    }]
                }, {
                    key: 'trade_enable',
                    type: 'select',
                    desc: '请选择',
                    label: 'Trade Enable',
                    list: [{
                        value: 'true',
                        text: 'true'
                    }, {
                        value: false,
                        text: 'false'
                    }]
                }, {
                    type: 'input',
                    key: 'weight',
                    label: 'Weight'
                }, {
                    type: 'input',
                    key: 'min_qty',
                    label: 'Min Qty'
                }, {
                    type: 'input',
                    key: 'contract_size',
                    label: 'Contract Size'
                }],
                default_value: {
                    lp: this.$store.state.global.lps[0],
                    quote_enable: 'true',
                    trade_enable: 'true'
                }
            },
            tableData: []

        };
    },
    computed: {
        tableConfig: {
            get() {
                return {
                    table: {
                        attr: {
                            data: this.tableData,
                            maxHeight: '100%',
                            defaultSort: {
                                prop: 'std_symbol'
                            }
                        }
                    },
                    columns: [{
                        attr: {
                            prop: 'std_symbol',
                            label: this.$t('STD symbol'),
                            minWidth: 180,
                            sortable: true,
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'lp',
                            label: this.$t('LP'),
                            minWidth: 180,
                            sortable: true,
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'lp_symbol',
                            label: this.$t('LP symbol'),
                            minWidth: 180,
                            sortable: true,
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'weight',
                            label: this.$t('Weight'),
                            width: 100,
                            sortable: true,
                            scopedSlot: 'weight_attr',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'min_qty',
                            label: this.$t('Min Qty'),
                            width: 100,
                            sortable: true,
                            scopedSlot: 'min_qty_attr',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'contract_size',
                            label: this.$t('Contract Size'),
                            minWidth: 180,
                            sortable: true,
                            scopedSlot: 'contract_size_attr',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'quote_enable',
                            label: this.$t('Quote Enable'),
                            minWidth: 180,
                            sortable: true,
                            scopedSlot: 'quote_attr',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'trade_enable',
                            label: this.$t('Trade Enable'),
                            minWidth: 180,
                            sortable: true,
                            scopedSlot: 'trade_attr',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            // prop: 'address',
                            label: this.$t('Operation'),
                            minWidth: 180,
                            scopedSlot: 'handler',
                            align: 'center'
                        }
                    }]
                };
            }
        }
    },
    methods: {
        open_dialog(type) {
            this[type].show = true;
        },
        close_dialog(type) {
            this[type].show = false;
        },
        add_lpsymbol_submit(data) {
            var weight, min_qty, contract_size, quote_enable, trade_enable;
            weight = parseInt(data.weight);
            min_qty = parseInt(data.min_qty);
            contract_size = data.contract_size * 1;
            quote_enable = this.string_to_boolean(data.quote_enable);
            trade_enable = this.string_to_boolean(data.trade_enable);
            this.$$api_common_ajax({
                data: {
                    func_name: 'router_api.lp_add_symbol',
                    args: [data.lp, data.std_symbol, data.lp_symbol, quote_enable, trade_enable, weight, min_qty, contract_size],
                    kwargs: {}
                },
                fn: data => {
                    this.load_data();
                    this.get_global_std_symbols();
                    this.close_dialog('add_lpsymbol_dialog');
                },
                errFn: err => {
                    this.$message({
                        showClose: true,
                        message: err.response.data,
                        type: 'error'
                    });
                }
            });
        },
        edit_lpsymbol_submit(row) {
            row.weight = parseInt(row.weight);
            row.min_qty = parseInt(row.min_qty);
            row.contract_size = row.contract_size * 1;
            var quote_enable = this.string_to_boolean(row.quote_enable);
            var trade_enable = this.string_to_boolean(row.trade_enable);
            this.$$api_common_ajax({
                data: {
                    func_name: 'router_api.lp_add_symbol',
                    args: [row.lp, row.std_symbol, row.lp_symbol, quote_enable, trade_enable, row.weight, row.min_qty, row.contract_size],
                    kwargs: {}
                },
                fn: data => {
                    row.editFlag = false;
                },
                errFn: err => {
                    this.$message({
                        showClose: true,
                        message: err.response.data,
                        type: 'error'
                    });
                }
            });
        },
        onEditSymbol(row) {
            this.$set(row, 'editFlag', true);
            console.log('row', row.editFlag);
        },
        detele_lpsymbol_handle(row, index) {
            console.log('index', index);
            this.$$api_common_ajax({
                data: {
                    func_name: 'router_api.lp_del_symbol',
                    args: [row.lp, row.lp_symbol, row.std_symbol],
                    kwargs: {}
                },
                fn: data => {
                    this.tableData.splice(index, 1);
                    this.get_global_std_symbols();
                }
            });
        },
        onDeleteSymbol(row, index) {
            this.$confirm('Are you sure you want to detele this?', 'prompt', {
                type: 'warning'
            }).then(() => {
                this.detele_lpsymbol_handle(row, index);
            });
        },
        load_data() {
            this.$$api_common_ajax({
                data: {
                    func_name: 'router_api.lp_get_symbols',
                    args: [],
                    kwargs: {}
                },
                fn: data => {
                    for (var item of data) {
                        item.trade_enable = this.boolean_to_string(item.trade_enable);
                        item.quote_enable = this.boolean_to_string(item.quote_enable);
                    }
                    this.tableData = data;
                }
            });
        },
        init() {
            this.load_data();
        }
    },
    mounted() {
        this.init();
    }
});

/***/ }),
/* 406 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__LpSymbol_vue__ = __webpack_require__(761);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__LpSymbol_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__LpSymbol_vue__);
/**
 * Created by sailengsi on 2017/5/10.
 */



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__LpSymbol_vue___default.a);

/***/ }),
/* 407 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'lp',
  data() {
    return {
      tableData: []
    };
  },
  computed: {
    tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.tableData,
              maxHeight: '100%',
              defaultSort: { prop: 'std_symbol' }
            }
          },
          columns: [{
            attr: {
              prop: 'lp',
              label: this.$t('lp'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'type',
              label: this.$t('type'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'username',
              label: this.$t('username'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'sender',
              label: this.$t('sender'),
              width: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'target',
              label: this.$t('target'),
              width: 180,
              sortable: true,
              align: 'center',
              scopedSlot: 'status'
            }
          }, {
            attr: {
              prop: 'host',
              label: this.$t('host'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'debug',
              label: this.$t('debug'),
              minWidth: 180,
              sortable: true,
              align: 'center',
              formatter: function (item) {
                return item.debug == false ? 'false' : 'true';
              }
            }
          }]
        };
      }
    }
  },
  methods: {
    render_lp_table() {
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.lp_host_get_all_conf',
          args: [],
          kwargs: {}
        },
        fn: data => {
          this.tableData = data;
        }
      });
    },
    init() {
      this.render_lp_table();
    }
  },
  mounted() {
    this.init();
  }
});

/***/ }),
/* 408 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Lp_vue__ = __webpack_require__(762);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Lp_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Lp_vue__);
/**
 * Created by sailengsi on 2017/5/10.
 */



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__Lp_vue___default.a);

/***/ }),
/* 409 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'quote_adjust',
  data() {
    return {
      source: 'risehills',
      load_desc: '',
      load_desc_color: '',
      ws_status_bgcolor: '',
      quote_rules: {},
      options: [{
        value: '',
        label: ''
      }],
      current_source: '',
      ws: null,
      current_time: '',
      mt4_panel_show: false,
      tableData: [],

      lp_quotes: [],

      rule_tables: []
    };
  },
  computed: {
    tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.tableData,
              maxHeight: '100%',
              defaultSort: {
                prop: 'mt4_symbol'
              }
            }
          },
          columns: [{
            attr: {
              prop: 'source',
              label: this.$t('Source'),
              minWidth: 80,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'std_symbol',
              label: this.$t('STD symbol'),
              minWidth: 120,
              sortable: true,
              scopedSlot: 'std_symbol',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'mt4_symbol',
              label: this.$t('MT4 symbol'),
              minWidth: 100,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'bid_change',
              label: '',
              width: 50,
              align: 'center',
              scopedSlot: 'bid_change'
            }
          }, {
            attr: {
              prop: 'bid',
              label: this.$t('Bid'),
              width: 120,
              sortable: true,
              align: 'center',
              className: 'positive'
            }
          }, {
            attr: {
              prop: 'ask',
              label: this.$t('Ask'),
              width: 120,
              sortable: true,
              align: 'center',
              className: 'negative'
            }
          }, {
            attr: {
              // prop: 'ask_change',
              label: '',
              width: 50,
              align: 'center',
              scopedSlot: 'ask_change'
            }
          }, {
            attr: {
              prop: 'spread',
              label: this.$t('sreapd'),
              minWidth: 80,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.adjust',
              label: this.$t('Adjust'),
              minWidth: 80,
              sortable: true,
              scopedSlot: 'adjust',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'edit_adjust',
              label: this.$t('Edit Adjust'),
              minWidth: 250,
              sortable: true,
              align: 'center',
              scopedSlot: 'edit_adjust'
            }
          }, {
            attr: {
              prop: 'rule',
              label: this.$t('Rule'),
              minWidth: 180,
              sortable: true,
              align: 'center',
              scopedSlot: 'rule_type'
            }
          }, {
            attr: {
              prop: 'update_at',
              label: this.$t('Update At'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'adjust_enabled',
              label: this.$t('Adjust Enabled'),
              minWidth: 180,
              sortable: true,
              align: 'center',
              scopedSlot: 'adjust_enabled'
            }
          }]
        };
      }
    }
  },
  methods: {
    // WebSocket method
    ws_reconnect() {
      var req_params, uri;
      this.ws_close();
      console.log('source', this.source);
      req_params = "source=" + this.source;
      uri = "192.168.78.132:9988"; //location.port
      this.ws = new WebSocket("ws://" + uri + "/ws/bang_quote?" + req_params);
      this.ws.onopen = function (_this) {
        return function () {
          return _this.ws_on_open();
        };
      }(this);
      this.ws.onmessage = function (_this) {
        return function (e) {
          var data;
          data = JSON.parse(e.data);
          return _this.ws_handle_msg(data);
        };
      }(this);
      this.ws.onerror = function (_this) {
        return function (e) {
          return console.log('onerror', e);
        };
      }(this);
      this.ws.onclose = function (_this) {
        return function (e) {
          console.log('onclose', e);
          return _this.ws_on_close();
        };
      }(this);
    },
    ws_handle_msg(data) {
      this.on_quote_tick(this.source, data);
    },
    ws_on_open() {
      this.set_quote_status(true);
    },
    ws_on_close() {
      this.set_quote_status(false);
    },
    ws_start() {
      this.ws_reconnect();
    },
    ws_close() {
      if (this.ws !== null) {
        this.ws.onopen = null;
        this.ws.onclose = null;
        this.ws.onerror = null;
        this.ws.onmessage = null;
        this.ws.close();
      }
    },
    ws_stop() {
      this.ws_close();
    },
    //................................................

    interval_check() {
      this.current_time = new Date().toISOString();
    },
    load_quote_rules() {
      // var params = {
      //   func_name: 'router_api.quote_get_all_rules'
      // }
      // CommonApi.postFormAjax.call(this, params, data => {
      //   this.quote_rules_loaded(data, data.length);
      // })
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.quote_get_all_rules',
          args: [],
          kwargs: {}
        },
        fn: data => {
          this.quote_rules_loaded(data, data.length);
        },
        errFn: err => {
          this.$message.error(err.msg);
        }
      });
    },
    set_description(text, color) {
      if (color == null) {
        this.load_desc_color = 'green';
      } else {
        this.load_desc_color = color;
      };
      this.load_desc = text;
    },
    set_quote_status(connected) {
      if (connected === void 0) {
        this.ws_status_bgcolor = 'white';
        return;
      }
      if (connected) {
        this.ws_status_bgcolor = 'green';
      } else {
        this.ws_status_bgcolor = 'red';
      }
    },
    quote_rules_loaded(quote_rules) {
      var j, len, rule, source_rules;
      for (j = 0, len = quote_rules.length; j < len; j++) {
        rule = quote_rules[j];
        source_rules = this.quote_rules[rule.source];
        if (source_rules === void 0) {
          source_rules = new Object();
          this.quote_rules[rule.source] = source_rules;
        }
        rule.prev_ask = void 0;
        rule.prev_bid = void 0;
        rule.update_at = "-";
        rule.bid = "-";
        rule.ask = "-";
        rule.spread = '-';
        rule.adjust_step = 5;
        rule.adjust_enabled = false;
        source_rules[rule.mt4_symbol] = rule;
      }
      this.render_quote_sources();
    },
    render_quote_sources() {
      var _, ref, source;
      this.options = [];
      ref = this.quote_rules;
      console.log('quote_rules', this.quote_rules);
      for (source in ref) {
        this.options.push({
          value: source,
          label: source
        });
      }
      console.log('options', this.options);
      this.set_description("Load rules success, please select quote source.");
    },
    changeSelect(data) {
      this.select_mt4_source(this.current_source);
    },
    select_mt4_source(source) {
      var $quote_table, _, fn, rule, source_rules, mt4_symbol;
      this.tableData = [];
      this.mt4_panel_show = true;
      for (mt4_symbol in this.quote_rules[source]) {
        this.tableData.push(this.quote_rules[source][mt4_symbol]);
      }
      this.set_description("Loaded source: " + source);
      console.log('source_rules', this.quote_rules[source]);
    },
    on_quote_tick(source, data) {
      var ask, bid, digits, mt4_symbol, rule, time;
      mt4_symbol = data[0], bid = data[1], ask = data[2], time = data[3];
      rule = this.quote_rules[source][mt4_symbol];
      if (!rule || this.current_source !== source) {
        return;
      }
      digits = rule.attributes.digits;
      if (rule.prev_ask && rule.prev_ask) {
        if (bid - rule.prev_bid > 0) {
          rule.bid_change = '&uarr;';
        } else if (bid - rule.prev_bid < 0) {
          rule.bid_change = '&darr;';
        }
        if (ask - rule.prev_ask > 0) {
          rule.ask_change = '&uarr;';
        } else if (ask - rule.prev_ask < 0) {
          rule.ask_change = '&darr;';
        }
      };
      rule.prev_ask = ask;
      rule.prev_bid = bid;
      rule.ask = ask.toFixed(digits);
      rule.bid = bid.toFixed(digits);
      rule.spread = ((ask - bid) * Math.pow(10, digits)).toFixed(0);
      rule.update_at = new Date(time * 1000).toISOString();
      this.render_ws_quote(rule);
    },
    render_ws_quote(rule) {
      var i, len, mt4_symbol;
      for (i = 0, len = this.tableData.length; i < len; i++) {
        mt4_symbol = this.tableData[i][mt4_symbol];
        if (rule.mt4_symbol === mt4_symbol) {
          this.$set(this.tableData, i, rule);
        }
      }
    },
    controlAdjust(type, row) {
      var adjust, adjust_pips;
      console.log('adjust_enabled', row.adjust_enabled);
      if (row.adjust_enabled == false) {
        this.$message.warning('Please enable adjust.');
        return;
      }
      if (isNaN(parseInt(row.adjust_step))) {
        this.$message.warning('please input right pips!');
        return;
      }
      adjust = row.attributes.adjust || 0;
      if (type == 'reduce') {
        adjust_pips = row.attributes.adjust - row.adjust_step;
      } else {
        adjust_pips = row.attributes.adjust + row.adjust_step;
      }
      // var params = {
      //   func_name: 'router_api.quote_update_adjust_pips',
      //   args: [row.source, row.mt4_symbol, adjust_pips]
      // };
      // CommonApi.postFormAjax.call(this, params, data => {
      //   row.attributes.adjust = adjust_pips;
      // });
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.quote_update_adjust_pips',
          args: [row.source, row.mt4_symbol, adjust_pips],
          kwargs: {}
        },
        fn: data => {
          row.attributes.adjust = adjust_pips;
        },
        errFn: err => {
          this.$message.error(err.msg);
        }
      });
    },
    changeSwitch(event, row) {},
    onCloseRowDialog(type, index) {
      this[type].splice(index, 1);
    },
    showLpQuotes(row) {

      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.lp_get_quote',
          args: [row.std_symbol],
          kwargs: {}
        },
        fn: data => {
          var lp_quotes = data;
          console.log('lp_quotes', data);
          var digits = row.attributes.digits;
          var config = {
            lp_quotes,
            digits,
            std_symbol: row.std_symbol
          };
          var id = row.mt4_symbol;
          var title = 'LP Qutoe -' + row.std_symbol;
          var lp_quote = {
            title,
            config,
            id
          };
          if (!this.isDialogExist(this.lp_quotes, lp_quote)) {
            this.lp_quotes.push(lp_quote);
          };
          setTimeout(() => {
            // CommonApi.postNormalAjax.call(this, params, data => {
            //   var lp_quotes = data
            //   var digits = row.attributes.digits;
            //   var config = {
            //     lp_quotes,
            //     digits
            //   };
            // })
          }, 3000);
        },
        errFn: err => {
          this.$message.error(err.msg);
        }
      });
    },
    show_json_table(row) {
      var title = {
        text: row.mt4_symbol
      };
      console.log('attributes', row.attributes);
      var id = row.mt4_symbol;
      var config = row.attributes;
      var rule = {
        title,
        config,
        id
      };
      if (!this.isDialogExist(this.rule_tables, rule)) {
        this.rule_tables.push(rule);
      };
    },
    init() {
      this.set_description("loading quote rules ...");
      this.set_quote_status(void 0);
      this.load_quote_rules();
    }
  },
  mounted() {
    this.init();
    this.ws_start();
    this.timer_interval_id = setInterval(() => {
      this.interval_check();
    }, 100);
  }
});

/***/ }),
/* 410 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__QuoteAdjust_vue__ = __webpack_require__(763);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__QuoteAdjust_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__QuoteAdjust_vue__);
/**
 * Created by sailengsi on 2017/5/10.
 */



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__QuoteAdjust_vue___default.a);

/***/ }),
/* 411 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'quote_rule',
  data() {
    return {
      add_rule_dialog: {
        show: false,
        isModal: true,
        title: {
          text: this.$t('Add rule')
        },
        fields: [{
          key: 'source',
          type: 'select',
          list: (() => {
            var i, len, sources, source, result;
            result = [];
            sources = this.$store.state.global.sources;
            for (i = 0, len = sources.length; i < len; i++) {
              source = sources[i];
              result.push({
                value: source,
                text: source
              });
            }
            return result;
          })(),
          desc: '请选择',
          label: this.$t('source')
        }, {
          key: 'mt4_symbol',
          type: 'input',
          value: '',
          label: this.$t('MT4 Symbol')
        }, {
          key: 'std_symbol',
          type: 'select',
          list: (() => {
            var i, len, std_symbols, std_symbol, result;
            result = [];
            std_symbols = this.$store.state.global.std_symbols;
            for (i = 0, len = std_symbols.length; i < len; i++) {
              std_symbol = std_symbols[i];
              result.push({
                value: std_symbol,
                text: std_symbol
              });
            }
            return result;
          })(),
          desc: '请选择',
          label: this.$t('STD Symbol')
        }, {
          type: 'input',
          key: 'digits',
          value: '',
          label: this.$t('digits')
        }, {
          type: 'input',
          key: 'minimal_spread',
          value: '',
          label: this.$t('min spread')
        }, {
          type: 'input',
          key: 'maximal_spread',
          value: '',
          label: this.$t('max spread')
        }, {
          key: 'aggregator',
          type: 'select',
          list: [{
            value: 'median',
            text: 'median'
          }, {
            value: 'bestright',
            text: 'bestright'
          }, {
            value: 'bestright-option',
            text: 'bestright-option'
          }],
          desc: '请选择',
          label: 'aggregator'
        }, {
          type: 'number',
          key: 'adjust',
          value: '',
          label: 'adjust'
        }, {
          key: 'type',
          type: 'select',
          list: (() => {
            var i, len, results;
            results = [];
            var quote_types = this.$store.state.global.quote_types;
            for (i = 0, len = quote_types.length; i < len; i++) {
              var quote_type = quote_types[i];
              results.push({
                value: quote_type,
                text: quote_type
              });
            }
            console.log('1111', results);
            return results;
          })(),
          desc: '请选择',
          label: this.$t('type')
        }],
        default_value: {
          source: this.$store.state.global.sources[0],
          mt4_symbol: '',
          std_symbol: this.$store.state.global.std_symbols[0],
          digits: '',
          minimal_spread: '',
          maximal_spread: '',
          aggregator: 'median',
          adjust: '',
          type: this.$store.state.global.quote_types[0]
        }
      },
      tableData: []
    };
  },
  computed: {
    tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.tableData,
              maxHeight: '100%',
              defaultSort: {
                prop: 'std_symbol'
              }
            }
          },
          columns: [{
            attr: {
              prop: 'source',
              label: this.$t('source'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'mt4_symbol',
              label: this.$t('MT4 symbol'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'std_symbol',
              label: this.$t('STD symbol'),
              minWidth: 180,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'type',
              label: this.$t('type'),
              width: 100,
              sortable: true,
              scopedSlot: 'type_attr',
              align: 'center'
            }
          }, {
            attr: {
              label: this.$t('Digits'),
              width: 100,
              sortable: true,
              scopedSlot: 'digits_attr',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.bid_delta',
              label: this.$t('Bid Delta'),
              minWidth: 120,
              sortable: true,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.ofr_delta',
              label: this.$t('Ofr Delta'),
              minWidth: 120,
              sortable: true,
              scopedSlot: 'ofr_delta_attr',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.minimal_spread',
              label: this.$t('Min Spread'),
              minWidth: 120,
              sortable: true,
              scopedSlot: 'min_spread_attr',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.maximal_spread',
              label: this.$t('Max Spread'),
              minWidth: 120,
              sortable: true,
              scopedSlot: 'max_spread_attr',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.adjust',
              label: this.$t('Adjust'),
              minWidth: 120,
              sortable: true,
              scopedSlot: 'adjust_attr',
              align: 'center'
            }
          }, {
            attr: {
              prop: 'attributes.aggregator',
              label: this.$t('Aggregator'),
              minWidth: 120,
              sortable: true,
              scopedSlot: 'aggregator_attr',
              align: 'center'
            }
          }, {
            attr: {
              // prop: 'address',
              label: this.$t('Operation'),
              minWidth: 120,
              scopedSlot: 'handler',
              align: 'center'
            }
          }]
        };
      }
    }
  },
  methods: {
    onCloseRuleDialog() {
      this.add_rule_dialog.show = false;
    },
    onAddRule() {
      this.add_rule_dialog.show = true;
    },

    add_rule_submit(data) {
      var attributes = {
        digits: parseInt(data.digits),
        minimal_spread: parseInt(data.minimal_spread),
        maximal_spread: parseInt(data.maximal_spread),
        aggregator: data.aggregator,
        adjust: parseInt(data.adjust)
      };
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.quote_add_rule',
          args: [data.source, data.mt4_symbol, data.std_symbol, data.type, attributes],
          kwargs: {}
        },
        fn: data => {
          this.load_data();
          this.onCloseRuleDialog();
        }
      });
    },
    onEditRule(row) {
      this.$set(row, 'editFlag', true);
    },
    edit_rule_submit(row) {
      console.log('row', row);
      var attributes = {
        digits: parseInt(row.attributes.digits),
        minimal_spread: parseInt(row.attributes.minimal_spread),
        maximal_spread: parseInt(row.attributes.maximal_spread),
        aggregator: row.attributes.aggregator,
        adjust: parseInt(row.attributes.adjust)
      };
      console.log('attr', attributes);
      if (row.type == 'delta') {
        Object.assign(attributes, {
          bid_delta: row.attributes.bid_delta,
          ofr_delta: row.attributes.ofr_delta,
          random: row.attributes.random
        });
      } else if (row.type == 'asian') {
        Object.assign(attributes, {
          asian_delta: row.attributes.asian_delta,
          random: row.attributes.random
        });
      } else if (row.type == 'spread') {
        Object.assign(attributes, {
          spread_delta: row.attributes.spread_delta,
          random: row.attributes.random
        });
      }
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.quote_update_rule',
          args: [row.source, row.mt4_symbol, row.std_symbol, row.type, attributes],
          kwargs: {}
        },
        fn: data => {
          this.$set(row, 'editFlag', false);
        }
      });
    },
    onDeleteQutoeRule(row, index) {
      this.$confirm('Are you sure you want to detele this?', 'prompt', {
        type: 'warning'
      }).then(() => {
        this.$$api_common_ajax({
          data: {
            func_name: 'router_api.quote_del_rule',
            args: [row.source, row.mt4_symbol],
            kwargs: {}
          },
          fn: data => {
            console.log('index', index);
            this.tableData.splice(index, 1);
          }
        });
      });
    },
    load_data() {
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.quote_get_all_rules',
          args: [],
          kwargs: {}
        },
        fn: data => {
          console.log('555', data);
          this.tableData = data;
        }
      });
    },
    init() {
      this.load_data();
    }
  },
  mounted() {
    this.init();
  }
});

/***/ }),
/* 412 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__QuoteRule_vue__ = __webpack_require__(764);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__QuoteRule_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__QuoteRule_vue__);
/**
 * Created by sailengsi on 2017/5/10.
 */



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__QuoteRule_vue___default.a);

/***/ }),
/* 413 */
/***/ (function(module, exports) {

module.exports = {
  name: 'std_symbol_position_chart',
  data() {
    return {
      std_symbols: {},
      load_text_color: 'black',
      load_status: 'loading...',
      current_std_symbol: 'NotSelected',
      current_lp_symbols: {},
      total_qty: 0,
      next_fresh_time: 0,
      remain_sec: '',
      api_requested: true,
      timer_interval_id: 0
    };
  },
  methods: {
    interval_check() {
      var remain_mil_sec;
      if (this.next_fresh_time && !this.api_requested) {
        remain_mil_sec = this.next_fresh_time - new Date().getTime();
        if (remain_mil_sec <= 0) {
          this.remain_sec = 0;
          console.log('remain_sec', this.remain_sec);
          this.request_symbol_positions();
        } else {
          this.remain_sec = parseInt(remain_mil_sec * 0.001);
          console.log('remain_sec', this.remain_sec);
        }
      }
    },
    load_std_symbols() {
      this.std_symbols = {};
      // var params = {
      //   func_name: "router_api.lp_get_symbols",
      // }
      // CommonApi.postFormAjax.call(this, params, data => {
      //   var fn, i, j, len, len1, lp, ref, ref1, s, std_symbol;
      //   var lp_symbols = data;
      //   console.log('lp_symbols', lp_symbols);
      //   fn = s => {
      //     var $std_symbol_li;
      //     if (s.std_symbol in this.std_symbols) {
      //       this.std_symbols[s.std_symbol].push(s);
      //     } else {
      //       this.$set(this.std_symbols, s.std_symbol, [s]);
      //     }
      //   };
      //   for (i = 0, len = lp_symbols.length; i < len; i++) {
      //     s = lp_symbols[i];
      //     fn(s);
      //   }
      //   console.log('std_symbols', this.std_symbols);
      //   ref = this.std_symbols;
      //   for (std_symbol in ref) {
      //     lp_symbols = ref[std_symbol];
      //     ref1 = ["bbook", "unexpect_bbook"];
      //     for (j = 0, len1 = ref1.length; j < len1; j++) {
      //       lp = ref1[j];
      //       lp_symbols.push(new Object({
      //         "lp": lp,
      //         "std_symbol": std_symbol,
      //         "weight": 0,
      //         "lp_symbol": "-",
      //         "trade_enable": true,
      //         "quantity": 0
      //       }));
      //     }
      //   }
      //   this.load_status = 'Load symbols success';
      //   this.load_text_color = 'green';
      // })
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.lp_get_symbols',
          args: [],
          kwargs: {}
        },
        fn: data => {
          var fn, i, j, len, len1, lp, ref, ref1, s, std_symbol;
          var lp_symbols = data;
          console.log('lp_symbols', lp_symbols);
          fn = s => {
            var $std_symbol_li;
            if (s.std_symbol in this.std_symbols) {
              this.std_symbols[s.std_symbol].push(s);
            } else {
              this.$set(this.std_symbols, s.std_symbol, [s]);
            }
          };
          for (i = 0, len = lp_symbols.length; i < len; i++) {
            s = lp_symbols[i];
            fn(s);
          }
          console.log('std_symbols', this.std_symbols);
          ref = this.std_symbols;
          for (std_symbol in ref) {
            lp_symbols = ref[std_symbol];
            ref1 = ["bbook", "unexpect_bbook"];
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              lp = ref1[j];
              lp_symbols.push(new Object({
                "lp": lp,
                "std_symbol": std_symbol,
                "weight": 0,
                "lp_symbol": "-",
                "trade_enable": true,
                "quantity": 0
              }));
            }
          }
          this.load_status = 'Load symbols success';
          this.load_text_color = 'green';
        }
      });
    },
    select_std_symbol_chart(std_symbol) {
      var fn, i, len, lp_symbol, lp_symbols, max_weight, weight_width, s, lp_symbol_item, obj;
      this.current_std_symbol = std_symbol;
      this.current_lp_symbols = {};
      console.log('current_std_symbol', this.current_std_symbol);
      lp_symbols = this.std_symbols[std_symbol];
      max_weight = Math.max.apply(Math, function () {
        var i, len, results;
        results = [];
        for (i = 0, len = lp_symbols.length; i < len; i++) {
          s = lp_symbols[i];
          results.push(s.weight);
        }
        return results;
      }());
      fn = lp_symbol => {
        weight_width = parseInt(Math.abs(lp_symbol.weight) / (max_weight || 1) * 100), this.$set(this.current_lp_symbols, [lp_symbol.lp], {
          lp_symbol,
          weight_width,
          position_width: 0,
          quantity: '',
          position_bgcolor: ''
        });
      };
      for (i = 0, len = lp_symbols.length; i < len; i++) {
        lp_symbol = lp_symbols[i];
        fn(lp_symbol);
      }
      this.request_symbol_positions();
    },
    request_symbol_positions() {
      this.load_status = "Reqesting positions ...";
      this.load_text_color = 'black';
      // params = {
      //   "func_name": "router_api.get_symbol_positions",
      //   "kwargs": {
      //     "std_symbol": this.current_std_symbol
      //   }
      // }
      // CommonApi.postFormAjax.call(this, params, data => {
      //   this.render_symbol_positions(data);
      //   this.load_status = "Reqested position OK!";
      //   this.load_text_color = 'green';
      //   this.next_fresh_time = (new Date()).getTime() + 2000;
      //   this.api_requested = false;
      // });
      // this.api_requested = true;
      this.$$api_common_ajax({
        data: {
          func_name: 'router_api.get_symbol_positions',
          args: [],
          kwargs: {
            "std_symbol": this.current_std_symbol
          }
        },
        fn: data => {
          this.render_symbol_positions(data);
          this.load_status = "Reqested position OK!";
          this.load_text_color = 'green';
          this.next_fresh_time = new Date().getTime() + 2000;
          this.api_requested = false;
        }
      });
      this.api_requested = true;
    },
    render_symbol_positions(lp_symbol_positions) {
      var _, color, i, len, lp, lp_positions, lp_symbol, max_quantity, position_width, quantity, ref, s, position_bgcolor, total_qty;
      lp_positions = {};
      for (i = 0, len = lp_symbol_positions.length; i < len; i++) {
        s = lp_symbol_positions[i];
        if (s.lp in this.current_lp_symbols && s.std_symbol === this.current_std_symbol) {
          lp_positions[s.lp] = s.quantity;
        }
      }
      ref = this.current_lp_symbols;
      for (lp in ref) {
        _ = ref[lp];
        if (!(lp in lp_positions)) {
          lp_positions[lp] = 0;
        }
      }
      max_quantity = Math.max.apply(Math, function () {
        var results;
        results = [];
        for (_ in lp_positions) {
          quantity = lp_positions[_];
          results.push(Math.abs(quantity));
        }
        return results;
      }());
      for (lp in lp_positions) {
        quantity = lp_positions[lp];
        lp_symbol = this.current_lp_symbols[lp];
        if (lp_symbol) {
          position_width = parseInt(Math.abs(quantity) / (max_quantity || 1) * 100);
          position_bgcolor = quantity > 0 ? "#b3ff99" : "#ff8080";
          Object.assign(lp_symbol, {
            position_width,
            quantity,
            position_bgcolor
          });
        }
      }
      console.log('current_lp_symbols', this.current_lp_symbols);
      this.total_qty = function () {
        var results;
        results = [];
        for (_ in lp_positions) {
          quantity = lp_positions[_];
          results.push(quantity);
        }
        return results;
      }().reduce(function (a, b) {
        return a + b;
      }, 0);
    },
    init() {
      this.load_std_symbols();
      this.timer_interval_id = setInterval(() => {
        this.interval_check();
      }, 100);
    }
  },
  created() {
    this.init();
  },
  beforeRouteLeave(to, from, next) {
    if (this.timer_interval_id) {
      clearInterval(this.timer_interval_id);
    }
    next();
  }
};

/***/ }),
/* 414 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__StdSymbolPosition_vue__ = __webpack_require__(765);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__StdSymbolPosition_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__StdSymbolPosition_vue__);
/**
 * Created by sailengsi on 2017/5/10.
 */



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__StdSymbolPosition_vue___default.a);

/***/ }),
/* 415 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
        name: 'trade_log',
        data() {
                return {
                        timer_interval_id: void 0,
                        next_fresh_time: void 0,
                        refresh_enable: 'true',
                        data_loaded: true,
                        remain_sec: void 0,
                        refresh_seconds: 5,

                        keywords: {
                                client: {
                                        value: '',
                                        type: 'int',
                                        name: 'login'
                                },
                                ord_id: {
                                        value: '',
                                        type: 'int',
                                        name: 'order_id'
                                },
                                group: {
                                        value: '',
                                        type: 'list',
                                        name: 'group'
                                },
                                symbol: {
                                        value: '',
                                        type: 'list',
                                        name: 'symbol'
                                },
                                size: {
                                        value: '',
                                        type: 'int',
                                        name: 'size'
                                },
                                status: {
                                        value: '',
                                        type: 'int',
                                        name: 'status'
                                },
                                time_range: {
                                        value: [],
                                        type: 'datetime',
                                        name: 'time'
                                }
                        },
                        download_file_body: '123',
                        lp_orders: [],
                        trade_logs: [],
                        refresh_time: 4,
                        refresh_enable: 'true',
                        nowTime: '',
                        trade_profit: {
                                show: false,
                                title: {
                                        text: 'Trade Profit',
                                        className: ''
                                },
                                config: []
                        },
                        tableData: [],
                        pagination: {
                                current_page: 1,
                                total: 0,
                                page_size: 12,
                                page_sizes: [3, 9, 12, 24],
                                layout: "total, sizes, prev, pager, next, jumper"
                        },
                        keyValue: 1,
                        page_func_name: 'trade_log.page_trade_log'
                };
        },
        computed: {
                tableConfig: {
                        get() {
                                return {
                                        table: {
                                                attr: {
                                                        data: this.tableData,
                                                        maxHeight: '100%',
                                                        defaultSort: {
                                                                prop: 'time',
                                                                order: "descending"

                                                        }
                                                }
                                        },
                                        columns: [{
                                                attr: {
                                                        prop: 'order_id',
                                                        label: this.$t('OrdID'),
                                                        minWidth: 60,
                                                        scopedSlot: 'expand_content',
                                                        align: 'center',
                                                        type: 'expand'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'order_id',
                                                        label: this.$t('OrdID'),
                                                        minWidth: 60,
                                                        scopedSlot: 'ord_id',
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'request.group',
                                                        label: this.$t('Group'),
                                                        minWidth: 60,
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'request.login',
                                                        label: this.$t('Client'),
                                                        minWidth: 60,
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'request.symbol',
                                                        label: this.$t('Symbol'),
                                                        width: 60,
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: 'side',
                                                        label: this.$t('Side'),
                                                        width: 80,
                                                        formatter: item => {
                                                                if (item.request.settle === 0) {
                                                                        return "O" + (item.request.cmd === 0 ? "B" : "S");
                                                                } else {
                                                                        return "S" + (item.request.cmd === 0 ? "S" : "B");
                                                                }
                                                        },
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'request.size',
                                                        label: this.$t('Order Size'),
                                                        minWidth: 80,
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'confirm.size',
                                                        label: this.$t('Exec Size'),
                                                        minWidth: 80,
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: '',
                                                        label: this.$t('B Book  Size'),
                                                        minWidth: 80,
                                                        formatter: item => {
                                                                var l, order, qty;
                                                                l = function () {
                                                                        var i, len, ref, results;
                                                                        ref = item.orders;
                                                                        var results = [];
                                                                        for (i = 0, len = ref.length; i < len; i++) {
                                                                                order = ref[i];
                                                                                if (order.lp === "bbook") {
                                                                                        results.push(order.quantity);
                                                                                }
                                                                        }
                                                                        return results;
                                                                }();
                                                                qty = 0;
                                                                if (l.length > 0) {
                                                                        qty = l.reduce(function (a, b) {
                                                                                return a + b;
                                                                        });
                                                                }
                                                                return qty / item.request.contract_size;
                                                        },
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: 'address',
                                                        label: '%',
                                                        minWidth: 50,
                                                        formatter: item => {
                                                                if (item.request.settle === 1 && item.open_log) {
                                                                        return item.open_log.trade_rule.attributes.coverage;
                                                                } else if (item.request.settle === 0) {
                                                                        return item.trade_rule.attributes.coverage;
                                                                } else {
                                                                        return 0;
                                                                }
                                                        },
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'confirm.price',
                                                        label: this.$t('Exec Price'),
                                                        minWidth: 80,
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: 'exec_price',
                                                        label: 'Req Price  Spread(pips)',
                                                        renderHeader(createElement, {
                                                                column
                                                        }) {
                                                                if (this.$store.state.global.locale == 'en-US') {
                                                                        return createElement('div', ['Req', createElement('br'), 'Price', createElement('br'), 'Spread', createElement('br'), '(pips)']);
                                                                } else {
                                                                        return createElement('div', ['请求差价', createElement('br'), '(pips)']);
                                                                }
                                                        },
                                                        formatter: item => {
                                                                var digits, req;
                                                                req = item.request;
                                                                digits = item.request.digits;
                                                                return "" + this.get_pips(Math.abs(req.quote_bid - req.quote_ask), digits);
                                                        },
                                                        minWidth: 80,
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: 'exec_price',
                                                        label: 'Company Spread(pips)',
                                                        minWidth: 40,
                                                        renderHeader(createElement, {
                                                                column
                                                        }) {
                                                                if (this.$store.state.global.locale == 'en-US') {
                                                                        return createElement('div', ['Company', createElement('br'), 'Spread', createElement('br'), '(pips)']);
                                                                } else {
                                                                        return createElement('div', ['利润点数', createElement('br'), '(pips)']);
                                                                }
                                                        },
                                                        formatter: r => {
                                                                var slippage;
                                                                if (this.lp_side(r) === "buy") {
                                                                        slippage = r.confirm.price - r.confirm.orig_price;
                                                                } else {
                                                                        slippage = r.confirm.orig_price - r.confirm.price;
                                                                }
                                                                return this.get_pips(slippage, r.request.digits);
                                                        },
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: '',
                                                        label: 'Client Slippage(pips)',
                                                        minWidth: 40,
                                                        renderHeader(createElement, {
                                                                column
                                                        }) {
                                                                if (this.$store.state.global.locale == 'en-US') {
                                                                        return createElement('div', ['Client', createElement('br'), 'Slippage', createElement('br'), '(pips)']);
                                                                } else {
                                                                        return createElement('div', ['客户滑点', createElement('br'), '(pips)']);
                                                                }
                                                        },
                                                        formatter: r => {
                                                                var slippage;
                                                                if (this.lp_side(r) === "buy") {
                                                                        slippage = r.confirm.price - r.request.price;
                                                                } else {
                                                                        slippage = r.request.price - r.confirm.price;
                                                                }
                                                                return this.get_pips(slippage, r.request.digits);
                                                        },
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: 'exec_price',
                                                        label: 'Price Adjust(pips)',
                                                        minWidth: 40,
                                                        renderHeader(createElement, {
                                                                column
                                                        }) {
                                                                if (this.$store.state.global.locale == 'en-US') {
                                                                        return createElement('div', ['Price', createElement('br'), 'Adjust', createElement('br'), '(pips)']);
                                                                } else {
                                                                        return createElement('div', ['价格调整', createElement('br'), '(pips)']);
                                                                }
                                                        },
                                                        formatter: r => {
                                                                var quote_rule;
                                                                quote_rule = r.quote_rule;
                                                                if (quote_rule) {
                                                                        return quote_rule.attributes.adjust;
                                                                } else {
                                                                        return "-";
                                                                }
                                                        },
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: 'exec_price',
                                                        label: 'Avg LP Slippage(pips)',
                                                        minWidth: 40,
                                                        renderHeader(createElement, {
                                                                column
                                                        }) {
                                                                if (this.$store.state.global.locale == 'en-US') {
                                                                        return createElement('div', ['Avg', createElement('br'), 'LP', createElement('br'), 'Slippage', createElement('br'), '(pips)']);
                                                                } else {
                                                                        return createElement('div', ['LP 平均滑点', createElement('br'), '(pips)']);
                                                                }
                                                        },
                                                        formatter: r => {
                                                                var i, len, lp_quote_dict, lp_slippage, ord_price, ord_qty, order, ref, ref1, sum_qty, sum_slippage;
                                                                lp_quote_dict = this.get_lp_quote_dict(r.lp_quote || {
                                                                        "bid": [],
                                                                        "ofr": []
                                                                });
                                                                ref = [0, 0], sum_qty = ref[0], sum_slippage = ref[1];
                                                                ref1 = r.orders;
                                                                for (i = 0, len = ref1.length; i < len; i++) {
                                                                        order = ref1[i];
                                                                        var lp = lp_quote_dict[order.lp];
                                                                        if (order.exec_report && lp) {
                                                                                ord_price = order.exec_report.last_px;
                                                                                ord_qty = order.exec_report.last_qty * order.lp_contract_size;
                                                                                if (ord_qty === 0) {
                                                                                        continue;
                                                                                }
                                                                                if (order.side === "buy") {
                                                                                        lp_slippage = ord_price - lp.ofr_price;
                                                                                } else {
                                                                                        lp_slippage = lp.bid_price - ord_price;
                                                                                }
                                                                                sum_qty += ord_qty;
                                                                                sum_slippage += lp_slippage * ord_qty;
                                                                        }
                                                                }
                                                                if (sum_qty) {
                                                                        return this.get_pips(sum_slippage / sum_qty, r.request.digits);
                                                                } else {
                                                                        return "-";
                                                                }
                                                        },
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: 'exec_price',
                                                        label: 'LP Exec Orders',
                                                        minWidth: 40,
                                                        renderHeader(createElement, {
                                                                column
                                                        }) {
                                                                if (this.$store.state.global.locale == 'en-US') {
                                                                        return createElement('div', ['LP', createElement('br'), 'Exec', createElement('br'), 'Orders', createElement('br'), '(pips)']);
                                                                } else {
                                                                        return 'LP订单成交情况';
                                                                }
                                                        },
                                                        scopedSlot: 'lp_orders',
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: 'exec_price',
                                                        label: 'Cost(ms)',
                                                        renderHeader(createElement, {
                                                                column
                                                        }) {
                                                                if (this.$store.state.global.locale == 'en-US') {
                                                                        return createElement('div', ['Cost', createElement('br'), '(ms)']);
                                                                } else {
                                                                        return createElement('div', ['耗时', createElement('br'), '(ms)']);
                                                                }
                                                        },
                                                        minWidth: 60,
                                                        formatter: r => {
                                                                return parseInt((r.end_time - r.start_time) * 1000);
                                                        },
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: 'exec_price',
                                                        label: this.$t('status'),
                                                        minWidth: 60,
                                                        // formatter:function(r){
                                                        //         status = r.confirm.status;
                                                        //         status_text = ORD_STATUS[status];
                                                        // }
                                                        align: 'center',
                                                        scopedSlot: 'status'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'time',
                                                        label: this.$t('Time'),
                                                        minWidth: 80,
                                                        formatter: r => {
                                                                return new Date(r.time * 1000).toLocaleString();
                                                        },
                                                        align: 'center'
                                                }
                                        }]
                                };
                        }
                },
                status() {
                        var status_list = [];
                        for (var row of this.tableData) {
                                var status = {};
                                var status_key = row.confirm.status;
                                status.text = this.$store.state.global.ord_status[status_key];
                                if (status_key === 0 || status_key === 9 || status_key === 11) {
                                        status.class = "success";
                                } else {
                                        status.class = "error";
                                }
                                status_list.push(status);
                        }
                        return status_list;
                }
        },
        methods: {
                get_order_id(r) {
                        if (r.request.settle === 0 && r.add_request.order_id) {
                                return r.add_request.order_id;
                        } else {
                                return r.request.order_id;
                        }
                },
                onSearchKeyWord() {
                        this.load_data();
                },
                changeSwitch(val) {
                        console.log('switch', val, this.refresh_enable);
                        clearInterval(this.timer);
                        if (val === 'false') {
                                this.refresh_time = '-';
                        } else {
                                this.refresh_time = 4;
                                this.refreshTable();
                        }
                },
                refreshTable() {
                        console.log('refresh_enable', this.refresh_enable);
                        if (this.refresh_enable === "false") {
                                return;
                        };
                        this.timer = setInterval(() => {
                                console.log('refresh_time', this.refresh_time);
                                if (this.refresh_time == 0) {
                                        this.refresh_time = 4;
                                        clearInterval(this.timer);
                                        return;
                                };
                                this.refresh_time--;
                        }, 1000);
                },
                download_file(kwargs) {
                        var params = {
                                func_name: 'trade_log.download_trade_log_details',
                                args: [],
                                kwargs
                        };
                        this.download_file_body = JSON.stringify(params);
                        this.$nextTick(() => {
                                this.$refs['download_file'].submit();
                        });
                        this.$refs['download_file'].submit();
                },
                onDownLoad() {
                        this.$prompt('Please input save filename:', 'prompt', {
                                confirmButtonText: 'OK',
                                cancelButtonText: ' Cancel'
                        }).then(({
                                value
                        }) => {
                                // var opts = this.getKwargs();
                                var kwargs = Object.assign({}, opts, {
                                        filename: value
                                });
                                this.download_file(kwargs);
                        });
                },
                show_lp_orders(row) {
                        console.log('row', row);
                        var ord_id = this.get_order_id(row);
                        var title = {
                                text: '#' + ord_id + ' LP Orders Settle:' + row.request.settle
                        };
                        var id = ord_id + "-" + row.time;
                        var config = row;
                        var lp_order = {
                                title,
                                config,
                                id
                        };
                        if (this.isDialogExist(this.lp_orders, lp_order) == false) {
                                this.lp_orders.push(lp_order);
                        };
                },
                onCloseLpOrder(index) {
                        this.lp_orders.splice(index, 1);
                },
                show_trade_log(row) {
                        var config = row;
                        var ord_id = this.get_order_id(row);
                        var title = {
                                text: 'Trade Log:' + ord_id
                        };
                        var id = ord_id + "-" + row.time;
                        var trade_log = {
                                title,
                                config,
                                id
                        };
                        if (this.isDialogExist(this.trade_logs, trade_log) == false) {
                                this.trade_logs.push(trade_log);
                        };
                },
                onCloseTradeLog(index) {
                        this.trade_logs.splice(index, 1);
                },
                onShowProfit() {
                        // var kwargs = this.getKwargs();
                        console.log('kwargs', kwargs);
                        if (kwargs.time == undefined) {
                                this.$message.warning('Select time first');
                                return;
                        }
                        var params = {
                                func_name: 'trade_log.trade_profit',
                                kwargs
                        };
                        CommonApi.postFormAjax.call(this, params, data => {
                                this.show_profit_dialog(data);
                        });
                },
                show_profit_dialog(profit_dict) {
                        this.trade_profit.config = [];
                        for (var key in profit_dict) {
                                var row = profit_dict[key];
                                row["symbol"] = key;
                                this.trade_profit.config.push(row);
                        };
                        this.trade_profit.show = true;
                },
                onCloseProfit() {
                        this.trade_profit.show = false;
                },

                interval_check() {
                        var remain_mil_sec;
                        if (this.refresh_enable === 'false') {
                                this.remain_sec = "-";
                                return;
                        };
                        console.log('888', this.next_fresh_time, this.data_loaded);
                        if (this.next_fresh_time && !this.data_loaded) {
                                remain_mil_sec = this.next_fresh_time - new Date().getTime();
                                if (remain_mil_sec <= 0) {
                                        this.remain_sec = '0';
                                        this.load_data();
                                        // this.data_loaded = true;
                                } else {
                                        this.remain_sec = parseInt(remain_mil_sec * 0.001);
                                }
                        }
                },
                schedule_next_request() {
                        this.next_fresh_time = new Date().getTime() + this.refresh_seconds * 1000;
                        this.data_loaded = false;
                },
                changeSwitch(val) {
                        if (val === 'true') {
                                this.remain_sec = "0";
                        }
                        if (val === 'false') {
                                this.remain_sec = "-";
                        }
                },
                onChangeCurrentPage(page) {
                        this.pagination.current_page = page;
                        this.getCurrentPageTable();
                },
                onChangePageSize(page_size) {
                        this.pagination.page_size = page_size;
                        this.getCurrentPageTable();
                },
                getCurrentPageTable() {
                        // this.getKwargs();
                        this.$$api_common_ajax({
                                data: {
                                        func_name: 'trade_log.page_trade_log',
                                        args: [this.pagination.current_page, this.pagination.page_size],
                                        kwargs: {}
                                },
                                fn: data => {
                                        this.tableData = data[0];
                                        this.pagination.total = data[1];
                                        this.data_loaded = true;
                                },
                                errFn: err => {
                                        this.$message.error(err.msg);
                                }
                        });
                },
                load_data() {
                        this.getCurrentPageTable();
                        this.schedule_next_request();
                },
                init() {
                        this.timer_interval_id = setInterval(() => {
                                this.interval_check();
                        }, 1000);
                        this.load_data();
                        this.nowTime = new Date().toGMTString();
                }
        },
        mounted() {
                this.init();
        },
        beforeRouteLeave(to, from, next) {
                if (this.timer_interval_id) {
                        clearInterval(this.timer_interval_id);
                }
                next();
        }
});

/***/ }),
/* 416 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TradeLog_vue__ = __webpack_require__(766);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TradeLog_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__TradeLog_vue__);
/**
 * Created by sailengsi on 2017/5/10.
 */



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__TradeLog_vue___default.a);

/***/ }),
/* 417 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'trade_rule',
    data() {
        return {
            tableData: [],
            remarks: [],
            groups: [],
            rules: [],
            create_new_group_dialog: {
                title: {
                    text: 'Add trade rule'
                },
                isModal: true,
                show: false,
                fields: [{
                    key: 'source',
                    type: 'select',
                    desc: '请选择',
                    label: 'source',
                    list: (() => {
                        var i, len, sources, source, result;
                        result = [];
                        sources = this.$store.state.global.sources;
                        for (i = 0, len = sources.length; i < len; i++) {
                            source = sources[i];
                            result.push({
                                value: source,
                                text: source
                            });
                        }
                        return result;
                    })()
                }, {
                    type: 'input',
                    key: 'group',
                    label: 'Group'
                }, {
                    type: 'input',
                    key: 'mt4_symbol',
                    label: 'MT4 Symbol'
                }, {
                    key: 'std_symbol',
                    type: 'select',
                    desc: '请选择',
                    label: 'status',
                    list: (() => {
                        var i, len, std_symbols, std_symbol, result;
                        result = [];
                        std_symbols = this.$store.state.global.std_symbols;
                        for (i = 0, len = std_symbols.length; i < len; i++) {
                            std_symbol = std_symbols[i];
                            result.push({
                                value: std_symbol,
                                text: std_symbol
                            });
                        }
                        return result;
                    })()
                }, {
                    key: 'route_type',
                    type: 'RouteType',
                    label: 'route_type',
                    default: {
                        threshold: 0,
                        right: 'ratio',
                        left: 'bestright'
                    }
                }, {
                    type: 'input',
                    key: 'coverage',
                    value: '',
                    label: 'coverage'
                }, {
                    type: 'input',
                    key: 'better_fill',
                    value: '',
                    label: 'better_fill'
                }, {
                    key: 'open_partial',
                    type: 'select',
                    value: {
                        default: true,
                        list: [{
                            value: true,
                            text: 'true'
                        }, {
                            value: false,
                            text: 'false'
                        }]
                    },
                    desc: '请选择',
                    label: 'open_partial'
                }, {
                    key: 'open_lp_rejected_retry',
                    type: 'select',
                    value: {
                        default: false,
                        list: [{
                            value: true,
                            text: 'true'
                        }, {
                            value: false,
                            text: 'false'
                        }]
                    },
                    desc: '请选择',
                    label: 'open_lp_rejected_retry  '
                }, {
                    type: 'input',
                    key: 'open_threshold',
                    label: 'open_threshold'
                }, {
                    type: 'input',
                    key: 'open_probe',
                    label: 'open_probe'
                }, {
                    type: 'input',
                    key: 'close_threshold',
                    label: 'close_threshold'
                }, {
                    type: 'input',
                    key: 'close_probe',
                    label: 'close_probe'
                }, {
                    type: 'input',
                    key: 'close_probe',
                    label: 'close_probe'
                }, {
                    type: 'input',
                    key: 'markup',
                    label: 'markup'
                }, {
                    key: 'limit_order_types',
                    type: 'CheckboxAndInputList',
                    label: 'limit_order_types',
                    desc: "Do not change MT4's request price",
                    spec: ["Instant", "Market", "Pending", "Stopout", "StopLoss", "TakeProfit"]
                }, {
                    label: 'lps',
                    type: 'CheckBoxList',
                    key: 'lps',
                    value: [],
                    list: (() => {
                        var i, len, results;
                        results = [];
                        var lps = this.$store.state.global.lps;
                        for (i = 0, len = lps.length; i < len; i++) {
                            var lp = lps[i];
                            console.log('lps', lps);
                            results.push(lp);
                        }
                        console.log('results', results);
                        return results;
                    })()
                }, {
                    key: 'bbook_exec_type',
                    type: 'select',
                    desc: '请选择',
                    label: 'bbook_exec_type',
                    list: [{
                        value: 'vwap',
                        text: 'vwap'
                    }, {
                        value: 'worst',
                        text: 'worst'
                    }]

                }, {
                    key: 'slippages',
                    type: 'MultipleInput',
                    label: 'slippages',
                    spec: [{
                        type: 'float',
                        desc: '> =size'
                    }, {
                        type: 'float',
                        desc: 'min slippage'
                    }, {
                        type: 'float',
                        desc: 'max slippage'
                    }]
                }],
                default_value: {}
            }
        };
    },
    computed: {
        tableConfig: {
            get() {
                return {
                    table: {
                        attr: {
                            data: this.tableData,
                            maxHeight: '100%'
                        }
                    },
                    columns: [{
                        attr: {
                            prop: 'source',
                            label: this.$t('source'),
                            Width: 80,
                            sortable: true,
                            // scopedSlot: 'date',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'group',
                            label: this.$t('group'),
                            Width: 80,
                            sortable: true,
                            align: 'center'
                        }
                    }, {
                        attr: {
                            label: this.$t('MT4 symbol'),
                            Width: 40,
                            sortable: true,
                            formatter(item) {
                                return item.mt4_symbols.length;
                            },
                            align: 'center'
                        }
                    }, {
                        attr: {
                            // prop: 'weight',
                            label: this.$t('View rules'),
                            width: 100,
                            sortable: true,
                            align: 'center',
                            scopedSlot: 'rulesdetail'
                        }
                    }, {
                        attr: {
                            // prop: 'weight',
                            label: this.$t('Create to new rules'),
                            width: 180,
                            sortable: true,
                            align: 'center',
                            scopedSlot: 'copygroup'
                        }
                    }, {
                        attr: {
                            prop: 'remark',
                            label: this.$t('Remark'),
                            width: 100,
                            sortable: true,
                            align: 'center',
                            scopedSlot: 'remark'
                        }
                    }]
                };
            }
        },
        get_up_traderule_table() {
            return this.$store.state.traderule.update_traderule_table;
        }
    },
    watch: {
        get_up_traderule_table(v) {
            if (v) {
                if (v == true) {
                    this.load_data();
                    this.$store.dispatch('update_traderule_table', false);
                }
            }
        }
    },
    methods: {
        onCloseDialog(type) {
            this[type].show = false;
        },
        onEditRemark(row) {
            console.log('row', row);
            var title = {
                text: 'Edit ' + row.source + "-" + row.group + ' remark'
            };
            var key = row.source + "_" + row.group;
            var default_value = {
                remark: row.remark,
                group: row.group
            };
            console.log('default_value', default_value);
            var config = Object.assign({}, {
                default_value
            }, {
                title
            });
            console.log('config', config);
            if (!(key in this.$store.state.traderule.remark_dialogs)) {
                this.$store.dispatch('update_remark_dialogs', {
                    key,
                    config
                });
            };
        },
        open_create_new_group_dialog() {
            this.create_new_group_dialog.show = true;
        },
        copy_to_new_group(row) {
            console.log('row', row);
            var source = row.source;
            var group = row.group;
            var key = source + "_" + group;
            var title = 'Copy  ' + source + ' - ' + group + ' to new group';
            var config = Object.assign({}, {
                source,
                group,
                title
            });
            if (!(key in this.$store.state.traderule.copy_to_new_group_dialogs)) {
                this.$store.dispatch('update_copy_to_new_group_dialogs', {
                    key,
                    config
                });
            };
        },
        GroupTradeRulesTable(row) {
            var title = {
                text: 'Trade Rules - Source:' + row.source + " Group: " + row.group
            };
            var source = row.source;
            var group = row.group;
            var key = source + "_" + group;;
            var title = 'Trade Rules - Source:' + source + ' Group: ' + group;
            var tableData = [];
            for (var k in this.$store.state.traderule.trade_rules) {
                var rule = this.$store.state.traderule.trade_rules[k];
                if (rule.source === source && rule.group === group) {
                    var new_rule = this.deepCopy(rule);
                    new_rule.source = source;
                    new_rule.group = group;
                    tableData.push(new_rule);
                }
            }
            var config = Object.assign({}, {
                source,
                group,
                title,
                tableData
            });
            if (!(key in this.$store.state.traderule.view_rules_dialogs)) {
                this.$store.dispatch('update_view_rules_dialogs', {
                    key,
                    config
                });
            };
        },
        render_groups(rules) {
            var i, j, key, len, len1, rule, rule_key, source_group, source_groups, source_groups_dict;
            source_groups = [];
            this.$store.dispatch('update_trade_rules', rules);
            source_groups_dict = new Object();
            for (i = 0, len = rules.length; i < len; i++) {
                rule = rules[i];
                rule_key = [rule.source, rule.group];
                if (!(rule_key in source_groups_dict)) {
                    source_groups_dict[rule_key] = new Object({
                        source: rule.source,
                        group: rule.group,
                        mt4_symbols: [rule.mt4_symbol]
                    });
                } else {
                    source_groups_dict[rule_key].mt4_symbols.push(rule.mt4_symbol);
                }
            }
            for (key in source_groups_dict) {
                source_group = source_groups_dict[key];
                source_groups.push(source_group);
            }
            for (j = 0, len1 = source_groups.length; j < len1; j++) {
                source_group = source_groups[j];
                source_group.mt4_symbols.sort();
            }
            source_groups.sort(function (a, b) {
                if (a.source > b.source) {
                    return 1;
                } else if (a.source < b.source) {
                    return -1;
                } else {
                    if (a.group > b.group) {
                        return 1;
                    } else if (a.group < b.group) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            });
            this.tableData = source_groups;
            console.log('tableData', this.tableData);
        },
        render_remarks() {
            var i, j, len, len1, remark_dict, remark, row;
            var params = {
                func_name: 'trade_rule_remark.get_all_remarks'
            };
            remark_dict = new Object();
            CommonApi.postFormAjax.call(this, params, remarks => {
                for (i = 0, len = remarks.length; i < len; i++) {
                    remark = remarks[i];
                    remark_dict[remark.group] = remark.remark;
                };
                console.log('remark_dict', remark_dict);
                for (j = 0, len1 = this.tableData.length; j < len1; j++) {
                    row = this.tableData[j];
                    if (row.group in remark_dict) {
                        remark = remark_dict[row.group];
                        this.$set(row, 'remark', remark);
                    } else {
                        Object.assign(row, {
                            remark: '______________'
                        });
                    }
                };
                console.log('remark', this.tableData);
            }, {
                errFn(err) {
                    for (j = 0, len1 = this.tableData.length; j < len1; j++) {
                        row = this.tableData[j];
                        Object.assign(row, {
                            remark: 'Load remark error'
                        });
                    }
                }
            });
        },
        load_data() {
            this.$$api_common_ajax({
                data: {
                    func_name: 'router_api.trade_get_all_rules',
                    args: [],
                    kwargs: {}
                },
                fn: data => {
                    this.trade_rules = data;
                    console.log('trade_rules', this.trade_rules);
                    this.render_groups(data);
                    this.render_remarks();
                }
            });
        },
        init() {
            this.load_data();
        }
    },
    mounted() {
        this.init();
    }
});

/***/ }),
/* 418 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TradeRule_vue__ = __webpack_require__(767);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TradeRule_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__TradeRule_vue__);
/**
 * Created by sailengsi on 2017/5/10.
 */



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__TradeRule_vue___default.a);

/***/ }),
/* 419 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by sailengsi on 2017/5/11.
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'user_list',
  data() {
    return {
      add_user_dialog: {
        show: false,
        isModal: true,
        title: {
          text: 'Add user'
        },
        fields: [{
          type: 'input',
          key: 'username',
          label: 'User'
        }, {
          type: 'input',
          key: 'password',
          label: 'Password'
        }, {
          key: 'role',
          type: 'select',
          desc: '请选择',
          label: 'Role',
          list: (() => {
            var i, len, roles, role, result;
            result = [];
            roles = this.$store.state.global.roles;
            console.log('roles', roles);
            for (i = 0, len = roles.length; i < len; i++) {
              role = roles[i];
              result.push({ value: role, text: role });
            }
            console.log('result', result);
            return result;
          })()

        }, {
          type: 'input',
          key: 'lps',
          label: 'LPs'
        }, {
          type: 'input',
          key: 'groups',
          label: 'Groups'
        }, {
          type: 'input',
          key: 'symbols',
          label: 'MT4 Symbols'
        }, {
          type: 'input',
          key: 'desc',
          label: 'Description'
        }],
        default_value: {
          role: 'Admin'
        }
      },

      edit_user_dialog: {
        show: false,
        isModal: true,
        title: {
          text: 'Edit User'
        },
        fields: [{
          type: 'input',
          key: 'username',
          label: 'User',
          disabled: true
        }, {
          type: 'input',
          key: 'password',
          desc: 'Input nothing means no change',
          label: 'Password'
        }, {
          key: 'role',
          type: 'select',
          desc: '请选择',
          label: 'Role',
          list: (() => {
            var i, len, roles, role, result;
            result = [];
            roles = this.$store.state.global.roles;
            for (i = 0, len = roles.length; i < len; i++) {
              role = roles[i];
              result.push({ value: role, text: role });
            }
            return result;
          })()

        }, {
          type: 'input',
          key: 'lps',
          value: '',
          label: 'LPs'
        }, {
          type: 'input',
          key: 'groups',
          label: 'Groups'
        }, {
          type: 'input',
          key: 'symbols',
          label: 'MT4 Symbols'
        }, {
          key: 'status',
          type: 'select',
          desc: '请选择',
          label: 'status',
          list: [{ value: 0, text: 'Enabled' }, { value: 1, text: 'Disabled' }]

        }, {
          type: 'input',
          key: 'desc',
          label: 'Description'
        }],
        default_value: {}
      },
      tableData: [],
      pagination: {
        current_page: 1,
        total: 0,
        page_size: 12,
        page_sizes: [3, 9, 12, 24],
        layout: "total, sizes, prev, pager, next, jumper"
      }
    };
  },
  computed: {
    tableConfig: {
      get() {
        return {
          table: {
            attr: {
              data: this.tableData,
              maxHeight: '100%',
              defaultSort: { prop: 'std_symbol' }
            }
          },
          columns: [{
            attr: {
              prop: 'user_id',
              label: this.$t('user_id'),
              minWidth: 180,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'username',
              label: this.$t('username'),
              minWidth: 180,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'role',
              label: this.$t('role'),
              minWidth: 180,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'status',
              label: this.$t('status'),
              width: 100,
              align: 'center',
              scopedSlot: 'status'
            }
          }, {
            attr: {
              prop: 'update_time',
              label: this.$t('update_time'),
              width: 180,
              align: 'center'
            }
          }, {
            attr: {
              prop: 'create_time',
              label: this.$t('create_time'),
              minWidth: 180,
              align: 'center'
            }
          }, {
            attr: {
              label: this.$t('edit'),
              minWidth: 180,
              scopedSlot: 'handler',
              align: 'center'
            }
          }]
        };
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

    onEditUser(row) {
      this.edit_user_dialog.show = true;
      this.$nextTick(() => {
        Object.assign(this.edit_user_dialog.default_value, row, { password: '' });
      });
    },
    add_user_submit(data) {
      this.$$api_common_ajax({
        data: {
          func_name: 'user.create_user',
          args: [data.username, data.password, data.role, data.desc],
          kwargs: { groups: data.groups, lps: data.lps, symbols: data.symbols }
        },
        fn: data => {
          this.find_page_user();
          this.add_user_dialog.show = false;
        },
        errFn: err => {}
      });
    },
    edit_user_submit(data) {
      this.$$api_common_ajax({
        data: {
          func_name: 'user.update_user',
          args: [data.user_id, data.password, data.role, data.status, data.desc],
          kwargs: { groups: data.groups, lps: data.lps, symbols: data.symbols }
        },
        fn: data => {
          this.find_page_user();
          this.edit_user_dialog.show = false;
        },
        errFn: err => {
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
          this.tableData = data[0];
          this.pagination.total = data[1];
        },
        errFn: err => {
          this.$message.error(err.msg);
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
});

/***/ }),
/* 420 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__User_vue__ = __webpack_require__(768);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__User_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__User_vue__);
/**
 * Created by sailengsi on 2017/5/10.
 */



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__User_vue___default.a);

/***/ }),
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */,
/* 507 */,
/* 508 */,
/* 509 */,
/* 510 */,
/* 511 */,
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */,
/* 516 */,
/* 517 */,
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */,
/* 530 */,
/* 531 */,
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */,
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */,
/* 555 */,
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */,
/* 560 */,
/* 561 */,
/* 562 */,
/* 563 */,
/* 564 */,
/* 565 */,
/* 566 */,
/* 567 */,
/* 568 */,
/* 569 */,
/* 570 */,
/* 571 */,
/* 572 */,
/* 573 */,
/* 574 */,
/* 575 */,
/* 576 */,
/* 577 */,
/* 578 */,
/* 579 */,
/* 580 */,
/* 581 */,
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */,
/* 586 */,
/* 587 */,
/* 588 */,
/* 589 */,
/* 590 */,
/* 591 */,
/* 592 */,
/* 593 */,
/* 594 */,
/* 595 */,
/* 596 */,
/* 597 */,
/* 598 */,
/* 599 */,
/* 600 */,
/* 601 */,
/* 602 */,
/* 603 */,
/* 604 */,
/* 605 */,
/* 606 */,
/* 607 */,
/* 608 */,
/* 609 */,
/* 610 */,
/* 611 */,
/* 612 */,
/* 613 */,
/* 614 */,
/* 615 */,
/* 616 */,
/* 617 */,
/* 618 */,
/* 619 */,
/* 620 */,
/* 621 */,
/* 622 */,
/* 623 */,
/* 624 */,
/* 625 */,
/* 626 */,
/* 627 */,
/* 628 */,
/* 629 */,
/* 630 */,
/* 631 */,
/* 632 */,
/* 633 */,
/* 634 */,
/* 635 */,
/* 636 */,
/* 637 */,
/* 638 */,
/* 639 */,
/* 640 */,
/* 641 */,
/* 642 */,
/* 643 */,
/* 644 */,
/* 645 */,
/* 646 */,
/* 647 */,
/* 648 */,
/* 649 */,
/* 650 */,
/* 651 */,
/* 652 */,
/* 653 */,
/* 654 */,
/* 655 */,
/* 656 */,
/* 657 */,
/* 658 */,
/* 659 */,
/* 660 */,
/* 661 */,
/* 662 */,
/* 663 */,
/* 664 */,
/* 665 */,
/* 666 */,
/* 667 */,
/* 668 */,
/* 669 */,
/* 670 */,
/* 671 */,
/* 672 */,
/* 673 */,
/* 674 */,
/* 675 */,
/* 676 */,
/* 677 */,
/* 678 */,
/* 679 */,
/* 680 */,
/* 681 */,
/* 682 */,
/* 683 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 684 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 685 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 686 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 687 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 688 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 689 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 690 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 691 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 692 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 693 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 694 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 695 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 696 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 697 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 698 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 699 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 700 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 701 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 702 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 703 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 704 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 705 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 706 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 707 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 708 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 709 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 710 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 711 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 712 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 713 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 714 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 715 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 716 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 717 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 718 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 719 */,
/* 720 */,
/* 721 */,
/* 722 */,
/* 723 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(715)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(250),
  /* template */
  __webpack_require__(813),
  /* scopeId */
  "data-v-b46fb868",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 724 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(688)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(251),
  /* template */
  __webpack_require__(776),
  /* scopeId */
  "data-v-1db062a4",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 725 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(705)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(252),
  /* template */
  __webpack_require__(799),
  /* scopeId */
  "data-v-61373a18",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 726 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(713)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(253),
  /* template */
  __webpack_require__(810),
  /* scopeId */
  "data-v-8bf375d8",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 727 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(689)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(254),
  /* template */
  __webpack_require__(777),
  /* scopeId */
  "data-v-20537747",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 728 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(683)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(255),
  /* template */
  __webpack_require__(769),
  /* scopeId */
  "data-v-0056f911",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 729 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(687)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(256),
  /* template */
  __webpack_require__(775),
  /* scopeId */
  "data-v-17b64344",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 730 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(257),
  /* template */
  __webpack_require__(782),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 731 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(716)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(258),
  /* template */
  __webpack_require__(814),
  /* scopeId */
  "data-v-c65e8186",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 732 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(259),
  /* template */
  __webpack_require__(806),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 733 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(260),
  /* template */
  __webpack_require__(772),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 734 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(261),
  /* template */
  __webpack_require__(779),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 735 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(262),
  /* template */
  __webpack_require__(778),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 736 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(263),
  /* template */
  __webpack_require__(798),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 737 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(264),
  /* template */
  __webpack_require__(808),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 738 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(265),
  /* template */
  __webpack_require__(790),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 739 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(707)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(266),
  /* template */
  __webpack_require__(801),
  /* scopeId */
  "data-v-62d3df32",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 740 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(700)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(267),
  /* template */
  __webpack_require__(793),
  /* scopeId */
  "data-v-4e4d7640",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 741 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(268),
  /* template */
  __webpack_require__(811),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 742 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(710)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(269),
  /* template */
  __webpack_require__(804),
  /* scopeId */
  "data-v-6eb27714",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 743 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(270),
  /* template */
  __webpack_require__(774),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 744 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(718)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(271),
  /* template */
  __webpack_require__(818),
  /* scopeId */
  "data-v-ef9e7198",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 745 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(272),
  /* template */
  __webpack_require__(817),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 746 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(273),
  /* template */
  __webpack_require__(816),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 747 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(274),
  /* template */
  __webpack_require__(809),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 748 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(275),
  /* template */
  __webpack_require__(786),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 749 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(696)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(276),
  /* template */
  __webpack_require__(788),
  /* scopeId */
  "data-v-415aa50b",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 750 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(691)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(277),
  /* template */
  __webpack_require__(781),
  /* scopeId */
  "data-v-2d838e78",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 751 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(684)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(278),
  /* template */
  __webpack_require__(770),
  /* scopeId */
  "data-v-03c5fc78",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 752 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(692)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(279),
  /* template */
  __webpack_require__(783),
  /* scopeId */
  "data-v-357a2288",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 753 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(712)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(280),
  /* template */
  __webpack_require__(807),
  /* scopeId */
  "data-v-73379644",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 754 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(697)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(284),
  /* template */
  __webpack_require__(789),
  /* scopeId */
  "data-v-4368a322",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 755 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(686)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(285),
  /* template */
  __webpack_require__(773),
  /* scopeId */
  "data-v-07cc9df4",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 756 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(704)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(286),
  /* template */
  __webpack_require__(797),
  /* scopeId */
  "data-v-5e5fbccf",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 757 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(709)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(287),
  /* template */
  __webpack_require__(803),
  /* scopeId */
  "data-v-68f4814f",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 758 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(685)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(288),
  /* template */
  __webpack_require__(771),
  /* scopeId */
  "data-v-03d3f319",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 759 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(701)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(289),
  /* template */
  __webpack_require__(794),
  /* scopeId */
  "data-v-52c5e2fa",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 760 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(698)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(290),
  /* template */
  __webpack_require__(791),
  /* scopeId */
  "data-v-45be2e62",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 761 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(711)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(291),
  /* template */
  __webpack_require__(805),
  /* scopeId */
  "data-v-716feba2",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 762 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(703)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(292),
  /* template */
  __webpack_require__(796),
  /* scopeId */
  "data-v-591d4922",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 763 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(699)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(293),
  /* template */
  __webpack_require__(792),
  /* scopeId */
  "data-v-4c4874f2",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 764 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(708)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(294),
  /* template */
  __webpack_require__(802),
  /* scopeId */
  "data-v-6596b7be",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 765 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(695)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(295),
  /* template */
  __webpack_require__(787),
  /* scopeId */
  "data-v-3f5c54b9",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 766 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(717)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(296),
  /* template */
  __webpack_require__(815),
  /* scopeId */
  "data-v-cfb622a2",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 767 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(694)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(297),
  /* template */
  __webpack_require__(785),
  /* scopeId */
  "data-v-3918b7f1",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 768 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(702)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(298),
  /* template */
  __webpack_require__(795),
  /* scopeId */
  "data-v-54f8050f",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 769 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "chart"
  }, [_c('el-row', [_c('el-col', {
    attrs: {
      "span": 24
    }
  }, [_c('div', {
    staticStyle: {
      "width": "100%",
      "height": "400px"
    },
    attrs: {
      "id": _vm.data.id
    }
  })])], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 770 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-col', {
    staticClass: "actions-top",
    attrs: {
      "span": 24
    }
  }, [_c('div', {
    staticClass: "list-header"
  }, [_vm._t("sls-header-before")], 2), _vm._v(" "), (_vm.btn_info.batch !== false && _vm.btn_info.batch_delete !== false) ? _c('el-button', {
    attrs: {
      "type": "danger",
      "icon": "delete",
      "disabled": _vm.batch.flag
    },
    on: {
      "click": function($event) {
        _vm.onBtnEvent({
          type: "BatchDelete"
        })
      }
    }
  }, [_vm._v(_vm._s(_vm.btn_info.batch_delete_text || '删除选中') + _vm._s(_vm.batch.ids.length ? '(' + _vm.batch.ids.length + ')' : '') + "\n    ")]) : _vm._e(), _vm._v(" "), (_vm.btn_info.add !== false) ? _c('el-button', {
    attrs: {
      "type": "primary",
      "icon": "add"
    },
    on: {
      "click": function($event) {
        _vm.onBtnEvent({
          type: "Add"
        })
      }
    }
  }, [_vm._v(_vm._s(_vm.btn_info.add_text || '添加') + "\n    ")]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "list-header"
  }, [_vm._t("sls-header-after")], 2), _vm._v(" "), (_vm.fields && _vm.fields.length) ? _c('div', {
    staticClass: "list-search"
  }, [_c('form-data', {
    attrs: {
      "Setting": _vm.setting,
      "FieldList": _vm.fields,
      "DefaultValue": _vm.default_value
    },
    on: {
      "onSubmit": _vm.onSearch
    }
  })], 1) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 771 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "list"
  }, [_c('el-button', {
    attrs: {
      "plain": true,
      "type": "info"
    },
    on: {
      "click": function($event) {
        _vm.onGetErrLog()
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('Error Log')))]), _vm._v(" "), _c('el-button', {
    attrs: {
      "plain": true,
      "type": "info"
    },
    on: {
      "click": function($event) {
        _vm.onGetInfoLog()
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('Info Log')))]), _vm._v(" "), _c('el-button', {
    attrs: {
      "plain": true,
      "type": "info"
    },
    on: {
      "click": function($event) {
        _vm.onGetCurrentshopper()
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('Current Shopper')))]), _vm._v(" "), _c('el-input', {
    staticClass: "info_show",
    attrs: {
      "readonly": ""
    },
    model: {
      value: (_vm.log_value),
      callback: function($$v) {
        _vm.log_value = $$v
      },
      expression: "log_value"
    }
  }), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.onGetBridgeStatus()
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('Bridge status')))]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "danger"
    },
    on: {
      "click": function($event) {
        _vm.onSetMaxConcurrency()
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('Set Max Bridge Concurrency')))]), _vm._v(" "), _c('p', {
    staticClass: "status_info"
  }, [_vm._v(_vm._s(_vm.$t('bridge status')) + ":"), _c('span', [_vm._v(_vm._s(_vm.bridge_status))])]), _vm._v(" "), _c('div', {
    staticClass: "code-container"
  }, [_c('pre', {
    staticClass: "bridge-code"
  }, [_vm._v(_vm._s(_vm.bridge_value))])]), _vm._v(" "), _c('P', {
    staticClass: "warn_info"
  }, [_vm._v(_vm._s(_vm.$t('WARNING: DO NOT CLICK BELOW BUTTONS IF YOU KNOW NOTHING!')))]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "danger"
    },
    on: {
      "click": function($event) {
        _vm.onStopBridge()
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('stop bridge')))]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.onOpenBridge()
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('start bridge')))])], 1)
},staticRenderFns: []}

/***/ }),
/* 772 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-date-picker', _vm._b({
    attrs: {
      "type": "month",
      "placeholder": _vm.data.desc
    },
    on: {
      "change": _vm.onChange
    },
    model: {
      value: (_vm.submit_data[_vm.data.key]),
      callback: function($$v) {
        _vm.$set(_vm.submit_data, _vm.data.key, $$v)
      },
      expression: "submit_data[data.key]"
    }
  }, 'el-date-picker', _vm.date_attrs, false))], 1)
},staticRenderFns: []}

/***/ }),
/* 773 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "home"
  }, [_c('div', {
    staticClass: "left-fixed"
  }, [_c('left-menu')], 1), _vm._v(" "), _c('div', {
    staticClass: "right-auto",
    style: ({
      marginLeft: _vm.$store.state.leftmenu.width
    })
  }, [_c('head-nav'), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_c('bread'), _vm._v(" "), _c('router-view')], 1)], 1)])
},staticRenderFns: []}

/***/ }),
/* 774 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-switch', _vm._b({
    attrs: {
      "on-text": _vm.data.value.on,
      "off-text": _vm.data.value.off
    },
    on: {
      "change": _vm.onChange
    },
    model: {
      value: (_vm.submit_data[_vm.data.key]),
      callback: function($$v) {
        _vm.$set(_vm.submit_data, _vm.data.key, $$v)
      },
      expression: "submit_data[data.key]"
    }
  }, 'el-switch', _vm.switch_attrs, false))], 1)
},staticRenderFns: []}

/***/ }),
/* 775 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-form', {
    ref: "form-data",
    attrs: {
      "label-width": "100px",
      "inline": _vm.setting.inline,
      "rules": _vm.rules,
      "model": _vm.submit_data
    }
  }, [_vm._l((_vm.fields), function(field, index) {
    return _c('el-form-item', _vm._b({
      key: index,
      staticClass: "edit-form",
      attrs: {
        "label": field.label,
        "prop": field.key
      }
    }, 'el-form-item', field.attrs || {}, false), [_c(_vm.components[field.type] || 'SlsInput', {
      tag: "component",
      attrs: {
        "Data": field,
        "SubmitData": _vm.submit_data,
        "SubmitInfo": _vm.submit_info,
        "TempFieldObj": _vm.temp_field_obj
      }
    })], 1)
  }), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.onSubmit("form-data")
      }
    }
  }, [_vm._v("提交")])], 1)], 2)
},staticRenderFns: []}

/***/ }),
/* 776 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    ref: "drag-dialog",
    staticClass: "xa-popup"
  }, [(_vm.isModal) ? _c('div', {
    ref: "popup-modal",
    staticClass: "layer"
  }) : _vm._e(), _vm._v(" "), _c('div', {
    ref: "popup",
    staticClass: "popup",
    on: {
      "mousedown": _vm.click
    }
  }, [_c('div', {
    ref: "title",
    staticClass: "title",
    class: _vm.title.className || 'xa-bg-eee'
  }, [_c('div', {
    staticClass: "name"
  }, [_vm._v(_vm._s(_vm.title.text || _vm.title))]), _vm._v(" "), _c('div', {
    staticClass: "close",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.close()
      }
    }
  })]), _vm._v(" "), _c('div', {
    ref: "main",
    staticClass: "main"
  }, [_vm._t("default")], 2), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.buttons.length),
      expression: "buttons.length"
    }],
    staticClass: "buttons"
  }, _vm._l((_vm.buttons), function(btn) {
    return _c('div', {
      staticClass: "button",
      class: btn.className,
      on: {
        "click": function($event) {
          _vm.setEvent(btn)
        }
      }
    }, [_vm._v(_vm._s(btn.text))])
  }))])])
},staticRenderFns: []}

/***/ }),
/* 777 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "chart"
  }, [_c('el-row', [_c('el-col', {
    attrs: {
      "span": 24
    }
  }, [_c('div', {
    staticStyle: {
      "width": "100%",
      "height": "400px"
    },
    attrs: {
      "id": "chartDom"
    }
  })])], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 778 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-date-picker', _vm._b({
    attrs: {
      "type": "datetime",
      "placeholder": _vm.data.desc
    },
    on: {
      "change": _vm.onChange
    },
    model: {
      value: (_vm.submit_data[_vm.data.key]),
      callback: function($$v) {
        _vm.$set(_vm.submit_data, _vm.data.key, $$v)
      },
      expression: "submit_data[data.key]"
    }
  }, 'el-date-picker', _vm.date_time_attrs, false))], 1)
},staticRenderFns: []}

/***/ }),
/* 779 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-date-picker', _vm._b({
    attrs: {
      "type": "daterange",
      "placeholder": _vm.data.desc
    },
    on: {
      "change": _vm.onChange
    },
    model: {
      value: (_vm.submit_data[_vm.data.key]),
      callback: function($$v) {
        _vm.$set(_vm.submit_data, _vm.data.key, $$v)
      },
      expression: "submit_data[data.key]"
    }
  }, 'el-date-picker', _vm.date_attrs, false))], 1)
},staticRenderFns: []}

/***/ }),
/* 780 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "left",
    style: ({
      'height': _vm.win_size.height,
      'width': _vm.$store.state.leftmenu.width
    }),
    attrs: {
      "id": "admin-left"
    }
  }, [_c('div', {
    attrs: {
      "id": "left-menu"
    }
  }, [_c('el-row', {
    staticClass: "tac"
  }, [_c('el-col', {
    attrs: {
      "span": 24
    }
  }, [_c('div', {
    staticClass: "logo"
  }), _vm._v(" "), _c('el-menu', {
    staticClass: "el-menu-vertical-demo",
    attrs: {
      "theme": "dark",
      "default-active": _vm.$route.path,
      "unique-opened": "",
      "router": ""
    }
  }, [_vm._l((_vm.$router.options.routes), function(item, index) {
    return (!item.hidden) ? [(!item.leaf) ? _c('el-submenu', {
      attrs: {
        "index": item.path
      }
    }, [_c('template', {
      slot: "title"
    }, [_c('el-tooltip', {
      staticClass: "item",
      attrs: {
        "effect": "dark",
        "placement": "right",
        "disabled": _vm.$store.state.leftmenu.menu_flag,
        "content": item.name
      }
    }, [_c('i', {
      class: 'fa fa-' + item.icon
    })]), _vm._v(" "), (_vm.$store.state.leftmenu.menu_flag) ? _c('span', {
      staticClass: "menu-name"
    }, [_vm._v(_vm._s(item.name) + "\n                                    ")]) : _vm._e()], 1), _vm._v(" "), _vm._l((item.children), function(child, cindex) {
      return (!child.hidden) ? _c('el-menu-item', {
        key: child.path,
        style: ({
          'padding-left': _vm.$store.state.leftmenu.menu_flag ? '40px' : '23px'
        }),
        attrs: {
          "index": _vm.$store.state.router.headerCurRouter + "/" + item.path + "/" + child.path
        }
      }, [_c('el-tooltip', {
        staticClass: "item",
        attrs: {
          "effect": "dark",
          "placement": "right",
          "disabled": _vm.$store.state.leftmenu.menu_flag,
          "content": child.name
        }
      }, [_c('i', {
        class: 'fa fa-' + child.icon
      })]), _vm._v(" "), (_vm.$store.state.leftmenu.menu_flag) ? _c('span', {
        staticClass: "menu-name"
      }, [_vm._v(_vm._s(child.name) + "\n                                    ")]) : _vm._e()], 1) : _vm._e()
    })], 2) : _vm._e(), _vm._v(" "), (item.leaf && item.children.length > 0) ? _c('el-menu-item', {
      attrs: {
        "index": item.path + '/' + item.children[0].path
      }
    }, [_c('el-tooltip', {
      staticClass: "item",
      attrs: {
        "effect": "dark",
        "placement": "right",
        "disabled": _vm.$store.state.leftmenu.menu_flag,
        "content": item.name
      }
    }, [_c('i', {
      class: 'fa fa-' + item.icon
    })]), _vm._v(" "), (_vm.$store.state.leftmenu.menu_flag) ? _c('span', {
      staticClass: "menu-name"
    }, [_vm._v(_vm._s(item.children[0].name))]) : _vm._e()], 1) : _vm._e()] : _vm._e()
  })], 2)], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "toggle-menu",
    style: ({
      left: _vm.$store.state.leftmenu.width
    }),
    on: {
      "click": _vm.toggleMenu
    }
  }, [_c('i', {
    class: [{
      "el-icon-arrow-left": _vm.$store.state.leftmenu.menu_flag
    }, {
      "el-icon-arrow-right": !_vm.$store.state.leftmenu.menu_flag
    }]
  })])], 1)])
},staticRenderFns: []}

/***/ }),
/* 781 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "list"
  }, [_c('sls-table-head', {
    attrs: {
      "Batch": _vm.batch,
      "Search": _vm.search,
      "BtnInfo": _vm.btn_info
    },
    on: {
      "onSearch": _vm.onSearch,
      "onBtnEvent": _vm.onBtnEvent
    }
  }, [_c('span', {
    slot: "sls-header-after"
  }, [_vm._t("header-after")], 2), _vm._v(" "), _c('span', {
    slot: "sls-header-before"
  }, [_vm._t("header-before")], 2)]), _vm._v(" "), _c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "border": "",
      "align": "center",
      "data": _vm.list
    },
    on: {
      "selection-change": _vm.onSelectionChange
    }
  }, [(_vm.expand && _vm.expand.show && _vm.expand.show === true && (!_vm.expand.position || _vm.expand.position === "left")) ? _c('el-table-column', {
    attrs: {
      "type": "expand"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_vm._t("expand", null, {
          data: scope.row,
          index: scope.$index
        })]
      }
    }])
  }) : _vm._e(), _vm._v(" "), (_vm.btn_info.batch !== false) ? _c('el-table-column', {
    attrs: {
      "type": "selection",
      "width": "55"
    }
  }) : _vm._e(), _vm._v(" "), _vm._l((_vm.fields), function(field, index) {
    return [(!field.type) ? _c('el-table-column', {
      style: (field.style),
      attrs: {
        "prop": field.key,
        "label": field.label,
        "align": field.align || 'center',
        "sortable": field.sort || false,
        "formatter": field.formatter,
        "filters": field.filter_list,
        "filter-method": field.filter_method,
        "filter-multiple": field.filter_multiple,
        "width": field.width
      }
    }) : _vm._e(), _vm._v(" "), (field.type && field.type === "image") ? _c('el-table-column', {
      attrs: {
        "prop": field.key,
        "label": field.label,
        "align": field.align || 'center',
        "width": field.width
      },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function(scope) {
          return [_c('img', {
            attrs: {
              "src": (field.host || '') + scope.row[field.key],
              "alt": ""
            }
          })]
        }
      }])
    }) : _vm._e(), _vm._v(" "), (field.type && field.type === "link") ? _c('el-table-column', {
      attrs: {
        "prop": field.key,
        "label": field.label,
        "align": field.align || 'center',
        "width": field.width
      },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function(scope) {
          return [_c('a', {
            attrs: {
              "target": field.link_target || '_self',
              "href": scope.row[field.key]
            }
          }, [_vm._v(_vm._s(field.link_text || scope.row[field.key]))])]
        }
      }])
    }) : _vm._e()]
  }), _vm._v(" "), (_vm.btn_info.all !== false) ? _c('el-table-column', {
    attrs: {
      "label": _vm.btn_info.label || '操作',
      "width": _vm.btn_info.width || 160,
      "context": _vm._self
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_vm._l((_vm.btn_info.list), function(btn, index) {
          return (_vm.btn_info.list && _vm.btn_info.list_position === "before") ? _c('el-button', {
            key: btn.text,
            attrs: {
              "type": btn.type || 'info',
              "size": "mini"
            },
            on: {
              "click": function($event) {
                _vm.onCustomBtnEvent({
                  list: _vm.list,
                  data: scope.row,
                  dataIndex: scope.$index,
                  btnIndex: index,
                  btnInfo: btn
                })
              }
            }
          }, [_vm._v("\n                    " + _vm._s(btn.text) + "\n                ")]) : _vm._e()
        }), _vm._v(" "), (_vm.btn_info.default !== false) ? _c('span', [(_vm.btn_info.select !== false) ? _c('el-button', {
          attrs: {
            "type": "info",
            "icon": "view",
            "size": "mini"
          },
          on: {
            "click": function($event) {
              _vm.onBtnEvent({
                type: "Select",
                data: scope.row,
                dataIndex: scope.$index,
                list: _vm.list
              })
            }
          }
        }, [_vm._v(_vm._s(_vm.btn_info.select_text || ''))]) : _vm._e(), _vm._v(" "), (_vm.btn_info.update !== false) ? _c('el-button', {
          attrs: {
            "type": "info",
            "icon": "edit",
            "size": "mini"
          },
          on: {
            "click": function($event) {
              _vm.onBtnEvent({
                type: "Update",
                data: scope.row,
                dataIndex: scope.$index,
                list: _vm.list
              })
            }
          }
        }, [_vm._v(_vm._s(_vm.btn_info.update_text || ''))]) : _vm._e(), _vm._v(" "), (_vm.btn_info.delete !== false) ? _c('el-button', {
          attrs: {
            "type": "danger",
            "icon": "delete",
            "size": "mini"
          },
          on: {
            "click": function($event) {
              _vm.onBtnEvent({
                type: "Delete",
                data: scope.row,
                dataIndex: scope.$index,
                list: _vm.list
              })
            }
          }
        }, [_vm._v(_vm._s(_vm.btn_info.delete_text || ''))]) : _vm._e()], 1) : _vm._e(), _vm._v(" "), _vm._l((_vm.btn_info.list), function(btn, index) {
          return (_vm.btn_info.list && (_vm.btn_info.list_position === "after" || !_vm.btn_info.list_position)) ? _c('el-button', {
            key: btn.text,
            attrs: {
              "type": btn.type || 'info',
              "size": "mini"
            },
            on: {
              "click": function($event) {
                _vm.onCustomBtnEvent({
                  list: _vm.list,
                  data: scope.row,
                  dataIndex: scope.$index,
                  btnIndex: index,
                  btn: btn
                })
              }
            }
          }, [_vm._v("\n                    " + _vm._s(btn.text) + "\n                ")]) : _vm._e()
        })]
      }
    }])
  }) : _vm._e(), _vm._v(" "), (_vm.expand && _vm.expand.show && _vm.expand.show === true && _vm.expand.position && _vm.expand.position === "right") ? _c('el-table-column', {
    attrs: {
      "type": "expand",
      "context": _vm._self
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_vm._t("expand", null, {
          data: scope.row,
          index: scope.$index
        })]
      }
    }])
  }) : _vm._e()], 2), _vm._v(" "), _c('el-col', {
    staticClass: "btm-action",
    attrs: {
      "span": 24
    }
  }, [(_vm.pagination && ((_vm.pagination.total !== undefined && _vm.pagination.total > 0) || (_vm.pagination["page-count"] !== undefined && _vm.pagination["page-count"] > 0))) ? _c('el-pagination', {
    staticClass: "pagination",
    attrs: {
      "page-sizes": _vm.pagination.page_sizes,
      "page-size": _vm.pagination.page_size,
      "page-count": _vm.pagination['page-count'],
      "layout": _vm.pagination.layout,
      "total": _vm.pagination.total,
      "current-page": _vm.pagination.current_page
    },
    on: {
      "current-change": _vm.onChangeCurrentPage,
      "size-change": _vm.onChangePageSize
    }
  }) : _vm._e()], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 782 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-cascader', _vm._b({
    attrs: {
      "placeholder": _vm.data.desc,
      "options": _vm.data.options
    },
    on: {
      "change": _vm.onChange,
      "active-item-change": _vm.onActiveItemChange
    },
    model: {
      value: (_vm.submit_data[_vm.data.key]),
      callback: function($$v) {
        _vm.$set(_vm.submit_data, _vm.data.key, $$v)
      },
      expression: "submit_data[data.key]"
    }
  }, 'el-cascader', _vm.cascader_attrs, false))], 1)
},staticRenderFns: []}

/***/ }),
/* 783 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div')
},staticRenderFns: []}

/***/ }),
/* 784 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "bread"
  }, [_c('el-breadcrumb', {
    staticClass: "el-bread",
    attrs: {
      "separator": "/"
    }
  }, _vm._l((_vm.$route.matched), function(item, index) {
    return _c('el-breadcrumb-item', {
      key: index
    }, [_vm._v(_vm._s(item.name))])
  }))], 1)
},staticRenderFns: []}

/***/ }),
/* 785 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "list"
  }, [_c('el-row', [_c('el-col', {
    staticClass: "actions-top",
    attrs: {
      "span": 24
    }
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.open_create_new_group_dialog
    }
  }, [_vm._v(_vm._s(_vm.$t('Add group')))])], 1)], 1), _vm._v(" "), _c('bel-table', {
    ref: "table",
    attrs: {
      "configs": _vm.tableConfig
    },
    scopedSlots: _vm._u([{
      key: "rulesdetail",
      fn: function(scope) {
        return [_c('a', {
          attrs: {
            "href": "javascript:void(0);"
          },
          on: {
            "click": function($event) {
              _vm.GroupTradeRulesTable(scope.row)
            }
          }
        }, [_vm._v(" View rules")])]
      }
    }, {
      key: "copygroup",
      fn: function(scope) {
        return [_c('a', {
          attrs: {
            "href": "javascript:void(0);"
          },
          on: {
            "click": function($event) {
              _vm.copy_to_new_group(scope.row)
            }
          }
        }, [_vm._v(" Copy to new group")])]
      }
    }, {
      key: "remark",
      fn: function(scope) {
        return [_c('a', {
          attrs: {
            "href": "javascript:void(0);"
          },
          on: {
            "click": function($event) {
              _vm.onEditRemark(scope.row)
            }
          }
        }, [_vm._v(_vm._s(scope.row.remark))])]
      }
    }])
  }), _vm._v(" "), (_vm.create_new_group_dialog.show) ? _c('drag-dialog', {
    attrs: {
      "title": _vm.create_new_group_dialog.title,
      "isModal": _vm.create_new_group_dialog.isModal
    },
    on: {
      "close": function($event) {
        _vm.onCloseDialog('create_new_group_dialog')
      }
    }
  }, [_c('form-data1', {
    ref: "form-data",
    staticStyle: {
      "padding": "10px"
    },
    attrs: {
      "FieldList": _vm.fieldlist,
      "DefaultValue": _vm.create_new_group_dialog.default_value
    },
    on: {
      "onSubmit": _vm.create_new_group_submit
    }
  })], 1) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 786 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-time-picker', _vm._b({
    attrs: {
      "is-range": "",
      "placeholder": _vm.data.desc
    },
    on: {
      "change": _vm.onChange
    },
    model: {
      value: (_vm.submit_data[_vm.data.key]),
      callback: function($$v) {
        _vm.$set(_vm.submit_data, _vm.data.key, $$v)
      },
      expression: "submit_data[data.key]"
    }
  }, 'el-time-picker', _vm.time_attrs, false))], 1)
},staticRenderFns: []}

/***/ }),
/* 787 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "chart"
  }, [_c('el-row', {
    staticClass: "header_row"
  }, [_c('b', [_vm._v("Total Qty:")]), _vm._v(_vm._s(_vm.total_qty))]), _vm._v(" "), _c('el-row', {
    staticClass: "header_row"
  }, [_c('b', [_vm._v("CURRENT:")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.current_std_symbol))]), _vm._v("\n          \n        "), _c('b', [_vm._v("NEXT REFRESH:")]), _vm._v(" "), _c('span', {
    staticClass: "remain_sec"
  }, [_vm._v(_vm._s(_vm.remain_sec))]), _vm._v(" "), _c('b', [_vm._v("STATUS:")]), _vm._v(" "), _c('span', {
    style: ({
      color: _vm.load_text_color
    })
  }, [_vm._v(_vm._s(_vm.load_status))])]), _vm._v(" "), _c('el-row', _vm._l((_vm.std_symbols), function(item, key) {
    return _c('el-button', {
      attrs: {
        "type": "primary"
      },
      on: {
        "click": function($event) {
          _vm.select_std_symbol_chart(key)
        }
      }
    }, [_vm._v(_vm._s(key))])
  })), _vm._v(" "), _c('el-row', {
    staticStyle: {
      "width": "60%",
      "margin-top": "20px"
    }
  }, [_c('div', {
    staticClass: "pos_chart"
  }, _vm._l((_vm.current_lp_symbols), function(item, key) {
    return _c('div', {
      staticClass: "symbol_chart "
    }, [_c('div', {
      staticClass: "lp_symbol_item"
    }, [_c('div', {
      staticClass: "lp_weight",
      style: ({
        width: item.weight_width + '%'
      })
    }), _vm._v(" "), _c('div', {
      staticClass: "lp_text"
    }, [_c('div', [_c('a', {
      attrs: {
        "href": "javascript:void(0)"
      }
    }, [_c('span', {
      staticClass: "lp_status",
      style: ({
        'color': item.lp_symbol.trade_enable ? 'green' : 'red'
      })
    }, [_vm._v("\n                                                " + _vm._s(item.lp_symbol.trade_enable ? 'Enabled' : 'Disabled') + "\n                                            ")]), _vm._v("\n                                            S:\n                                            "), _c('span', [_vm._v("\n                                                " + _vm._s(item.lp_symbol.lp_symbol) + "\n                                            ")]), _vm._v("\n                                            W:\n                                            "), _c('span', [_vm._v("\n                                                " + _vm._s(item.lp_symbol.weight) + "\n                                            ")])])])]), _vm._v(" "), _c('div', {
      staticClass: "lp_position",
      style: ({
        width: item.position_width + '%',
        backgroundColor: item.position_bgcolor
      })
    }), _vm._v(" "), _c('div', {
      staticClass: "lp_qty"
    }, [_c('div', {
      staticStyle: {
        "margin-left": "10px"
      }
    }, [_c('span', [_vm._v("\n                                        " + _vm._s(key) + "\n                                        ")]), _vm._v(" "), _c('span', {
      staticStyle: {
        "font-size": "15px"
      }
    }, [_vm._v("\n                                        " + _vm._s(item.quantity) + "\n                                        ")])])])]), _vm._v(" "), _c('div', {
      staticStyle: {
        "height": "20px",
        "width": "100%"
      }
    })])
  }))])], 1)
},staticRenderFns: []}

/***/ }),
/* 788 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-dropdown', {
    staticClass: "eldropdown",
    attrs: {
      "trigger": "hover"
    },
    on: {
      "command": _vm.handleCommandSkin
    }
  }, [_c('span', {
    staticClass: "el-dropdown-link lang"
  }, [_vm._v(_vm._s(_vm.$t('skin')))]), _vm._v(" "), _c('el-dropdown-menu', {
    slot: "dropdown"
  }, _vm._l((_vm.skins), function(item, index) {
    return _c('el-dropdown-item', {
      key: index,
      attrs: {
        "command": item.name
      }
    }, [_vm._v(_vm._s(item.label))])
  }))], 1), _vm._v(" "), _c('el-dropdown', {
    attrs: {
      "trigger": "hover"
    },
    on: {
      "command": _vm.handleCommand
    }
  }, [_c('span', {
    staticClass: "el-dropdown-link lang"
  }, [_vm._v(_vm._s(_vm.$t('locales.' + _vm.locale)))]), _vm._v(" "), _c('el-dropdown-menu', {
    slot: "dropdown"
  }, _vm._l((_vm.langs), function(item, key, index) {
    return _c('el-dropdown-item', {
      key: index,
      attrs: {
        "command": key
      }
    }, [_vm._v(_vm._s(_vm.$t('locales.' + key)))])
  }))], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 789 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {}, [_c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('router-view')], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 790 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-date-picker', _vm._b({
    attrs: {
      "type": "year",
      "placeholder": _vm.data.desc
    },
    on: {
      "change": _vm.onChange
    },
    model: {
      value: (_vm.submit_data[_vm.data.key]),
      callback: function($$v) {
        _vm.$set(_vm.submit_data, _vm.data.key, $$v)
      },
      expression: "submit_data[data.key]"
    }
  }, 'el-date-picker', _vm.date_attrs, false))], 1)
},staticRenderFns: []}

/***/ }),
/* 791 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "list"
  }, [_c('div', [_c('span', {
    staticClass: " green"
  }, [_vm._v("green: position ")]), _vm._v(" "), _c('span', {
    staticClass: "red"
  }, [_vm._v("red: negative")]), _vm._v(" "), _c('strong', {
    staticStyle: {
      "margin-left": "10px"
    }
  }, [_vm._v("NEXT REFRESH:")]), _vm._v(" "), _c('span', {
    staticClass: "remain_sec"
  }, [_vm._v(_vm._s(_vm.remain_sec))]), _vm._v(" "), _c('span', {
    staticStyle: {
      "margin-left": "10px"
    }
  }, [_vm._v("STATUS:")]), _vm._v(" "), _c('span', {
    style: ({
      color: _vm.load_text_color
    })
  }, [_vm._v(_vm._s(_vm.load_status))]), _vm._v(" "), _c('span')]), _vm._v(" "), _c('bel-table', {
    ref: "table",
    attrs: {
      "configs": _vm.tableConfig
    },
    scopedSlots: _vm._u([_vm._l((_vm.lp_names), function(item) {
      return {
        key: item,
        fn: function(scope) {
          return [_c('span', {
            style: ({
              'color': scope.row[item] < 0 ? 'red' : 'green'
            })
          }, [_vm._v(_vm._s(scope.row[item] !== undefined ? Math.abs(scope.row[item]) : ''))])]
        }
      }
    }), {
      key: "total",
      fn: function(scope) {
        return [_c('span', {
          style: ({
            'color': scope.row.total < 0 ? 'red' : 'green'
          })
        }, [_vm._v(_vm._s(Math.abs(scope.row.total)))])]
      }
    }])
  })], 1)
},staticRenderFns: []}

/***/ }),
/* 792 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "list"
  }, [_c('el-row', {
    staticClass: "top-action",
    attrs: {
      "gutter": 20
    }
  }, [_c('el-select', {
    attrs: {
      "placeholder": "请选择"
    },
    on: {
      "change": _vm.changeSelect
    },
    model: {
      value: (_vm.current_source),
      callback: function($$v) {
        _vm.current_source = $$v
      },
      expression: "current_source"
    }
  }, _vm._l((_vm.options), function(item) {
    return _c('el-option', {
      attrs: {
        "label": item.label,
        "value": item.value
      }
    })
  })), _vm._v(" "), _c('b', {
    staticStyle: {
      "margin-left": "10px"
    }
  }, [_vm._v("Status:")]), _vm._v(" "), _c('span', {
    staticClass: "ws_status",
    style: ({
      backgroundColor: _vm.ws_status_bgcolor
    })
  }, [_vm._v(_vm._s(_vm.current_time))]), _vm._v(" "), _c('b', {
    staticStyle: {
      "margin-left": "10px"
    }
  }, [_vm._v("Description:")]), _vm._v(" "), _c('span', {
    style: ({
      color: _vm.load_desc_color
    })
  }, [_vm._v(_vm._s(_vm.load_desc))])], 1), _vm._v(" "), (_vm.mt4_panel_show) ? _c('bel-table', {
    ref: "table",
    attrs: {
      "configs": _vm.tableConfig
    },
    scopedSlots: _vm._u([{
      key: "adjust_enabled",
      fn: function(scope) {
        return [_c('el-switch', {
          attrs: {
            "on-color": "#13ce66",
            "off-color": "#ff4949"
          },
          on: {
            "change": function($event) {
              _vm.changeSwitch($event, scope.row)
            }
          },
          model: {
            value: (scope.row.adjust_enabled),
            callback: function($$v) {
              scope.row.adjust_enabled = $$v
            },
            expression: "scope.row.adjust_enabled"
          }
        })]
      }
    }, {
      key: "rule_type",
      fn: function(scope) {
        return [_c('a', {
          attrs: {
            "href": "JavaScript:void(0)",
            "type": "text"
          },
          on: {
            "click": function($event) {
              _vm.show_json_table(scope.row)
            }
          }
        }, [_vm._v("\n          " + _vm._s(scope.row.type) + "\n          ")])]
      }
    }, {
      key: "edit_adjust",
      fn: function(scope) {
        return [_c('el-row', [_c('el-button', {
          attrs: {
            "icon": "minus"
          },
          on: {
            "click": function($event) {
              _vm.controlAdjust('reduce', scope.row)
            }
          }
        }), _vm._v(" "), _c('el-input', {
          staticStyle: {
            "display": "inline-block",
            "width": "40px"
          },
          model: {
            value: (scope.row.adjust_step),
            callback: function($$v) {
              scope.row.adjust_step = $$v
            },
            expression: "scope.row.adjust_step"
          }
        }), _vm._v(" "), _c('el-button', {
          attrs: {
            "icon": "plus"
          },
          on: {
            "click": function($event) {
              _vm.controlAdjust('add', scope.row)
            }
          }
        })], 1)]
      }
    }, {
      key: "adjust",
      fn: function(scope) {
        return [_c('span', {
          style: (scope.row.attributes.adjust > 0 ? 'color:green;' : (scope.row.attributes.adjust < 0 ? 'color:red;' : 'color:black;'))
        }, [_vm._v(_vm._s(scope.row.attributes.adjust > 0 ? '+' + scope.row.attributes.adjust : scope.row.attributes.adjust))])]
      }
    }, {
      key: "std_symbol",
      fn: function(scope) {
        return [_c('a', {
          attrs: {
            "href": "JavaScript:void(0)",
            "type": "text"
          },
          on: {
            "click": function($event) {
              _vm.showLpQuotes(scope.row)
            }
          }
        }, [_vm._v(_vm._s(scope.row.std_symbol))])]
      }
    }, {
      key: "bid_change",
      fn: function(scope) {
        return [_c('span', {
          staticClass: "arrow",
          style: (scope.row.bid_change == '&darr;' ? 'color : red;' : ' color: green;'),
          domProps: {
            "innerHTML": _vm._s(scope.row.bid_change)
          }
        })]
      }
    }, {
      key: "ask_change",
      fn: function(scope) {
        return [_c('span', {
          staticClass: "arrow",
          style: (scope.row.ask_change == '&darr;' ? 'color : red;' : ' color: green;'),
          domProps: {
            "innerHTML": _vm._s(scope.row.ask_change)
          }
        })]
      }
    }])
  }) : _vm._e(), _vm._v(" "), _vm._l((_vm.rule_tables), function(rule_table, index) {
    return _c('drag-dialog', {
      key: rule_table,
      attrs: {
        "title": rule_table.title
      },
      on: {
        "close": function($event) {
          _vm.onCloseRowDialog('rule_tables', index)
        }
      }
    }, [_c('rule-detail', {
      attrs: {
        "Config": rule_table.config
      }
    })], 1)
  }), _vm._v(" "), _vm._l((_vm.lp_quotes), function(lp_quote, index) {
    return _c('drag-dialog', {
      key: lp_quote,
      attrs: {
        "title": lp_quote.title
      },
      on: {
        "close": function($event) {
          _vm.onCloseRowDialog('lp_quotes', index)
        }
      }
    }, [_c('lp-quote', {
      attrs: {
        "Config": lp_quote.config
      }
    })], 1)
  })], 2)
},staticRenderFns: []}

/***/ }),
/* 793 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-input', _vm._b({
    attrs: {
      "type": "input",
      "disabled": _vm.data.disabled == true,
      "placeholder": _vm.data.desc
    },
    on: {
      "click": _vm.onClick,
      "blur": _vm.onBlur,
      "focus": _vm.onFocus,
      "change": _vm.onChange
    },
    model: {
      value: (_vm.submit_data[_vm.data.key]),
      callback: function($$v) {
        _vm.$set(_vm.submit_data, _vm.data.key, $$v)
      },
      expression: "submit_data[data.key]"
    }
  }, 'el-input', _vm.attrs, false))], 1)
},staticRenderFns: []}

/***/ }),
/* 794 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login",
    style: (_vm.winSize)
  }, [_c('el-row', [_c('el-col', {
    attrs: {
      "span": 24
    }
  }, [_c('div', {
    staticClass: "content"
  }, [_c('el-form', {
    directives: [{
      name: "loading",
      rawName: "v-loading",
      value: (_vm.login_actions.disabled),
      expression: "login_actions.disabled"
    }],
    ref: "data",
    staticClass: "demo-ruleForm card-box loginform",
    style: (_vm.formOffset),
    attrs: {
      "label-position": "left",
      "label-width": "0px",
      "element-loading-text": '正在登录...',
      "model": _vm.data,
      "rules": _vm.rule_data
    }
  }, [_c('h3', {
    staticClass: "title"
  }, [_c('span', {
    staticClass: "active",
    on: {
      "click": function($event) {
        _vm.toggleStatus(false)
      }
    }
  }, [_vm._v("系统登录")])]), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "username"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "text",
      "auto-complete": "off",
      "placeholder": "账号"
    },
    model: {
      value: (_vm.data.username),
      callback: function($$v) {
        _vm.data.username = $$v
      },
      expression: "data.username"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "password"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "password",
      "auto-complete": "off",
      "placeholder": "密码"
    },
    nativeOn: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.onLogin('data', true)
      }
    },
    model: {
      value: (_vm.data.password),
      callback: function($$v) {
        _vm.data.password = $$v
      },
      expression: "data.password"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    staticStyle: {
      "width": "100%"
    }
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.onLogin("data")
      }
    }
  }, [_vm._v("登录\n                        ")]), _vm._v(" "), _c('el-button', {
    on: {
      "click": function($event) {
        _vm.resetForm("data")
      }
    }
  }, [_vm._v("重置")])], 1)], 1)], 1)])], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 795 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "clearfix"
  }, [_c('el-row', [_c('el-col', {
    staticClass: "actions-top",
    attrs: {
      "span": 24
    }
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.onAddUser()
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('Add user')))])], 1)], 1), _vm._v(" "), _c('bel-table', {
    ref: "table",
    attrs: {
      "configs": _vm.tableConfig
    },
    scopedSlots: _vm._u([{
      key: "status",
      fn: function(scope) {
        return [_c('span', {
          style: (scope.row.status == 0 ? 'color:black;' : 'color:red;')
        }, [_vm._v(_vm._s(scope.row.status == 0 ? 'Enabled' : 'Disabled'))])]
      }
    }, {
      key: "handler",
      fn: function(scope) {
        return [_c('el-button', {
          attrs: {
            "type": "info",
            "icon": "edit",
            "size": "mini"
          },
          on: {
            "click": function($event) {
              _vm.onEditUser(scope.row)
            }
          }
        })]
      }
    }])
  }), _vm._v(" "), _c('el-col', {
    staticClass: "btm-action",
    attrs: {
      "span": 24
    }
  }, [_c('el-pagination', {
    staticClass: "pagination",
    attrs: {
      "page-sizes": _vm.pagination.page_sizes,
      "page-size": _vm.pagination.page_size,
      "layout": _vm.pagination.layout,
      "total": _vm.pagination.total,
      "current-page": _vm.pagination.current_page
    },
    on: {
      "current-change": _vm.onChangeCurrentPage,
      "size-change": _vm.onChangePageSize
    }
  })], 1), _vm._v(" "), (_vm.add_user_dialog.show) ? _c('drag-dialog', {
    attrs: {
      "title": _vm.add_user_dialog.title,
      "isModal": _vm.add_user_dialog.isModal
    },
    on: {
      "close": function($event) {
        _vm.onCloseDialog('add_user_dialog')
      }
    }
  }, [_c('form-data', {
    ref: "add_user_form",
    attrs: {
      "DefaultValue": _vm.add_user_dialog.default_value,
      "FieldList": _vm.add_user_dialog.fields
    },
    on: {
      "onSubmit": _vm.add_user_submit
    }
  })], 1) : _vm._e(), _vm._v(" "), (_vm.edit_user_dialog.show) ? _c('drag-dialog', {
    attrs: {
      "title": _vm.edit_user_dialog.title,
      "isModal": _vm.edit_user_dialog.isModal
    },
    on: {
      "close": function($event) {
        _vm.onCloseDialog('edit_user_dialog')
      }
    }
  }, [_c('form-data', {
    ref: "edit_user_form",
    attrs: {
      "DefaultValue": _vm.edit_user_dialog.default_value,
      "FieldList": _vm.edit_user_dialog.fields
    },
    on: {
      "onSubmit": _vm.edit_user_submit
    }
  })], 1) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 796 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "list"
  }, [_c('bel-table', {
    ref: "table",
    attrs: {
      "configs": _vm.tableConfig
    }
  })], 1)
},staticRenderFns: []}

/***/ }),
/* 797 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "clearfix"
  }, [_c('el-row', [_c('el-col', {
    attrs: {
      "span": 24
    }
  }, [_c('strong', [_vm._v("Users - ")]), _vm._v(_vm._s(_vm.nowTime) + "\n      ")])], 1), _vm._v(" "), _c('bel-table', {
    ref: "table",
    attrs: {
      "configs": _vm.tableConfig
    },
    scopedSlots: _vm._u([{
      key: "status",
      fn: function(scope) {
        return [_c('span', {
          style: (scope.row.status == 0 ? 'color:black;' : 'color:red;')
        }, [_vm._v(_vm._s(scope.row.status == 1 ? 'Error' : 'OK'))])]
      }
    }])
  }), _vm._v(" "), _c('el-col', {
    staticClass: "btm-action",
    attrs: {
      "span": 24
    }
  }, [_c('el-pagination', {
    staticClass: "pagination",
    attrs: {
      "page-sizes": _vm.pagination.page_sizes,
      "page-size": _vm.pagination.page_size,
      "layout": _vm.pagination.layout,
      "total": _vm.pagination.total,
      "current-page": _vm.pagination.current_page
    },
    on: {
      "current-change": _vm.onChangeCurrentPage,
      "size-change": _vm.onChangePageSize
    }
  })], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 798 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-date-picker', _vm._b({
    attrs: {
      "type": "datetimerange",
      "placeholder": _vm.data.desc
    },
    on: {
      "change": _vm.onChange
    },
    model: {
      value: (_vm.submit_data[_vm.data.key]),
      callback: function($$v) {
        _vm.$set(_vm.submit_data, _vm.data.key, $$v)
      },
      expression: "submit_data[data.key]"
    }
  }, 'el-date-picker', _vm.date_time_attrs, false))], 1)
},staticRenderFns: []}

/***/ }),
/* 799 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "chart"
  }, [_c('el-row', [_c('el-col', {
    attrs: {
      "span": 24
    }
  }, [_c('div', {
    staticStyle: {
      "width": "100%",
      "height": "400px"
    },
    attrs: {
      "id": _vm.data.id
    }
  })])], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 800 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('header', {
    staticClass: "head-nav"
  }, [_c('el-row', [_c('el-col', {
    staticClass: "logo",
    attrs: {
      "span": 10
    }
  }, [_c('i', {
    staticClass: "icon icon_logo"
  })])], 1)], 1)])
},staticRenderFns: []}

/***/ }),
/* 801 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticStyle: {
      "width": "1100px"
    },
    attrs: {
      "id": _vm.id
    }
  })])
},staticRenderFns: []}

/***/ }),
/* 802 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "list"
  }, [_c('el-row', [_c('el-col', {
    staticClass: "actions-top",
    attrs: {
      "span": 24
    }
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.onAddRule()
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('Add rule')))])], 1)], 1), _vm._v(" "), _c('bel-table', {
    ref: "table",
    attrs: {
      "configs": _vm.tableConfig
    },
    scopedSlots: _vm._u([{
      key: "handler",
      fn: function(scope) {
        return [(!scope.row.editFlag) ? _c('el-button', {
          attrs: {
            "type": "info",
            "icon": "edit",
            "size": "mini"
          },
          on: {
            "click": function($event) {
              _vm.onEditRule(scope.row)
            }
          }
        }) : _vm._e(), _vm._v(" "), (scope.row.editFlag) ? _c('el-button', {
          attrs: {
            "type": "info",
            "icon": "upload",
            "size": "mini"
          },
          on: {
            "click": function($event) {
              _vm.edit_rule_submit(scope.row)
            }
          }
        }) : _vm._e(), _vm._v(" "), _c('el-button', {
          attrs: {
            "type": "danger",
            "icon": "delete",
            "size": "mini"
          },
          on: {
            "click": function($event) {
              _vm.onDeleteQutoeRule(scope.row, scope.$index)
            }
          }
        })]
      }
    }, {
      key: "digits_attr",
      fn: function(scope) {
        return [(!scope.row.editFlag) ? _c('span', [_vm._v(_vm._s(scope.row.attributes.digits))]) : _vm._e(), _vm._v(" "), (scope.row.editFlag) ? _c('el-input', {
          model: {
            value: (scope.row.attributes.digits),
            callback: function($$v) {
              scope.row.attributes.digits = $$v
            },
            expression: "scope.row.attributes.digits"
          }
        }) : _vm._e()]
      }
    }, {
      key: "min_spread_attr",
      fn: function(scope) {
        return [(!scope.row.editFlag) ? _c('span', [_vm._v(_vm._s(scope.row.attributes.minimal_spread))]) : _vm._e(), _vm._v(" "), (scope.row.editFlag) ? _c('el-input', {
          model: {
            value: (scope.row.attributes.minimal_spread),
            callback: function($$v) {
              scope.row.attributes.minimal_spread = $$v
            },
            expression: "scope.row.attributes.minimal_spread"
          }
        }) : _vm._e()]
      }
    }, {
      key: "max_spread_attr",
      fn: function(scope) {
        return [(!scope.row.editFlag) ? _c('span', [_vm._v(_vm._s(scope.row.attributes.maximal_spread))]) : _vm._e(), _vm._v(" "), (scope.row.editFlag) ? _c('el-input', {
          model: {
            value: (scope.row.attributes.maximal_spread),
            callback: function($$v) {
              scope.row.attributes.maximal_spread = $$v
            },
            expression: "scope.row.attributes.maximal_spread"
          }
        }) : _vm._e()]
      }
    }, {
      key: "aggregator_attr",
      fn: function(scope) {
        return [(!scope.row.editFlag) ? _c('span', [_vm._v(_vm._s(scope.row.attributes.aggregator))]) : _vm._e(), _vm._v(" "), (scope.row.editFlag) ? _c('el-select', {
          model: {
            value: (scope.row.attributes.aggregator),
            callback: function($$v) {
              scope.row.attributes.aggregator = $$v
            },
            expression: "scope.row.attributes.aggregator"
          }
        }, [_c('el-option', {
          key: "median",
          attrs: {
            "label": "median",
            "value": "median"
          }
        }), _vm._v(" "), _c('el-option', {
          key: "bestright",
          attrs: {
            "label": "bestright",
            "value": "bestright"
          }
        }), _vm._v(" "), _c('el-option', {
          key: "bestright_option",
          attrs: {
            "label": "bestright_option",
            "value": "bestright_option"
          }
        })], 1) : _vm._e()]
      }
    }, {
      key: "adjust_attr",
      fn: function(scope) {
        return [(!scope.row.editFlag) ? _c('span', [_vm._v(_vm._s(scope.row.attributes.adjust))]) : _vm._e(), _vm._v(" "), (scope.row.editFlag) ? _c('el-input', {
          model: {
            value: (scope.row.attributes.adjust),
            callback: function($$v) {
              scope.row.attributes.adjust = $$v
            },
            expression: "scope.row.attributes.adjust"
          }
        }) : _vm._e()]
      }
    }, {
      key: "type_attr",
      fn: function(scope) {
        return [(!scope.row.editFlag) ? _c('span', [_vm._v(_vm._s(scope.row.type))]) : _vm._e(), _vm._v(" "), (scope.row.editFlag) ? _c('el-select', {
          staticClass: "db",
          model: {
            value: (scope.row.type),
            callback: function($$v) {
              scope.row.type = $$v
            },
            expression: "scope.row.type"
          }
        }, [_c('el-option', {
          key: "raw",
          attrs: {
            "label": "raw",
            "value": "raw"
          }
        }), _vm._v(" "), _c('el-option', {
          key: "delta",
          attrs: {
            "label": "delta",
            "value": "delta"
          }
        }), _vm._v(" "), _c('el-option', {
          key: "asian",
          attrs: {
            "label": "asian",
            "value": "asian"
          }
        }), _vm._v(" "), _c('el-option', {
          key: "spread",
          attrs: {
            "label": "spread",
            "value": "spread"
          }
        })], 1) : _vm._e(), _vm._v(" "), (scope.row.type == "delta" && scope.row.editFlag) ? _c('el-input', {
          staticClass: "db",
          model: {
            value: (scope.row.attributes.bid_delta),
            callback: function($$v) {
              scope.row.attributes.bid_delta = $$v
            },
            expression: "scope.row.attributes.bid_delta"
          }
        }) : _vm._e(), _vm._v(" "), (scope.row.type == "delta" && scope.row.editFlag) ? _c('el-input', {
          staticClass: "db",
          model: {
            value: (scope.row.attributes.ofr_delta),
            callback: function($$v) {
              scope.row.attributes.ofr_delta = $$v
            },
            expression: "scope.row.attributes.ofr_delta"
          }
        }) : _vm._e(), _vm._v(" "), (scope.row.type == "asian" && scope.row.editFlag) ? _c('el-input', {
          staticClass: "db",
          model: {
            value: (scope.row.attributes.asian_delta),
            callback: function($$v) {
              scope.row.attributes.asian_delta = $$v
            },
            expression: "scope.row.attributes.asian_delta"
          }
        }) : _vm._e(), _vm._v(" "), (scope.row.type == "spread" && scope.row.editFlag) ? _c('el-input', {
          staticClass: "db",
          model: {
            value: (scope.row.attributes.spread),
            callback: function($$v) {
              scope.row.attributes.spread = $$v
            },
            expression: "scope.row.attributes.spread"
          }
        }) : _vm._e(), _vm._v(" "), (scope.row.type !== "raw" && scope.row.editFlag) ? _c('el-input', {
          staticClass: "db",
          model: {
            value: (scope.row.attributes.random),
            callback: function($$v) {
              scope.row.attributes.random = $$v
            },
            expression: "scope.row.attributes.random"
          }
        }) : _vm._e()]
      }
    }])
  }), _vm._v(" "), (_vm.add_rule_dialog.show) ? _c('drag-dialog', {
    attrs: {
      "title": _vm.add_rule_dialog.title,
      "buttons": _vm.add_rule_dialog.buttons,
      "isModal": _vm.add_rule_dialog.isModal
    },
    on: {
      "close": _vm.onCloseRuleDialog
    }
  }, [_c('form-data', {
    ref: "form-data",
    attrs: {
      "FieldList": _vm.add_rule_dialog.fields,
      "DefaultValue": _vm.add_rule_dialog.default_value
    },
    on: {
      "onSubmit": _vm.add_rule_submit
    }
  })], 1) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 803 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "clearfix"
  }, [_c('el-row', {
    staticStyle: {
      "margin-bottom": "10px"
    }
  }, [_c('div', {
    staticClass: "actions-top"
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.onAddPosition()
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('Add Position')))]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.onDeletePosition()
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('Delete Position')))])], 1)]), _vm._v(" "), _c('el-row', {
    staticClass: "prompt"
  }, [_c('strong', [_vm._v("Order Positions - ")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.nowTime))]), _vm._v(" "), _c('strong', {
    staticClass: "next_refresh"
  }, [_vm._v("NEXT REFRESH: ")]), _vm._v(" "), _c('span', {
    staticClass: "remain_sec"
  }, [_vm._v(_vm._s(_vm.remain_sec))]), _vm._v(" "), _c('strong', {
    staticClass: "desc"
  }, [_vm._v("Enable Auto Refresh:")]), _vm._v(" "), _c('el-switch', {
    attrs: {
      "on-color": "#13ce66",
      "off-color": "#ff4949",
      "on-value": "true",
      "off-value": "false"
    },
    on: {
      "change": _vm.changeSwitch
    },
    model: {
      value: (_vm.refresh_enable),
      callback: function($$v) {
        _vm.refresh_enable = $$v
      },
      expression: "refresh_enable"
    }
  })], 1), _vm._v(" "), _c('bel-table', {
    ref: "table",
    attrs: {
      "configs": _vm.tableConfig
    },
    scopedSlots: _vm._u([{
      key: "lp_exec_orders",
      fn: function(scope) {
        return [_c('a', {
          attrs: {
            "href": "JavaScript:void(0)"
          },
          on: {
            "click": function($event) {
              _vm.onLPOrdersDetail(scope.row)
            }
          }
        }, [_vm._v("LP Order")])]
      }
    }, {
      key: "detail",
      fn: function(scope) {
        return [_c('a', {
          attrs: {
            "href": "JavaScript:void(0)"
          },
          on: {
            "click": function($event) {
              _vm.onDetail(scope.row)
            }
          }
        }, [_vm._v(_vm._s(_vm.$t('Detail')))])]
      }
    }])
  }), _vm._v(" "), _c('el-col', {
    staticClass: "btm-action",
    attrs: {
      "span": 24
    }
  }, [_c('el-pagination', {
    staticClass: "pagination",
    attrs: {
      "page-sizes": _vm.pagination.page_sizes,
      "page-size": _vm.pagination.page_size,
      "layout": _vm.pagination.layout,
      "total": _vm.pagination.total,
      "current-page": _vm.pagination.current_page
    },
    on: {
      "current-change": _vm.onChangeCurrentPage,
      "size-change": _vm.onChangePageSize
    }
  })], 1), _vm._v(" "), _vm._l((_vm.lp_orders), function(lp_order, index) {
    return _c('drag-dialog', {
      key: lp_order,
      staticClass: "drag_dialog",
      attrs: {
        "title": lp_order.title
      },
      on: {
        "close": function($event) {
          _vm.onCloseLpOrder(index)
        }
      }
    }, [_c('lp-order', {
      attrs: {
        "LPOrder": lp_order.config
      }
    })], 1)
  }), _vm._v(" "), _vm._l((_vm.trade_logs), function(trade_log, index) {
    return _c('drag-dialog', {
      key: trade_log,
      staticClass: "drag_dialog",
      attrs: {
        "title": trade_log.title
      },
      on: {
        "close": function($event) {
          _vm.onCloseTradeLog(index)
        }
      }
    }, [_c('trade-log', {
      attrs: {
        "TradeLog": trade_log.config
      }
    })], 1)
  }), _vm._v(" "), (_vm.add_position.show) ? _c('drag-dialog', {
    staticClass: "drag_dialog",
    attrs: {
      "title": _vm.add_position.title
    },
    on: {
      "close": function($event) {
        _vm.onCloseOnlyDialog('add_position')
      }
    }
  }, [_c('add-position')], 1) : _vm._e(), _vm._v(" "), (_vm.del_position.show) ? _c('drag-dialog', {
    staticClass: "drag_dialog",
    attrs: {
      "title": _vm.del_position.title
    },
    on: {
      "onRestTableData": _vm.onRestTableData,
      "close": function($event) {
        _vm.onCloseOnlyDialog('del_position')
      }
    }
  }, [_c('del-position')], 1) : _vm._e()], 2)
},staticRenderFns: []}

/***/ }),
/* 804 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-select', _vm._b({
    attrs: {
      "multiple": _vm.data.multiple ? true : false,
      "placeholder": _vm.data.desc
    },
    on: {
      "change": _vm.onChange,
      "visible-change": _vm.onVisibleChange,
      "remove-tag": _vm.onRemoveTag,
      "clear": _vm.onClear
    },
    model: {
      value: (_vm.submit_data[_vm.data.key]),
      callback: function($$v) {
        _vm.$set(_vm.submit_data, _vm.data.key, $$v)
      },
      expression: "submit_data[data.key]"
    }
  }, 'el-select', _vm.select_attrs, false), _vm._l((_vm.data.list), function(item, index) {
    return _c('el-option', _vm._b({
      key: index,
      attrs: {
        "value": item[_vm.value_attr],
        "label": item[_vm.label_attr]
      }
    }, 'el-option', _vm.option_attrs, false))
  }))], 1)
},staticRenderFns: []}

/***/ }),
/* 805 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "list"
  }, [_c('el-row', [_c('el-col', {
    staticClass: "actions-top",
    attrs: {
      "span": 24
    }
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.open_dialog("add_lpsymbol_dialog")
      }
    }
  }, [_vm._v(_vm._s(this.$t('Add symbol')))])], 1)], 1), _vm._v(" "), _c('bel-table', {
    ref: "table",
    attrs: {
      "configs": _vm.tableConfig
    },
    scopedSlots: _vm._u([{
      key: "handler",
      fn: function(scope) {
        return [(!scope.row.editFlag) ? _c('el-button', {
          attrs: {
            "type": "info",
            "icon": "edit",
            "size": "mini"
          },
          on: {
            "click": function($event) {
              _vm.onEditSymbol(scope.row)
            }
          }
        }) : _vm._e(), _vm._v(" "), (scope.row.editFlag) ? _c('el-button', {
          attrs: {
            "type": "info",
            "icon": "upload",
            "size": "mini"
          },
          on: {
            "click": function($event) {
              _vm.edit_lpsymbol_submit(scope.row)
            }
          }
        }) : _vm._e(), _vm._v(" "), _c('el-button', {
          attrs: {
            "type": "info",
            "icon": "plus",
            "size": "mini"
          },
          on: {
            "click": function($event) {}
          }
        }), _vm._v(" "), _c('el-button', {
          attrs: {
            "type": "danger",
            "icon": "delete",
            "size": "mini"
          },
          on: {
            "click": function($event) {
              _vm.onDeleteSymbol(scope.row, scope.$index)
            }
          }
        })]
      }
    }, {
      key: "weight_attr",
      fn: function(scope) {
        return [(!scope.row.editFlag) ? _c('span', [_vm._v(_vm._s(scope.row.weight))]) : _vm._e(), _vm._v(" "), (scope.row.editFlag) ? _c('el-input', {
          model: {
            value: (scope.row.weight),
            callback: function($$v) {
              scope.row.weight = $$v
            },
            expression: "scope.row.weight"
          }
        }) : _vm._e()]
      }
    }, {
      key: "min_qty_attr",
      fn: function(scope) {
        return [(!scope.row.editFlag) ? _c('span', [_vm._v(_vm._s(scope.row.min_qty))]) : _vm._e(), _vm._v(" "), (scope.row.editFlag) ? _c('el-input', {
          model: {
            value: (scope.row.min_qty),
            callback: function($$v) {
              scope.row.min_qty = $$v
            },
            expression: "scope.row.min_qty"
          }
        }) : _vm._e()]
      }
    }, {
      key: "contract_size_attr",
      fn: function(scope) {
        return [(!scope.row.editFlag) ? _c('span', [_vm._v(_vm._s(scope.row.contract_size))]) : _vm._e(), _vm._v(" "), (scope.row.editFlag) ? _c('el-input', {
          model: {
            value: (scope.row.contract_size),
            callback: function($$v) {
              scope.row.contract_size = $$v
            },
            expression: "scope.row.contract_size"
          }
        }) : _vm._e()]
      }
    }, {
      key: "quote_attr",
      fn: function(scope) {
        return [(!scope.row.editFlag) ? _c('span', {
          style: (scope.row.quote_enable == 'true' ? 'color:green;' : 'color:red;')
        }, [_vm._v(_vm._s(scope.row.quote_enable == "true" ? 'O' : 'X'))]) : _vm._e(), _vm._v(" "), (scope.row.editFlag) ? _c('el-switch', {
          attrs: {
            "on-color": "#13ce66",
            "off-color": "#ff4949",
            "on-value": "true",
            "off-value": "false"
          },
          model: {
            value: (scope.row.quote_enable),
            callback: function($$v) {
              scope.row.quote_enable = $$v
            },
            expression: "scope.row.quote_enable"
          }
        }) : _vm._e()]
      }
    }, {
      key: "trade_attr",
      fn: function(scope) {
        return [(!scope.row.editFlag) ? _c('span', {
          style: (scope.row.trade_enable == 'true' ? 'color:green;' : 'color:red;')
        }, [_vm._v(_vm._s(scope.row.trade_enable == "true" ? 'O' : 'X'))]) : _vm._e(), _vm._v(" "), (scope.row.editFlag) ? _c('el-switch', {
          attrs: {
            "on-color": "#13ce66",
            "off-color": "#ff4949",
            "on-value": "true",
            "off-value": "false"
          },
          model: {
            value: (scope.row.trade_enable),
            callback: function($$v) {
              scope.row.trade_enable = $$v
            },
            expression: "scope.row.trade_enable"
          }
        }) : _vm._e()]
      }
    }])
  }), _vm._v(" "), (_vm.add_lpsymbol_dialog.show) ? _c('drag-dialog', {
    attrs: {
      "title": _vm.add_lpsymbol_dialog.title,
      "isModal": _vm.add_lpsymbol_dialog.isModal
    },
    on: {
      "close": function($event) {
        _vm.close_dialog('add_lpsymbol_dialog')
      }
    }
  }, [_c('form-data', {
    ref: "form-data",
    attrs: {
      "FieldList": _vm.add_lpsymbol_dialog.fields,
      "DefaultValue": _vm.add_lpsymbol_dialog.default_value
    },
    on: {
      "onSubmit": _vm.add_lpsymbol_submit
    }
  })], 1) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 806 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-date-picker', _vm._b({
    attrs: {
      "type": "date",
      "placeholder": _vm.data.desc
    },
    on: {
      "change": _vm.onChange
    },
    model: {
      value: (_vm.submit_data[_vm.data.key]),
      callback: function($$v) {
        _vm.$set(_vm.submit_data, _vm.data.key, $$v)
      },
      expression: "submit_data[data.key]"
    }
  }, 'el-date-picker', _vm.date_attrs, false))], 1)
},staticRenderFns: []}

/***/ }),
/* 807 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-row', {
    staticClass: "actions-top",
    attrs: {
      "gutter": 20
    }
  }, [_c('el-col', {
    attrs: {
      "span": 21
    }
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.onAddRule()
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('Add rule')))]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.onEditRules()
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('Edit rules')))]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.ondefaultSplippage()
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('Revert splippage to default')))]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.onSubmitChanges()
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('Submit Changes')))]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.onInvertSelect()
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('Invert select')))]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "danger",
      "disabled": _vm.batch_flag
    },
    on: {
      "click": function($event) {
        _vm.onBatchDelete()
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('Delete selected rules')))])], 1)], 1), _vm._v(" "), _c('bel-table', {
    ref: "table",
    staticClass: "trade_rule",
    attrs: {
      "configs": _vm.tableConfig
    },
    on: {
      "selection-change": _vm.onSelectionChange
    },
    scopedSlots: _vm._u([{
      key: "handler",
      fn: function(scope) {
        return [_c('el-button', {
          attrs: {
            "type": "info",
            "icon": "edit",
            "size": "mini"
          },
          on: {
            "click": function($event) {
              _vm.onEditRowRule(scope.row)
            }
          }
        }), _vm._v(" "), _c('el-button', {
          attrs: {
            "type": "danger",
            "icon": "delete",
            "size": "mini"
          },
          on: {
            "click": function($event) {
              _vm.onSingleDelete(scope.row)
            }
          }
        })]
      }
    }, {
      key: "route_type",
      fn: function(scope) {
        return [(_vm.editFlag) ? _c('div', [_c('div', {
          staticClass: "route_type"
        }, [_c('span', [_vm._v("if size >=")]), _vm._v(" "), _c('el-input', {
          staticClass: "threshold_input",
          model: {
            value: (scope.row.attributes.route_type.threshold),
            callback: function($$v) {
              scope.row.attributes.route_type.threshold = $$v
            },
            expression: "scope.row.attributes.route_type.threshold"
          }
        })], 1), _vm._v(" "), _c('div', {
          staticClass: "route_type"
        }, [_c('span', [_vm._v("then")]), _vm._v(" "), _c('el-select', {
          model: {
            value: (scope.row.attributes.route_type.right),
            callback: function($$v) {
              scope.row.attributes.route_type.right = $$v
            },
            expression: "scope.row.attributes.route_type.right"
          }
        }, [_c('el-option', {
          attrs: {
            "value": "best",
            "label": "best"
          }
        }), _vm._v(" "), _c('el-option', {
          attrs: {
            "value": "bestright",
            "label": "bestright"
          }
        }), _vm._v(" "), _c('el-option', {
          attrs: {
            "value": "second",
            "label": "second"
          }
        }), _vm._v(" "), _c('el-option', {
          attrs: {
            "value": "ratio",
            "label": "ratio"
          }
        })], 1)], 1), _vm._v(" "), _c('div', {
          staticClass: "route_type"
        }, [_c('span', [_vm._v("else")]), _vm._v(" "), _c('el-select', {
          model: {
            value: (scope.row.attributes.route_type.left),
            callback: function($$v) {
              scope.row.attributes.route_type.left = $$v
            },
            expression: "scope.row.attributes.route_type.left"
          }
        }, [_c('el-option', {
          attrs: {
            "value": "best",
            "label": "best"
          }
        }), _vm._v(" "), _c('el-option', {
          attrs: {
            "value": "bestright",
            "label": "solid"
          }
        }), _vm._v(" "), _c('el-option', {
          attrs: {
            "value": "second",
            "label": "second"
          }
        }), _vm._v(" "), _c('el-option', {
          attrs: {
            "value": "ratio",
            "label": "ratio"
          }
        })], 1)], 1)]) : _vm._e(), _vm._v(" "), (!_vm.editFlag) ? _c('div', [_vm._v("\n                          >= " + _vm._s(scope.row.attributes.route_type.threshold) + " then " + _vm._s(scope.row.attributes.route_type.right) + " else " + _vm._s(scope.row.attributes.route_type.left) + "\n                ")]) : _vm._e()]
      }
    }, {
      key: "limit_order_types",
      fn: function(scope) {
        return _vm._l((scope.row.attributes.limit_order_types), function(item) {
          return (!_vm.editFlag) ? _c('div', [_vm._v("\n               " + _vm._s(_vm.$store.state.global.limit_order_types[item.type] + ' ' + item.tol) + "\n               ")]) : _vm._e()
        })
      }
    }, {
      key: "coverage",
      fn: function(scope) {
        return [(_vm.editFlag) ? _c('el-input', {
          attrs: {
            "type": "input"
          },
          model: {
            value: (scope.row.attributes.coverage),
            callback: function($$v) {
              scope.row.attributes.coverage = $$v
            },
            expression: "scope.row.attributes.coverage"
          }
        }) : _vm._e(), _vm._v(" "), (!_vm.editFlag) ? _c('span', [_vm._v(_vm._s(scope.row.attributes.coverage))]) : _vm._e()]
      }
    }, {
      key: "better_fill",
      fn: function(scope) {
        return [(_vm.editFlag) ? _c('el-input', {
          attrs: {
            "type": "number"
          },
          model: {
            value: (scope.row.attributes.better_fill),
            callback: function($$v) {
              scope.row.attributes.better_fill = $$v
            },
            expression: "scope.row.attributes.better_fill"
          }
        }) : _vm._e(), _vm._v(" "), (!_vm.editFlag) ? _c('span', [_vm._v(_vm._s(scope.row.attributes.better_fill))]) : _vm._e()]
      }
    }, {
      key: "open_partial",
      fn: function(scope) {
        return [(_vm.editFlag) ? _c('el-select', {
          model: {
            value: (scope.row.attributes.open_partial),
            callback: function($$v) {
              scope.row.attributes.open_partial = $$v
            },
            expression: "scope.row.attributes.open_partial "
          }
        }, [_c('el-option', {
          attrs: {
            "value": true,
            "label": "true"
          }
        }), _vm._v(" "), _c('el-option', {
          attrs: {
            "value": false,
            "label": "false"
          }
        })], 1) : _vm._e(), _vm._v(" "), (!_vm.editFlag) ? _c('span', [_vm._v(_vm._s(scope.row.attributes.open_partial))]) : _vm._e()]
      }
    }, {
      key: "bbook_exec_type",
      fn: function(scope) {
        return [(_vm.editFlag) ? _c('el-select', {
          model: {
            value: (scope.row.attributes.bbook_exec_type),
            callback: function($$v) {
              scope.row.attributes.bbook_exec_type = $$v
            },
            expression: "scope.row.attributes.bbook_exec_type"
          }
        }, [_c('el-option', {
          attrs: {
            "value": "vwap",
            "label": "vwap"
          }
        }), _vm._v(" "), _c('el-option', {
          attrs: {
            "value": "worst",
            "label": "worst"
          }
        })], 1) : _vm._e(), _vm._v(" "), (!_vm.editFlag) ? _c('span', [_vm._v(_vm._s(scope.row.attributes.bbook_exec_type))]) : _vm._e()]
      }
    }, {
      key: "lps",
      fn: function(scope) {
        return [(_vm.editFlag) ? _c('el-checkbox-group', {
          model: {
            value: (scope.row.attributes.lps),
            callback: function($$v) {
              scope.row.attributes.lps = $$v
            },
            expression: "scope.row.attributes.lps"
          }
        }, _vm._l((_vm.$store.state.global.lps), function(item) {
          return _c('el-checkbox', {
            attrs: {
              "label": item
            }
          })
        })) : _vm._e(), _vm._v(" "), (!_vm.editFlag) ? _c('div', _vm._l((scope.row.attributes.lps), function(lp) {
          return _c('span', [_vm._v(_vm._s(lp) + " ")])
        })) : _vm._e()]
      }
    }])
  })], 1)
},staticRenderFns: []}

/***/ }),
/* 808 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-date-picker', _vm._b({
    attrs: {
      "type": "week",
      "placeholder": _vm.data.desc
    },
    on: {
      "change": _vm.onChange
    },
    model: {
      value: (_vm.submit_data[_vm.data.key]),
      callback: function($$v) {
        _vm.$set(_vm.submit_data, _vm.data.key, $$v)
      },
      expression: "submit_data[data.key]"
    }
  }, 'el-date-picker', _vm.date_attrs, false))], 1)
},staticRenderFns: []}

/***/ }),
/* 809 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-time-select', _vm._b({
    attrs: {
      "placeholder": _vm.data.desc
    },
    on: {
      "change": _vm.onChange
    },
    model: {
      value: (_vm.submit_data[_vm.data.key]),
      callback: function($$v) {
        _vm.$set(_vm.submit_data, _vm.data.key, $$v)
      },
      expression: "submit_data[data.key]"
    }
  }, 'el-time-select', _vm.time_attrs, false)), _vm._v(" "), _c('el-time-select', _vm._b({
    attrs: {
      "placeholder": _vm.data.desc
    },
    on: {
      "change": _vm.onChange
    },
    model: {
      value: (_vm.submit_data[_vm.data.key]),
      callback: function($$v) {
        _vm.$set(_vm.submit_data, _vm.data.key, $$v)
      },
      expression: "submit_data[data.key]"
    }
  }, 'el-time-select', _vm.time_attrs, false))], 1)
},staticRenderFns: []}

/***/ }),
/* 810 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "chart"
  }, [_c('el-row', [_c('el-col', {
    attrs: {
      "span": 24
    }
  }, [_c('div', {
    staticStyle: {
      "width": "100%",
      "height": "400px"
    },
    attrs: {
      "id": "chartDom"
    }
  })])], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 811 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-radio-group', _vm._b({
    attrs: {
      "placeholder": _vm.data.desc
    },
    on: {
      "change": _vm.onChange
    },
    model: {
      value: (_vm.submit_data[_vm.data.key]),
      callback: function($$v) {
        _vm.$set(_vm.submit_data, _vm.data.key, $$v)
      },
      expression: "submit_data[data.key]"
    }
  }, 'el-radio-group', _vm.radio_group_attrs, false), _vm._l((_vm.data.list), function(item, index) {
    return _c('el-radio', _vm._b({
      key: index,
      attrs: {
        "label": item.value
      }
    }, 'el-radio', _vm.radio_attrs, false), [_vm._v(_vm._s(item.text || item.value) + "\n        ")])
  }))], 1)
},staticRenderFns: []}

/***/ }),
/* 812 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('transition', {
    attrs: {
      "name": "bounce"
    }
  }, [_c('router-view')], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 813 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {}, [_c('el-dialog', {
    attrs: {
      "size": "tiny",
      "title": _vm.dialog.title
    },
    on: {
      "close": _vm.onClose
    },
    model: {
      value: (_vm.show),
      callback: function($$v) {
        _vm.show = $$v
      },
      expression: "show"
    }
  }, [_c('el-form', {
    staticStyle: {
      "margin": "20px",
      "width": "60%",
      "min-width": "100%"
    },
    attrs: {
      "label-width": "100px"
    }
  }, _vm._l((_vm.dialog.fields), function(field, index) {
    return _c('el-form-item', {
      key: index,
      staticClass: "edit-form",
      attrs: {
        "label": field.label
      }
    }, [_vm._v("\n                " + _vm._s(_vm.dialog.data[field.key]) + "\n            ")])
  })), _vm._v(" "), _c('span', {
    staticClass: "dialog-footer",
    slot: "footer"
  }, [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.onClose
    }
  }, [_vm._v("关 闭")])], 1)], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 814 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-checkbox-group', _vm._b({
    on: {
      "change": _vm.onChange
    },
    model: {
      value: (_vm.submit_data[_vm.data.key]),
      callback: function($$v) {
        _vm.$set(_vm.submit_data, _vm.data.key, $$v)
      },
      expression: "submit_data[data.key]"
    }
  }, 'el-checkbox-group', _vm.checkbox_group_attrs, false), _vm._l((_vm.data.list), function(checkbox, index) {
    return _c('el-checkbox', _vm._b({
      key: index,
      attrs: {
        "label": checkbox.value
      }
    }, 'el-checkbox', _vm.checkbox_attrs, false), [_vm._v(_vm._s(checkbox.text || checkbox.value))])
  }))], 1)
},staticRenderFns: []}

/***/ }),
/* 815 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "clearfix"
  }, [_c('el-row', {
    staticClass: "actions-top"
  }, [_c('el-input', {
    staticClass: "search_input",
    attrs: {
      "placeholder": "Client"
    },
    model: {
      value: (_vm.keywords.client.value),
      callback: function($$v) {
        _vm.keywords.client.value = $$v
      },
      expression: "keywords.client.value"
    }
  }), _vm._v(" "), _c('el-input', {
    staticClass: "search_input",
    attrs: {
      "placeholder": "OrdID"
    },
    model: {
      value: (_vm.keywords.ord_id.value),
      callback: function($$v) {
        _vm.keywords.ord_id.value = $$v
      },
      expression: "keywords.ord_id.value"
    }
  }), _vm._v(" "), _c('el-input', {
    staticClass: "search_input",
    attrs: {
      "placeholder": "Group"
    },
    model: {
      value: (_vm.keywords.group.value),
      callback: function($$v) {
        _vm.keywords.group.value = $$v
      },
      expression: "keywords.group.value"
    }
  }), _vm._v(" "), _c('el-input', {
    staticClass: "search_input",
    attrs: {
      "placeholder": "Symbol"
    },
    model: {
      value: (_vm.keywords.symbol.value),
      callback: function($$v) {
        _vm.keywords.symbol.value = $$v
      },
      expression: "keywords.symbol.value"
    }
  }), _vm._v(" "), _c('el-input', {
    staticClass: "search_input",
    attrs: {
      "placeholder": "Size"
    },
    model: {
      value: (_vm.keywords.size.value),
      callback: function($$v) {
        _vm.keywords.size.value = $$v
      },
      expression: "keywords.size.value"
    }
  }), _vm._v(" "), _c('el-input', {
    staticClass: "search_input",
    attrs: {
      "placeholder": "Status"
    },
    model: {
      value: (_vm.keywords.status.value),
      callback: function($$v) {
        _vm.keywords.status.value = $$v
      },
      expression: "keywords.status.value"
    }
  }), _vm._v(" "), _c('el-date-picker', {
    attrs: {
      "type": "daterange",
      "align": "right",
      "placeholder": "选择日期范围",
      "picker-options": "pickerOptions",
      "format": "yyyy/MM//dd"
    },
    model: {
      value: (_vm.keywords.time_range.value),
      callback: function($$v) {
        _vm.keywords.time_range.value = $$v
      },
      expression: "keywords.time_range.value"
    }
  }), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.onSearchKeyWord
    }
  }, [_vm._v("Search")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.onDownLoad
    }
  }, [_vm._v("Download Detailed Execel")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.onShowProfit
    }
  }, [_vm._v("Show Profit")])], 1), _vm._v(" "), _c('el-row', {
    staticClass: "prompt"
  }, [_c('strong', [_vm._v("Trade Log - ")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.nowTime))]), _vm._v(" "), _c('strong', {
    staticClass: "next_refresh"
  }, [_vm._v("Next refresh seconds: ")]), _vm._v(" "), _c('span', {
    staticClass: "remain_sec"
  }, [_vm._v(_vm._s(_vm.remain_sec))]), _vm._v(" "), _c('strong', {
    staticClass: "desc"
  }, [_vm._v("Enable Auto Refresh:")]), _vm._v(" "), _c('el-switch', {
    attrs: {
      "on-color": "#13ce66",
      "off-color": "#ff4949",
      "on-value": "true",
      "off-value": "false"
    },
    on: {
      "change": _vm.changeSwitch
    },
    model: {
      value: (_vm.refresh_enable),
      callback: function($$v) {
        _vm.refresh_enable = $$v
      },
      expression: "refresh_enable"
    }
  })], 1), _vm._v(" "), _c('bel-table', {
    ref: "table",
    attrs: {
      "configs": _vm.tableConfig
    },
    scopedSlots: _vm._u([{
      key: "handler",
      fn: function(scope) {
        return [_c('el-button', {
          attrs: {
            "type": "info",
            "icon": "edit",
            "size": "mini"
          },
          on: {
            "click": function($event) {
              _vm.onEditUser(scope.row)
            }
          }
        })]
      }
    }, {
      key: "status",
      fn: function(scope) {
        return [_c('span', {
          class: _vm.status[scope.$index].class
        }, [_vm._v(" " + _vm._s(_vm.status[scope.$index].text))])]
      }
    }, {
      key: "ord_id",
      fn: function(scope) {
        return [_c('a', {
          attrs: {
            "href": "JavaScript:void(0)"
          },
          on: {
            "click": function($event) {
              _vm.show_trade_log(scope.row)
            }
          }
        }, [_vm._v(_vm._s(_vm.get_order_id(scope.row)))])]
      }
    }, {
      key: "lp_orders",
      fn: function(scope) {
        return [_c('a', {
          attrs: {
            "href": "JavaScript:void(0)"
          },
          on: {
            "click": function($event) {
              _vm.show_lp_orders(scope.row)
            }
          }
        }, [_vm._v(" LP Orders")])]
      }
    }, {
      key: "expand_content",
      fn: function(scope) {
        return void 0
      }
    }])
  }), _vm._v(" "), _c('el-col', {
    staticClass: "btm-action",
    attrs: {
      "span": 24
    }
  }, [_c('el-pagination', {
    staticClass: "pagination",
    attrs: {
      "page-sizes": _vm.pagination.page_sizes,
      "page-size": _vm.pagination.page_size,
      "layout": _vm.pagination.layout,
      "total": _vm.pagination.total,
      "current-page": _vm.pagination.current_page
    },
    on: {
      "current-change": _vm.onChangeCurrentPage,
      "size-change": _vm.onChangePageSize
    }
  })], 1), _vm._v(" "), _c('form', {
    ref: "download_file",
    attrs: {
      "action": "/ajax/api?post_type=form",
      "method": "post"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.download_file_body),
      expression: "download_file_body"
    }],
    staticClass: "value",
    attrs: {
      "name": "json",
      "type": "hidden"
    },
    domProps: {
      "value": (_vm.download_file_body)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.download_file_body = $event.target.value
      }
    }
  })])], 1)
},staticRenderFns: []}

/***/ }),
/* 816 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-time-select', _vm._b({
    attrs: {
      "placeholder": _vm.data.desc
    },
    on: {
      "change": _vm.onChange
    },
    model: {
      value: (_vm.submit_data[_vm.data.key]),
      callback: function($$v) {
        _vm.$set(_vm.submit_data, _vm.data.key, $$v)
      },
      expression: "submit_data[data.key]"
    }
  }, 'el-time-select', _vm.time_attrs, false))], 1)
},staticRenderFns: []}

/***/ }),
/* 817 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-time-picker', _vm._b({
    attrs: {
      "placeholder": _vm.data.desc
    },
    on: {
      "change": _vm.onChange
    },
    model: {
      value: (_vm.submit_data[_vm.data.key]),
      callback: function($$v) {
        _vm.$set(_vm.submit_data, _vm.data.key, $$v)
      },
      expression: "submit_data[data.key]"
    }
  }, 'el-time-picker', _vm.time_attrs, false))], 1)
},staticRenderFns: []}

/***/ }),
/* 818 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-input', _vm._b({
    attrs: {
      "type": "textarea",
      "placeholder": _vm.data.desc
    },
    on: {
      "click": _vm.onClick,
      "blur": _vm.onBlur,
      "focus": _vm.onFocus,
      "change": _vm.onChange
    },
    model: {
      value: (_vm.submit_data[_vm.data.key]),
      callback: function($$v) {
        _vm.$set(_vm.submit_data, _vm.data.key, $$v)
      },
      expression: "submit_data[data.key]"
    }
  }, 'el-input', _vm.attrs, false))], 1)
},staticRenderFns: []}

/***/ }),
/* 819 */,
/* 820 */,
/* 821 */,
/* 822 */,
/* 823 */,
/* 824 */,
/* 825 */,
/* 826 */,
/* 827 */,
/* 828 */,
/* 829 */,
/* 830 */,
/* 831 */,
/* 832 */,
/* 833 */,
/* 834 */,
/* 835 */,
/* 836 */,
/* 837 */,
/* 838 */,
/* 839 */,
/* 840 */,
/* 841 */,
/* 842 */,
/* 843 */,
/* 844 */,
/* 845 */,
/* 846 */,
/* 847 */,
/* 848 */,
/* 849 */,
/* 850 */,
/* 851 */,
/* 852 */,
/* 853 */,
/* 854 */,
/* 855 */
/***/ (function(module, exports) {

module.exports = {"time":"time","locales":{"en-US":"English","zh-CN":"Chinese"},"Home":"Home","User":"User","Audit":"Audit log","LP":"LP","LP symol":"LP symol","Trade rule":"Trade rule","Qutoe rule":"Qutoe rule","Current order":"Current order","Trade log":"Trade log","LP position":"LP position","Qutoe Adjust":"Qutoe Adjust","STD symbol position":"STD symbol position","Weekly Chart":"Weekly Chart","Today Chart":"Today Chart","Diagnosis":"Diagnosis","Top Trades":"Top Trades","MT4 Position":"MT4 Position","MT4 Trades":"MT4 Trades","MT4 User":"MT4 User","Change password":"Change password","Logout":"Logout","Add user":"Add user","Edit user":"Edit user","user_id":"user_id","username":"username","role":"role","status":"status","update_time":"update_time","create_time":"create_time","edit":"edit","Password":"Password","Confirm Password":"Confirm Password","Role":"Role","Status":"status","Description":"Description","Confirm":"Confirm","log_id":"log_id","request":"request","result":"result","ip":"ip","lp":"lp","type":"type","sender":"sender","target":"target","host":"host","debug":"debug","Add symbol":"Add symbol","STD symbol":"STD symbol","LP symbol":"Lp symbol","Weight":"Weight","Min Qty":"Min Qty","Contract Size":"Contract Size","Quote Enable":"Quote Enable","Trade Enable":"Trade Enable","Operation":"Operation","Add LP symbol":"Add LP symbol","Edit LP symbol":"Edit LP symbol","Delete LP symbol":"Delete LP symbol","Add group":"Add group","source":"source","group":"group","MT4 symbol":"MT4 symbol","View rules":"View rules","Create to new rules":"Create to new rules","Remark":"Remark","Add rule":"Add rule","Digits":"Digits","Bid Delta":"Bid Delta","Ofr Delta":"Ofr Delta","Min Spread":"Min Spread","Max Spread":"Max Spread","Adjust":"Adjust","Aggregator":"Aggregator","operate_rule":"operate_rule","Add quote rule":"Add quote rule","Edit quote rule":"Edit quote rulle","Delete quote rule":"Delete quote rule","Add Position":"Add Position","Delete Position":"Delete Position","OrdID":"OrdID","Group":"Group","Client":"Client","Symbol":"Symbol","side":"side","Order Size":"Order Size","B Book Size":"B Book Size","Contrat Size":"Contrat Size","Req Size/Exec Size":"Req Size/Exec Size","Exec Price":"Exec Price","slippage":"slippage","Coverage":"Coverage","LP exec orders":"LP exec orders","cost":"cost","Time":"Time","Done":"Done","Detail":"Detail","Size":"Size","Search":"Search","Download Detailed Execel":"Download Detailed Execel","Show Profit":"Show Profit","Side":"Side","Exec Size":"Exec Size","BBook Size":"BBook Size","Req Price Spread (pips)":"Req Price Spread (pips)","Company Spread (pips)":"Company Spread (pips)","Client slippage (pips)":"Client slippage (pips","Price Adjust (pips)":"Price Adjust (pips)","Avg LP Slippage (pips)":"Avg LP Slippage (pips)","LP  Exec Orders":"LP  Exec Orders","Cost (ms)":"Cost (ms)","Next Refresh":"Next Refresh","Source":"Source","Std symbol":"Std symbol","Bid":"Bid","Ask":"Ask","sreapd":"sreapd","Edit Adjust":"Edit Adjust","Rule":"Rule","Update At":"Update At","Adjust Enabled":"Adjust Enabled","Error Log":"Error Log","Info Log":"Info Log","Current Shopper":"Current Shopper","Bridge status":"Bridge status","Set Max Bridge Concurrency":"Set Max  Bridge Concurrency","bridge status":"bridge status","WARNING: DO NOT CLICK BELOW BUTTONS IF YOU KNOW NOTHING":"WARNING: DO NOT CLICK BELOW BUTTONS IF YOU KNOW NOTHING!","stop bridge":"stop bridge","start bridge":"start bridge","DATE":"DATE","TOP":"TOP","name":"name","profit":"profit","Reload":"Reload","Check MT4 Bridge Diff":"Check MT4 Bridge Diff","Check MT4 Bridge Diff(Fast)":"Check MT4 Bridge Diff(Fast)","Login":"Login","OrdId":"OrdId","OpenTime":"OpenTime","CloseTime":"CloseTime","cmd":"cmd","Volume":"Volume","OpenPrice":"OpenPrice","ClosePrice":"ClosePrice","Comment":"Comment","City":"City","Name":"Name","Email":"Email","Balance":"Balance","Credit":"Credit"}

/***/ }),
/* 856 */
/***/ (function(module, exports) {

module.exports = {"time":"时间","locales":{"en-US":"英文","zh-CN":"简体中文"},"Home":"首页","User":"用户","Audit log":"审计日志","LP":"上手机构(LP)","LP symbol":"上手机构产品","Trade rule":"交易规则","Qutoe rule":"报价规则","Current order":"未平仓订单","Trade log":"交易日志","LP position":"LP 仓位","Quote Adjust":"报价调整","STD symbol position":"产品仓位","Weekly Chart":"Weekly Chart","Today Chart":"Today Chart","Diagnosis":"诊断","Top Traders":"交易员排行","MT4 Position":"MT4 仓位","MT4 Trades":"MT4 交易","MT4 User":"MT4 用户","Change password":"修改密码","Logout":"注销","Add user":"添加用户","Edit user":"编辑用户","user_id":"用户ID","username":"用户名","role":"角色","status":"状态","update_time":"最后更新时间","create_time":"创建时间","edit":"编辑","Password":"密码","Confirm Password":"确认密码","Role":"角色","Status":"状态","Description":"描述","Confirm":"确认","log_id":"日志ID","request":"请求","result":"结果","ip":"ip","lp":"上手机构","type":"类型","sender":"sender","target":"target","host":"服务器地址","debug":"调试状态","Add symbol":"添加产品","STD symbol":"标准产品","LP Symbol":"上手机构产品","Weight":"权重","Min Qty":"最小数量","Contract Size":"合约大小","Quote Enable":"允许报价","Trade Enable":"允许交易","Operation":"操作","Add LP symbol":"添加上手机构产品","Edit LP symbol":"编辑上受机构产品","Delete LP symbol":"删除上手机构产品","Add group":"添加组","source":"MT4源","group":"组","MT4 symbol":"MT4产品","View rules":"查看规则","Copy to new rules":"复制规则到新组","Remark":"备注","Add rule":"添加规则","Edit rule":"编辑规则","MT4 Symbol":"MT4产品","STD Symbol":"标准产品","Digits":"报价小数位","digits":"报价小数位","Bid Delta":"买价加点","Ofr Delta":"卖家加点","Min Spread":"最小点差","min spread":"最小点差","Max Spread":"最大点差","max spread":"最大点差","Adjust":"价格调整","adjust":"调水点数","Aggregator":"报价整合方式","aggregator":"报价整合方式","operate_rule":"","Add quote rule":"添加报价规则","Edit quote rule":"编辑报价规则","Delete quote rule":"删除报价规则","Add Position":"增加仓位","Delete Position":"删除仓位","OrdID":"订单号","OrderID":"订单号","order_id":"订单号","Group":"组","Client":"用户ID","Symbol":"产品","symbol":"产品","side":"成交方向","Order Size":"请求量","B Book Size":"B Book量","Contrat Size":"合约大小","Req Size/Exec Size":"请求量/执行量","Exec Price":"执行价格","slippage":"滑点","Coverage":"A book 比例","LP exec orders":"上手机构订单","cost":"耗时","Time":"时间","Done":"是否完成","Detail":"详细","Size":"成交量","size":"成交量","Search":"搜索","Download Detailed Execel":"下载CSV","Show Profit":"查看利润","Side":"成交方向","Exec Size":"成交量","BBook Size":"B Book 量","Req Price Spread (pips)":"请求差价 (pips)","Company Spread (pips)":"利润点数 (pips)","Client slippage (pips)":"客户滑点 (pips","Price Adjust (pips)":"价格调整 (pips)","Avg LP Slippage (pips)":"LP 平均滑点 (pips)","LP  Exec Orders":"LP订单成交情况","Cost (ms)":"耗时(ms)","Next Refresh":"下次更新倒计时","Source":"MT4 源","Std symbol":"标准产品","Bid":"买","Ask":"卖","sreapd":"点差","Edit Adjust":"编辑价格调整","Rule":"详情","Update At":"最后更新时间","Adjust Enabled":"允许价格调整","Error Log":"错误日志","Info Log":"信息日志","Current Shopper":"内部信息","Bridge status":"工作状态","Set Max Bridge Concurrency":"设置最大并发量","bridge status":"工作状态","WARNING: DO NOT CLICK BELOW BUTTONS IF YOU KNOW NOTHING!":"警告: 在不了解此功能的情况下，请不要在本页面做操作。","stop bridge":"停止","start bridge":"启动","DATE":"日期","TOP":"人数","name":"姓名","profit":"利润","Reload":"重新加载","Check MT4 Bridge Diff":"Check MT4 Bridge Diff","Check MT4 Bridge Diff(Fast)":"Check MT4 Bridge Diff(Fast)","Login":"用户ID","login":"用户ID","OrdId":"订单号","OpenTime":"开仓时间","CloseTime":"平仓时间","cmd":"类型","Volume":"成交量","OpenPrice":"开仓价","ClosePrice":"平仓价","Comment":"备注","comment":"备注","City":"城市","city":"城市","Name":"姓名","Email":"邮箱","Balance":"余额","Credit":"信用额","price":"价格","Delete":"删除"}

/***/ })
],[331]);
//# sourceMappingURL=app.d0c6a2843e38042fcfc6.js.map