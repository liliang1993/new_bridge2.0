import * as types from './mutations_types';

export default {
	update_tlog_lp_order_dicts: ({
		commit
	}, {id,value}) => {
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_TLOG_LP_ORDER_DICTS, {id,value});
			resolve();
		});
	},
	delete_tlog_lp_order_dicts: ({
		commit
	}, id) => {
		return new Promise((resolve, reject) => {
			commit(types.DELETE_TLOG_LP_ORDER_DICTS, id );
			resolve();
		});
	}
};