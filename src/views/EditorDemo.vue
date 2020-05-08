<template>
  <div class="home">
    <div class="info">
      <h2>TermEditor with different RDF Terms</h2>
    </div>
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
    <div class="info">
      <h2>QuadEditor</h2>
      <p>
        <code>Quad</code> or <code>" no valid quad "</code>:
      </p>
      <pre>{{ quad ? quad : " no valid quad " }}</pre>
    </div>
    <quad-editor v-model="quad" />
    <p class="info">The same with labels</p>
    <quad-editor :labels="true" v-model="quad" />
    <hr>
    <div class="info">
      <h3>This quad is initially null</h3>
      <pre>{{ quaddeux ? quaddeux : " no valid quad " }}</pre>
    </div>
    <quad-editor :labels="true" v-model="quaddeux" />
    <hr>
    <div class="info">
      <h2>DatasetEditor</h2>
    </div>
    <dataset-editor v-model="ds"/>
    <div class="info">
      <h2>DatasetBrowser</h2>
    </div>
    <dataset-browser v-model="ds" subject="http://example.org/Bill" />
  </div>
</template>

<script lang="ts">

import TermEditor from '@/components/TermEditor.vue'
import QuadEditor from '@/components/QuadEditor.vue'
import DatasetEditor from '@/components/DatasetEditor.vue'
import DatasetBrowser from '@/components/DatasetBrowser.vue'
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
    DatasetEditor,
    DatasetBrowser
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