<template>
    <div id="app">
      <div id="nav">
        <router-link to="/">Editor</router-link> |
        <router-link to="/dataset-browser-demo">Dataset-Browser-Demo</router-link> |
        <router-link to="/dataset-editor-demo">Dataset-Editor-Demo</router-link> |
        <router-link to="/editor-demo">Editor-Demo</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <router-view/>
    </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

#nav {
  text-align: center;
  color: #2c3e50;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

* {
  box-sizing: border-box;
}

button,
input,
select {
  padding: 2px 5px;
  border: 1px solid #bdbdbd;
  margin: 0;
  font-size: 1rem;
  border-radius: .4rem;
  height: 28px;
  display: block;

  svg,
  img {
    display: block;
  }

  &.icon {
    width: 26px;
    min-width: 26px;
    padding: 0;
    background-color: #ffffff00;
    
    &>* {
      width: 1rem;
      height: 1rem;
      margin: auto;
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {


  mounted() {
    let self= this;
    
  }
}
</script>

