import styles from '@/styles/MonsterCard.module.css'
import { Modal, Input, Container, Checkbox, Row, Button, Text, Dropdown } from "@nextui-org/react";
import { NextPage } from "next"
import { useEffect, useState, useMemo } from "react";
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
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    const handleOnTokyo = (index: number, status: boolean) => {
        const newPlayers = players.map(player => {
            return { ...player, isOnTokyo: false }
        })

        newPlayers[index].isOnTokyo = status
        setPlayers(newPlayers)
    }

    const addNewPlayer = () => {
  
        const newPlayers = Array.from(selected).map(player=>{ return {
            name: player,
            isOnTokyo: false,
            life: 10,
            victoryPoints: 0
        } })
        setPlayers(players.concat(newPlayers))
        closeHandler()
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
        const newplayers = players.map((player) => {
            const newLife = player.life - 1
            return player.isOnTokyo !== isOnTokyo
                ? {
                    ...player,
                    life: newLife < 0 ? 0 : newLife,
                }
                : { ...player }
        }
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

    const [selected, setSelected] = useState([allMonsters[0]]);

    const selectedValue = useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );

    return (
        <Container alignItems='center' >
            <>
                <Button onPress={handler}>Add</Button>

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

                <Modal
                    closeButton
                    blur
                    aria-labelledby="modal-title"
                    open={visible}
                    onClose={closeHandler}
                >
                    <Modal.Header>
                        <Text id="modal-title" size={18}>
                            {selected}
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <Dropdown>
                            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
                                {selectedValue}
                            </Dropdown.Button>
                            <Dropdown.Menu
                                aria-label="Multiple selection actions"
                                color="secondary"
                                disallowEmptySelection
                                selectionMode="multiple"
                                selectedKeys={selected}
                                onSelectionChange={setSelected}
                            >
                                {allMonsters.map(monster=>
                                    <Dropdown.Item key={monster}>{monster}</Dropdown.Item>
                                )}
                                
                            </Dropdown.Menu>
                        </Dropdown>
                        <Row justify="space-between">
                            <Checkbox>
                                <Text size={14}>Remember me</Text>
                            </Checkbox>
                            <Text size={14}>Forgot password?</Text>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button auto flat color="error" onPress={closeHandler}>
                            Cancel
                        </Button>
                        <Button auto onPress={addNewPlayer}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </Container>
    )
}

export default Home;