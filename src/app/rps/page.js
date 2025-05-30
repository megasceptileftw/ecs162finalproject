"use client"
import { useState } from 'react'

export default function RPSPage() {
    // Initializing current state (null) and function to update state for player and bot
    // Found this on w3schools tutorials for react: https://www.w3schools.com/react/react_usestate.asp
    const [playerChoice, setPlayerChoice] = useState(null);
    const [botChoice, setBotChoice] = useState(null);

    // Current placeholder values for stats
    let score = 0;
    let winRate = 0.5;
    let winStreak = 0;

    return (
        <main>
            {/* Images and text for selections in rps */}
            <div className="gameChoices">
                {/* Player choice image */}
                <img src=""/>
                <p>Player selected: {playerChoice}</p>

                {/* Bot choice image */}
                <img src=""/>
                <p>Bot selected: {botChoice}</p>

                {/* Underneath imgs probably include text declaring the winner */}
            </div>

            {/* Game of rock-paper-scissors */}
            <div className="rps">
                {/* Button for choosing rock */}
                <button
                type="button"
                className="rpsButtons"
                onClick={() => setPlayerChoice("rock")}
                >Rock</button>

                {/* Button for choosing paper */}
                <button
                type="button"
                className="rpsButtons"
                onClick={() => setPlayerChoice("paper")}
                >Paper</button>

                {/* Button for choosing Scissors */}
                <button
                type="button"
                className="rpsButtons"
                onClick={() => setPlayerChoice("scissors")}
                >Scissors</button>
            </div>

            {/* Current stats for the player, displaying them at the bottom of the page */}
            <div className="stats">
                <p>Score: {score}</p>
                <p>Win Rate: {winRate}</p>
                <p>Win Streak: {winStreak}</p>
            </div>
        </main>
    );
}