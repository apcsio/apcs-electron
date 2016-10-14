(function() {
var Each = {
	pair: function(e, f) {
		if (Array.isArray(e)) {
			e.forEach(function(v, k) {
				f(k, v);
			});
		}
		else if (Object(e) === e) {
			Object.keys(e).forEach(function(k) {
				f(k, e[k]);
			});
		}
	},
	key: function(e, f) {
		if (Array.isArray(e)) {
			e.forEach(function(v, k) {
				f(k);
			});
		}
		else if (Object(e) === e) {
			Object.keys(e).forEach(function(k) {
				f(k);
			});
		}
	},
	value: function(e, f) {
		if (Array.isArray(e)) {
			e.forEach(function(v, k) {
				f(v);
			});
		}
		else if (Object(e) === e) {
			Object.keys(e).forEach(function(k) {
				f(e[k]);
			});
		}
		else if (e != null && toString.call(f) == '[object Function]') {
			f(e);
		}
	}
};
module.exports = Each;
})();
