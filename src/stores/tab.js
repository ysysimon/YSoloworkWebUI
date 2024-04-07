import { defineStore } from 'pinia';
import { markRaw } from 'vue'
import Hello from '../components/Hello.vue';

export const useTabStore = defineStore('tab', {
    state: () => ({
        activeTab: 'Hello',
        tabs: [
            {
                title: 'Hello',
                name: 'Hello',
                content: markRaw(Hello),
            },

        ]
    }),
    getters: {

    },
    actions: {
        updateTabslocalStorage() {
            localStorage.setItem('tabs', JSON.stringify(this.tabs));
        },
        updateActiveTablocalStorage() {
            localStorage.setItem('activeTab', this.activeTab);
        },
        clearTabs() {
            this.tabs = null;
            localStorage.removeItem('tabs');
        },
        clearActiveTab() {
            this.activeTab = null;
            localStorage.removeItem('activeTab');
        },
    }
});
