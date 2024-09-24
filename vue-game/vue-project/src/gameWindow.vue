<template>
    <div style="left: calc(50% - 600px);" @contextmenu.prevent="" class="background h-[600px] w-[1200px] bg-gray-800 fixed top-[20px]">
        <ul>
        <li v-for="n in 1800" :key="n">
            <div @click="leftClick" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @contextmenu.prevent="rightClick" class="boomBlock select-none cursor-pointer font-semibold text-center text-[13px] absolute h-[19px] w-[19px] bg-gray-600 m-[1px]">
                <img src="./img/boom.png" class="boom hidden absolute top-0 left-0 h-[20px] w-auto" alt="">
                <img src="./img/flag.png" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @contextmenu.prevent="removeFlag" class="flag hidden absolute top-0 left-0 h-[20px] w-auto" alt="">
            </div>
        </li>
    </ul>
    </div>
    <div class="m-2 select-none absolute top-0 right-0 inline-block bg-[#d9342e] h-[50px] w-auto text-[30px] px-2 border-black border-[2px] border-solid rounded-[4px] font-mono">{{ numberOfBoom }}</div>
</template>
<script>
import { onMounted, TransitionGroup } from 'vue';
import { state } from './dataStore';
import { nextTick } from 'vue';

export default {
    setup() {
        const h = 20
        onMounted(() => {
            const boomBlock = document.querySelectorAll('.boomBlock')
            boomBlock.forEach((item, index) => {
                item.style.top = `${20 * Math.floor(index / 60)}px`
                item.style.left = `${20 * (index % 60)}px`
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
            isMouseDown: null,
            clickTimeout: null,
            isLose: true,
            numberOfBoom: 500,
            rmFlag: false,
        }
    },
    mounted() {
        this.boomBlock = document.querySelectorAll('.boomBlock')
        this.boomElement = document.querySelectorAll('.boom')
        this.flag = document.querySelectorAll('.flag')
    },
    
    methods: {
        // Hàm xử lý khi nhấn giữ chuột trái
        handleMouseDown(event) {
            if (event.button === 0) {
                this.isMouseDown = true;
                this.clickTimeout = setTimeout(() => {
                    if (this.isMouseDown) {
                        if (this.gameOn) {
                            this.boomBlock.forEach((item, index) => {
                                if ((event.target === item) && (window.getComputedStyle(this.boomBlock[index]).backgroundColor === 'rgb(75, 85, 99)')) {
                                    this.flag[index].style.display = 'block'
                                    this.lstOfFlag.push(parseInt(index))
                                }
                            })
                            this.flag.forEach((item, index) => {
                                if ((event.target === item) && (window.getComputedStyle(this.boomBlock[index]).backgroundColor === 'rgb(75, 85, 99)')) {
                                    this.rmFlag = true
                                }
                            })
                            this.numberOfBoom = 500 - this.lstOfFlag.length
                        }
                    }
                }, 500); // Thời gian 500ms để phát hiện nhấn giữ
            }
        },

        // Hàm xử lý khi thả chuột
        handleMouseUp(event) {
            if (event.button === 0) {
                this.flag.forEach((item, index) => {
                    if ((event.target === item) && (window.getComputedStyle(this.boomBlock[index]).backgroundColor === 'rgb(75, 85, 99)')) {
                        if (this.rmFlag) {
                            this.flag[index].style.display = 'none'
                            this.lstOfFlag = this.lstOfFlag.filter(item => item != parseInt(index))
                        }
                        this.numberOfBoom = 500 - this.lstOfFlag.length
                    }
                })
                this.rmFlag = false
                this.isMouseDown = false;
                clearTimeout(this.clickTimeout);
            }
        },
        removeFlag() {
            this.flag.forEach((item, index) => {
                if (event.target === item) {
                    item.style.display = 'none'
                    this.lstOfFlag = this.lstOfFlag.filter(item => item !== parseInt(index))
                }
            })
        },
        rightClick() {
            if (this.gameOn) {
                this.boomBlock.forEach((item, index) => {
                    if ((event.target === item) && (window.getComputedStyle(this.boomBlock[index]).backgroundColor === 'rgb(75, 85, 99)')) {
                        console.log(window.getComputedStyle(this.boomBlock[index]).backgroundColor)
                        console.log(this.flag[index])
                        this.flag[index].style.display = 'block'
                        this.lstOfFlag.push(parseInt(index))
                    }
                    this.numberOfBoom = 500 - this.lstOfFlag.length
                })
            }
        },
        leftClick() {
            if (!this.gameOn) {
                this.gameOn = true
                for (let i = 0; i < 1800; i ++) {
                    this.blockStatus.push(0)
                }
                this.boomBlock.forEach((item, index) => {
                    if (event.target === item) {
                        console.log(window.getComputedStyle(this.flag[index]).display)
                        this.lstOfBoom = this.getListOfRandomNumber(500, 1800, this.getBlockAround(index), index)
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
                        console.log(window.getComputedStyle(this.flag[index]).display)
                        if ((window.getComputedStyle(this.boomBlock[index]).backgroundColor === 'rgb(75, 85, 99)') && (window.getComputedStyle(this.flag[index]).display === 'none') && (!this.isMouseDown)) {
                            console.log('asd')
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
            ans.push(x - 61, x - 60, x - 59, x - 1, x + 1, x + 59, x + 60, x + 61)
            if (x <= 59) {
                ans = ans.slice(3)
            }
            if (x >= 1740) {
                ans = ans.slice(0, 5)
            }
            if (x % 60 === 0) {
                ans = ans.filter(item => (item !== x - 61) && (item !== x - 1) && (item !== x + 59))
            } else if (x % 60 === 59) {
                ans = ans.filter(item => (item !== x - 59) && (item !== x + 1) && (item !== x + 61))
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
                } else if (this.blockStatus[index] == 0) {
                    this.boomBlock[index].innerHTML = ''
                } else {
                    this.boomBlock[index].innerHTML = `${this.blockStatus[index]}`
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