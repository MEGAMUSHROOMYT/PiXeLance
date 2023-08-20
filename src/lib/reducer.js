/**
 * author: runas.exe
 */

export default (() => {
	const getIndexValue = (e, n) => (Object.values(e || {})?.[n] || null);
	const getIndexNames = (e, n, f) => ([n, f] = n.split(':'), Object.values(e || {}).filter(e => getObjectName(e) === n)?.[f || 0] || null);
	const getIndexValues = (e, n) => ((n || []).forEach((d) => (e = (typeof(d) === 'number' ? getIndexValue : getIndexNames)(e, d))), e || null);
	const getRoot = () => (window.document.getElementById('root'));
	const getStore = () => (getIndexValues(getRoot(), [0, 6, 6, 4, 7, 3]));
	
	const reducer = {};
	reducer.initList = reducer.initList || [];
	reducer.inited = reducer.inited || false;
	reducer.init = reducer.init || ((callback) => {
		if (reducer.inited) {
			callback();
		} else {
			reducer.initList.push(callback);
		}
	});
	reducer.dispatchOriginal = null;
	reducer.dispatchOriginalCall = null;
	reducer.dispatch = ((event) => {
		const store = getStore();
		return store?.[findByIndex(store, 3)]?.call(store, event);
	});
	reducer.patchReduce = reducer.patchReduce || ((patchFunction, mode) => {
		const store = getStore();
		if (!store || !patchFunction) {
			return false;
		}
		const reducerName = findByIndex(store, 0);
		const reducerCallback = store[reducerName];
		if (!reducer.reduceOriginal) {
			reducer.reduceOriginal = reducerCallback;
		}
		if (!reducer.reduceOriginalCall) {
			reducer.reduceOriginalCall = reducer.reduceOriginal.bind(this);
		}
		switch(mode || 0) {
			case 0:
				// Выполнение до вызова оригинальной функции
				store[reducerName] = function(action, state) {
					const tempState = patchFunction.call(this, action, state, reducerCallback) || state;
					return reducerCallback.call(this, action, tempState);
				}
				break;
			case 1:
				// Выполнение после вызова оригинальной функции
				store[reducerName] = function(action, state) {
					const tempState = reducerCallback.call(this, action, state);
					return patchFunction.call(this, action, tempState, reducerCallback) || tempState;
				}
				break;
			case 2:
				// Выполнение вместо вызова оригинальной функции
				store[reducerName] = function(action, state) {
					return patchFunction.call(this, action, state, reducerCallback) || state;
				}
				break;
			default:
				return false;
		}
		return true;
	});
	const reduceLogInterval = setInterval(() => {
		if (getStore()) {
			clearInterval(reduceLogInterval);
			if (reducer.initList) {
				reducer.initList.forEach((element) => { element(); });
				reducer.inited = true;
			}
		}
	}, 50);
	return reducer;
})();