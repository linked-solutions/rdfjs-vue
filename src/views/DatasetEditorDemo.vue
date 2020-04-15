<template>
  <div class="home">
    <h1>Dataset</h1>
    <pre>{{ ds.quads }}</pre>
    <pre>{{ JSON.stringify(ds.quads) }}{{ console.log('d', JSON.stringify(ds)) }}</pre>
    <dataset-editor v-model="ds"/>
    <h2>The same once more</h2>
    <dataset-editor v-model="ds"/>
  </div>
</template>

<script lang="ts">

import DatasetEditor from '@/components/DatasetEditor.vue'
import * as Factory from '@rdfjs/data-model';
import * as Dataset from "@rdfjs/dataset";
import * as RDF from "rdf-js";

const ds: RDF.DatasetCore = Dataset.dataset([Factory.quad(Factory.namedNode("http://example.org/Bill"), 
          Factory.namedNode("http://example.org/knows"), 
          Factory.namedNode("http://example.org/Berta"), Factory.defaultGraph()),
          Factory.quad(Factory.namedNode("http://example.org/Charlie"), 
          Factory.namedNode("http://example.org/knows"), 
          Factory.namedNode("http://example.org/Carl"), Factory.defaultGraph())]);

export default {
  name: 'DatasetEditorDemo',
  components: {
    DatasetEditor
  },
  data: function() {
      return {
        JSON,
        console,
        ds: ds
      }
  }
}
</script>