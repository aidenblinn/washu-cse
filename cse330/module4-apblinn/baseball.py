import sys
import re

# check for file from command line, open file if exists
try:
    input_file = sys.argv[1]
except IndexError:
    print("Usage: baseball.py filepath")
file = open(input_file,"r")

# player class w name/hits/bats
class Player:
    average = None
    def __init__(self,name,bats_count,hits_count):
        self.name = name
        self.bats_count = bats_count
        self.hits_count = hits_count

# function to add new player to list
def add_player(name,bats_count,hits_count):
    addition = Player(name,bats_count,hits_count)
    player_list.append(addition)

player_list = []
player_names = []

# iterate through each line in file
for line in file:
    # look for name
    name = re.match("\w*\s\w*\sbatted", line)
    if name:
        # extract only name part
        name = name.group()[:-7]
        #look for bats/hits and extract only relevant part
        bats = re.search("batted\s\d*\s", line)
        bats = int(bats.group()[7:-1])
        hits = re.search("with\s\d*\s", line)
        hits = int(hits.group()[5:-1])
        # add bats/hits where line name matches player_list name
        for player in player_list:
            if name == player.name:
                player.bats_count = player.bats_count + bats
                player.hits_count = player.hits_count + hits
        # add player/add to player_list if player hasn't been created yet
        if name not in player_names:
            player_names.append(name)
            add_player(name, bats, hits)

file.close()

# computer batting averages for each players
for player in player_list:
    player.average = round(player.hits_count / player.bats_count, 3)

# sort player_list based on batting average, descending
player_list = sorted(player_list, key = lambda x: x.average, reverse=True)

# print name and batting average for each player
for player in player_list:
    print(player.name, ": ", "{:.3f}".format(player.average), sep='')