import styles from '@/styles/MonsterCard.module.css'
import { Spacer, Col, Container, Row } from "@nextui-org/react";
import { NextPage } from "next"
import { useState } from "react";
import MonsterCard from '@/components/MonsterCard';

const Home: NextPage = () => {
    const allMonsters = ['Alienoid', 'Baby Gigazaur', 'Boogie Woogie', 'Cyber Bunny', 'Cyber Kitty', 'Gigazaur', 'The King', 'Meca Dragon', 'Pandakaï', 'Pumpkin Jack', 'Space Penguin']
    const players = [allMonsters[0], allMonsters[3], allMonsters[1]]
    return (
        <Container alignItems='center'>
            {players.map(player =>
                <>
                <Row >
                    <Col >
                        <MonsterCard monsterName={player} />
                    </Col>
                </Row>
                <Spacer y={2} />
                </>
            )}
        </Container>
    )
}

export default Home;