<template>
  <r3shaper v-slot:default="{ loading, result, dispatch, error }" :resource="resource">{{ result }}</r3shaper>
</template>

<script>
export default {
  name: 'Example',
  methods: {
    resource: () => new Promise(resolve => resolve({ foo: 'bar' })),
  },
};
</script>
