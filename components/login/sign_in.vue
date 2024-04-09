<template>
  <div class="w-full h-screen bg-[#0A2FB6]">
    <h1 class="text-3xl text-[#0A2FB6] font-bold p-8">Correctly</h1>
    <UContainer
      :ui="{ constrained: 'max-w-7xl' }"
      class="flex flex-row gap-[40px] justify-between items-center"
    >
      <UCard class="py-8">
        <div><h1 class="text-4xl font-semibold">Login with Correctly</h1></div>
        <div class="pt-4">
          <p class="text-[#8E8E8E]">
            Collaborate with an AI writing companion that assists you in
            discovering the right language—whether it's for composing a
            challenging email, expressing your ideas effectively, or ensuring
            productivity in your tasks.
          </p>
        </div>
        <div>
          <UForm class="space-y-4 mt-8" @submit="$router.push('/')">
            <UFormGroup label="Username" name="user_name" size="xl">
              <UInput
                placeholder="Type the username here..."
                size="xl"
                v-model="userInfo.userInfo.userName"
              ></UInput>
            </UFormGroup>
            <UFormGroup label="Password" name="password" size="xl">
              <UInput
                placeholder="Type the password here..."
                size="xl"
                v-model="userInfo.userInfo.password"
              />
              <UIcon
                name="i-heroicons-eye"
                class="absolute top-3 right-2"
              ></UIcon>
            </UFormGroup>
            <div
              class="flex flex-row justify-between items-center text-[#8E8E8E]"
            >
              <UCheckbox name="remember_me" label="Remember me"></UCheckbox>
              <ULink>Forget password ?</ULink>
            </div>
            <UButton
              class="bg-[#0A2FB6] py-4 text-xl w-full flex justify-center hover:bg-blue-500"
              type="submit"
              @click="loading"
              >Login</UButton
            >
          </UForm>
          <hr class="mb-4 mx-auto w-1/2" />
          <div class="flex flex-row items-center gap-[5px] justify-center">
            <p class="text-[#8E8E8E]">Don't have account?</p>
            <ULink to="/sign-up">Register</ULink>
          </div>
        </div>
      </UCard>
      <div class="w-full h-full relative">
        <div>
          <nuxt-img
            src="../public/login_img.png"
            class="w-full h-full object-cover"
          ></nuxt-img>
        </div>
      </div>
    </UContainer>
  </div>
</template>
<script setup lang="js">
import { userStore } from '~/store/userStore';
useSeoMeta({
  title: 'Login page',
  description: 'This is the login page of Correctly',
  ogTitle: 'Login page',
  ogDescription: 'This is the login page of Correctly'
})
const userInfo = userStore();
</script>
