<template>
  <div class="g">
    <label v-if="labels">Subject:</label>
    <term-editor v-model="subject" term-types="['BlankNode', 'NamedNode']" />
    <label v-if="labels">Predicate:</label>
    <existing-term-editor v-model="predicate" term-types="['NamedNode']" />
    <label v-if="labels">Object:</label>
    <term-editor v-model="object" term-types="['BlankNode', 'NamedNode', 'Literal']" />
    <label v-if="labels">Graph:</label>
    <term-editor v-model="graph" term-types="['BlankNode', 'NamedNode', 'DefaultGraph']" />
  </div>
</template>

<style lang="scss" scoped>
.g {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 0 1em;
  gap: 0 1em;
  align-items: start;
  margin-bottom: .8rem;
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

const valueChanged = function(this: QuadEditor, val: RDF.Term) {
  if (this.subject && this.predicate && this.object && this.graph) {
    const newQuad = Factory.quad(this.subject, this.predicate, this.object, this.graph);
    if (!this.value || !newQuad.equals(this.value)) {
      this.$emit(
        "input",
        newQuad
      );
    }
  }
};

@Component({
  components: {
    TermEditor,
    ExistingTermEditor
  },
  watch: {
    subject: valueChanged,
    predicate: valueChanged,
    object: valueChanged,
    graph: valueChanged
  }
})
export default class QuadEditor extends Vue {
  @Prop() value!: RDF.Quad|null;
  @Prop() private labels!: Boolean;

  subject: RDF.Quad_Subject|null = this.value ? this.value.subject : null;
  predicate: RDF.Quad_Predicate = this.value ? this.value.predicate : Factory.namedNode("");
  object: RDF.Quad_Object|null = this.value ? this.value.object : null;
  graph: RDF.Quad_Graph|null = this.value ? this.value.graph : null;

  @Watch('value')
  onValueChanged(newQ: RDF.Quad) {
    if (newQ !== null) {
      this.subject = newQ.subject;
      this.predicate = newQ.predicate;
      this.object = newQ.object;
      this.graph = newQ.graph;
    }
  }
}
</script>