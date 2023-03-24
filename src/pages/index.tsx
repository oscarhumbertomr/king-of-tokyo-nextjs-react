import {
  Container,
} from '@nextui-org/react';
import { NextPage } from 'next';
import { useState, useMemo } from 'react';
import MonsterCard from '@/components/MonsterCard';
import SelectMonster from '@/components/SelectMonster';

type PlayerType = {
  name: string,
  isOnTokyo: boolean,
  life: number,
  victoryPoints: number,
  index: number
};

const Home: NextPage = () => {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [lastAtackMonsterIndex, setLastAtackMonsterIndex] = useState(-1);

  const monsterAlive = useMemo(
    () => players.filter((player) => player.life > 0).length,
    [players],
  );

  const monstersOnTokyo = useMemo(
    () => players.filter((player) => player.isOnTokyo),
    [players],
  );

  //   const monstersNotOnTokyo = useMemo(
  //     () => players.filter((player) => !player.isOnTokyo),
  //     [players],
  //   );

  const leaveTokyo = (indexPlayer: number, status: boolean) => {
    if (!status && lastAtackMonsterIndex >= 0) {
      let newPlayers: PlayerType[] = [];
      if (monsterAlive > 4) {
        newPlayers = players.map((player, index) => (indexPlayer === index
          ? {
            ...player,
            isOnTokyo: false,
          }
          : { ...player }));
        newPlayers[lastAtackMonsterIndex].isOnTokyo = true;
      } else {
        newPlayers = players.map((player, index) => {
          if (indexPlayer === index) {
            return {
              ...player,
              isOnTokyo: false,
            };
          } if (lastAtackMonsterIndex === index && monstersOnTokyo.length === 1) {
            return {
              ...player,
              isOnTokyo: true,
            };
          }
          return player;
        });
      }

      setPlayers(newPlayers);
      setLastAtackMonsterIndex(-1);
    }
  };

  const enterToTokio = (indexPlayer: number, status: boolean) => {
    if (status) {
      let newPlayers: PlayerType[] = [];
      if (monsterAlive > 4 && monstersOnTokyo.length < 2) {
        newPlayers = players.map((player, index) => (indexPlayer === index
          ? {
            ...player,
            isOnTokyo: true,
          }
          : { ...player }));
      } else {
        newPlayers = players.map((player) => ({ ...player, isOnTokyo: false }));
        newPlayers[indexPlayer].isOnTokyo = status;
      }

      setPlayers(newPlayers);
    }
  };

  const handleOnTokyo = (indexPlayer: number, status: boolean) => {
    leaveTokyo(indexPlayer, status);
    enterToTokio(indexPlayer, status);
  };

  const handleSetLife = (index: number, newLife: number) => {
    const newPlayers = players.map((player, inx) => (inx === index
      ? {
        ...player,
        life: newLife,
      }
      : { ...player }));

    setPlayers(newPlayers);
  };

  const handleAtack = (index: number, isOnTokyo: boolean) => {
    const newplayers = players.map((player) => {
      const newLife = player.life - 1;
      return player.isOnTokyo !== isOnTokyo
        ? {
          ...player,
          life: newLife < 0 ? 0 : newLife,
        }
        : { ...player };
    });
    setPlayers(newplayers);
    setLastAtackMonsterIndex(index);
  };

  const handleSetVictoryPoints = (index: number, newVictoryPoints: number) => {
    const newPlayers = players.map((player, inx) => (inx === index
      ? {
        ...player,
        victoryPoints: newVictoryPoints,
      }
      : { ...player }));

    setPlayers(newPlayers);
  };

  const disableEnterOnTokyo = useMemo(
    () => (monsterAlive > 4 ? monstersOnTokyo.length > 1 : monstersOnTokyo.length > 0),
    [monsterAlive, monstersOnTokyo],
  );

  const handleSetPlayers = (newPlayers: PlayerType[]) => {
    setPlayers(newPlayers);
  };

  return (
        <Container alignItems='center' >
            <>
                <h1 className="text-3xl font-bold">
                    King of Tokyo Dashboard
                </h1>
                <SelectMonster handleSetPlayers={handleSetPlayers} />
                <div className='flex-container'>
                    {players && players.map((player, index) => <MonsterCard
                        key={index}
                        name={player.name}
                        life={player.life}
                        victoryPoints={player.victoryPoints}
                        index={index}
                        isOnTokyo={player.isOnTokyo}
                        handleOnTokyo={handleOnTokyo}
                        disableEnterOnTokyo={disableEnterOnTokyo}
                        disableAtack={
                            monsterAlive > 4
                              ? monstersOnTokyo.length < 2 : monstersOnTokyo.length === 0
                        }
                        disableLeaveTokyo={lastAtackMonsterIndex < 0}
                        handleSetVictoryPoints={handleSetVictoryPoints}
                        handleAtack={handleAtack}
                        handleSetLife={handleSetLife} />)}
                </div>

            </>
        </Container>
  );
};

export default Home;
