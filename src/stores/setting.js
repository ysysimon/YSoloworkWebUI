import { defineStore } from 'pinia';

export const useSettingStore = defineStore('setting', {
  state: () => ({
    setting: JSON.parse(localStorage.getItem('setting')) || {'lang': 'enUs'},
  }),
  actions: {
    saveSetting2localStorage(){
      localStorage.setItem('setting', JSON.stringify(this.setting));
    },
  }
});
