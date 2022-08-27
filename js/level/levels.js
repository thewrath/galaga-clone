import { EnemyFactory } from "../factory/EnemyFactory"

const levels = [];

// Level 0
levels.push(() => {
    const offset = {x: 200, y: 200};
    const leaders = [
        EnemyFactory.createLeader(550, 550, 1, 0, offset),
    ];

    const enemies = leaders.map((l, i) => {
        return EnemyFactory.createEnemyRow(l, 10, i, offset);
    }).flat();

    console.log(enemies);

    return {
        "title": "Super level",
        "leaders": leaders,
        "enemies": enemies, 
    }
});


export const spawnLevel = (level) => {
    // Todo : check out of bounds
    return levels[level](); 
}