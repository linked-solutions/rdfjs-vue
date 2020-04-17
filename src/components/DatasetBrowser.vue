<template>
  <div>
    <div v-if="_subject">{{_subject.value}}</div>
    <div v-if="_object">&lt;-{{_object.value}}</div>
    <span v-for="t in orderedQuads" :key="t.id">
      <browser-row v-model="t.quad" :fixedSubject="_subject" :fixedGraph="_graph" :fixedObject="_object"
      @subject="setSubject($event)" @object="setObject($event)"/>
    </span>
    <div v-if="addedQuad">
      <browser-row v-model="newQuad" :fixedSubject="_subject" :fixedGraph="_graph" :fixedObject="_object" />
    </div>
    <div v-else>
      <button @click="addQuad()">Add attribute</button>
    </div>
  </div>
</template>
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
  _subject: RDF.Quad_Subject|undefined;
  @Prop() object: RDF.Quad_Object|undefined;
  _object: RDF.Quad_Object|undefined;
  @Prop() graph: RDF.Quad_Graph|undefined;
  _graph: RDF.Quad_Graph|undefined;

  uuid!: string;

  beforeCreate() {
    this.uuid = instanceCounter.toString();
    instanceCounter++;
  }

  created() {
    if (this.subject) {
      if (!this.subject.termType) {
        //we assume it's a string
        this._subject = Factory.namedNode(this.subject);
      } else {
        this._subject = this.subject;
      }
    }
    if (this.object) {
      if (!this.object.termType) {
        //we assume it's a string
        this._object = Factory.namedNode(this.object);
      } else {
        this._object = this.object;
      }
    }
    if (this.graph) {
      if (!this.graph.termType) {
        //we assume it's a string
        this._graph = Factory.namedNode(this.graph);
      } else {
        this._graph = this.graph;
      }
    }
  }

  get orderedQuads() {
    const result = this.orderQuads(this.value.match(this._subject, undefined, this._object, this._graph));
    return result;
  }

  setSubject(subject: RDF.Quad_Subject) {
    this._object = undefined;
    this._subject = subject;
    //enforces update, this.$forceUpdate() didn't refresh quads
    this.$emit("input", Dataset.dataset(this.value));
  }

  setObject(object: RDF.Quad_Subject) {
    console.log("setobj"+object);
    this._object = object;
    this._subject = undefined;
    //enforces update, this.$forceUpdate() didn't refresh quads
    this.$emit("input", Dataset.dataset(this.value));
  }

}
</script>