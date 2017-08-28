import * as types from './mutations_types';

export default {
	update_edit_rules_dict: ({
		commit
	},dict) => {
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_EDIT_RULES_DICT, dict);
			resolve();
		});
	},
	// delete_edit_rules_dicts: ({
	// 	commit
	// }, edit_rules_id) => {
	// 	return new Promise((resolve, reject) => {
	// 		commit(types.DELETE_EDIT_RULES_DICTS, edit_rules_id);
	// 		resolve();
	// 	});
	// },
	show_trade_group: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.SHOW_TRADAE_GROUP);
			resolve();
		});
	},
	hide_trade_group: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.HIDE_TRADAE_GROUP);
			resolve();
		});
	},
	show_trade_rule: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.SHOW_TRADE_RULE);
			resolve();
		});
	},
	hide_trade_rule: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.HIDE_TRADE_RULE);
			resolve();
		});
	},
	show_edit_trade_rule: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.SHOW_EDIT_TRADE_RULE);
			resolve();
		});
	},
	hide_edit_trade_rule: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.HIDE_EDIT_TRADE_RULE);
			resolve();
		});
	},
	update_trade_rules: ({
		commit
	}, trade_rules) => {
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_TRADE_RULES, trade_rules);
			resolve();
		});
	},

};