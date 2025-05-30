"use client"
import { useState } from 'react'
import styles from './page.module.css'

const choices = ['rock', 'paper', 'scissors'] //string choices both for player and bot

//for randomizing bot choice: pulled formula from here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomChoice() {
    const idx = Math.floor(Math.random() * 3)
    return choices[idx]
}

//game logic hardcoded rps outvomes
function determineResult(player, bot) {
    if (player === bot) return 'draw'
    if ((player === 'rock' && bot === 'scissors') || (player === 'paper' && bot === 'rock') || (player === 'scissors' && bot === 'paper')) {
        return 'win'
    }
    return 'lose'
}

//takes in previous stats, update score/wins/winstreak etc and wwe get a whole new stats obj out of it
function updateStats(stats, result) {
    const { score, winStreak, wins, total } = stats

    let newScore = score
    let newWinStreak = result === 'win' ? winStreak + 1 : 0 //no win means reset
    let newWins = wins + (result === 'win' ? 1 : 0)
    let newTotal = total + (result === 'draw' ? 0 : 1)
    
    if (result === 'win') newScore += 1
    if (result === 'lose') newScore -= 1
    if (newScore < 0) newScore = 0 //so we dont get negative score
    
    return { //all updated stats
        score:newScore,
        winStreak:newWinStreak,
        wins:newWins,
        total:newTotal,
    }
}


export default function RPSPage() {
    // Initializing current state (null) and function to update state for player and bot
    // Found this on w3schools tutorials for react: https://www.w3schools.com/react/react_usestate.asp
    const [playerChoice, setPlayerChoice] = useState(null);
    const [botChoice, setBotChoice] = useState(null);

    //initialize stats
    const [stats, setStats] = useState({score: 0, winStreak: 0, wins: 0, total: 0,});

    //this is the button handler for all of the different picks, goes through setting each choice, comparing, and updating
    const handleChoice = (pick) => {
        setPlayerChoice(pick) //set player pick
        const botPick = getRandomChoice() //get bot pick
        setBotChoice(botPick)
        const result = determineResult(pick, botPick) //compare
        setStats(prev => updateStats(prev, result)) //prev so we never read an empty stats obj
    }

    return (
        <main className={styles.main}>
            {/* Images and text for selections in rps */}
            <div className={styles.gameChoices}>
                {/* Player choice image will fill with assets later*/}
                {/* {<img src={`${playerChoice}.png`}/>} */}
                <p>Player selected: {playerChoice}</p>

                {/* Bot choice image - same */}
                {/* {<img src={`${botChoice}.png`}/>} */}
                <p>Bot selected: {botChoice}</p>

                {/* Underneath imgs probably include text declaring the winner */}
            </div>

            {/* Game of rock-paper-scissors */}
            <div className={styles.rps}>
                {/* Button for choosing rock */}
                <button
                type="button"
                className={styles.rpsButtons}
                onClick={() => handleChoice("rock")}
                >Rock</button>

                {/* Button for choosing paper */}
                <button
                type="button"
                className={styles.rpsButtons}
                onClick={() => handleChoice("paper")}
                >Paper</button>

                {/* Button for choosing Scissors */}
                <button
                type="button"
                className={styles.rpsButtons}
                onClick={() => handleChoice("scissors")}
                >Scissors</button>
            </div>

            {/* Current stats for the player, displaying them at the bottom of the page */}
            <div className={styles.stats}>
                <p>Score: {stats.score}</p>
                <p>Win Rate:{' '}
                {/* just have a - when no winrate yet*/}
                {stats.total > 0 ? ((stats.wins / stats.total) * 100).toFixed(0) + '%' : '-'}
                </p>
                <p>Win Streak: {stats.winStreak}</p>
            </div>
        </main>
    );
}
