import * as types from './mutations_types';

export default{
	show_loading: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.SHOW_LOADING);
			resolve()
		});
	},

	hide_loading: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.HIDE_LOADING);
			resolve()
		});
	},

	update_global_context: ({
		commit
	}, {
		lps,
		std_symbols
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_GLOBAL_CONTEXT, {
				lps,
				std_symbols
			});
			resolve()
		});
	},

	show_add_position: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.SHOW_ADD_POSITION);
			resolve()
		});
	},
	hide_add_position: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.HIDE_ADD_POSITION);
			resolve()
		});
	},
	show_delete_position: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.SHOW_DELETE_POSITION);
			resolve()
		});
	},
	hide_delete_position: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.HIDE_DELETE_POSITION);
			resolve()
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
			commit(types.UPDATE_GLOBAL_ROLES, roles);
			resolve()
		});
	},
	update_global_quote_types: ({
		commit
	}, quote_types) => {
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_GLOBAL_QUOTE_TYPES, quote_types);
			resolve()
		});
	},
	update_global_sources: ({
		commit
	}, sources) => {
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_GLOBAL_SOURCES, sources);
			resolve()
		});
	},
	update_global_lps: ({
		commit
	}, lps) => {
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_GLOBAL_LPS, lps);
			resolve()
		});
	},
	update_global_std_symbols: ({
		commit
	}, std_symbols) => {
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_GLOBAL_STD_SYMBOLS, std_symbols);
			resolve()
		});
	},
	update_global_zIndex: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_GLOBAL_ZINDEX);
			resolve()
		});
	},
	update_global_locale: ({commit
	},locale)=>{
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_GLOBAL_LOCALE,locale);
			resolve()
		}); 
	},
	update_global_ajax_source: ({
		commit
	},source) => {
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_GLOBAL_AJAX_SOURCE,source);
			resolve()
		});
	},
	cancel_global_ajax_source: ({commit
	})=>{
		return new Promise((resolve, reject) => {
			commit(types.CANCEL_GLOBAL_AJAX_SOURCE);
			resolve()
		}); 
	}
};