
import { mount } from '@vue/test-utils';
import D3Tree from '@/components/D3Tree.vue';
import { createStore } from 'vuex';


describe('D3Tree.vue', () => {
  let store;
  let getters;

  beforeEach(() => {
    let selectedNode = null;
    

  store = createStore({
  state: {
    selectedNode: selectedNode,
  },
  mutations: {
    setSelectedNode(state, node) {
      state.selectedNode = node;
    },
  },
  getters: {
    selectedNode: (state) => state.selectedNode,
    selectedNodeData: () => null,
  },
  actions: {
    updateSelectedNode({ commit }, node) {
      commit('setSelectedNode', node);
    },
    updateSelectedNodeData: jest.fn(),
  },
});
dispatchSpy = jest.spyOn(store, 'dispatch');
  });

  it('renders an svg element', () => {
    const wrapper = mount(D3Tree, {
      global: {
        plugins: [store],
      },
      propsData: {
        formattedTreeData: [{ name: 'Root', children: [] }],
      },
    });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('calls drawTree on mount', () => {
    const drawTreeSpy = jest.spyOn(D3Tree.methods, 'drawTree');
    mount(D3Tree, {
      global: {
        plugins: [store],
      },
      propsData: {
        formattedTreeData: [{ name: 'Root', children: [] }],
      },
    });
    expect(drawTreeSpy).toHaveBeenCalled();
  });

  it('watches selectedNodeData and resets selected node', async () => {
    const wrapper = mount(D3Tree, {
      global: {
        plugins: [store],
      },
      propsData: {
        formattedTreeData: [{ name: 'Root', children: [] }],
      },
    });
  
    await wrapper.vm.$nextTick();
await store.dispatch("updateSelectedNode", null);
await wrapper.vm.$nextTick();

expect(dispatchSpy).toHaveBeenCalledWith("updateSelectedNode", null);
  });
  
});
