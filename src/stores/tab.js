import { defineStore } from 'pinia'
import { markRaw } from 'vue'
import Hello from '../components/Hello.vue'

export const useTabStore = defineStore('tab', {
  state: () => ({
    activeTab: 'Hello',
    tabs: [
      {
        title: 'Welcome 欢迎',
        name: 'Hello',
        content: markRaw(Hello),
      },
    ],
  }),
  actions: {
    updateTabslocalStorage() {
      localStorage.setItem('tabs', JSON.stringify(this.tabs))
    },
    updateActiveTablocalStorage() {
      localStorage.setItem('activeTab', this.activeTab)
    },
    clearTabs() {
      this.tabs = null
      localStorage.removeItem('tabs')
    },
    addTab(newTab) {
      const exists = this.tabs.some((tab) => tab.name == newTab.name)
      if (!exists) {
        this.tabs.push(newTab)
      }
    },
    setActivateTab(name) {
      this.activeTab = name
    },
    clearActiveTab() {
      this.activeTab = null
      localStorage.removeItem('activeTab')
    },
  },
})
