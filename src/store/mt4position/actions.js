import * as types from './mutations_types';

export default {
	show_mt4_positions: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.SHOW_MT4_POSITIONS);
			resolve();
		});
	},
	hide_mt4_positions: ({
		commit
	}) => {
		return new Promise((resolve, reject) => {
			commit(types.HIDE_MT4_POSITIONS);
			resolve();
		});
	},
	update_mt4_positions_result: ({
		commit
	}, result) => {
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_MT4_POSITIONS_RESULT, result);
			resolve();
		});
	}
};