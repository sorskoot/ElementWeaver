import {ReadonlySignal, signal} from '@preact/signals-core';

export interface IScoreService {
    score: ReadonlySignal<number>;
    multiplier: ReadonlySignal<number>;

    addScore(matchedTiles: number, spirit: boolean): void;
}

export class ScoreService implements IScoreService {
    score = signal(0);
    multiplier = signal(1);

    constructor() {}

    clearScore(): void {
        this.score.value = 0;
        this.resetMultiplier();
    }

    addScore(matchedTiles: number, spirit: boolean): void {
        if (matchedTiles == 0) {
            if (!spirit) {
                this.resetMultiplier();
            }
            return;
        }

        let baseScore = matchedTiles * 10;
        this.score.value += baseScore * this.multiplier.value;
        if (this.multiplier.value < 10) {
            this.multiplier.value += 1;
        }
        console.log(`Adding score for ${matchedTiles}(${baseScore}) matched tiles. Spirit: ${spirit}`);
    }

    private resetMultiplier(): void {
        this.multiplier.value = 1;
    }
}
