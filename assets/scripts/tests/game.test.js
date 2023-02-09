const {
    game,
    newGame,
    showScore,
    addTurn,
    lightsOn
} = require('../game');

beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync('index.html', 'utf-8');
    document.open();
    document.write(fileContents);
    document.close();
});

describe('game object contains correct keys', () => {
    test('score key exists', () => {
        expect('score' in game).toBe(true);
    });
    test('currentGame key exists', () => {
        expect('currentGame' in game).toBe(true);
    });
    test('playerMoves key exists', () => {
        expect('playerMoves' in game).toBe(true);
    });
    test('choices key exists', () => {
        expect('choices' in game).toBe(true);
    });
    test('choices contain correct IDs', () => {
        expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4']);
    });
});

describe('new game works correctly', () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ['button1', 'button2'];
        game.currentGame = ['button1', 'button2'];
        document.getElementById('score').innerText = '42';
        newGame();
    });
    test('should set game score to zero', () => {
        expect(game.score).toEqual(0);
    });
    //  WRONG I just had to import newGame in js and js.test files  !!!
    // ------------------------------------------------------------------------
    // test('should empty the computer sequence', () => {
    //     expect(game.currentGame).toEqual(0);
    // });
    // test("should empty the player's moves array", () => {
    //     expect(game.playerMoves).toEqual(0);
    // });

    // REPLACING THIS ONE !!! when AddTurn function 
    // test('should clear the computer sequence array', () => {
    //     expect(game.currentGame.length).toBe(0); // toEqual  works as well
    // });
    test("should be one element/ move in the computer's game array", () => {
        expect(game.currentGame.length).toBe(1);
    });

    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toBe(0); // toEqual  works as well
    });
    test("should display zero for the element with id of score", () => {
        expect(document.getElementById('score').innerText).toEqual(0); // toEqual  works as well
    });
});


describe('gameplay works correctly', () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test('addTurn adds a new turn to the game', () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain('light');
    });
});