<template>
  <div>
    <input type="text" v-model="content" />
    <input class="language" type="text" size="2" pattern="[a-z][a-z]" spellcheck="false" v-model="lang" />
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Prop, Vue } from "vue-property-decorator";
import * as Factory from "@rdfjs/data-model";
import * as RDF from "rdf-js";

export default Vue.extend({
  computed: {
    content: {
      get: function(this:any) {
        return (this.value ? this.value.value : '');
      },
      set: function(content:string) {
        this.$emit("input",this.value.language ? Factory.literal(
                content,
                this.value.language
            ) : Factory.literal(
                content,
                "http://www.w3.org/2001/XMLSchema#string"
            ));
      } 
    },
    lang: {
      get: function(this:any) {
        return this.value && this.value.language ? this.value.language : '';
      },
      set: function(lang:string) {
        this.$emit("input",lang ? Factory.literal(
                this.value.value,
                lang
            ) : Factory.literal(
                this.value.value,
                "http://www.w3.org/2001/XMLSchema#string"
            ));
      } 
    }
  },
  props: ["value"]
});
</script>

<style scoped>
div {
  display: flex;
  flex: 1;
}
input {
  flex: 1;
}
input.language {
  flex-grow: 0;
  width: 3ch;
}
</style>