(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.r3shaperVue = factory());
}(this, (function () { 'use strict';

	const pDebounce = (fn, wait, options = {}) => {
		if (!Number.isFinite(wait)) {
			throw new TypeError('Expected `wait` to be a finite number');
		}

		let leadingValue;
		let timer;
		let resolveList = [];

		return function (...arguments_) {
			return new Promise(resolve => {
				const runImmediately = options.leading && !timer;

				clearTimeout(timer);

				timer = setTimeout(() => {
					timer = null;

					const result = options.leading ? leadingValue : fn.apply(this, arguments_);

					for (resolve of resolveList) {
						resolve(result);
					}

					resolveList = [];
				}, wait);

				if (runImmediately) {
					leadingValue = fn.apply(this, arguments_);
					resolve(leadingValue);
				} else {
					resolveList.push(resolve);
				}
			});
		};
	};

	var pDebounce_1 = pDebounce;
	// TODO: Remove this for the next major release
	var default_1 = pDebounce;
	pDebounce_1.default = default_1;

	class AbortError extends Error {
		constructor() {
			super('Throttled function aborted');
			this.name = 'AbortError';
		}
	}

	const pThrottle = (fn, limit, interval) => {
		if (!Number.isFinite(limit)) {
			throw new TypeError('Expected `limit` to be a finite number');
		}

		if (!Number.isFinite(interval)) {
			throw new TypeError('Expected `interval` to be a finite number');
		}

		const queue = new Map();

		let currentTick = 0;
		let activeCount = 0;

		const throttled = function (...args) {
			let timeout;
			return new Promise((resolve, reject) => {
				const execute = () => {
					resolve(fn.apply(this, args));
					queue.delete(timeout);
				};

				const now = Date.now();

				if ((now - currentTick) > interval) {
					activeCount = 1;
					currentTick = now;
				} else if (activeCount < limit) {
					activeCount++;
				} else {
					currentTick += interval;
					activeCount = 1;
				}

				timeout = setTimeout(execute, currentTick - now);

				queue.set(timeout, reject);
			});
		};

		throttled.abort = () => {
			for (const timeout of queue.keys()) {
				clearTimeout(timeout);
				queue.get(timeout)(new AbortError());
			}

			queue.clear();
		};

		return throttled;
	};

	var pThrottle_1 = pThrottle;
	// TODO: Remove this for the next major release
	var default_1$1 = pThrottle;
	var AbortError_1 = AbortError;
	pThrottle_1.default = default_1$1;
	pThrottle_1.AbortError = AbortError_1;

	var R3shaper = {
	  props: {
	    resource: {
	      type: Function,
	      required: true
	    },
	    manual: {
	      type: Boolean,
	      default: false
	    },
	    tag: {
	      type: String,
	      default: 'div'
	    },
	    debounce: {
	      type: Number,
	      default: 0
	    },
	    throttle: {
	      type: Number,
	      default: 0
	    }
	  },
	  data: function data() {
	    return {
	      loading: !this.manual,
	      result: null,
	      error: null
	    };
	  },
	  created: function created() {
	    this.dispatchWrapped = pDebounce_1(pThrottle_1(this.dispatch, 1, this.throttle), this.debounce);
	  },
	  mounted: function mounted() {
	    if (!this.manual) {
	      this.dispatchWrapped();
	    }
	  },
	  render: function render(h) {
	    var $scopedSlots = this.$scopedSlots,
	        loading = this.loading,
	        result = this.result,
	        error = this.error,
	        dispatch = this.dispatchWrapped,
	        tag = this.tag,
	        setResult = this.setResult,
	        setError = this.setError;
	    var slot = $scopedSlots.default({
	      loading: loading,
	      dispatch: dispatch,
	      result: result,
	      setResult: setResult,
	      error: error,
	      setError: setError
	    });
	    return this.tag ? h(tag, slot) : slot[0];
	  },
	  methods: {
	    markAsLoading: function markAsLoading() {
	      this.loading = true;
	    },
	    markAsLoaded: function markAsLoaded() {
	      this.loading = false;
	    },
	    setResult: function setResult(result) {
	      this.result = result;
	    },
	    setError: function setError(error) {
	      this.error = error;
	    },
	    dispatch: function dispatch(options) {
	      var _this = this;

	      var interceptor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (oldResult, newResult) {
	        return newResult;
	      };
	      this.markAsLoading();
	      return this.resource(options).then(function (response) {
	        var newResult = interceptor(_this.result, response);

	        _this.setResult(newResult);

	        _this.$emit('success', newResult);

	        return newResult;
	      }).catch(function (error) {
	        _this.setError(error);

	        _this.$emit('error', error);

	        throw error;
	      }).finally(this.markAsLoaded);
	    }
	  }
	};

	var index = {
	  R3shaper: R3shaper
	};

	return index;

})));
