<template>
    <div class="tree-wrapper">
      <svg ref="treeContainer"></svg>
    </div>
  </template>
  
  <script>
  import * as d3 from "d3";
  import { mapGetters } from "vuex";
  
  export default {
    name: "D3Tree",
    components: {

    },
    props:["formattedTreeData"],

    computed:{
    ...mapGetters(["selectedNode","selectedNodeData"])

    },
    watch:{
        selectedNodeData(newVal){
            if(newVal === null && this.selectedNode){
                d3.select(this.selectedNode)
            .select("rect")
            .attr("fill", "#fff");
            this.$store.dispatch("updateSelectedNode", null)
            }
}
    },
    mounted() {
      this.drawTree();
    },
    methods: {
      drawTree() {

        
        const margin = { top: 20, right: 90, bottom: 30, left: 90 },
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;
  
  
        const svg = d3
          .select(this.$refs.treeContainer)
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        const tree = d3.tree().size([height, width]);
        const root = d3.hierarchy(this.formattedTreeData[0], (d) => d.children);
        const treeData = tree(root);
        const nodes = treeData.descendants();
        const links = treeData.links();
        nodes.forEach((d) => (d.y = d.depth * 180));
  
        svg
          .selectAll(".link")
          .data(links)
          .enter()
          .append("line")
          .attr("class", "link")
          .attr("stroke", "#ccc")
          .attr("stroke-width", 2)
          .attr("x1", (d) => d.source.y)
          .attr("y1", (d) => d.source.x)
          .attr("x2", (d) => d.target.y)
          .attr("y2", (d) => d.target.x);
  
        const node = svg
          .selectAll(".node")
          .data(nodes)
          .enter()
          .append("g")
          .attr("class", "node")
          .attr("transform", (d) => "translate(" + d.y + "," + d.x + ")")
         .on("click", (event, d) => this.handleNodeClick(event, d));
  
        node
          .append("rect")
          .attr("width", 100)
          .attr("height", 40)
          .attr("x", -50)
          .attr("y", -20)
          .attr("fill", "#fff")
          .attr("stroke", "#000");
  
        node
          .append("text")
          .attr("dy", ".35em")
          .attr("x", 0)
          .style("text-anchor", "middle")
          .style("fill", "#333")
          .text((d) => d.data.name);
      },
  handleNodeClick(event,node){
  if (this.selectedNode) {
          d3.select(this.selectedNode)
            .select("rect")
            .attr("fill", "#fff");
        }
  
        d3.select(event.currentTarget)
          .select("rect")
          .attr("fill", "#ff6347");
      this.$store.dispatch("updateSelectedNode",event.currentTarget);
      this.$store.dispatch("updateSelectedNodeData",node.data)
  }
    },
  };
  </script>
  
  <style scoped>
  .tree-wrapper{
      display: flex;
      align-items: center;
  }
  .link {
    stroke: #ccc;
    stroke-width: 2px;
  }
  
  .node rect {
    fill: #69b3a2;
    stroke: #000;
    stroke-width: 2px;
  }
  
  .node text {
    font: 12px sans-serif;
    fill: #fff;
  }
  </style>
  