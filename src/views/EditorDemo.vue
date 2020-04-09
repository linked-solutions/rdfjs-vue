<template>
  <div class="home">
    <div v-for="(i,no) in values" v-bind:key="no">
      <hr>
      <term-editor v-model="i.value"/>

      <span v-if="i.value">
        Term-type: <code>{{i.value.termType}}</code>
        <br>
      </span>
      <span v-if="i.value">
        Value: <code>{{i.value.value}}</code>
        <br>
      </span>
      <span v-if="i.value && i.value.language">
        Language: <code>{{i.value.language}}</code>
        <br>
      </span>
      <span v-if="i.value && i.value.datatype">
        Datatype: <code>{{i.value.datatype.value}}</code>
        <br>
      </span>
    </div>
    <hr>
    <pre>{{ quad ? quad : " no valid quad " }}</pre>
    <quad-editor v-model="quad" />
    <hr>
    <quad-editor :labels="true" v-model="quad" />
    <hr>
    <pre>{{ quaddeux ? quaddeux : " no valid quad " }}</pre>
    <quad-editor :labels="true" v-model="quaddeux" />
    <hr>
    <pre>{{ ds }}</pre>
    <dataset-editor v-model="ds"/>
  </div>
</template>

<script lang="ts">

import TermEditor from '@/components/TermEditor.vue'
import QuadEditor from '@/components/QuadEditor.vue'
import DatasetEditor from '@/components/DatasetEditor.vue'
import {NamedNode,Literal,BlankNode} from "rdf-js";
import * as Factory from '@rdfjs/data-model';
import * as Dataset from "@rdfjs/dataset";
import * as RDF from "rdf-js";

const ds: RDF.DatasetCore = Dataset.dataset([Factory.quad(Factory.namedNode("http://example.org/Bill"), 
          Factory.namedNode("http://example.org/knows"), 
          Factory.namedNode("http://example.org/Berta"), Factory.defaultGraph())]);

export default {
  name: 'ValueEditorDemo',
  components: {
    TermEditor,
    QuadEditor,
    DatasetEditor
  },
  data: function() {
      let v:(NamedNode | Literal | BlankNode | null) = Factory.literal("<h1>Hello</h1>", "http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML");
      return {
        values: [
          {'value': v}, 
          {'value': Factory.namedNode("http://example.org/something")},
          {'value': Factory.literal("A simple label", "en")},
          {'value': null}],
        quad: Factory.quad(Factory.namedNode("http://example.org/Bob"), 
          Factory.namedNode("http://example.org/knows"), 
          Factory.namedNode("http://example.org/Alice"), Factory.defaultGraph()),
        quaddeux: null,
        ds: ds
      }
  }
}
</script>