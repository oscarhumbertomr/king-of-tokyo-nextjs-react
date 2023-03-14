import styles from '@/styles/MonsterCard.module.css';
import {
  Spacer, Col, Card, Text, Button, Row,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';

type PropsMonsterCard = {
  index: number,
  name: string,
  isOnTokyo: boolean,
  disableEnterOnTokyo: boolean,
  disableLeaveTokyo: boolean,
  disableAtack: boolean,
  life: number,
  victoryPoints: number,
  handleOnTokyo: (index: number, status: boolean) => void,
  handleSetLife: (index: number, life: number) => void,
  handleAtack: (index: number, isOnTokyo: boolean)=> void,
  handleSetVictoryPoints: (index: number, victoryPoints: number) => void,
};

const MonsterCard = (props: PropsMonsterCard) => {
  const {
    index,
    name,
    isOnTokyo,
    life,
    victoryPoints,
    handleOnTokyo,
    handleSetLife,
    handleAtack,
    handleSetVictoryPoints,
    disableEnterOnTokyo,
    disableAtack,
    disableLeaveTokyo,
  } = props;
  const [alive, setAlive] = useState(true);
  const [winner, setWinner] = useState(false);

  const setLife = (newLife: number) => () => {
    if (newLife <= 0) {
      setAlive(false);
      handleSetLife(index, 0);
      return;
    }
    handleSetLife(index, newLife >= 12 ? 12 : newLife);
  };

  useEffect(() => {
    if (life <= 0) {
      setAlive(false);
    }
  }, [life]);

  const setVictoryPoints = (newVictoryPoints: number) => () => {
    if (newVictoryPoints < 0) {
      return;
    } if (newVictoryPoints > 20) {
      handleSetVictoryPoints(index, 20);
      setWinner(true);
      return;
    }
    handleSetVictoryPoints(index, newVictoryPoints);
  };

  const isDeadOrWinner = () => !alive || winner;

  useEffect(() => {
    if (!alive) {
      handleOnTokyo(index, false);
    }
  }, [alive, handleOnTokyo, index]);

  let buttonLeaveEnterTokyo: JSX.Element;
  if (isOnTokyo) {
    buttonLeaveEnterTokyo = <Button size="sm" color="secondary" disabled={isDeadOrWinner() || disableLeaveTokyo } onPress={() => handleOnTokyo(index, false)}>
            Leave Tokyo
        </Button>;
  } else if (!disableEnterOnTokyo) {
    buttonLeaveEnterTokyo = <Button size="sm" color="secondary" disabled={isDeadOrWinner()} onPress={() => handleOnTokyo(index, true)}>
            Enter to Tokyo
        </Button>;
  } else {
    buttonLeaveEnterTokyo = <div></div>;
  }

  return (
        <>
            <div className='my-4'>
                <Card css={{ mw: '420px' }}>
                    <Card.Header>
                        <Row justify="space-between">
                            <Text b>Monster: {name}</Text>
                            {isOnTokyo && <Text b>(On Tokyo)</Text>}
                        </Row>

                    </Card.Header>
                    <Card.Divider />
                    <Card.Body>
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
                        <Spacer y={1} />
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

                    </Card.Body>
                    <Card.Divider />
                    <Card.Footer>
                        <Row justify="space-between">
                            <>
                                <Button size="sm" color='warning' disabled={isDeadOrWinner() || disableAtack} onPress={() => handleAtack(index, isOnTokyo)}>
                            Atack
                        </Button>
                                {buttonLeaveEnterTokyo}
                            </>
                        </Row>
                    </Card.Footer>
                </Card>
            </div>
            <Spacer y={2} />
        </>
  );
};

export default MonsterCard;
