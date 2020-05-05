<template>
  <div class="te" :key="type">
    <select v-if="!value" v-model="type" v-on:change="typeSelected($event)">
      <option disabled :value="null">Select type</option>
      <option v-for="(val, option) in options" v-bind:key="option">{{option}}</option>
    </select>
    <span v-else>
        <button type="button" class="icon" @click="reset()" :style="type === 'html' ? 'flex-wrap:wrap;width:26px;' : ''">
            <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,6L7,11H17L12,6M7,13L12,18L17,13H7Z" />
            </svg>
            <svg v-if="type === 'html'" viewBox="0 0 24 24">
                <path d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z"/>
            </svg>
            <svg v-if="type === 'label' || type === 'label with language'" viewBox="0 0 24 24">
                <path d="M21,6V8H3V6H21M3,18H12V16H3V18M3,13H21V11H3V13Z"/>
            </svg>
            <svg v-if="type === 'IRI'" viewBox="0 0 24 24">
                <path d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"/>
            </svg>
            <svg v-if="type === 'Blank Node'" viewBox="0 0 24 24">
                <path d="M17,12C17,14.42 15.28,16.44 13,16.9V21H11V16.9C8.72,16.44 7,14.42 7,12C7,9.58 8.72,7.56 11,7.1V3H13V7.1C15.28,7.56 17,9.58 17,12M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/>
            </svg>
            <svg v-if="type === 'DefaultGraph'" viewBox="0 0 24 24">
                <path d="M19.5 17C19.36 17 19.24 17 19.11 17.04L17.5 13.8C17.95 13.35 18.25 12.71 18.25 12C18.25 10.62 17.13 9.5 15.75 9.5C15.61 9.5 15.5 9.5 15.35 9.54L13.74 6.3C14.21 5.84 14.5 5.21 14.5 4.5C14.5 3.12 13.38 2 12 2S9.5 3.12 9.5 4.5C9.5 5.2 9.79 5.84 10.26 6.29L8.65 9.54C8.5 9.5 8.39 9.5 8.25 9.5C6.87 9.5 5.75 10.62 5.75 12C5.75 12.71 6.04 13.34 6.5 13.79L4.89 17.04C4.76 17 4.64 17 4.5 17C3.12 17 2 18.12 2 19.5C2 20.88 3.12 22 4.5 22S7 20.88 7 19.5C7 18.8 6.71 18.16 6.24 17.71L7.86 14.46C8 14.5 8.12 14.5 8.25 14.5C8.38 14.5 8.5 14.5 8.63 14.46L10.26 17.71C9.79 18.16 9.5 18.8 9.5 19.5C9.5 20.88 10.62 22 12 22S14.5 20.88 14.5 19.5C14.5 18.12 13.38 17 12 17C11.87 17 11.74 17 11.61 17.04L10 13.8C10.45 13.35 10.75 12.71 10.75 12C10.75 11.3 10.46 10.67 10 10.21L11.61 6.96C11.74 7 11.87 7 12 7C12.13 7 12.26 7 12.39 6.96L14 10.21C13.54 10.66 13.25 11.3 13.25 12C13.25 13.38 14.37 14.5 15.75 14.5C15.88 14.5 16 14.5 16.13 14.46L17.76 17.71C17.29 18.16 17 18.8 17 19.5C17 20.88 18.12 22 19.5 22S22 20.88 22 19.5C22 18.12 20.88 17 19.5 17M4.5 20.5C3.95 20.5 3.5 20.05 3.5 19.5S3.95 18.5 4.5 18.5 5.5 18.95 5.5 19.5 5.05 20.5 4.5 20.5M13 19.5C13 20.05 12.55 20.5 12 20.5S11 20.05 11 19.5 11.45 18.5 12 18.5 13 18.95 13 19.5M7.25 12C7.25 11.45 7.7 11 8.25 11S9.25 11.45 9.25 12 8.8 13 8.25 13 7.25 12.55 7.25 12M11 4.5C11 3.95 11.45 3.5 12 3.5S13 3.95 13 4.5 12.55 5.5 12 5.5 11 5.05 11 4.5M14.75 12C14.75 11.45 15.2 11 15.75 11S16.75 11.45 16.75 12 16.3 13 15.75 13 14.75 12.55 14.75 12M19.5 20.5C18.95 20.5 18.5 20.05 18.5 19.5S18.95 18.5 19.5 18.5 20.5 18.95 20.5 19.5 20.05 20.5 19.5 20.5Z"/>
            </svg>
        </button>
        <existing-term-editor v-if="value !== null" v-bind:value="value" v-on:input="propagate($event)"/>
    </span>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
select {
    width: 100%;
}
span,
button {
    display: flex;
    flex-direction: row;
}
svg {
    padding: auto .2rem;
}
</style>

<script lang="ts">
/* eslint-disable */
import { Component, Prop, Vue } from "vue-property-decorator";
import * as Factory from '@rdfjs/data-model';
import * as RDF from "rdf-js";
import ExistingTermEditor from './ExistingTermEditor.vue';


export default Vue.extend({
    data: function() {
        const self = this;
        interface OptionList {[propName: string]: RDF.Term};
        const options:OptionList  = { 
                'html': Factory.literal('',Factory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML')),
                'label': Factory.literal(''),
                'label with language': Factory.literal('', 'en'),
                'IRI': Factory.namedNode(''),
                'Blank Node': Factory.blankNode(),
                'DefaultGraph': Factory.defaultGraph(),
            }; 
        return {
            options: this.termTypes ? Object.fromEntries(Object.entries(options).filter(([k,n]) => this.termTypes.indexOf(n.termType) > -1)) : options,
            type:  null as (string | null)
        };
    },
    methods: {
        propagate: function(event:any) {
            //console.log("e: ",event);
            this.$emit('input', event);
        },
        typeSelected: function(event:any) {
            console.log("this.termTypes: ",this.termTypes);
            console.log("typeSelected: ",event);
            console.log("this.type: ",this.type);
            if (this.type !== null) {
                console.log("maps to: ",this.options[(this.type)]);
                this.$emit('input',(this.options[this.type]));
            }
        },
        reset: function() {
            console.log("this.termTypes: ",this.termTypes);
            console.log('resetting editor', this.value); 
            this.type = null;
            this.$emit('input', null);
        }
        
    },
    props: ["value", "termTypes"],/*{
        "value": {
            validator: function (value:any) {
                return value.termType;
            }
        }
    },*/
    components: {
        ExistingTermEditor
    }
});
</script>
