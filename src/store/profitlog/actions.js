import * as types from './mutations_types';

export default {

	update_profitLog_kwargs: ({
		commit
	}, kwargs) => {
		return new Promise((resolve, reject) => {
			commit(types.UPDATE_PROFITLOG_KWARGS, kwargs);
			resolve();
		});
	}
};