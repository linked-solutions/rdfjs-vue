<template>
  <span>
    <img src="images/subj-expand.svg" title="show properties" @click="setSubject()" /><img src="images/obj-expand.svg" title="show incoming" />
  </span>
</template>



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
  
}
</script>