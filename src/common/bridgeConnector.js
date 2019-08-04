import jsHue from 'jshue';
import localData from '../common/localData.js';

export default class bridgeConnector {
	constructor() {
		this.hue = jsHue();
	}

	connect(commit) {
		this.hue.discover().then( bridges => {
			if ( bridges.length === 0 ) {
				console.log( 'No bridges found. :(' );
			} else {
				commit('setState', {key: 'bridges', value: bridges} ); 
				bridges.forEach( b => console.log( 'Bridge found at IP address %s.',
						b.internalipaddress ) );
				bridges.forEach( b => this.initializeBridge( b.internalipaddress ) );
			}
		} ).catch( e => console.log( 'Error finding bridges', e ) );
	};

	initializeBridge(ip) {
		let self = this;
		let bridge = this.hue.bridge( ip );

		if( localData.getInstance().get('username') ) {
			global.user = bridge.user( localData.getInstance().get('username') );
			return false;
		}

		bridge.createUser( 'myApp#testdevice' ).then( data => {
			console.log('creating user');
			if ( data[0].error ) {
				setTimeout( function() {
					self.initializeBridge( ip );
				}, 300 );
			} else {
				let username = data[0].success.username;
				global.user = bridge.user( username );
				const local = localData.getInstance();
				local.set( 'user', user );
				local.set( 'username', username );

				console.log('user set');
			}
		} );
	}
}

