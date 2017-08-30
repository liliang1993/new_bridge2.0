import * as types from './mutations_types';

export default {
	show_add_quoteRule_table: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.SHOW_ADD_QUOTERULE_TABLE);
			resolve();
		});
	},
	hide_add_quoteRule_table: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.HIDE_ADD_QUOTERULE_TABLE);
			resolve();
		});
	},
	show_edit_quoteRule_table: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.SHOW_EDIT_QUOTERULE_TABLE);
			resolve();
		});
	},
	hide_edit_quoteRule_table: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.HIDE_EDIT_QUOTERULE_TABLE);
			resolve();
		});
	}
};