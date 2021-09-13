from flask import Flask
from flask import request
from flask import jsonify
import pandas as pd
import numpy as np

#Server to run to enable recommendations for the main Chatbot on messenger


app = Flask('app')
#CSV containing for each game, its mean rating and total count of ratings and also its list of genres
ratings_mean_count = pd.read_csv("data/ratings_mean_count.csv",converters={'Genre': eval})
#CSV containing user ratings
ratings = pd.read_csv("data/ratings.csv")
#Matric/pivotTable of ratings by users for each game
user_game_rating = ratings.pivot_table(index='Username', columns='Title', values='Userscore')

@app.route('/')
def home():
  return '...'

@app.route('/recommend')
def recommend():
  #Get game name 
  game = request.args.get('game_name', type = str)

  #Check if this game is in our dataset
  if(game in user_game_rating.columns):
    #Get all ratings for this game
    game_ratings = user_game_rating[game]
    #Calculate correlation with other games
    games_like_game = user_game_rating.corrwith (game_ratings)
    corr_game = pd.DataFrame(games_like_game, columns=['Correlation'])
    corr_game.dropna(inplace=True)

    #Add other info to filter later
    corr_game = pd.merge(corr_game,ratings_mean_count, on=['Title'])
    #Get the list of genres of the game
    genres_game = corr_game.loc[corr_game['Title'] == game, 'Genre'].iloc[0]
    #Only keep games that have at least 1 genre of the game 
    corr_game = corr_game[pd.DataFrame(corr_game['Genre'].tolist()).isin(genres_game).any(1).values]
    #Sort by Correlation and number of ratings (to have the most popular games) to have recommended games
    ten_recommended_games = corr_game.sort_values(['Correlation','rating_counts'],ascending=[False,False]).head(5)
    print(ten_recommended_games)
    return jsonify({"games":ten_recommended_games.to_json(orient="split")})

  #This game is not in our dataset
  else:
    return jsonify({"games":None})


app.run(host='0.0.0.0', port=8080)