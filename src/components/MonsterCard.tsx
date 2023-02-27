import styles from '@/styles/MonsterCard.module.css'
import { Spacer, Col, Card, Text, Button, Row } from "@nextui-org/react";
import { useState } from "react";

type propsMonsterCard = {
    index: number,
    name: string,
    isOnTokyo: boolean,
    life: number,
    victoryPoints: number,
    handleOnTokyio: (index: number, status: boolean) => void,
    handleSetLife: (index: number, life: number) => void,
    handleAtack: (index: number, isOnTokyo: boolean)=> void,
    handleSetVictoryPoints: (index: number, victoryPoints: number) => void,
}

const MonsterCard = (props: propsMonsterCard) => {
    const { index,
        name,
        isOnTokyo,
        life,
        victoryPoints,
        handleOnTokyio,
        handleSetLife,
        handleAtack,
        handleSetVictoryPoints
    } = props
    const [alive, setAlive] = useState(true)
    const [winner, setWinner] = useState(false)

    const setLife = (newLife: number) => () => {
        if (newLife <= 0) {
            setAlive(false)
            handleSetLife(index, 0)
            return
        }
        handleSetLife(index, newLife)
    }
    const setVictoryPoints = (newVictoryPoints: number) => () => {
        if (newVictoryPoints < 0) {
            return
        } else if (newVictoryPoints > 20) {
            handleSetVictoryPoints(index, 20)
            setWinner(true)
            return
        }
        handleSetVictoryPoints(index, newVictoryPoints)
    }

    const isDeadOrWinner = () => {
        return !alive || winner
    }

    let buttonLeaveEnterTokyo: JSX.Element;
    if (isOnTokyo) {
        buttonLeaveEnterTokyo = <Button size="sm" color="secondary" disabled={isDeadOrWinner()} onPress={() => handleOnTokyio(index, false)}>
            Leave Tokyio
        </Button>
    } else {
        buttonLeaveEnterTokyo = <Button size="sm" color="secondary" disabled={isDeadOrWinner()} onPress={() => handleOnTokyio(index, true)}>
            Enter to Tokyio
        </Button>
    }



    return (
        <>
            <Col>
                <Card css={{ mw: "450px" }}>
                    <Card.Header>
                        <Row justify="space-between">
                            <Text b>Monter: {name}</Text>
                            {isOnTokyo && <Text b>(On Tokyo)</Text>}
                        </Row>

                    </Card.Header>
                    <Card.Divider />
                    <Card.Body>
                        <Row>
                            <Text>Life:</Text>
                        </Row>
                        <Row >
                            <Col>
                                <Button size="sm" color="secondary" disabled={isDeadOrWinner()} onPress={setLife(life - 1)}>
                                    -
                                </Button>
                            </Col>
                            <Col>
                                <Text className={styles.text_center}>{life}</Text>
                            </Col>
                            <Col>
                                <Button size="sm" color="secondary" disabled={isOnTokyo || isDeadOrWinner()} onPress={setLife(life + 1)} >
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
                                <Button size="sm" color="secondary" disabled={isDeadOrWinner()} onPress={setVictoryPoints(victoryPoints - 1)}>
                                    -
                                </Button>
                            </Col>
                            <Col>
                                <Text className={styles.text_center}>{victoryPoints}</Text>
                            </Col>
                            <Col>
                                <Button size="sm" color="secondary" disabled={isDeadOrWinner()} onPress={setVictoryPoints(victoryPoints + 1)}>
                                    +
                                </Button>
                            </Col>
                        </Row>

                    </Card.Body>
                    <Card.Divider />
                    <Card.Footer>
                        <Row justify="space-between">
                            <>
                                <Button size="sm" color='warning' onPress={()=>handleAtack(index, isOnTokyo)}>
                            Atack
                        </Button>
                                {buttonLeaveEnterTokyo}
                            </>
                        </Row>
                    </Card.Footer>
                </Card>
            </Col>
            <Spacer y={2} />
        </>
    )
}

export default MonsterCard;