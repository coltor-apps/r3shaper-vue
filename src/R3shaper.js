import debounce from 'p-debounce';
import throttle from 'p-throttle';

export default {
  props: {
    resource: {
      type: Function,
      required: true,
    },
    manual: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'div',
    },
    debounce: {
      type: Number,
      default: 0,
    },
    throttle: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loading: !this.manual,
      result: null,
      error: null,
    };
  },
  created() {
    this.dispatchWrapped = debounce(
      throttle(this.dispatch, 1, this.throttle),
      this.debounce,
    );
  },
  mounted() {
    if (!this.manual) {
      this.dispatchWrapped();
    }
  },
  render(h) {
    const {
      $scopedSlots,
      loading,
      result,
      error,
      dispatchWrapped: dispatch,
      tag,
      setResult,
      setError,
    } = this;

    const slot = $scopedSlots.default({
      loading,
      dispatch,
      result,
      setResult,
      error,
      setError,
    });

    return this.tag ? h(tag, slot) : slot[0];
  },
  methods: {
    markAsLoading() {
      this.loading = true;
    },
    markAsLoaded() {
      this.loading = false;
    },
    setResult(result) {
      this.result = result;
    },
    setError(error) {
      this.error = error;
    },
    dispatch(options, interceptor = (oldResult, newResult) => newResult) {
      this.markAsLoading();

      return this.resource(options)
        .then(response => {
          const newResult = interceptor(this.result, response);

          this.setResult(newResult);

          this.$emit('success', newResult);

          return newResult;
        })
        .catch(error => {
          this.setError(error);

          this.$emit('error', error);

          throw error;
        })
        .finally(this.markAsLoaded);
    },
  },
};
