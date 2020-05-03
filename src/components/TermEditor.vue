<template>
  <div class="te" :key="type">
    <select v-if="!value" v-model="type" v-on:change="typeSelected($event)">
      <option disabled :value="null">Select type</option>
      <option v-for="(val, option) in options" v-bind:key="option">{{option}}</option>
    </select>
    <span v-else>
        <button type="button" class="icon" @click="reset()">
            <svg style="width:1em;height:1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,6L7,11H17L12,6M7,13L12,18L17,13H7Z" />
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
span {
    display: flex;
    flex-direction: row;
}
</style>

<style lang="scss">
.te {
    border: 1px solid #bdbdbd;
    border-radius: .4rem;
    min-height: 28px;

    * {
        margin: 0;
        border: none;
    }

    button,
    input,
    select {
        border: none;
        border-radius: calc(.4rem - 1px);
        height: 26px;
        min-height: 26px;
    }

    input {
        border-left: 1px solid #bdbdbd;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
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
