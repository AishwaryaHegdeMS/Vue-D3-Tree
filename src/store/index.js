import { createStore } from "vuex";
const store = createStore({
    state(){
        return{
            selectedNodeData: null,
            selectedNode:null
        }
    },
    mutations: {
        setSelectedNodeData(state,payload){
            state.selectedNodeData = payload
        },
        setSelectedNode(state,payload){
            state.selectedNode = payload
        }
    },
    getters:{
selectedNodeData(state){
    return state.selectedNodeData
},
selectedNode(state){
    return state.selectedNode
}
    },
    actions:{
        updateSelectedNodeData(context,payload){
            context.commit('setSelectedNodeData',payload)
        },
        updateSelectedNode(context,payload){
            context.commit('setSelectedNode',payload)
        }

    }
})
export default store