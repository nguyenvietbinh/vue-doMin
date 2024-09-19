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
    <div @click="settingClick" class="fixed top-0 left-0 m-1 hover:rotate-45 transition-all h-10 w-10 cursor-pointer p-1">
      <ion-icon name="settings-sharp" size="large"></ion-icon>
    </div>
    <GameWindow/>
    
  </div>
</template>
