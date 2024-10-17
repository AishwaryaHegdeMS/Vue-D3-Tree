import { mount } from '@vue/test-utils';
import HorizontalTree from '@/components/HorizontalTree.vue';
import D3Tree from '@/components/D3Tree.vue';
import Sidebar from '@/components/Sidebar.vue';
import store from '@/store';
import data from '@/mockData/data.json';
import { createStore } from 'vuex';

describe('HorizontalTree.vue', () => {
  let wrapper;
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
wrapper = mount(HorizontalTree, {
  global: {
    plugins: [store],
  },

  data() {
    return {
      info: null
    }
  },
  computed: {
    selectedNodeData: {
      get(){
        return this.info
      },
      set(val){
        this.info=val
      }
    }
  }
});
  });


  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.tree-wrapper').exists()).toBe(true);
  });

  it('renders D3Tree component', () => {
    expect(wrapper.findComponent(D3Tree).exists()).toBe(true);
  });

  it('does not render Sidebar if selectedNodeData is null', () => {
    expect(wrapper.findComponent(Sidebar).exists()).toBe(false);
  });

  it('computes formattedTreeData correctly', () => {
    wrapper.vm.createTreeStructure();
    expect(wrapper.vm.formattedTreeData).toEqual(expect.arrayContaining(data.data.filter(node => !node.parent)));
  });

  it('calls deSelectNode when closeSidebar is emitted', async () => {
    const spy = jest.spyOn(wrapper.vm, 'deSelectNode');
    wrapper.vm.$store.dispatch = jest.fn();
    wrapper.vm.selectedNodeData={};
    await wrapper.vm.$nextTick();
    wrapper.findComponent(Sidebar).vm.$emit('closeSidebar');
    expect(spy).toHaveBeenCalled();
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith("updateSelectedNodeData", null);
  });
});
