<template>
  <div>
    <button class="icon">
      <img src="images/subj-expand.svg" title="show properties" @click.prevent="setSubject()" />
    </button>
    <button class="icon">
      <img src="images/obj-expand.svg" title="show incoming" @click.prevent="setObject()"/>
    </button>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-shrink: 0;
}
button {
  margin-left: .4em;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import * as Factory from "@rdfjs/data-model";
import * as RDF from "rdf-js";


@Component({
  components: {
  }
})
export default class ResourceNavigator extends Vue {
  @Prop() resource!: RDF.Term;

  setSubject() {
    this.$emit("subject", this.resource);
  }

  setObject() {
    this.$emit("object", this.resource);
  }
  
}
</script>