<template>
    <div class="bg-black h-full w-full opacity-15"></div>
    <div style="top: calc(50% - 305px); left: calc(50% - 205px);" class="settingFrame opacity-[1] bg-[#e9e9e9] h-[600px] w-[400px] border-black border-solid border-[5px] rounded-[10px] absolute">
        <input type="number" class="collumInput h-[50px] w-[120px] absolute top-[100px] right-[90px] rounded-[10px] px-4 border-[2px] border-solid border-black" min="1" max="30">
        <input type="number" class="rowInput h-[50px] w-[120px] absolute top-[250px] right-[90px] rounded-[10px] px-4 border-[2px] border-solid border-black" min="1" max="30">
        <input type="number" class="boomInput h-[50px] w-[120px] absolute top-[400px] right-[90px] rounded-[10px] px-4 border-[2px] border-solid border-black" min="1" max="30">
        <p class="left-[50px] absolute top-[100px] text-[30px] font-medium">collum:</p>
        <p class="left-[50px] absolute top-[250px] text-[30px] font-medium">row:</p>
        <p class="left-[50px] absolute top-[400px] text-[30px] font-medium">boom:</p>
        <button @click="playButtonClick" class="bg-[#e9e9e9] h-[50px] w-[80px] absolute border-[2px] border-black border-solid rounded-lg text-[20px] font-medium bottom-10 left-[158px] hover:bg-black hover:translate-y-[-3px] hover:text-[#e9e9e9]">play</button>
    </div>
</template>

<script> 
import { state } from './dataStore'
    export default {
        data() {
            return {
                collumInput: null,
                rowInput: null,
                boomInput: null,
            }
        },
        methods: {
            kiemTraInput(col, row, bom) {
                if ((col > 30) || (col <= 0)) {
                    return false
                } else if ((row > 30) || (row <= 0)) {
                    return false
                } else if (bom >= (row * col)) {
                    return false
                }
                return true
            },
            playButtonClick() {
                if (this.kiemTraInput(this.collumInput.value, this.rowInput.value, this.boomInput.value)) {
                    state.collum = this.collumInput.value
                    state.row = this.rowInput.value
                    state.boom = this.boomInput.value
                    state.InputWindowIsOn = false
                } else {
                    alert('nhap lai setting')
                }
            }
        },
        mounted() {
            this.collumInput = document.querySelector('.collumInput')
            this.rowInput = document.querySelector('.rowInput')
            this.boomInput = document.querySelector('.boomInput')
        }
    }

</script>