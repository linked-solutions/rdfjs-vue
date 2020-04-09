<template>
  <form class="card" id="va">
    <div class="flexrow">
      <label for="s_input">Resource:</label>
      <term-editor id="s_input" v-model="s" term-types="['BlankNode', 'NamedNode']" />
    </div>
    <div class="flexrow" v-for="(entry, no) in entries" v-bind:key="entry.id">
        <named-node-editor v-model="entry.p" />
        <term-editor v-model="entry.o" />
        <button type="button" @click="entries.splice(no, 1)">X</button>
    </div>
    <button type="button" @click="addRow">Add</button>
    <button type="button" id="submit" @click.prevent="submit()">Submit</button>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import {User} from 'oidc-client';
import * as Factory from '@rdfjs/data-model';
import TermEditor from '@/components/TermEditor.vue';
import NamedNodeEditor from '@/components/valueEditors/NamedNodeEditor.vue'
import {termToString} from "@/utils/TermUtils";
import { Term, NamedNode } from 'rdf-js';

export default Vue.extend({
  data() {
    return {
      s: Factory.blankNode(),
      counter: 2,
      entries: [
        { id:0, p: Factory.namedNode("http://schema.org/headline"), o: undefined},
        { id:1, p: Factory.namedNode("http://schema.org/articleBody"), o:undefined}
      ] as { id: number; p: (NamedNode|undefined); o: (Term|undefined) }[]
    };
  },
  methods: {
    addRow: function() {
      this.entries.push({id: this.counter, p: undefined, o: undefined});
      this.counter++
    },
    submit: function() {
      let sub = termToString(this.s);
      let triples = sub + " ";
      for (let entry of this.entries) {
        if (entry.o && entry.p) {
          let pre = termToString(entry.p);
          let obj = termToString(entry.o);
          triples += ` ${pre} ${obj} ;\n`;
        }
      }
    }
  },
  components: {
    NamedNodeEditor,
    TermEditor
  }
});

function sendSparqlUpdate(query:string, user:User) {
  let endpoint = "https://fuseki-oidc.factsmission.org/ds/update";
  let init = {
    method: "POST",
    body: query,
    headers: {
      "Content-Type": "application/sparql-update",
      "authorization": `Bearer ${user.access_token}`
    }
  };
  fetch(endpoint, init)
    .then(r => {
      if (r.ok) {
        if (r.status === 204) {
          alert("204: Success");
        } else {
          r.json()
            .then(j => {
              console.table(j.results.bindings);
              //this.resultField.textContent = JSON.stringify(j, undefined, "  ");
            })
            .catch(e => {
              console.log("ERROR?: ", e);
              //this.errorField.textContent = e;
            });
        }
      } else {
        r.text().then(t => {
          console.warn(t);
          //this.errorField.textContent = t.trimRight();
        });
      }
    })
    .catch(r => {
      console.warn(r);
      //this.errorField.textContent = r;
    });
}
</script>
