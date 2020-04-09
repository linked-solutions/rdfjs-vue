<template>
  <span>
    <input type="text" size="5" v-model="content" />
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as Factory from "@rdfjs/data-model";
import * as RDF from "rdf-js";

@Component
export default class BlankNodeEditor extends Vue {

  @Prop() private value: RDF.BlankNode | undefined;

  get content() {
    return this.value ? this.value.value : "";
  }

  set content(content:string) {
    this.$emit("input", Factory.blankNode(content));
  }
}

</script>

<style scoped>
span {
  display: flex;
  flex: 1;
}
input {
  flex: 1;
}
</style>