<template>
  <div>
    <h2 v-if="subjectFilter">
      {{subjectFilter.value}}
      <img src="images/subj-expand.svg" title="(Subject)" />
    </h2>
    <h2 v-if="objectFilter" style="text-align: end;">
      <img src="images/obj-expand.svg" title="Object:" />
      {{objectFilter.value}}
    </h2>
    <span v-for="t in orderedQuads" :key="t.id">
      <browser-row v-model="t.quad" :fixedSubject="subjectFilter" :fixedGraph="graphFilter" :fixedObject="objectFilter"
      @subject="setSubject($event)" @object="setObject($event)"/>
    </span>
    <div v-if="addedQuad">
      <browser-row v-model="newQuad" :fixedSubject="subjectFilter" :fixedGraph="graphFilter" :fixedObject="objectFilter"/>
    </div>
    <div v-else>
      <button @click="addQuad()">Add attribute</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
h2 {
  font-size: 1.5rem;

  img {
    height: 1em;
    margin-bottom: -3px;
  }
}
</style>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import * as Factory from "@rdfjs/data-model";
import * as Dataset from "@rdfjs/dataset";
import * as RDF from "rdf-js";
import BrowserRow from "@/components/BrowserRow.vue";
import DatasetEditor from "@/components/DatasetEditor.vue";


let instanceCounter = 0;

@Component({
  components: { BrowserRow }
})
export default class DatasetBrowser extends DatasetEditor {
  @Prop() value!: RDF.DatasetCore;
  @Prop() subject: RDF.Quad_Subject|undefined;
  subjectFilter: RDF.Quad_Subject|null = null;
  @Prop() object: RDF.Quad_Object|undefined;
  objectFilter: RDF.Quad_Object|null = null;
  @Prop() graph: RDF.Quad_Graph|undefined;
  graphFilter: RDF.Quad_Graph|null = null;

  uuid!: string;

  beforeCreate() {
    this.uuid = instanceCounter.toString();
    instanceCounter++;
  }

  created() {
    if (this.subject) {
      if (!this.subject.termType) {
        //we assume it's a string
        this.subjectFilter = Factory.namedNode(this.subject);
      } else {
        this.subjectFilter = this.subject;
      }
    }
    if (this.object) {
      if (!this.object.termType) {
        //we assume it's a string
        this.objectFilter = Factory.namedNode(this.object);
      } else {
        this.objectFilter = this.object;
      }
    }
    if (this.graph) {
      if (!this.graph.termType) {
        //we assume it's a string
        this.graphFilter = Factory.namedNode(this.graph);
      } else {
        this.graphFilter = this.graph;
      }
    }
  }

  get orderedQuads() {
    const result = this.orderQuads(this.value.match(this.subjectFilter, undefined, this.objectFilter, this.graphFilter));
    return result;
  }

  setSubject(subject: RDF.Quad_Subject) {
    this.objectFilter = null;
    this.subjectFilter = subject;
    //enforces update, this.$forceUpdate() didn't refresh quads
    this.$emit("input", Dataset.dataset(this.value));
  }

  setObject(object: RDF.Quad_Subject) {
    console.log("setobj"+object);
    this.objectFilter = object;
    this.subjectFilter = null;
    //enforces update, this.$forceUpdate() didn't refresh quads
    this.$emit("input", Dataset.dataset(this.value));
  }

}
</script>