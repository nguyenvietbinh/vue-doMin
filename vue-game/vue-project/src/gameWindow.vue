<template>
    <div class="background h-[600px] w-[600px] bg-gray-800 top-[20px] left-[400px] fixed">
        <ul>
        <li v-for="n in 900" :key="n">
            <div @click="leftClick" @contextmenu.prevent="rightClick" class="boomBlock select-none cursor-pointer font-semibold text-center text-[13px] absolute h-[19px] w-[19px] bg-gray-600 m-[1px]">
                <img src="./img/boom.png" class="boom hidden absolute top-0 left-0 h-[20px] w-auto" alt="">
                <img src="./img/flag.png" @contextmenu.prevent="removeFlag" class="flag hidden absolute top-0 left-0 h-[20px] w-auto" alt="">
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
        onMounted(() => {
            const boomBlock = document.querySelectorAll('.boomBlock')
            boomBlock.forEach((item, index) => {
                item.style.top = `${20 * Math.floor(index / 30)}px`
                item.style.left = `${20 * (index % 30)}px`
            })
        })
    },
    data() {
        return {
            boomBlock: null,
            lstOfBoom: [],
            lstOfFlag: [],
            blockStatus: [],
            boomElement: null,
            gameOn: false,
            flag: null,
        }
    },
    mounted() {
        this.boomBlock = document.querySelectorAll('.boomBlock')
        this.boomElement = document.querySelectorAll('.boom')
        this.flag = document.querySelectorAll('.flag')
    },
    
    methods: {
        removeFlag() {
            this.flag.forEach((item, index) => {
                if (event.target === item) {
                    item.style.display = 'none'
                    this.lstOfFlag = this.lstOfFlag.filter(item => item !== parseInt(index))
                    console.log(this.lstOfFlag)
                }
            })
        },
        rightClick() {
            if (this.gameOn) {
                this.boomBlock.forEach((item, index) => {
                    if ((event.target === item) && (window.getComputedStyle(this.boomBlock[index]).backgroundColor === 'rgb(75, 85, 99)')) {
                        console.log(window.getComputedStyle(this.flag[index]).display)
                        this.flag[index].style.display = 'block'
                        this.lstOfFlag.push(parseInt(index))
                    }
                })
            }
        },
        leftClick() {
            if (!this.gameOn) {
                this.gameOn = true
                for (let i = 0; i < 900; i ++) {
                    this.blockStatus.push(0)
                }
                this.boomBlock.forEach((item, index) => {
                    if (event.target === item) {
                        this.lstOfBoom = this.getListOfRandomNumber(150, 900, this.getBlockAround(index), index)
                        console.log(Math.max(...this.lstOfBoom))
                        for (let i of this.lstOfBoom) {
                            this.blockStatus[i] = 'b'
                        }
                        this.blockStatus = this.addNumber(this.blockStatus)
                        this.displayBoomBlock(index)
                    }
                })
            } else {
                this.boomBlock.forEach((item, index) => {
                    if (event.target === item) {
                        if (window.getComputedStyle(this.boomBlock[index]).backgroundColor === 'rgb(75, 85, 99)') {
                            this.displayBoomBlock(index)
                        } else {
                            if (this.blockStatus[index] === this.countFlag(index)) {
                                for (let i of (this.getBlockAround(index))) {
                                    if (!this.lstOfFlag.includes(parseInt(i))) {
                                        this.displayBoomBlock(i)
                                    }
                                }
                            }
                        }
                    }
                })
            }
        },
        getListOfRandomNumber(n, range, except, x) {
            let a
            let ans = []
            console.log(except)
            while (ans.length < n) {
                a = Math.floor(Math.random() * (range))
                if ((!ans.includes(a)) && (!except.includes(a)) && (x !== a)) {
                    ans.push(a)
                }
            }
            return ans
        },
        addNumber(bstt) {
            for (let i in bstt) {
                if (bstt[i] === 'b') {
                    for (let j of this.getBlockAround(parseInt(i))) {
                        if (bstt[j] !== 'b') {
                            bstt[j] = bstt[j] + 1
                        }
                    }
                }
            }
            return bstt
        },
        getBlockAround(x) {
            let ans = []
            ans.push(x - 31, x - 30, x - 29, x - 1, x + 1, x + 29, x + 30, x + 31)
            if (x <= 29) {
                ans = ans.slice(3)
            }
            if (x >= 870) {
                ans = ans.slice(0, 5)
            }
            if (x % 30 === 0) {
                ans = ans.filter(item => (item !== x - 31) && (item !== x - 1) && (item !== x + 29))
            } else if (x % 30 === 29) {
                ans = ans.filter(item => (item !== x - 29) && (item !== x + 1) && (item !== x + 31))
            }
            return ans
        },
        displayBoomBlock(ind) {
            if (window.getComputedStyle(this.boomBlock[ind]).backgroundColor === 'rgb(75, 85, 99)') {
                this.boomBlock[ind].style.backgroundColor = 'white'
                if (this.blockStatus[ind] === 0) {
                    this.boomBlock[ind].innerHTML = ''
                    this.explore(ind)
                } else if (this.blockStatus[ind] === 'b') {
                    this.lose()
                } else {
                    this.boomBlock[ind].innerHTML = `${this.blockStatus[ind]}`
                }
            }
        },
        explore(ind) {
            for (let i of this.getBlockAround(ind)) {
                if (window.getComputedStyle(this.boomBlock[i]).backgroundColor === 'rgb(75, 85, 99)') {
                    this.displayBoomBlock(i)
                }
            }
        },
        lose() {
            this.boomElement.forEach((item, index) => {
                if (this.lstOfBoom.includes(index)) {
                    item.style.display = 'block'
                }
            })
        },
        countFlag(ind) {
            let ans = 0
            for (let i of this.getBlockAround(ind)) {
                if (this.lstOfFlag.includes(i)) {
                    ans += 1
                }
            }
            return ans
        }
    }
}
</script>