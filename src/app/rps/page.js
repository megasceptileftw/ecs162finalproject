"use client"
import { useState, useRef, useEffect } from 'react'
import ChoiceAnimation from "../components/animation"
import Navbar from '@/components/navbar'

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
function updateStats(prev, result) {
    const {
        username,
        score,
        wins,
        losses,
        draws,
        total_games,
        current_win_streak,
        best_win_streak
    } = prev

    const newTotalGames = total_games + 1
    const newWins = wins + (result === "win" ? 1 : 0)
    const newLosses = losses + (result === "lose" ? 1 : 0)
    const newDraws = draws + (result === "draw" ? 1 : 0)
    
    const newCurrentStreak = (result === "win") ? current_win_streak + 1 : 0
    const newBestStreak = Math.max(best_win_streak, newCurrentStreak)

    // 3) score logic:
    let newScore = score
    if (result === "win")  newScore += 1
    if (result === "lose") newScore -= 1
    if (newScore < 0)      newScore = 0
    
    return { //all updated stats
        username: username,
        score: newScore,
        wins: newWins,
        losses: newLosses,
        draws: newDraws,
        total_games: newTotalGames,
        current_win_streak: newCurrentStreak,
        best_win_streak: newBestStreak,
    }
}


export default function RPSPage() {
    // Initializing current state (null) and function to update state for player and bot
    // Found this on w3schools tutorials for react: https://www.w3schools.com/react/react_usestate.asp
    const [playerChoice, setPlayerChoice] = useState(null);
    const [botChoice, setBotChoice] = useState(null);
    const playerAnimRef = useRef(null)
    const botAnimRef = useRef(null)

    //initialize stats
    const [stats, setStats] = useState({
        score: 0, wins: 0, losses: 0, draws: 0,
        total_games: 0, current_win_streak: 0,
        best_win_streak: 0, username: ""
    })

    useEffect(() => {
        async function loadStats() {
            const res = await fetch("/api/playerStats")
            if (!res.ok) {
                console.error("failed to load stats")
                return
            }
            const data = await res.json()
            // your route returns an array of rows; pick the first
            if (Array.isArray(data) && data.length > 0) {
                setStats(data[0])
            }
            console.log(data)
        }
        loadStats()
    }, [])

    //this is the button handler for all of the different picks, goes through setting each choice, comparing, and updating
    async function handleChoice(pick) {
        setPlayerChoice(pick) //set player pick
        const botPick = getRandomChoice() //get bot pick
        setBotChoice(botPick)

        playerAnimRef.current?.replay(pick) //replay whenever we click again
        botAnimRef.current?.replay(botPick)

        const result = determineResult(pick, botPick) //compare
        const newStats = updateStats(stats, result)

        //update state
        setStats(newStats)

        await fetch("/api/playerStats", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newStats)
        })
    }

    return (
        <>

        <Navbar />

        <main className="flex flex-col items-center justify-start p-8 gap-8">
            {/* Images and text for selections in rps */}
            <div className="flex gap-8 items-center">
                {/* Player choice image will fill with assets later*/}
                {/* {<img src={`${playerChoice}.png`}/>} */}
                <ChoiceAnimation ref={playerAnimRef}/>
                <p>Player selected: {playerChoice}</p>

                {/* Bot choice image - same */}
                {/* {<img src={`${botChoice}.png`}/>} */}
                <ChoiceAnimation ref={botAnimRef}/>
                <p>Bot selected: {botChoice}</p>

                {/* Underneath imgs probably include text declaring the winner */}
            </div>

            {/* Game of rock-paper-scissors */}
            <div className="flex gap-4">
                {/* Button for choosing rock */}
                <button
                type="button"
                className="py-3 px-5 text-[1rem] border-none rounded bg-[#e6e3e3]"
                onClick={() => handleChoice("rock")}
                >Rock</button>

                {/* Button for choosing paper */}
                <button
                type="button"
                className="py-3 px-5 text-[1rem] border-none rounded bg-[#e6e3e3]"
                onClick={() => handleChoice("paper")}
                >Paper</button>

                {/* Button for choosing Scissors */}
                <button
                type="button"
                className="py-3 px-5 text-[1rem] border-none rounded bg-[#e6e3e3]"
                onClick={() => handleChoice("scissors")}
                >Scissors</button>
            </div>

            {/* Current stats for the player, displaying them at the bottom of the page */}
            <div className="flex gap-6 text-[1.1rem]">
                <p>Score: {stats.score}</p>
                <p>Wins:  {stats.wins}</p>
                <p>Losses:  {stats.losses}</p>
                <p>Draws:  {stats.draws}</p>
                <p>Win Rate:{' '}
                {/* just have a - when no winrate yet*/}
                {stats.total_games > 0 ? ((stats.wins / stats.total_games) * 100).toFixed(0) + '%' : '-'}
                </p>
                <p> Best Win Streak: {stats.best_win_streak}</p>
                <p> Current Win Streak: {stats.current_win_streak}</p>
            </div>
        </main>

        </>
    );
}