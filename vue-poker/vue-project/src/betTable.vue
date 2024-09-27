<template>
    <div @click="test" style="top: calc(50% - 250px); left: calc(50% - 250px);" class="h-[500px] w-[500px] absolute">
        <img src="./img/pokerTable.png" alt="" class="h-[500px] w-auto rounded-[20px] absolute top-0 left-0 z-0">
        <div class="flopTurnRiver select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 absolute underline text-center text-[20px] top-[230px] left-[160px]"></div>
        <div class="flopTurnRiver select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 absolute underline text-center text-[20px] top-[230px] left-[195px]"></div>
        <div class="flopTurnRiver select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 absolute underline text-center text-[20px] top-[230px] left-[230px]"></div>
        <div class="flopTurnRiver select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 absolute underline text-center text-[20px] top-[230px] left-[270px]"></div>
        <div class="flopTurnRiver select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 absolute underline text-center text-[20px] top-[230px] left-[310px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute top-[430px] left-[220px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute top-[430px] left-[250px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute rotate-90 top-[400px] left-[30px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute rotate-90 top-[370px] left-[30px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute rotate-90 bottom-[400px] left-[30px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute rotate-90 bottom-[370px] left-[30px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute bottom-[430px] left-[220px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute bottom-[430px] left-[250px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute -rotate-90 bottom-[400px] right-[30px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute -rotate-90 bottom-[370px] right-[30px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute -rotate-90 top-[400px] right-[30px]"></div>
        <div class="playerCard select-none font-sans font-medium h-[38px] w-[28px] rounded-sm border-[1px] border-black border-solid bg-red-600 underline text-center text-[20px] absolute -rotate-90 top-[370px] right-[30px]"></div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                cards: [],
                playerCard: null,
                flopTurnRiver: null,
            }
        },
        mounted() {
            this.playerCard = document.querySelectorAll('.playerCard')
            this.flopTurnRiver = document.querySelectorAll('.flopTurnRiver')
        },
        methods: {
            test() {
                this.mixCards()
                this.playerCard.forEach((item, index) => {
                    this.displayCard(this.cards[index], item)
                });
                this.flopTurnRiver.forEach((item, index) => {
                    this.displayCard(this.cards[index+12], item)
                })       
            },
            mixCards() {
                let a
                this.cards = []
                while (this.cards.length < 52) {
                    a = Math.floor(Math.random() * 52)
                    if (!this.cards.includes(a)) {
                        this.cards.push(a)
                    }
                }
            },
            displayCard(cardNumber, card) {
                let cardColor
                if (cardNumber%4 === 0) {
                    cardColor = 'red'
                } else if (cardNumber%4 === 1) {
                    cardColor = 'orange'
                } else if (cardNumber%4 === 2) {
                    cardColor = 'green'
                } else {
                    cardColor = 'black'
                }
                cardNumber = parseInt(cardNumber / 4) + 1
                if (cardNumber === 1) {
                    cardNumber = "A"
                } else if (cardNumber === 11) {
                    cardNumber = "J"
                } else if (cardNumber === 12) {
                    cardNumber = "Q"
                } else if (cardNumber === 13) {
                    cardNumber = "K"
                }
                card.innerHTML = cardNumber
                card.style.backgroundColor = cardColor
                card.style.color = 'white'
            },
        }
    }
</script>