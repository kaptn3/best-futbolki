import overlay from '@/assets/js/overlay';

export const state = () => ({
  modalVisible: false,
  modalComponent: null
});

export const mutations = {
  toggleModal(state, componentName) {
    state.modalVisible = !state.modalVisible;
    state.modalComponent = componentName;
    overlay.classAction(state.modalVisible);
  }
};