



new Vue({

    el: "#app",
    data: {
        player_heal: 100,
        monster_heal: 100,
        logs: [{ turn: "", text: "" }],
        game_is_on: false,
        attack_multiple:10,
        special_attack_multiple:25,
        heal_up_multiple:20,
        monster_attack_multiple:25,
        log_text :{
            attack:"OYUNCU ATAĞI:",
            special_attack:"ÖZEL OYUNCU ATAĞI:",
            monster_attack:"CANAVAR ATAĞI",
            heal_up:"İLK YARDIM",
            give_up:"OYUNCU PES ETTİ!!!"
        }

    },
    methods: {
        start_game() {
            this.game_is_on = true;

        },


        attack() {  //saldırı
            var point = Math.ceil(Math.random() * this.attack_multiple);
            this.monster_heal = this.monster_heal - point;
            this.add_to_log({ turn: "p", text: this.log_text.attack + point})
            this.monster_attack();
        },
        special_attack() { // özel saldırı
            var point = Math.ceil(Math.random() * this.special_attack_multiple);
            this.monster_heal = this.monster_heal - point;
            this.monster_attack();
            this.add_to_log({ turn: "p", text: this.log_text.special_attack + point  })
        }, 

        heal_up() { // ilk yardım 
            var point = Math.ceil(Math.random() * this.heal_up_multiple);
            this.player_heal = this.player_heal + point;
            this.add_to_log({ turn: "p", text: this.log_text.heal_up + point   })
            this.monster_attack();
        },

        monster_attack() { // canavar saldırı
            var point = Math.ceil(Math.random() * this.monster_attack_multiple);
            this.player_heal = this.player_heal - point;
            this.add_to_log({ turn: "m", text: this.log_text.monster_attack  + point  })

        },
      
        give_up() {
            this.player_heal = 0,
                this.add_to_log({ turn: "p", text: this.log_text.give_up })
        },
        add_to_log(log) {
            this.logs.push(log);
        }


    },
    watch: {
        player_heal(value) {
            if (value <= 0) {
                this.player_heal = 0;
                if (confirm("Oyunu kaybettin, please try again")) {
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.logs = [];
                }
            } else if (value >= 100) {
                this.player_heal = 100;

            }
            console.log("benim canım   " + value)

        },
        monster_heal(value) {
            if (value <= 0) {
                this.player_heal = 0;
                if (confirm("Oyunu kazandın, please try again")) {
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.logs = [];
                }
            } else if (value >= 100) {
                this.monster_heal = 100;

            }
            console.log("canavarın canı   " + value)

        },


    },
    computed:{
        user_progress(){
            return{
                width: this.player_heal + "%"
            }
        },
        monster_progress(){
            return{
                width:this.monster_heal + "%"
            }
        }

    }

}) 