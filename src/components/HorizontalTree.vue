<template>
  <div class="tree-wrapper">
    <Sidebar @closeSidebar="deSelectNode" v-if="selectedNodeData" :selectedNodeData="selectedNodeData"/>
    <D3Tree :formattedTreeData="formattedTreeData"/>
  </div>
</template>

<script>
import * as d3 from "d3";
import data from "../mockData/data.json";
import Sidebar from './Sidebar.vue'
import D3Tree from "./D3Tree.vue";
import { mapGetters } from "vuex";

export default {
  name: "HorizontalTree",
  components: {
    Sidebar,
    D3Tree
  },
  data() {
    return {
formattedTreeData: []
    };
  },
  created() {
    this.createTreeStructure();
  },
  computed:{
...mapGetters(["selectedNodeData"])

  },
  methods: {
    createTreeStructure() {
        data.data.forEach((dt,_,arr)=>{
  dt.children = arr.filter(tmp=>tmp.parent === dt.name);
})
 this.formattedTreeData = data.data.reduce((acc,cur)=>{
 if(!cur.parent){
    acc.push(cur);
 }
  return acc;
},[])

  },
  deSelectNode() {
        this.$store.dispatch("updateSelectedNodeData",null)
  }
}
};
</script>

<style scoped>
.tree-wrapper{
    display: flex;
    align-items: center;
}
</style>
