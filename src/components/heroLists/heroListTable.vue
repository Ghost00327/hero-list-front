<template>
  <div class="mt-4">
    <div class="w-full">
      <div class="bg-gray-75 text-left w-full hidden sm:block">
        <div class="text-sm font-weight-600 text-gray-400 flex">
          <div class="px-1 w-2/5">Heros</div>
          <div class="px-1 w-1/5">Type</div>
          <div class="px-1 w-2/5">Description</div>
        </div>
      </div>
      <div class="relative">
        <heroListRow
          v-for="(item, index) in heroList"
          @click="onClickHeroItem(item)"
          :key="index"
          :itemData="item"
        />

        <div
          class="absolute inset-x-0 bottom-0 flex bg-gradient-to-t from-gray-350 opacity-25 h-32"
        ></div>
        <div v-if="!endHeroes" class="absolute inset-x-0 bottom-0 flex z-40">
          <button
            class="bg-blue-650 text-white p-2 rounded-md mx-auto my-10 px-8"
            @click="loadMore"
          >
            Load More
          </button>
        </div>
      </div>
      <heroDetailModal v-if="isOpenDetailModal" @close-detail-modal="closeDetailModal" :itemData="detailItemData"/>
    </div>
  </div>
</template>
<script>
import heroListRow from "./heroListRow.vue";
import heroDetailModal from "./heroDetailModal.vue";
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  components: { heroListRow, heroDetailModal },
  setup() {
    const store = useStore();
    const loading = ref(false);
    const endHeroes = ref(false);
    const isOpenDetailModal = ref(false);
    const errorMessage = ref("");
    const triggerCount = ref(3);
    const detailItemData = ref({})
    const heroList = computed(() => store.getters["heroes/heroList"]);
    const heroTotalCount = computed(() => store.getters["heroes/totalCount"]);
    const loadMore = async () => {
      if (heroList.value.length >= heroTotalCount.value) {
        endHeroes.value = true;
        return;
      }
        await store.dispatch("heroes/loadMoreHeroList", {
        skip: heroList.value.length,
        first: triggerCount.value,
      });
    };
    const onClickHeroItem = (itemData) => {
      isOpenDetailModal.value = true
      detailItemData.value = itemData
    };
    const closeDetailModal = () => {
      isOpenDetailModal.value = false
    };
    return {
      heroList,
      loading,
      errorMessage,
      endHeroes,
      loadMore,
      isOpenDetailModal,
      closeDetailModal,
      detailItemData,
      onClickHeroItem
    };
  },
};
</script>
