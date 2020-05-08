<template>
  <div class="home">
    <div class="info">
      <h1>Browse</h1>
      <p>
        The <code>DatasetBrowser</code> component allows to browse through resources in a Dataset by following properties in both 
        directions.
      </p>
      <p>
        The following instance is created with the following code in the template of this page
      </p>
      <code>
        &lt;dataset-browser v-model="ds" subject="http://example.org/Bill" :graph="defaultGraph" />
      </code>
      <p>
        By setting the <code>graph</code> attribute the component only shows triples from the <em>Default Graph</em>.
      </p>
    </div>
    <dataset-browser v-model="ds" subject="http://example.org/Bill" :graph="defaultGraph" />
    <p class="info">The following instance shows triples from all graphs.</p>
    <dataset-browser v-model="ds" subject="http://example.org/Bill" />
    <div class="info">
      <h1>Full Dataset</h1>
      <p>The <code>DatasetEditor</code> component allows to edit all 
      the quads in a Dataset.</p>
    </div>
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
          Factory.namedNode("http://example.org/Charlie"), Factory.defaultGraph()),
          Factory.quad(Factory.namedNode("http://example.org/Bill"), 
          Factory.namedNode("http://example.org/loves"), 
          Factory.namedNode("http://example.org/Alice"), 
          Factory.namedNode("http://example.org/BillsSecrets"))]);

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