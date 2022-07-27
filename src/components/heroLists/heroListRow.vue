<template>
  <div class="bg-white p-4 sm:flex my-2 rounded-md cursor-pointer">
    <div class="px-1 py-3 w-2/5 flex items-center">
      <img
        :src="validURL ? itemData.avatarUrl : 'http://localhost:3000' + itemData.avatarUrl"
        alt="avatar"
        class="w-10 h-10 mr-2"
      />
      <div>
        <p class="font-bold">{{ itemData.fullName }}</p>
        <p class="block sm:hidden">{{ itemData.type.name }}</p>
      </div>
    </div>
    <div class="hidden sm:block px-1 py-3 w-1/5 my-auto">
      {{ itemData.type.name }}
    </div>
    <div class="px-1 py-3 w-full sm:w-2/5 flex my-auto">
      {{ itemData.description }}
    </div>
  </div>
</template>

<script>
export default {
  props: { itemData: { type: Object, required: true } },
  computed: {
    validURL() {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + 
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + 
          "((\\d{1,3}\\.){3}\\d{1,3}))" + 
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + 
          "(\\?[;&a-z\\d%_.~+=-]*)?" + 
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); 
      return !!pattern.test(this.itemData?.avatarUrl);
    },
  },
};
</script>
