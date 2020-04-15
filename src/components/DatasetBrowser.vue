<template>
  <div class="subject-blocked">
    <div>{{subject.value}}</div>
    <div class="editor">
      <dataset-editor v-model="filtered" />
    </div>
  </div>
</template>
<style>
 .subject-blocked .subject {
   display: none;
 }
</style>

<style scoped>
 .editor {
   margin-left: 5em;
 }
</style>

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
  @Prop() subject: RDF.Quad_Subject|undefined;

  uuid!: string;

  beforeCreate() {
    this.uuid = instanceCounter.toString();
    instanceCounter++;
  }

  created() {
    if (this.subject) {
      if (!this.subject.termType) {
        //we assume it's a string
        this.subject = Factory.namedNode(this.subject);
      }
      console.log(this.uuid, " create2", this.subject.termType);
    }
  }

  set filtered(ds: RDF.DatasetCore) {
    const orig: RDF.DatasetCore = this.value.match(this.subject);
    for (let quad of orig) {
      this.value.delete(quad);
    }
    for (let quad of ds) {
      this.value.add(quad)
    }
    this.$emit("input", Dataset.dataset(this.value));
  }

  get filtered() {
    return this.value.match(this.subject);
  }
}
</script>