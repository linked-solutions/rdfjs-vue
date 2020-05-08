<template>
    <div id="app">
      <div id="nav">
        <router-link to="/">RDFSJS Vue</router-link> |
        <router-link to="/dataset-browser-demo">Browsing and editing Datasets</router-link> |
        <router-link to="/editor-demo">All components</router-link> |
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
}

.icon {
  flex-grow: 0 !important;
  min-width: 26px;
  // padding: 0;
  background-color: #ffffff00;
  
  &>* {
    width: 1rem;
    height: 1rem;
    margin: auto;
  }
}

.te {
  border: 1px solid #bdbdbd;
  border-radius: .4rem;
  min-height: 28px;

  * {
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
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {


  mounted() {
    let self= this;
    
  }
}
</script>

