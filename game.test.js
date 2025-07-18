import { Player, Ship, Gameboard  } from "./index.js";
import { game } from "./game.js";

const p1ships = [
        {
            name: "carrier",
            length:5,
            orientation: 'horizontal',
            startCoordinates:[0,0]
        },
        {
            name: "battleship",
            length:4,
            orientation: 'vertical',
            startCoordinates:[5,0]
        },
        {
            name: "cruiser",
            length:3,
            orientation: 'horizontal',
            startCoordinates:[2,4]
        },
        {
            name: 'submarine',
            length:3,
            orientation: 'vertical',
            startCoordinates:[9,6]
        },
        {
            name: 'destroyer',
            length:2,
            orientation: 'horizontal',
            startCoordinates:[0,9]
        },
    ]
const p2ships = [
        {
            name: "carrier",
            length:5,
            orientation: 'horizontal',
            startCoordinates:[4,9]
        },
        {
            name: "battleship",
            length:4,
            orientation: 'vertical',
            startCoordinates:[1,5]
        },
        {
            name: "cruiser",
            length:3,
            orientation: 'horizontal',
            startCoordinates:[3,7]
        },
        {
            name: 'submarine',
            length:3,
            orientation: 'vertical',
            startCoordinates:[9,0]
        },
        {
            name: 'destroyer',
            length:2,
            orientation: 'horizontal',
            startCoordinates:[3,0]
        },
    ]
const p1 = new Player("player1name");
const p2 = new Player("player2name");

p1ships.forEach(ship =>{
    p1.board.addShip(ship.length,ship.name,ship.orientation,ship.startCoordinates)
})
p2ships.forEach(ship=>{
    p2.board.addShip(ship.length,ship.name,ship.orientation,ship.startCoordinates)
})

describe('checkShips', ()=>{
    test('p1Ships',()=>{
        expect(p1.board.getShips().length).toBe(5)
    })
    test('p2Ships',()=>{
        expect(p1.board.getShips().length).toBe(5)
    })
})
describe('check Attacks', ()=>{
    test('attack p1 ship', ()=>{
        expect(p1.board.receiveAttack([0,0])).toBe('BOOM!  something was hit on 0,0')
    })
    test('miss p1 ship', ()=>{
        expect(p1.board.receiveAttack([3,8])).toBe('. . . nothing happened at 3,8')
    })
})
