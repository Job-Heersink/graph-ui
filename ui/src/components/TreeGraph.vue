<script setup>
import * as d3 from 'd3'
import {onMounted} from "vue";

const data = [
    {
      "name":"A",
      "description":"This is a description of A",
      "parent":""
    },
    {
      "name":"B",
      "description":"This is a description of B",
      "parent":"A"
    },
    {
      "name":"C",
      "description":"This is a description of C",
      "parent":"A"
    },
    {
      "name":"D",
      "description":"This is a description of D",
      "parent":"A"
    },
    {
      "name":"B-1",
      "description":"This is a description of B-1",
      "parent":"B"
    },
    {
      "name":"B-2",
      "description":"This is a description of B-2",
      "parent":"B"
    },
    {
      "name":"B-3",
      "description":"This is a description of B-3",
      "parent":"B"
    }
  ]

  onMounted(()=>{
    const width = 800;
    const height = 500;
    const svg = d3.select("svg").attr("width", width).attr("height", height);
    const g = svg.append("g");
  })
</script>

<template>
  <div>
    <h2>Tree graph</h2>
    <svg></svg>
  </div>
</template>

<style scoped>

</style>