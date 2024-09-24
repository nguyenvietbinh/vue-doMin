<script>
import { computed } from 'vue';
import { state } from './dataStore';
import GameWindow from './gameWindow.vue';
import InputWindow from './inputWindow.vue'
export default {
  data() {
    return {
      
    }
  },
  setup() {
    const InputWindowIsOnFunc = computed(() => state.InputWindowIsOn)
    return {
      InputWindowIsOnFunc
    }
  },
  methods: {
    settingClick() {
      state.InputWindowIsOn = true
    }
  },
  components: {
    InputWindow,
    GameWindow,
  }
}
</script>

<template>
  <div class="background bg-[#bbbbbb] h-full w-full absolute left-0 top-0">
    <GameWindow/>
  </div>
</template>
