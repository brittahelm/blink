# blink

## Description

blink is a classic memory game where the player has to match pairs of eyes with the same colour. Each move lets the player open two eyes which close again after the move. Matched pairs stay open. The game ends when all eyes are open. A score is given based on the number of moves with a lower number giving a better score.

## MVP (DOM - CANVAS)

- game has 4x4 eyes in 8 different colours
- the eyes are placed on the board's grid randomly
- eyes are closed at the beginning and can be opened by clicking on them
- one move comprises opening two eyes after each other that then close again
- matched pairs of eyes stay open
- score counting the number of moves

## Backlog

- eyes open randomly for brief moment to help player
- animate background
- further levels with increased number of eyes
- background music

## Data structure

- class Eye with methods to draw open, draw closed
- array of *16* eyes
- function to draw board with randomly placed eyes on it
- function to 

## States y States Transitions

- splashScreen
- gameScreen
- gameOverScreen

## Tasks

- build DOM
- create Eye class
- create eyes array
- function: place array of eyes on board randomly
- add event listener: click on eye
- function: check for pairs, close eyes or leave open
- function: keep track of remaining pairs
- function: count total moves
- function: end game
- build splash screen
- build game over screen

## Links

https://github.com/brittahelm/blink
https://trello.com/b/yBACsbJc/blink