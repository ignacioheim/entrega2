const {admin} = require('../fireBase/connectionFirebase.js')


function modelProductoFirebase() {
	this.connection = admin;
	this.inicializateSchemas = async () => {
		let firebase = await admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: DATABASE_URL,
		});
		return `Conexión exitosa a ${firebase.options.credential.projectId}`;
	};
	this.create = async (objectName, items) => {
		let url = await this.connection.database().ref(objectName).push(items);
		return await this.connection.database().ref(url).once('value');
	};
	this.find = async (objectName, options) => {
		let snapshot = await this.connection
			.database()
			.ref(objectName)
			.once('value');
		let found = snapshot.val();
		let result = [];
		for (const key in found) {
			result.push(found[key]);
		}
		if (options) {
			let validate = (el) => {
				let result = false;
				for (const key in options) {
					if (el[key] === options[key]) {
						result = true;
					} else {
						result = false;
					}
				}
				return result;
			};
			return result.filter((el) => validate(el));
		} else {
			return result;
		}
	};
	this.findById = async (objectName, id) => {
		let snapshot = await this.connection
			.database()
			.ref(objectName)
			.orderByChild('id')
			.equalTo(id)
			.once('value');
		return snapshot.val();
	};

	this.update = async (objectName, id, items) => {
		await this.connection
			.database()
			.ref(objectName + '/' + id)
			.set(items);
		return await this.connection
			.database()
			.ref(objectName + '/' + id)
			.once('value');
	};
	this.remove = async (objectName, id) => {
		await this.connection
			.database()
			.ref(objectName + '/' + id)
			.remove();
		return 1;
	};
	this.addTo = async (collection, prop, id, item) => {
		let found = await this.findById(collection, id);
		let itemToUpdated = Object.entries(found)[0][1];
		itemToUpdated[prop].push(item);
		return this.update(collection, id, itemToUpdated);
	};
	this.removeTo = async (collection, prop, id, item) => {
		let found = await this.findById(collection, id);
		let itemToUpdated = Object.entries(found)[0][1];
		itemToUpdated[prop] = itemToUpdated[prop].filter((el) => el !== item);
		await this.update(collection, id, itemToUpdated);
		return 1;
	};
	this.validateId = () => {}; // optional
	this.validateDataType = () => {}; // optional
}

module.exports = modelProductoFirebase