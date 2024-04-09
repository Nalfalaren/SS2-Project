import { defineStore } from 'pinia'
export const userRegisterStore = defineStore('userRegister', () => {
    const userRegister = reactive({
        gmail: '',
        userName: '',
        password: '',
    });

    return { userRegister }
  })