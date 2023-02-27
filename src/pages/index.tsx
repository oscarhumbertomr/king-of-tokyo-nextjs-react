import styles from '@/styles/MonsterCard.module.css'
import { Spacer, Col, Container, Row } from "@nextui-org/react";
import { NextPage } from "next"
import { useEffect, useState } from "react";
import MonsterCard from '@/components/MonsterCard';

type PlayersType = {
    name: string,
    isOnTokyo: boolean,
    life: number,
    victoryPoints: number
}

const allMonsters = ['Alienoid', 'Baby Gigazaur', 'Boogie Woogie', 'Cyber Bunny', 'Cyber Kitty', 'Gigazaur', 'The King', 'Meca Dragon', 'Pandakaï', 'Pumpkin Jack', 'Space Penguin']

const testPlayers = [
    {
        name: allMonsters[0],
        isOnTokyo: false,
        life: 10,
        victoryPoints: 0
    },
    {
        name: allMonsters[1],
        isOnTokyo: false,
        life: 10,
        victoryPoints: 0
    },
    {
        name: allMonsters[2],
        isOnTokyo: false,
        life: 10,
        victoryPoints: 0
    },
]

const Home: NextPage = () => {
    const [players, setPlayers] = useState<PlayersType[]>([])
    useEffect(() => setPlayers(testPlayers), [])

    const handleOnTokyo = (index: number, status: boolean) => {
        const newPlayers = players.map(player => {
            return { ...player, isOnTokyo: false }
        })

        newPlayers[index].isOnTokyo = status
        setPlayers(newPlayers)
    }

    const handleSetLife = (index: number, newLife: number) => {
        console.log(index, newLife)
        const newPlayers = players.map((player, inx) =>
            inx === index
                ? {
                    ...player,
                    life: newLife,
                }
                : { ...player }
        )

        setPlayers(newPlayers)
    }

    const handleAtack = (index: number, isOnTokyo: boolean) => {
        console.log('Atack')
        const newplayers = players.map((player) =>
            player.isOnTokyo !== isOnTokyo
                ? {
                    ...player,
                    life: player.life - 1,
                }
                : { ...player }
        )
        
        setPlayers(newplayers)

    }

    const handleSetVictoryPoints = (index: number, newVictoryPoints: number) => {
        console.log(index, newVictoryPoints)
        const newPlayers = players.map((player, inx) =>
            inx === index
                ? {
                    ...player,
                    victoryPoints: newVictoryPoints,
                }
                : { ...player }
        )

        setPlayers(newPlayers)
    }

    return (
        <Container alignItems='center' lg>
            <>
                <Row >
                    {players && players.map((player, index) =>
                        <MonsterCard
                            key={index}
                            name={player.name}
                            life={player.life}
                            victoryPoints={player.victoryPoints}
                            index={index}
                            isOnTokyo={player.isOnTokyo}
                            handleOnTokyio={handleOnTokyo}
                            handleSetVictoryPoints={handleSetVictoryPoints}
                            handleAtack={handleAtack}
                            handleSetLife={handleSetLife} />
                    )}
                </Row>
            </>
        </Container>
    )
}

export default Home;