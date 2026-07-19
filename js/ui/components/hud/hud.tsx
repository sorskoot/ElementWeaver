import {Column, Panel, Row, Text} from '@wonderlandengine/react-ui/components';
import {Align, Justify} from '@wonderlandengine/react-ui';
import {colorSwatch} from '../../utils/colorSwatch.ts';
import {useHudViewModel} from './useHudViewModel.ts';
import {formatNumber} from '@sorskoot/wonderland-components';

export const Hud = () => {
    const vm = useHudViewModel();

    return (
        <Column gap={10} width={1000} height={200} justifyContent={Justify.Center} alignItems={Align.Center}>
            <Text color={colorSwatch.Text} fontSize={24} text={`Score: ${formatNumber(vm.score)}`} />
            <Text color={colorSwatch.Text} fontSize={24} text={`Multiplier: ${formatNumber(vm.multiplier)}`} />
        </Column>
    );
};
