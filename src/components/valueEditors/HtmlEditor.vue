<template>
  <div>
    <vue-editor v-bind:value="content" v-on:input="fireEvents($event)" />
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Prop, Vue } from "vue-property-decorator";
import { VueEditor } from "vue2-editor";
import * as Factory from "@rdfjs/data-model";

export default Vue.extend({
  computed: {
    content: function(this:any) {
      return this.value ? this.value.value : '';
    }
  },
  methods: {
    fireEvents: function(content:any) {
      this.$emit("input", Factory.literal(
        content,
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML"
      ));
    }
  },
  props: ["value"],
  components: {
    VueEditor
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  flex: 1;
}
</style>
