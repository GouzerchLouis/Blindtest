from flask import Flask, render_template, jsonify
import json
import random

app = Flask(__name__)

def load_songs():
    with open("songs.json", "r", encoding="utf-8") as f:
        return json.load(f)

songs = load_songs()

def get_random_song():
    return random.choice(songs)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/random")
def random_song():
    song = get_random_song()
    return jsonify(song)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)