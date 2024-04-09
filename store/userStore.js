import { defineStore } from 'pinia'
export const userStore = defineStore('user', () => {
    const userInfo = reactive({
        userName: '',
        password: '',
    });

    return { userInfo }
  })