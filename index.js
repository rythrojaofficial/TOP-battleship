// Begin your app by creating the Ship class/factory (your choice).
export class Ship{
    constructor(length, name){
        this.name = name;
        this.length = length;
        this.hitCounter = 0;
        this.sunk = false;
        this.orientation = null;
        this.coordinates = [];
    }
    // getters
    getName(){
        return this.name;
    }
    getLength(){
        return this.length;
    }
    getHitCounter(){
        return this.hitCounter;
    }
    getIsSunk(){
        return this.sunk;
    }
    getOrientation(){
        return this.orientation;
    }
    // setters
    setCoordinates(coordinatesArray){
        this.coordinates = coordinatesArray;
    }
    setOrientation(newOrientation){
        this.orientation = newOrientation
        // switch (this.orientation){
        //     case 'vertical':
        //         this.orientation = 'horizontal';
        //         break;
        //     case 'horizontal':
        //         this.orientation = 'vertical';
        //         break;
        //     default:
        //         throw new Error('set orientation error: neither horizontal nor vertical')
        // }
    }
    // Methods
    hit(){
        this.hitCounter++;
    }
    isSunk(){
        if(this.hitCounter === this.length){
            this.sunk = true;
        }
    }
}
// Your ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.
// REMEMBER you only have to test your object’s public interface. Only methods or properties that are used outside of your ‘ship’ object need unit tests.
// Ships should have a hit() function that increases the number of ‘hits’ in your ship.
// isSunk() should be a function that calculates whether a ship is considered sunk based on its length and the number of hits it has received.


// Create a Gameboard class/factory.

//     Note that we have not yet created any User Interface. We should know our code is coming together by running the tests. You shouldn’t be relying on console.log or DOM methods to make sure your code is doing what you expect it to.
//     Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.
//     Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
//     Gameboards should keep track of missed attacks so they can display them properly.
//     Gameboards should be able to report whether or not all of their ships have been sunk.
export class Gameboard{
    constructor(){
        this.dimensions = 10;
        this.board = Array.from({ length: this.dimensions }, () => Array(this.dimensions).fill(null)) // initialize game board with 10x10, null
        this.playerShips = [];
    }
    addShip(length, name, orientation, startCoordinates){
        let newShip = new Ship(length, name, orientation);
        newShip.setOrientation(orientation);
        if(this.checkValidCoordinates(length, startCoordinates, orientation) === false){
            failMessage = 'error: out-of bounds startCoordinates, ship not placed'
            return failMessage;
        }else{
            let coordinatesArray = this.calculateShipCoordinates(length, startCoordinates, orientation);  
            newShip.setCoordinates(coordinatesArray);
            if(this.isClear(coordinatesArray, this.board) === false){
                failMessage = 'Error: unable to add ship at those coordinates.  Is something already there?'
                return failMessage
            }else{
                coordinatesArray.forEach(coordinates =>{
                    let x = coordinates[0],
                    y = coordinates[1]
                    this.board[x][y] = newShip.getName()
                });
                
                this.playerShips.push(newShip);
                const successMessage = `${newShip.getName()} has been placed. . .`
                return successMessage
            }
            

        };
        // this.playerShips.push(newShip)

    }
    isClear(coordinatesArray, boardArray){
        let isClear = true;
        coordinatesArray.forEach(coordinates =>{
            let x = coordinates[0],
            y = coordinates[1];
            if (boardArray[x][y] !== null){
                isClear = false;
            }
        })
        return isClear
    }
    calculateShipCoordinates(length,startCoordinates,orientation){
        let newCoordsArray = [];
        switch(orientation){
            case 'horizontal':
                for (let i = 0; i < length; i++){
                    let newCoord = [startCoordinates[0]+i,startCoordinates[1]];
                    // increment the start coordinate X by the counter for each unit of length
                    newCoordsArray.push(newCoord)
                }
                break;
            case 'vertical':
                for (let i = 0; i < length; i++){
                    let newCoord = [startCoordinates[0],startCoordinates[1]+i];
                    // increment the start coordinate Y by the counter for each unit of length
                    newCoordsArray.push(newCoord)
                }
                break;
            default:
                throw new Error('CalculateShipCoordinates Error: invalid orientation')
        }
        return newCoordsArray

    }
    checkValidCoordinates(length, startCoordinates, orientation){
        let isValid = false;
        let upperBoundaries = [];
        switch (orientation){
            case 'horizontal':
                upperBoundaries = [9-length, 9]; //9 because 0 indexed
                break;
            case 'vertical':
                upperBoundaries = [9, 9-length];
                break;
            default:
                throw new Error('CalculateShipCoordinates Error: invalid orientation')
        }
        if(
            startCoordinates[0] >=0 && startCoordinates[0] <= upperBoundaries[0]
            && startCoordinates[1] >=0 && startCoordinates[1] <= upperBoundaries[1]
        ){ isValid = true }

        return isValid
    }
    
}

