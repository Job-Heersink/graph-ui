<template>
<div>
  <h2>Node label: {{selected_node_data.id}}</h2>
  <p>Node description: {{selected_node_data.description}}</p>
</div>
</template>

<script>
export default {
  name: "NodeDescription",
  props: {
    selected_node_data: Object
  }
}
</script>

<style scoped>

</style>