new Vue ({
    el:'#app',
    data:{
        playerHealth:100,
        monsterHealth:100,
        gameIsRunning:false,
        turns:[]
    },
    methods:{
        startGame:function(){
            this.gameIsRunning = true,
            this.monsterHealth=100,
            this.playerHealth=100
            this.turns= []
        },
        attack:function(){
            var damage = this.calculateDamage(3,10)
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer:true,
                text:'Player Hits Monster for' + damage
            })
            if(this.checkWin()){
                return;
            }
            this.monsterAttack() 
        },
        specialAttack:function(min,max){
            var damage = this.calculateDamage(10,20)
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer:true,
                text:'Player Hits Monster Hard For' + damage
            })
            if(this.checkWin()){
                return;
            }
            this.monsterAttack() 
        },
        heal:function(){
            if(this.playerHealth <= 90){
                this.playerHealth += 10
            }else{
                this.playerHealth =10
            }
            this.monsterAttack()
        },
        giveUp:function(){
            this.gameIsRunning = false
        },
        monsterAttack:function(){
            var damage = this.calculateDamage(5,12)
            this.playerHealth -= damage
            this.turns.unshift({
                isPlayer:false,
                text:'Monster Hits Player for' + damage
            })
            this.checkWin()
        },
        calculateDamage:function(max,min){
            return Math.max(Math.floor(Math.random() * max) + 1 , min)
        },
        checkWin:function(){
            if(this.monsterHealth <= 0){
              if(confirm('You Win Start New Game')){
                this.startGame()
              }else{
                this.gameIsRunning = false
              }
              return true;
            }if(this.playerHealth <= 0){
                if(confirm('You Lost Start New Game')){
                    this.startGame()
                }else{
                    this.gameIsRunning = false
                }
            }
        }
    }
});