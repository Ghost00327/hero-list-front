<template>
  <div class="container mx-auto">
    <div class="flex">
      <button
        @click="onClickAddHero"
        class="px-3 py-2 text-white bg-green-600 rounded-md shadow w-full md:w-auto"
        type="button"
      >
        + Add hero
      </button>

      <div
        v-show="isOpen"
        class="absolute inset-0 flex justify-center bg-gray-700 bg-opacity-50 z-50 h-screen"
      >
        <div
          class="p-6 sm:mx-4 sm:my-16 bg-gray-350 sm:rounded-md shadow-xl max-w-md w-full"
        >
          <div class="flex items-center justify-between">
            <h1 class="text-lg">Add hero</h1>
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
          <div class="mt-4 relative h-full">
            <img
              v-if="avatarUrl"
              :src="avatarUrl"
              class="w-20 h-20"
            />
            <div v-else class="w-20 h-20"></div>
            <form @submit.prevent="addNewHero()">
              <div class="mt-10 mb-6">
                <label
                  for="avatarUrl"
                  class="block mb-2 text-sm font-medium text-gray-450"
                  >Avatar URL</label
                >
                <input
                  type="text"
                  id="avatarUrl"
                  v-model="avatarUrl"
                  required
                  class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div class="mb-6">
                <label
                  for="full-name"
                  class="block mb-2 text-sm font-medium text-gray-450"
                  >Full name</label
                >
                <input
                  type="text"
                  id="full-name"
                  v-model="fullName"
                  required
                  class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div class="mb-6">
                <label
                  for="type"
                  class="block mb-2 text-sm font-medium text-gray-450"
                  >Type</label
                >
                <select
                  v-model="heroType"
                  required
                  class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option disabled value="">Select type</option>
                  <option
                    v-for="(type, i) in typeLists"
                    :key="i"
                    :value="type.id"
                  >
                    {{ type.name }}
                  </option>
                </select>
              </div>
              <div class="mb-6">
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-450"
                  >Description</label
                >
                <textarea
                  type="text"
                  id="description"
                  v-model="description"
                  required
                  class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 min-h-8"
                />
              </div>
              <p class="text-red-600 text-xs">{{ errorMessage }}</p>
              <button
                class="px-6 py-2 text-blue-100 bg-green-600 rounded w-full absolute bottom-20"
              >
                <svg
                  v-if="addHeroLoading"
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
                {{addHeroLoading ? 'Saving...' : 'Save'}}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    typeLists: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    let isOpen = ref(false);
    const avatarUrl = ref("");
    const fullName = ref("");
    const heroType = ref("");
    const description = ref("");
    const addHeroLoading = ref(false);
    const errorMessage = ref("");

    const addNewHero = async () => {
      try {
        addHeroLoading.value = true;
        errorMessage.value = "";
        await store.dispatch("heroes/postHeroList", {
          fullName: fullName.value,
          typeId: heroType.value,
          avatarUrl: avatarUrl.value,
          description: description.value,
        });
        await store.dispatch("heroes/fetchHeroList");
        isOpen.value = false;
        addHeroLoading.value = false;
        window.onscroll = () => {};
      } catch (err) {
        console.error(err);
        errorMessage.value = err?.message || err;
        addHeroLoading.value = false;
      }
    };
    let scrollTop = ref(0);
    let scrollLeft = ref(0);
    const onClickAddHero = () => {
      isOpen.value = true;
      scrollTop.value =
        window.pageYOffset || document.documentElement.scrollTop;
      (scrollLeft.value =
        window.pageXOffset || document.documentElement.scrollLeft),
        (window.onscroll = function () {
          window.scrollTo(scrollLeft.value, scrollTop.value);
        });
    };

    const closeModal = () => {
      isOpen.value = false;
      window.onscroll = () => {};
    };
    return {
      isOpen,
      avatarUrl,
      fullName,
      heroType,
      description,
      errorMessage,
      addNewHero,
      onClickAddHero,
      closeModal,
      addHeroLoading,
    };
  },
};
</script>
