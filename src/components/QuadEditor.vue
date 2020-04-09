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


@Component({
  components: {
    TermEditor,
    ExistingTermEditor
  }
})
export default class QuadEditor extends Vue {
  @Prop() value!: RDF.Quad|null;
  @Prop() private labels!: Boolean;

  get subject() {
    return this.value ? this.value.subject : null;
  }
  get predicate() {
    return this.value ? this.value.predicate : Factory.namedNode("");
  }
  get object() {
    return this.value ? this.value.object : null;
  }
  get graph() {
    return this.value ? this.value.graph : null;
  }

  private createQuad(subject: RDF.Quad_Subject|null, 
        predicate: RDF.Quad_Predicate|null,
        object: RDF.Quad_Object|null, graph: RDF.Quad_Graph|null) {
          if ((subject == null)
            || (predicate == null)
            || (object == null)
            || (graph == null)) {
            return null;
          } else {
            return Factory.quad(subject, predicate, object, graph);
          }
  }

  set subject(subject: RDF.Quad_Subject|null) {
    const newQuad = this.createQuad(subject, this.predicate, this.object, this.graph);
    if (newQuad != null) {
      this.$emit("input", newQuad);
      //this.value = newQuad;
    } else {
      this.value = null;
    }
  }
  set predicate(predicate: RDF.Quad_Predicate|null) {
    const newQuad = this.createQuad(this.subject, predicate, this.object, this.graph);
    if (newQuad != null) {
      this.$emit("input", newQuad);
      //this.value = newQuad;
    }
  }
  set object(object: RDF.Quad_Object|null) {
    const newQuad = this.createQuad(this.subject, this.predicate, object, this.graph);
    if (newQuad != null) {
      this.$emit("input", newQuad);
      //this.value = newQuad;
    }
  }
  set graph(graph: RDF.Quad_Graph|null) {
    const newQuad = this.createQuad(this.subject, this.predicate, this.object, graph);
    if (newQuad != null) {
      this.$emit("input", newQuad);
      //this.value = newQuad;
    }
  }

  mounted() {
    console.log('mounted', this.subject, this.predicate, this.object, this.graph);
  }

}
</script>