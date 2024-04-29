<script setup>
  import * as d3 from 'd3'
  import {onMounted} from "vue";
  import {ref} from "vue";
  import fetch_data from "@/services/api";
  import NodeDescription from "@/components/NodeDescription.vue";

  const graph_data = await fetch_data()
  let selected_node_data = ref({})
  let selected_node = null

  onMounted(()=>{
    const width = screen.width/2;
    // const height = screen.height/2;

    // Compute the tree height; this approach will allow the height of the
    // SVG to scale according to the breadth (width) of the tree layout.
    const root = d3.stratify()(graph_data);
    const dx = 60;
    const dy = width / (root.height + 1);

    const tree = d3.tree().nodeSize([dx, dy]);

    root.sort((a, b) => d3.ascending(a.data.id, b.data.id));
    tree(root);

    let x0 = Infinity;
    let x1 = -x0;
    root.each(d => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });

    const height = x1 - x0 + dx * 2;

    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-dy / 3, x0 - dx, width, height])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.9)
        .attr("stroke-width", 3)
        .selectAll()
        .data(root.links())
        .join("path")
        .attr("d", d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x));

    const node = svg.append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .selectAll()
        .data(root.descendants())
        .join("g")
        .attr("transform", d => `translate(${d.y},${d.x})`);

    node.append("rect")
        .attr("stroke", d => d.children ? "#555" : "#999")
        .attr("fill", "white")
        .attr("width", 80)
        .attr("height", 30)
        .attr("x", -40)
        .attr("y", -15)
        .attr("rx", 10)
        .attr("ry", 10);

    node.append("text")
        .attr("dy", "0.31em")
        .attr("x", 0)
        .attr("text-anchor", "middle")
        .text(d => d.data.id)
        .attr("stroke", "white")
        .attr("paint-order", "stroke")

    node.on("click", function(event, data) {
      selected_node_data.value = data.data

      if(selected_node !== null){
        selected_node.select("rect").style("fill", "white");
      }
      selected_node = d3.select(event.currentTarget);
      selected_node.select("rect").style("fill", "red");

      console.log(data);
      // console.log(d.target.getData())
    })
  })
</script>

<template>
  <div>
    <h2>Tree graph</h2>
    <NodeDescription  v-bind:selected_node_data="selected_node_data"></NodeDescription>
    <svg></svg>
  </div>
</template>

<style scoped>

</style>