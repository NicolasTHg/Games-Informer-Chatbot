# Games-Informer-Chatbot
A chatbot on messenger

- Games Informer Bot is your source of information on video games.
It can answer all your questions about video games from Pong to the latest releases.
Can't remember the developer or the publisher or the release date of a certain game?
Do you want to know on which platforms a game is playable or on which stores it can be bought ?
Do you want to see a little more about a game with a trailer ?
Or Do you ant to experience a game's beautiful Original Soundtracks ?
The Games Informer Bot is here for you !

- I use Wit.ai (which is based on NLP) to build my chatbot. I train my bot with sentences that get parsed into intents and entities
that i have defined. I try to think with other users perspective to have multiple sentence's formulations.
Some entities like genre or platform belongs respectively to predefined lists ["Action","Shooters","Sports" etc.] and ["Playstation 5", "Xbox", "PC" etc.] that i defined.
So it can associate these words with genre and platform whatever the position of these words.

- I made a collaborative filtering recommender system, that recommend to a user some games that a user might like based on other users' ratings.
The user asks for recommendations by precising an initial game and the bot returns recommended games.
Firstly the recommender system compute the correlation between the initial game with all others games.
It then filters by keeping only games that have a common genre with the initial game.
It then sorts by correlation and by number of ratings (to return the most popular games).

To have ratings, i use datasets from https://www.kaggle.com/dahlia25/metacritic-video-game-comments.

Here are some scenarios for the chatbot :
scenario 1: Ask Information about a game
	- can you give some information on Minecraft ?     > (Returns informations about Minecraft).
	- tell me about zelda on nintendo switch?     > (Returns informations about the Zelda game on the nintendo switch).
	- what is the pokemon released in 2016 ?	> (Returns informations about the Pokemon game released in 2016).
scenario 2:  Ask the developper/publisher of a game
	- who developped GTA 5 ?        > (Returns the developers of GTA 5)
	- who published the assassin's creed game in 2020?        > (Returns the publishers of the Assassin's creed released in 2020)
	- who are the developpers of mario tennis on gamecube ? > (Returns the developpers of the Mario Tennis on the nintendo gamecube)
scenario 3:  Ask the genres of a game
	- what genre is fifa 21 ?        > (Returns the genres of Fifa 21)
	- what kind of game is among us ?        > (Returns the genres of Among us)
	- what are the genres of the mario game released in 2017 > (Returns the genres of the Mario game released in 2017)
scenario 4:  Ask the platforms where you can play a game
	- on which platforms i can play Fortnite ?        > (Returns the platforms)
	- where can i play red dead redemption ?        > (Returns the platform)
	- on which consoles is Mario kart 8 playable ?	> (Returns the platform)
scenario 5:  Ask the stores where you can buy a game
	- where can i buy minecraft ?        > (Returns the stores)
	- on which stores is among us available ?        > (Returns the stores)
	- i want to buy destiny 2. Where ?	> (Returns the stores)
scenario 6:  Ask a trailer of a game
	- can i have a trailer of the monster hunter on switch ?        > (Returns the trailer of the Monster Hunter game on the switch)
	- give me a video of Tales of vesperia        > (Returns the trailer of Tales of Vesperia)
	- show me a video of Fall guys	> (Returns the trailer of Fall guys)
scenario 7:  Ask the OST of a game
	- can i have the ost of Persona 5?        > (Returns the OST of Persona 5)
	- give me musics of nier automata        > (Returns the OST of Nier Automata)
	- let me listen to musics of Yakuza 0	> (Returns the OST of Yakuza 0)
scenario 8:  Ask for the upcoming games
	- what are the upcoming games ?        > (Returns 3 upcoming games)
	- what are the upcoming games on ps5?        > (Returns 3 upcoming games on PS5)
	- what are the upcoming games by Nintendo ?	> (Returns 3 upcoming games by Nintendo)
scenario 9:  Ask for the most popular games
	- what were popular in 2017?       > (Returns 3 popular games in 2017)
	- what did people liked on the gamecube in 2001 ?        > (Returns 3 popular games in 2011 on the gamecube)
	- what are the most popular game of Ubisoft ?	> (Returns 3 popular games by Ubisoft)
scenario 10:  Ask for the highest rated games
	- what are the highest rated game on playstation 2       > (Returns 3 highest rated games on playstation)
	- give me the highest rated games developped by 2K        > (Returns 3 highest rated games by 2K)
	- what games were well rated in 2020 ?	> (Returns 3 highest rated games in 2020)
scenario 11:  Ask for the recommended games
	- I like Hollow Knight. Can you recommend some games ?       > (Returns 2 recommended games)
	- Can you give me recommendations for Valkyria Chronicles ?        > (Returns 2 recommended games)
	- Recommend me games ! I like Borderlands 2 !	> (Returns 2 recommended games)

Video of the chatbot
https://www.youtube.com/watch?v=xbVORYQ__fA
