import debounce from 'p-debounce';
import throttle from 'p-throttle';

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
    this.dispatchWrapped = debounce(throttle(this.dispatch, 1, this.throttle), this.debounce);
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

export default index;
