<template>
  <div class="container mx-auto">
    <div class="flex">
      <div
        class="fixed inset-0 flex justify-center bg-gray-700 bg-opacity-50 z-50"
      >
        <div
          class="p-6 sm:mx-4 sm:my-auto bg-gray-350 sm:rounded-md shadow-xl max-w-md w-full"
        >
          <div class="flex items-center justify-between">
            <p></p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              @click="closeModal"
              class="w-4 h-4 text-gray-400 cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="relative h-full">
            <div class="mt-8 sm:mt-6">
              <img
                :src="
                  validURL
                    ? itemData.avatarUrl
                    : 'http://localhost:3000' + itemData.avatarUrl
                "
                class="w-20 h-20 mx-auto"
              />

              <p class="text-center font-bold">{{ itemData.fullName }}</p>
              <p class="text-center text-gray-600 mb-4">
                {{ itemData.type.name }}
              </p>
              <p class="text-center text-gray-600">
                {{ itemData.description }}
              </p>
              <p v-if="errorMessage.length > 0" class="text-red-600 text-xs">
                {{ errorMessage }}
              </p>
              <div class="absolute sm:static bottom-10 flex w-full sm:w-auto">
                <button
                  class="px-6 py-2 text-red-600 flex items-center mx-auto"
                  @click="removeHeroItem"
                >
                  <svg
                    v-if="removeHeroLoading"
                    role="status"
                    class="inline mr-3 w-4 h-4 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <p>{{ removeHeroLoading ? "Deleting" : "Delete hero" }}</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    itemData: {
      type: Object,
      required: true,
    },
  },
  emits: ["closeDetailModal"],
  setup(props, { emit }) {
    const store = useStore();
    const removeHeroLoading = ref(false);
    const errorMessage = ref("");
    const itemId = ref(props.itemData.id);
    const avatarUrl = ref(props.itemData.avatarUrl);
    const removeHeroItem = async () => {
      try {
        removeHeroLoading.value = true;
        errorMessage.value = "";
        await store.dispatch("heroes/removeHeroItem", { id: itemId.value });
        await store.dispatch("heroes/fetchHeroList");
        removeHeroLoading.value = false;
        emit("closeDetailModal", false);
      } catch (err) {
        console.error(err);
        errorMessage.value = err?.message || err;
        removeHeroLoading.value = false;
      }
    };
    const closeModal = () => {
      emit("closeDetailModal", false);
    };
    return {
      errorMessage,
      closeModal,
      removeHeroItem,
      removeHeroLoading,
      avatarUrl,
    };
  },
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
