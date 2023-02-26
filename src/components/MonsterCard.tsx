import styles from '@/styles/MonsterCard.module.css'
import { Spacer, Col, Card, Text, Button, Row } from "@nextui-org/react";
import { NextComponentType } from "next"
import { useState } from "react";

type propsMonsterCard = {
    monsterName: string
}

const MonsterCard = (props: propsMonsterCard) => {
    const { monsterName } = props
    const [life, setLife] = useState(10)
    const [victoryPoints, setVictoryPoints] = useState(0)
    const [onTokyio, setOnTokyio] = useState(true)
    const [alive, setAlive] = useState(true)
    const [winner, setWinner] = useState(false)

    const handleSetLife = (points: number) => () => {
        if (life + points <= 0) {
            setAlive(false)
            setLife(0)
            return
        }
        setLife(life + points)
    }
    const handleVictoryPoints = (points: number) => () => {
        if (victoryPoints + points < 0) {
            return
        } else if (victoryPoints + points > 20) {
            setVictoryPoints(20)
            setWinner(true)
            return
        }
        setVictoryPoints(victoryPoints + points)
    }

    const isDeadOrWinner = () => {
        return !alive || winner
    }

    let buttonLeaveEnterTokyo: JSX.Element;
    if (onTokyio) {
        buttonLeaveEnterTokyo = <Button size="sm" color="secondary" disabled={isDeadOrWinner()} onPress={() => setOnTokyio(false)}>
            Leave Tokyio
        </Button>
    } else {
        buttonLeaveEnterTokyo = <Button size="sm" color="secondary" disabled={isDeadOrWinner()} onPress={() => setOnTokyio(true)}>
            Enter to Tokyio
        </Button>
    }



    return (
        <Card css={{ mw: "450px" }}>
            <Card.Header>
                <Row justify="space-between">
                    <Text b>Monter: {monsterName}</Text>
                    {onTokyio && <Text b>(On Tokyo)</Text>}
                </Row>

            </Card.Header>
            <Card.Divider />
            <Card.Body>
                <Row>
                    <Text>Life:</Text>
                </Row>
                <Row >
                    <Col>
                        <Button size="sm" color="secondary" disabled={isDeadOrWinner()} onPress={handleSetLife(-1)}>
                            -
                        </Button>
                    </Col>
                    <Col>
                        <Text className={styles.text_center}>{life}</Text>
                    </Col>
                    <Col>
                        <Button size="sm" color="secondary" disabled={onTokyio || isDeadOrWinner()} onPress={handleSetLife(1)} >
                            +
                        </Button>
                    </Col>
                </Row>
                <Spacer y={1} />
                <Row >
                    <Text>Victory Points:</Text>
                </Row>
                <Row>
                    <Col>
                        <Button size="sm" color="secondary" disabled={isDeadOrWinner()} onPress={handleVictoryPoints(-1)}>
                            -
                        </Button>
                    </Col>
                    <Col>
                        <Text className={styles.text_center}>{victoryPoints}</Text>
                    </Col>
                    <Col>
                        <Button size="sm" color="secondary" disabled={isDeadOrWinner()} onPress={handleVictoryPoints(1)}>
                            +
                        </Button>
                    </Col>
                </Row>

            </Card.Body>
            <Card.Divider />
            <Card.Footer>
                <Row justify="flex-end">
                    <>
                        {/* <Button size="sm" light>
                            Share
                        </Button> */}
                        {buttonLeaveEnterTokyo}
                    </>
                </Row>
            </Card.Footer>
        </Card>
    )
}

export default MonsterCard;