function getrandomValue(min, max){
    return Math.floor(Math.random() * (max - min) + min);

}
const app = Vue.createApp({
    data() {
        return{
            playerHealth: 100,
            monsterHealth: 100,
            roundCounter: 0,
            winner: '',
            logs: []
        }
    },

    computed:{
        monsterBarStyle() {
            if(this.monsterHealth < 0) {
                return {width: '0%'}
            }
            return { width: this.monsterHealth + '%'};
        },
        playerBarStyle() {
            if(this.playerHealth < 0) {
                return {width: '0%'}
            }
            // console.log("bar styling function executing");
            return { width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack(){
            return  this.roundCounter % 3 !== 0;
        },
        mayUseHeal(){
            return  this.roundCounter % 3 !== 0;
        }

    },
    watch:{
        playerHealth(value) {
            if(value <= 0 && this.monsterHealth <= 0){
                this.winner = "Draw"
            }
            else if(this.monsterHealth <= 0){
                this.winner = "Player"
            }
            else if(value <= 0){
                this.winner = "Monster"
            }
        }

    },
    methods:{
        attackMonster(){
            this.roundCounter += 1;
            console.log(this.roundCounter);
            const attackValue = getrandomValue(5,12);
            this.monsterHealth -= attackValue;
            this.logs.unshift("Player attacked: Damage Given", attackValue);
            this.attackPlayer();
            // this.logs.unshift("Monter attacked: Damage Given", attackValue);
            console.log(this.monsterHealth, this.playerHealth);

        },
        attackPlayer(){
            const attackValue = getrandomValue(8,15);
            this.playerHealth -= attackValue;
            this.logs.unshift("Monter attacked: Damage Given", attackValue);
        },
        specialAttackMonster(){
            // console.log("attacking monster");
            this.roundCounter += 1;
            const attackValue = getrandomValue(10,25);
            this.monsterHealth -= attackValue;
            this.logs.unshift("Player attacked: Damage Given", attackValue);
            this.attackPlayer();
        },
        heal(){
            this.roundCounter += 1;
            if(this.playerHealth <= 80) {
                this.playerHealth += 15;
            }
            else{
                this.playerHealth = 100;
            }
            this.logs.unshift("Player Healed");
            this.attackPlayer();
        },
        surrender(){
            this.logs.unshift("Player Surrendered");
            this.winner = "Monster";
        }
    }
})
app.mount('#game')