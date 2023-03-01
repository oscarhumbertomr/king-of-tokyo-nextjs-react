import { Modal, Dropdown, Checkbox, Text, Button, Row } from "@nextui-org/react";
import { useEffect, useState, useMemo } from "react";

type propsSelectMonster = {
    handleSetPlayers: (newPlayers: PlayersType[])=> void
}

type PlayersType = {
    name: string,
    isOnTokyo: boolean,
    life: number,
    victoryPoints: number,
    index: number
}

const allMonsters = ['Alienoid', 'Baby Gigazaur', 'Boogie Woogie', 'Cyber Bunny', 'Cyber Kitty', 'Gigazaur', 'The King', 'Meca Dragon', 'Pandakaï', 'Pumpkin Jack', 'Space Penguin']


const MonsterCard = (props: propsSelectMonster) => {
    const { 
        handleSetPlayers
    } = props
    
    
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    
    const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

    const closeHandler = () => {
        setVisible(false);
    };

    const addNewPlayer = () => {
  
        const newPlayers = Array.from(selectedPlayers).map((player, index)=>{ return {
            name: player,
            isOnTokyo: false,
            life: 10,
            victoryPoints: 0,
            index
        } })
        handleSetPlayers(newPlayers)
        // handleSetPlayers(players.concat(newPlayers))
        closeHandler()
    }

    const selectedValue = useMemo(
        () => { 
            const players = Array.from(selectedPlayers).join(", ")
            if (players)
                return `${players.slice(0,40)} .... `
            return 'click to select monsters'
        },
        [selectedPlayers]
    );


    const disableMonstersToSelect = useMemo( () => {
        const monsters = Array.from(selectedPlayers)
        if(monsters.length>=6){
            return allMonsters.filter(monster=> !monsters.includes(monster))
        }
        return []
        },
        [selectedPlayers]
    );

    const disabledAddButton = useMemo(()=> Array.from(selectedPlayers).length<2 ,[selectedPlayers])

    return (
        <>
            <Button onPress={handler}>Add Players</Button>
            <Modal
                    closeButton
                    blur
                    aria-labelledby="modal-title"
                    open={visible}
                    onClose={closeHandler}
                >
                    <Modal.Header>
                        <Text id="modal-title" size={18}>
                            Select Monsters {disableMonstersToSelect}
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <Dropdown>
                            <Dropdown.Button flat color="secondary" css={{ tt: "capitalize", overflow: 'hidden' }}>
                                {selectedValue}
                            </Dropdown.Button>
                            <Dropdown.Menu
                                aria-label="Multiple selection actions"
                                color="secondary"
                                disallowEmptySelection
                                selectionMode="multiple"
                                selectedKeys={selectedPlayers}
                                disabledKeys={disableMonstersToSelect}
                                onSelectionChange={setSelectedPlayers}
                            >
                                {allMonsters.map(monster=>
                                    <Dropdown.Item key={monster}>{monster}</Dropdown.Item>
                                )}
                                
                            </Dropdown.Menu>
                        </Dropdown>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button auto flat color="error" onPress={closeHandler}>
                            Cancel
                        </Button>
                        <Button auto onPress={addNewPlayer} disabled={disabledAddButton}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
        </>
    )
}

export default MonsterCard;