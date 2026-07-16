import {ReadonlySignal, signal} from '@preact/signals-core';

export enum GameState {
    TitleScreen = 'title-screen',
    Menu = 'menu',
    Playing = 'playing',
    Paused = 'paused',
    GameOver = 'game-over',
}

export interface IGameFlowService {
    gameState: ReadonlySignal<GameState>;
    startGame(): void;
}

export class GameFlowService implements IGameFlowService {
    gameState = signal<GameState>(GameState.Menu);
    constructor() {}

    startGame(): void {
        this.gameState.value = GameState.Playing;
    }
}
