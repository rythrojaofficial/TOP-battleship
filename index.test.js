import {Ship, Gameboard} from "./index.js";

// test ship class on its own 
// describe('ship', ()=>{
//     let testShip = new Ship(4)
//     testShip.hit()
//     testShip.hit()
//     test('ship length', ()=>{
//         expect(testShip.getLength()).toBe(4)
//     })
//     test('ship hit counter', ()=>{
//         expect(testShip.getHitCounter()).toBe(2)
//     })
//     test('ship sunk?', ()=>{
//         expect(testShip.getIsSunk()).toBe(false)
//     })
// })

//test initialize game board
// describe('Gameboard', ()=>{
//     let testGameboard = new Gameboard;
//     expect(testGameboard.board.length).toBe(10);
//     expect(testGameboard.board[0].length).toBe(10);
// })
describe('calculate ship coordinates logic', ()=>{
    let testGameBoard = new Gameboard;

    test('calculating ship coordinates', ()=>{
    expect(testGameBoard.calculateShipCoordinates(3, [0,0], 'horizontal')).toEqual([[0,0],[1,0],[2,0]])
    expect(testGameBoard.calculateShipCoordinates(2, [7,5], 'horizontal')).toEqual([[7,5],[8,5]])
    expect(testGameBoard.calculateShipCoordinates(3, [0,0], 'vertical')).toEqual([[0,0],[0,1],[0,2]])

    })
    test('checkValidStartCoordinates', ()=>{
        expect(testGameBoard.checkValidCoordinates(3, [0,0], 'horizontal')).toBe(true)
        expect(testGameBoard.checkValidCoordinates(3, [8,0], 'horizontal')).toBe(false)
        expect(testGameBoard.checkValidCoordinates(3, [7,0], 'horizontal')).toBe(false)
        expect(testGameBoard.checkValidCoordinates(3, [10,0], 'vertical')).toBe(false)
        expect(testGameBoard.checkValidCoordinates(3, [0,7], 'vertical')).toBe(false)
        expect(testGameBoard.checkValidCoordinates(5, [4,0], 'vertical')).toBe(true)
    })
    test('compareCoordinates, is it clear?', ()=>{
        let board = Array.from({ length: 10 }, () => Array(10).fill(null)) // initialize game board with 10x10, null
        board[0][0] = 'ship'
        board[1][0] = 'ship'
        board[2][0] = 'ship'
        expect(testGameBoard.isClear([[0,0],[0,1]], board)).toBe(false)
        expect(testGameBoard.isClear([[0,2],[1,2]], board)).toBe(true)
        expect(testGameBoard.isClear([[5,7], [6,7], [7,7]], board)).toBe(true)
    })
    test('addShip', ()=>{
        expect(testGameBoard.addShip(4, 'theVoid', 'horizontal', [0,0])).toBe('theVoid has been placed. . .')
    })

    })
describe('adding ships', ()=>{
    let testGameBoard = new Gameboard;
    testGameBoard.addShip(4, 'theVoid', 'horizontal', [0,0])
    test('has the ship really been added? check board coordinates',()=>{
        expect(testGameBoard.board[0][0]).toEqual('theVoid')
        expect(testGameBoard.board[1][0]).toEqual('theVoid')
        expect(testGameBoard.board[2][0]).toEqual('theVoid')
        expect(testGameBoard.board[3][0]).toEqual('theVoid')
        expect(testGameBoard.board[4][0]).toEqual(null)
    })
    test('has the ship been added to the board"s array?',()=>{
        expect(testGameBoard.playerShips.length).toBe(1);
        expect(testGameBoard.playerShips[0].getLength()).toBe(4)
    
    })
    
})
describe('ship under attack', ()=>{
    let testGameBoard = new Gameboard;
    testGameBoard.addShip(4, 'theVoid', 'horizontal', [0,0])
    test('findShip under attack', ()=>{
        expect(testGameBoard.receiveAttack([1,0])).toBe('BOOM!  something was hit on 1,0')
        expect(testGameBoard.receiveAttack([2,0])).toBe('BOOM!  something was hit on 2,0')
        expect(testGameBoard.receiveAttack([0,3])).toBe('. . . nothing happened at 0,3')
        expect(testGameBoard.findShip('theVoid').getHitCounter()).toBe(2)
        expect(testGameBoard.receiveAttack([3,0])).toBe('BOOM!  something was hit on 3,0')
        expect(testGameBoard.receiveAttack([0,0])).toBe('BOOM!  something was hit on 0,0')
        expect(testGameBoard.receiveAttack([0,0])).toBe("error: already attacked. attack no launched")
        expect(testGameBoard.findShip('theVoid').getHitCounter()).toBe(4)
        expect(testGameBoard.findShip('theVoid').sunk).toBe(true)
        expect(testGameBoard.isGameOver()).toBe(true)

    })

})

describe('check if coordinates have already been hit', ()=>{
    let testGameBoard = new Gameboard;
    testGameBoard.addShip(4, 'theVoid', 'horizontal', [0,0])
    testGameBoard.receiveAttack([1,0])
    test('test coordinates after hit', ()=>{
        expect(testGameBoard.getBoardAttcks()).toEqual([[1,0]])
        expect(testGameBoard.areCoordinatesPresent([1,0],testGameBoard.getBoardAttcks())).toBe(true)
        expect(testGameBoard.areCoordinatesPresent([0,2],testGameBoard.getBoardAttcks())).toBe(false)
    })
})

