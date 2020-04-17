<template>
  <div class="home">
    <h1>Browse</h1>
    <dataset-browser v-model="ds" subject="http://example.org/Bill" :graph="defaultGraph" />
    <h1>Full Dataset</h1>
    <dataset-editor v-model="ds" />
  </div>
</template>

<script lang="ts">

import DatasetBrowser from '@/components/DatasetBrowser.vue'
import DatasetEditor from '@/components/DatasetEditor.vue'
import * as Factory from '@rdfjs/data-model';
import * as Dataset from "@rdfjs/dataset";
import * as RDF from "rdf-js";

const ds: RDF.DatasetCore = Dataset.dataset([Factory.quad(Factory.namedNode("http://example.org/Bill"), 
          Factory.namedNode("http://example.org/knows"), 
          Factory.namedNode("http://example.org/Berta"), Factory.defaultGraph()),
          Factory.quad(Factory.namedNode("http://example.org/Charlie"), 
          Factory.namedNode("http://example.org/knows"), 
          Factory.namedNode("http://example.org/Carl"), Factory.defaultGraph()),
          Factory.quad(Factory.namedNode("http://example.org/Carl"), 
          Factory.namedNode("http://example.org/admires"), 
          Factory.namedNode("http://example.org/Bill"), Factory.defaultGraph()),
          Factory.quad(Factory.namedNode("http://example.org/Berta"), 
          Factory.namedNode("http://example.org/knows"), 
          Factory.namedNode("http://example.org/Charlie"), Factory.defaultGraph())]);

export default {
  name: 'DatasetBrowserDemo',
  components: {
    DatasetBrowser,
    DatasetEditor
  },
  data: function() {
      return {
        ds: ds,
        defaultGraph: Factory.defaultGraph()
      }
  }
}
</script>