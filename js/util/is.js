(function() {
var Is = {
	/**
	 * @function Is.array( data )
	 * @description Returns true if the given value is an array.
	 * @param data:any - a value to test
	 */
	array: Array.isArray,

	/**
	 * @function Is.member(test, list)
	 * @description Returns true if the given test value is a member of the given list.
	 * @param test:any - an element to test for membership
	 * @param list:array - a list to search for the element in
	 */
	member: function(m, l) {
		if (Array.isArray(l)) {
			return l.indexOf(m) >= 0;
		}
		else if (l != null && (typeof l === 'object')) {
			return l.hasOwnProperty(m);
		}
		return false;
	},

	/**
	 * @function Is.type( data )
	 * @description Returns the string type of the data member, and the view type if it is a view.
	 */
	type: function(d) {
		if (d == null) return 'undef';
		else {
			if (d instanceof FirebaseObject)
				return 'data';
			else if (Array.isArray(d))
				return 'array';
			else if (typeof d === 'object')
				return 'obj';
			else if (typeof d === 'string')
				return 'str';
			else if (typeof d === 'number')
				return 'num';
			else if (d === true || d === false)
				return 'bool';
			return 'def';
		}
	},

	/**
	 * @function Is.def(data)
	 * @description Returns true if the given value is defined (not `null` or `undefined`).
	 * @param data - a value to test
	 */
	def: function(d) {
		return d != null;
	},

	view: function(v) {
		return Is.obj(v) && Is.obj(v.is) && Is.str(v.is.a);
	},

	/**
	 * @function Is.undef( data )
	 * @description Returns true if the given value is undefined (`null` or `undefined`).
	 * @param data - a value to test
	 */
	undef: function(d) {
		return d == null;
	},

	data: function(d) {
		return d instanceof firebase.database.Reference || d instanceof firebase.database.Database;
	},

	/**
	 * @function Is.obj( data )
	 * @description Returns true if the given value is a JavaScript object.
	 * @param data:any - a value to test
	 */
	obj: function(o) {
		return Object(o) === o && ! Array.isArray(o);
	},

	/**
	 * @function Is.empty( data )
	 * @description Returns true if the given value is an empty JavaScript object (`{}`),
	 * an empty array (`[]`), or an empty string (`""`).
	 * @param data:any - a value to test
	 */
	empty: function(o) {
		if (Array.isArray(o) || Is.str(o)) {
			return o.length == 0;
		}
		else if (o != null && typeof o === 'object') {
			return $.isEmptyObject(o);
		}
		else if (o instanceof FirebaseView) {
			return o.is.parenting == 0;
		}
		return false;
	},

	length: function(o) {
		if (Array.isArray(o)) {
			return o.length;
		}
		else if (o != null && typeof o === 'object') {
			return Object.keys(o).length;
		}
		else return 0;
	},

	/**
	 * @function Is.enum( data )
	 * @description Returns true if the given value can be enumerated (as in an object or array).
	 * @param data:any - a value to test
	 */
	enum: function(e) {
		return e != null && (typeof e === 'object');
	},

	/**
	 * @function Is.str( data )
	 * @description Returns true if the given string is a JavaScript string.
	 * @param data:any - a value to test
	 */
	str: function(s) {
		return s != null && (typeof s === 'string' || s instanceof String);
	},

	/**
	 * @function Is.num( data )
	 * @description Returns true if the given value is numeric.
	 * @param data:any - a value to test
	 */
	num: function(n) {
		return typeof n === 'number';
	},

	/**
	 * @function Is.bool( data )
	 * @description Returns true if the given value is a boolean (true or false).
	 * @param data:any - a value to test
	 */
	bool: function(b) {
		return b === true || b === false;
	},

	/**
	 * @function Is.func( data )
	 * @description Returns true if the given value is a JavaScript function.
	 * @param data:any - a value to test
	 */
	func: function(f) {
		return toString.call(f) == '[object Function]';
	},

	/**
	 * @function Is.email(email)
	 * @description Returns true if the given email is a valid email address.
	 * @param email:string - an email address to test.
	 */
	email: function(email) {
		var re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		if (s != null && (typeof s === 'string' || s instanceof String)) {
			return re.test(email);
		}
		return false;
	},

	/**
	 * @function Is.option(data)
	 * @description If the given value is a JavaScript object (i.e. an option mapping `{ k1: v1, k2: v2, ... }`),
	 * then return it as-is, and otherwise return an empty JavaScript object (`{}`)
	 * @param data:any - the value to sanitize into an option mapping
	 */

	/**
	 * @function Is.option(data, map)
	 * @description Returns the data input if it is a JavaScript option object (`{ k1: v1, k2: v2, ... }`),
	 * and otherwise returns an option object created from `map`. The option object is generated by
	 * searching `map`'s keys for the type corresponding to `data`, and using the value of the type
	 * key as the key in the resulting option object.
	 * @example Is.option(5) <i class="fa fa-long-arrow-right"></i> {}<br>
	 * Is.option(5, { num: 'foo' }) <i class="fa fa-long-arrow-right"></i> { foo: 5 }<br>
	 * Is.option('bar', { num: 'a', str: 'b' })	<i class="fa fa-long-arrow-right"></i> { b: 'bar' }
	 * Is.option(, { num: 'a', str: 'b' })	<i class="fa fa-long-arrow-right"></i> { b: 'bar' }
	 */
	option: function(opt, construct) {
		if (Is.obj(opt)) {
			return opt;
		}
		else if (Is.obj(construct)) {
			for (var i in construct) {
				if (Is[i] && Is[i](opt)) {
					var ret = {};
					ret[construct[i]] = opt;
					return ret;
				}
			}
		}
		return {};
	}
};

module.exports = Is;
})();
