<template>
  <div>
    <UContainer>
      <UCard class="mt-[50px]">
        <div >
          <div class="relative">
            <textarea
              color="white"
              variant="outline"
              placeholder="Type something here..."
              class="w-full h-[400px] border border-2 border-solid border-gray-500 p-4"
            ></textarea>
            <UButton variant="outline"  class="text-2xl text-white font-bold bg-green-700 absolute bottom-5 right-5 hover:bg-green-900 p-4 rounded-[10px]">Paraphrase</UButton>
          </div>
          <div>
            <textarea
              color="white"
              variant="outline"
              class="w-full h-[400px] border border-2 border-solid border-gray-500 p-4"
              disabled
            ></textarea>
          </div>
        </div>
      </UCard>
    </UContainer>
  </div>
</template>
<script>
</script>
<style lang="">
</style>