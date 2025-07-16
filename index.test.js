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

    test('adding ship', ()=>{
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
    test('compareCoordinates', ()=>{
        let board = Array.from({ length: 10 }, () => Array(10).fill(null)) // initialize game board with 10x10, null
        board[0][0] = 'ship'
        board[1][0] = 'ship'
        board[2][0] = 'ship'
        expect(testGameBoard.isClear([[0,0],[0,1]], 'horizontal')).toBe(false)
        expect(testGameBoard.isClear([[0,2],[1,2]], 'horizontal')).toBe(false)
    })
    })

