<template>
  <div
    @dragover="onOver($event)"
    @dragstart="startDrag($event)"
    @dragend="endDrag()"
    @dragenter.prevent
    @dragover.prevent
    class="cities"
  >
    <transition-group name="city-list">
      <div
        v-bind:draggable="isDraggable"
        v-for="(item, index) in citiesList"
        :key="item.id"
        v-bind:data-key="index"
        class="cities_item"
        :class="{ cities_item__press: index.toString() === indexCity }"
      >
        <div class="cities_item__drag">
          <svg
            class="drag_icon"
            width="30px"
            height="30px"
            @mousedown="isDraggable = true"
          >
            <path
              d="M14.5 15.5a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0114.5 15.5zm-5 0a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 019.5 15.5zm5-5a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0114.5 10.5zm-5 0a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 019.5 10.5zm5-5a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0114.5 5.5zm-5 0a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 019.5 5.5z"
            ></path>
          </svg>
          <span>{{ item.city }}</span>
        </div>

        <Trash class="cities_item__trash" @click="delCity(index)" />
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import Close from "./svg/Close.vue";
import Trash from "./svg/Trash.vue";

export default defineComponent({
  data: () => {
    return {
      isDraggable: false,
      indexCity: null as string | undefined | null,
    };
  },
  methods: {
    ...mapMutations({
      delCity: "cities/delCity",
      updateCities: "cities/updateCities",
    }),
    startDrag(event: Event) {
      this.indexCity = (event.target as HTMLDivElement).dataset.key;
    },
    endDrag() {
      this.indexCity = null;
      this.isDraggable = false;
    },
    onOver(event: Event) {
      if (
        (event.target as HTMLDivElement).dataset.key !== undefined &&
        this.indexCity !== null &&
        this.isDraggable
      ) {
        const key = (event.target as HTMLDivElement).dataset.key;
        const newList = this.citiesList;
        if (key && this.indexCity) {
          [newList[this.indexCity], newList[key]] = [
            newList[key],
            newList[this.indexCity],
          ];
        }
        this.updateCities(newList);
        this.indexCity = key;
      }
    },
  },
  computed: {
    ...mapState("cities", ["citiesList"]),
  },
  components: { Close, Trash },
});
</script>
<style scoped lang="scss">
.cities {
  width: 100%;
  max-height: 210px;
  overflow: hidden;
  padding: 16px 10px;
  &_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: none;
    background-color: rgb(203, 203, 203);
    color: black;
    padding: 5px;
    margin-bottom: 10px;
    position: relative;
    &__drag {
      display: flex;
      align-items: center;
      position: relative;
    }
    &__trash {
      position: absolute;
      top: 10px;
      right: 8px;
      cursor: pointer;
    }
    &__press {
      background-color: rgba(0, 0, 0, 0.429);
      color: white;
    }
  }
}
.drag {
  &_icon {
    width: 30px;
    height: 30px;
    position: relative;
    top: 3px;
    left: 0;
    fill: rgb(65, 65, 65);
    cursor: grab;
  }
}

.city-list-enter-active,
.city-list-leave-active {
  transition: all 0.4s ease;
}
.city-list-enter-from,
.city-list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
