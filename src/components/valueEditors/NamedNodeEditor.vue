<template>
  <span>
    <vue-prefixplete v-model="iri"/>
  </span>
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Prop, Vue } from "vue-property-decorator";
import VuePrefixplete from "@/components/VuePrefixplete.vue";
import * as Factory from "@rdfjs/data-model";

export default Vue.extend({
  computed: {
      iri: {
        get : function(this:any) {
          return this.value ? this.value.value : '';
        },
        set: function(this:any, iri:string) {
          this.$emit("input", Factory.namedNode(iri));
        }
    }
  },
  props: ["value"],
  components: {
    VuePrefixplete
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
  display: flex;
  flex: 1;
}
</style>
