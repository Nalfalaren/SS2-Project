<template>
 <div>
    <nav>
      <UCard class="sticky">
        <div class="flex flex-row justify-between items-center px-8">
          <div class="flex flex-row items-center gap-[20px]">
            <UIcon name="i-heroicons-bars-3-16-solid" class="w-[30px] h-[30px]" @click="toggleSlideover"></UIcon>
            <h1 class="text-3xl text-[#0A2FB6] font-bold">Correctly</h1>
          </div>
          <div><h1 class="font-bold text-2xl">Correctly chatbot</h1></div>
          <div class="flex flex-row items-center gap-[20px]">
            <UTooltip text="Switch to Dark Mode">
              <div class="bg-[#EDEDED] rounded-full w-[40px] h-[40px] relative">
                <UIcon name="i-heroicons-moon-20-solid" class="absolute top-2 left-2.5 w-[20px] h-[20px] hover:text-green-700"></UIcon>
              </div>
            </UTooltip>
            <UTooltip text="User account">
              <div class="bg-[#EDEDED] rounded-full w-[40px] h-[40px] relative" @click="$router.push('/login')">
                <UIcon name="i-heroicons-user-16-solid" class="absolute top-2 left-2.5 w-[20px] h-[20px] hover:text-green-700"></UIcon>
              </div>
            </UTooltip>
          </div>
        </div>
      </UCard>
    </nav>
    <USlideover v-model="isOpen" prevent-close>
      <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Slideover
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>

        <Placeholder class="h-full" />
      </UCard>
    </USlideover>
 </div>
</template>

<script setup lang="js">
import { ref } from 'vue';

const isOpen = ref(false);

const toggleSlideover = () => {
 isOpen.value = !isOpen.value;
};
</script>


