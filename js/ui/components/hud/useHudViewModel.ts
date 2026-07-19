import {useScoreService} from '../../GameServicesProvider.tsx';
import {useSignalValue} from '../../hooks/useSignalValue.ts';

export function useHudViewModel() {
    const scoreService = useScoreService();

    const score = useSignalValue(scoreService.score);
    const multiplier = useSignalValue(scoreService.multiplier);
    return {
        score,
        multiplier,
    };
}
