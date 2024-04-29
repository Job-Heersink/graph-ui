<template>
  <Suspense>
    <TreeGraph/>
  </Suspense>
</template>

<script>
import TreeGraph from "@/components/TreeGraph.vue";

export default {
  name: 'App',
  components: {
    TreeGraph
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
