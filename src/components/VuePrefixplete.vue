<template>
  <span>
    <input type="text" v-on:input="fireEvents()" />
  </span>
</template>

<script lang="ts">
import "awesomplete/awesomplete.css";
import Prefixplete from "prefixplete";
import { Component, Prop, Vue } from "vue-property-decorator";

//Decorators are not valid here @Component
export default Vue.extend({
  model: {
    prop: "prefixpletevalue",
    event: "prefixpleteinput"
  },
  data: function() {
    return {
      prefixplete: null as any,
      visitor: "nobody"
    };
  },
  props: ["prefixpletevalue"],
  methods: {
    fireEvents: function() {
      this.$emit("prefixpleteinput", this.prefixplete.value);
    }
  },
  watch: {
    prefixpletevalue : function(v:string) {
      // console.log("nev prefixpletevalue",v);
      this.prefixplete.setValue(v);
    }
  },
  mounted: function() {
    // `this` points to the vm instance
    this.prefixplete = new Prefixplete(this.$el.firstElementChild);
    const self = this;
    this.prefixplete.action = function() {
      self.$emit("prefixpleteinput", self.prefixplete.value);
    };
    this.prefixplete.setValue(this.prefixpletevalue);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.awesomplete,
.awesomplete>input {
  width: 100%;
}
.awesomplete > ul {
  min-width: unset;
}
</style>
