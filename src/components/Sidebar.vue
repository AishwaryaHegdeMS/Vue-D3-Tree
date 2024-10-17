<template>
  <div class="sidebar">
<button @click="$emit('closeSidebar')" class="close-btn">&times;</button>
<div>{{selectedNodeData.name}}</div>
<div>{{selectedNodeData.description}}</div>
  </div>
</template>
<script>
export default {
    props:["selectedNodeData"]
}


</script>

<style scoped>
.sidebar{
    height: auto;
    width: max-content;
    background: #fff;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
position: relative;
padding: 10px;
cursor: pointer;
font-size: 20px;
color: black;
}
button,close-btn{
    position: absolute;
    right: 0;
    top: 0;
    background-color: #333;
    color: #fff;
    border-radius: 5px;
    padding: 0.5rem;
    border: none;
}

</style>
