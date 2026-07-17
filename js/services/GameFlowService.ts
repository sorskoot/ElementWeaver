import {ReadonlySignal, signal} from '@preact/signals-core';
import {IGamePlayService} from './GamePlayService.ts';

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
    constructor(private gamePlayService: IGamePlayService) {}

    startGame(): void {
        this.gamePlayService.newGame();
        this.gameState.value = GameState.Playing;
    }
}
