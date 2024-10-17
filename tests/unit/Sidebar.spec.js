import { mount } from '@vue/test-utils';
import Sidebar from '@/components/Sidebar.vue';

describe('Sidebar.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Sidebar, {
      props: {
        selectedNodeData: {
          name: 'Test Node',
          description: 'This is a test description',
        },
      },
    });
  });

  it('renders the selectedNodeData props', () => {
    expect(wrapper.text()).toContain('Test Node');
    expect(wrapper.text()).toContain('This is a test description');
  });

  it('emits closeSidebar event when close button is clicked', async () => {
    await wrapper.find('.close-btn').trigger('click');
    expect(wrapper.emitted('closeSidebar')).toBeTruthy();
  });

  it('does not render name or description if selectedNodeData is empty', async () => {
    await wrapper.setProps({ selectedNodeData: {} });
    const divs = wrapper.findAll('div');
    expect(divs[1].text()).toBe('');
    expect(divs[2].text()).toBe('');
  });
  
});
