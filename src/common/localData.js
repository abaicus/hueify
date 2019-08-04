import electron from 'electron';
import path from 'path';
import fs from 'fs';

export default class localData {
	static instance;

	static getInstance() {
		if ( this.instance ) {
			return this.instance;
		}

		return new localData( {
			configName: 'user-preferences',
			defaults: {
				user: null
			}
		} );
	}

	constructor(opts) {
		const userDataPath = ( electron.app || electron.remote.app ).getPath(
				'userData' );
		this.path = path.join( userDataPath, opts.configName + '.json' );
		this.data = parseDataFile( this.path, opts.defaults );
	}

	get(key) {
		return this.data[key];
	}

	set(key, val) {
		this.data[key] = val;
		fs.writeFileSync( this.path, JSON.stringify( this.data ) );
	}
}

function parseDataFile(filePath, defaults) {

	try {
		return JSON.parse( fs.readFileSync( filePath ) );
	} catch ( error ) {
		return defaults;
	}
}
