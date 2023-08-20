/**
 * author: runas.exe
 */

export default (() => {
	const getClassName = (object) => object?.$metadata$?.simpleName;
	
	const hook = {};
	const getAllObjectStore = () => {
		const allClassObjects = [];
		Object.defineProperty(Object.prototype, '$metadata$', {
			configurable: true,
			enumerable: false,
			set: function(value) {
				Object.defineProperty(this, '$metadata$', {configurable: true, enumerable: true, writable: true, value});
				if (value.simpleName && !allClassObjects.includes(this)) {
					allClassObjects.push(this);
					if (hook.process) {
						hook.process?.(this);
					}
				}
			}, get: function() {
				return {};
			},
		});
		setTimeout(() => {
			delete Object.prototype.$metadata$;
		}, 30000);
		return allClassObjects;
	};
	hook.process = null;
	hook.all = getAllObjectStore();
	hook.getObject = (n) => (hook.all.filter(e => getClassName(e) === n));
	hook.getObjectOnce = (n) => (hook.all.find(e => getClassName(e) === n) || null);
	return hook;
})();