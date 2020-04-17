<!-- A quad editor with:
 - optional fixed values for subject, object and graph
 - forward/backwards mavigation link ater every URI
-->

<template>
  <div class="g">
    <term-editor v-if="!fixedSubject" v-model="subject" term-types="['BlankNode', 'NamedNode']" />
    <existing-term-editor v-model="predicate" term-types="['NamedNode']" />
    <term-editor
      v-if="!fixedObject"
      v-model="object"
      term-types="['BlankNode', 'NamedNode', 'Literal']"
    />
    <resource-navigator v-if="!fixedObject && object && (object.termType !== 'Literal')" :resource="object" 
    @subject="expandAsSuject($event)" />
    <term-editor
      v-if="!fixedGraph"
      v-model="graph"
      term-types="['BlankNode', 'NamedNode', 'DefaultGraph']"
    />
  </div>
</template>

<style lang="scss" scoped>
.g {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 0 1em;
  gap: 0 1em;
}
:not(label) {
  grid-row-start: 2;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import * as Factory from "@rdfjs/data-model";
import * as RDF from "rdf-js";
import TermEditor from "@/components/TermEditor.vue";
import ExistingTermEditor from "@/components/ExistingTermEditor.vue";
import ResourceNavigator from "@/components/ResourceNavigator.vue";

const valueChanged = function(this: BrowserRow, val: RDF.Term) {
  if (this.subject && this.predicate && this.object && this.graph) {
    const newQuad = Factory.quad(
      this.subject,
      this.predicate,
      this.object,
      this.graph
    );
    if (!this.value || !newQuad.equals(this.value)) {
      console.log("emitting", newQuad)
      this.$emit("input", newQuad);
    }
  }
};

@Component({
  components: {
    TermEditor,
    ExistingTermEditor,
    ResourceNavigator
  },
  watch: {
    subject: valueChanged,
    predicate: valueChanged,
    object: valueChanged,
    graph: valueChanged
  }
})
export default class BrowserRow extends Vue {
  @Prop() value!: RDF.Quad | null;
  @Prop() private fixedSubject: RDF.Quad_Subject | undefined;
  @Prop() private fixedObject: RDF.Quad_Object | undefined;
  @Prop() private fixedGraph: RDF.Quad_Graph | undefined;

  subject: RDF.Quad_Subject | null = this.value
    ? this.value.subject
    : this.fixedSubject
    ? this.fixedSubject
    : null;
  predicate: RDF.Quad_Predicate = this.value
    ? this.value.predicate
    : Factory.namedNode("");
  object: RDF.Quad_Object | null = this.value
    ? this.value.object
    : this.fixedObject
    ? this.fixedObject
    : null;
  graph: RDF.Quad_Graph | null = this.value
    ? this.value.graph
    : this.fixedGraph
    ? this.fixedGraph
    : null;

  @Watch("value")
  onValueChanged(newQ: RDF.Quad) {
    if (newQ !== null) {
      this.subject = newQ.subject;
      this.predicate = newQ.predicate;
      this.object = newQ.object;
      this.graph = newQ.graph;
    }
  }

  expandAsSuject(event: RDF.Term) {
    this.$emit("subject", event);
  }
}
</script>