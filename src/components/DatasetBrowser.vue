<template>
  <div>
    <dataset-editor v-model="filtered" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import * as Factory from "@rdfjs/data-model";
import * as Dataset from "@rdfjs/dataset";
import * as RDF from "rdf-js";
import DatasetEditor from "@/components/DatasetEditor.vue";


let instanceCounter = 0;

@Component({
  components: { DatasetEditor }
})
export default class DatasetBrowser extends Vue {
  @Prop() value!: RDF.DatasetCore;
  @Prop() uri!: string;

  uuid!: string;

  beforeCreate() {
    this.uuid = instanceCounter.toString();
    instanceCounter++;
  }

  set filtered(ds: RDF.DatasetCore) {
    const resource = this.uri ? Factory.namedNode(this.uri) : undefined;
    const orig: RDF.DatasetCore = this.value.match(resource);
    for (let quad of orig) {
      this.value.delete(quad);
    }
    for (let quad of ds) {
      this.value.add(quad)
    }
    this.$emit("input", Dataset.dataset(this.value));
  }

  get filtered() {
    const resource = this.uri ? Factory.namedNode(this.uri) : undefined;
    return this.value.match(resource);
  }
}
</script>