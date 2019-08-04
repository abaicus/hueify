import bridgeConnector from '../common/bridgeConnector.js';
import localData from '../common/localData.js';
import isEmptyObject from '../common/common.js';

export default {
	init: function({ commit }, data) {
		const local = localData.getInstance();
		global.user = local.get( 'user' );

		if ( global.user && !isEmptyObject( global.user ) ) {
			return false;
		}

		const connector = new bridgeConnector();
		connector.connect(commit);
	}
};


