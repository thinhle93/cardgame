

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var session = require('express-session');
app.use(session({secret: 'game13'}));
var mongoose = require('mongoose');


app.use(express.static(path.join(__dirname, '/game13/dist')));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/my_first_db')
mongoose.Promise = global.Promise;

var PlayerSchema = new mongoose.Schema({
    name: {type: String, require: true}},
    {timestamps:true}
);

mongoose.model('Player', PlayerSchema);
var Player = mongoose.model('Player')


class Game {
    constructor(){
        this.players = []
    }
}
class Deck{
    constructor(){
        this.names = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        this.suits = ['\u2665','\u2666','\u2660','\u2663'];
        this.deck = [];
        this.savedeck = []
        
        
        for(let i = 0; i<this.names.length; i++){
            
            for(let x = 0; x<this.suits.length; x++){
                var card = [];
                card.push(this.names[i]);
                card.push(this.suits[x]);
                this.deck.push(card);
                this.savedeck.push(card);
            }
        }

        this.shuffle()
        
    }
    
        
    
    shuffle(deck){
         var m = this.deck.length, t, i;

          // While there remain elements to shuffle…
          while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = this.deck[m];
            this.deck[m] = this.deck[i];
            this.deck[i] = t;
          }

          return this;
        }

    reset(){
        this.deck = this.savedeck;
        return this;
    }
    

    dealcard(Game){

        for (var x = 0; x < Game.players.length; x++){

            for (var i = 0; i < 13; i++) {
            Game.players[x].hand.push(this.deck.pop());
            }
        }
        return this;
    }


    
} 

class Playeruser{
    constructor(name){
        this.name = name;
        this.hand = [];
        this.addtolist();
    }
    
    addtolist(){
        game.players.push(this)
    }	
    pickcards(num){
        return this.hand.splice(num, 1);

    }
}

function newgame(){
    const newdeck = new Deck()
    const game = new Game()


    
}

function startgame(){
    newdeck.dealcard(game)
}

app.post('/player', function(req, res){
    console.log('POST DATA');
    Player.findOne({name: req.body.name}, function(err, player){
        if(player){
            console.log("player exists")

        }
        else{
            console.log("new player")
            var player = new Player();
            console.log(req.body)
            player.name = req.body.name;
        
            player.save(function(err){
                if (err) {
                    res.json({message:'Error', error: player.errors})
                }
                else {
                    res.json({message:'Success', data: player})
                }
            })
        }
    })
   
})



// // const player1 = new Player("Thinh")
// // const player2 = new Player("Ian")
// // const player3 = new Player("Johnnie")
// // const player4 = new Player("Vince")


// //console.log(player4.hand)


app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./game13/dist/index.html"))
});

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
var io = require('socket.io').listen(server)



io.sockets.on('connection', function (socket){
    console.log("Connected socket",);
    
    socket.on('disconnect', function() {
        console.log('Got disconnect!');
    })

    socket.on("newplayer", function(data){
        console.log(data)
    })
})


