<template>
    <div class="background h-[600px] w-[600px] bg-gray-800 top-[20px] left-[400px] fixed">
        <ul>
        <li v-for="n in 900" :key="n">
            <div @click="test" class="notOpen  text-red-500 text-[10px] absolute h-[19px] w-[19px] bg-white m-[1px]">
                <img src="./img/boom.png" class="boom hidden absolute top-0 left-0 h-[20px] w-auto" alt="">
                {{ n - 1 }}
            </div>
        </li>
    </ul>
    </div>
</template>
<script>
import { onMounted } from 'vue';
import { state } from './dataStore';

export default {
    setup() {
        const h = 20
        const getListOfRandomNumber = (n, range) => {
            let x
            let ans = []
            while (ans.length < n) {
                x = Math.floor(Math.random() * range)
                if (!ans.includes(x)) {
                    ans.push(x)
                }
            }
            return ans
        }
        onMounted(() => {
            const notOpen = document.querySelectorAll('.notOpen')
            const boomElment = document.querySelectorAll('.boom')
            let boomBlock = getListOfRandomNumber(150, 900)
            for (let i of boomBlock) {
                boomElment[i].style.display = 'block'
            }
            notOpen.forEach((item, index) => {
                item.style.top = `${20 * Math.floor(index / 30)}px`
                item.style.left = `${20 * (index % 30)}px`
            })
        })
    },
    data() {
        return {
            notOpen: null,
        }
    },
    mounted() {
        this.notOpen = document.querySelectorAll('.notOpen') 
    },
    
    methods: {
        test() {
            
        }
    }
}
</script>