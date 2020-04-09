<template>
  <div class="f" :key="type">
        <html-editor v-if="type ==='html'" v-bind:value="value" v-on:input="propagate($event)"/>
        <named-node-editor v-else-if="type ==='IRI'" v-bind:value="value" v-on:input="propagate($event)"/>
        <blank-node-editor v-else-if="type ==='BlankNode'" v-bind:value="value" v-on:input="propagate($event)"/>
        <simple-literal-editor v-else-if="type ==='label' || type ==='langString'" v-bind:value="value" 
            v-on:input="propagate($event)"/>
        <div v-else>No value editor for {{ type }}</div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Prop, Vue } from "vue-property-decorator";
import { VueEditor } from "vue2-editor";
import * as Factory from '@rdfjs/data-model';
import HtmlEditor from './valueEditors/HtmlEditor.vue';
import SimpleLiteralEditor from './valueEditors/SimpleLiteralEditor.vue';
import NamedNodeEditor from './valueEditors/NamedNodeEditor.vue';
import BlankNodeEditor from './valueEditors/BlankNodeEditor.vue';


export default Vue.extend({
    methods: {
        propagate: function(event:any) {
            //console.log("e: ",event);
            this.$emit('input', event);
        }
    },
    computed: {
        type: function() {
            const types: { [key: string]: string } = {
                "http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML": "html",
                "http://www.w3.org/2001/XMLSchema#string": "label",
                "http://www.w3.org/1999/02/22-rdf-syntax-ns#langString": "langString"
            };
            return (this.value.termType === "Literal" ? 
                        types[this.value.datatype.value] ? types[this.value.datatype.value] : "literal"
                    : this.value.termType === "NamedNode" ? "IRI" 
                    : this.value.termType === "DefaultGraph" ? "DefaultGraph"
                    : "BlankNode");
        }
    },
    props: ["value"],/*{
        "value": {
            validator: function (value:any) {
                return value.termType;
            }
        }
    },*/
    components: {
        HtmlEditor,
        SimpleLiteralEditor,
        NamedNodeEditor,
        BlankNodeEditor
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.f {
    flex: 1;
    display: flex;
}
</style>
