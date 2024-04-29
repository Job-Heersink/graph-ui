<template>
  <div class="info-container">
    <div v-bind:hidden="!('id' in selected_node_data)">
      <div class="info-title">Node: {{selected_node_data.id}}</div>
      <div class="info-content">
        <h4>Description:<br> {{selected_node_data.description}}</h4>
      </div>
      <div class="info-subscript">
        (click on the node to deselect it)
      </div>
    </div>
    <div v-bind:hidden="('id' in selected_node_data)">
      <div class="info-title">Please select a node</div>
      <div class="info-content">
      </div>
    </div>
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
.info-container {
  background-color: #f8f9fa; /* Light gray background */
  border: 1px solid #ced4da; /* Border color */
  border-radius: 5px; /* Rounded corners */
  padding: 20px; /* Padding inside the container */
  width: 300px; /* Width of the container */
  height: 150px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Box shadow for depth */
  margin-left:auto;
  margin-right: auto;
}

/* Styles for the title */
.info-title {
  font-size: 20px; /* Title font size */
  font-weight: bold; /* Bold font weight */
  margin-bottom: 10px; /* Bottom margin */
}

/* Styles for the content */
.info-content {
  font-size: 16px; /* Content font size */
  line-height: 1.6; /* Line height for better readability */
  color: #495057; /* Text color */
}

.info-subscript {
  font-size: 12px; /* Content font size */
  color: #2c3136; /* Text color */
}
</style>