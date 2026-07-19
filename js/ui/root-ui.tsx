import {Align, Justify, ReactUiBase} from '@wonderlandengine/react-ui';
import {Container, MaterialContext} from '@wonderlandengine/react-ui/components';
import {Hud} from './components/hud/hud.tsx';
import {MenuThemeContext, MenuThemeContextValue} from './utils/menu-theme-context.js';
import {colorSwatch} from './utils/colorSwatch.ts';
import {useSignalValue} from './hooks/useSignalValue.ts';
import {GameServicesProvider, useGameFlowService} from './GameServicesProvider.tsx';
import {gameFlowService, gamePlayService, scoreService} from '../bootstrap-services.ts';
import {MainMenu} from './components/main-menu/mainMenu.tsx';
import {GameState} from '../services/GameFlowService.ts';

const App = (props: {comp: RootUI}) => {
    const gameFlowService = useGameFlowService();

    const gameState = useSignalValue(gameFlowService.gameState);

    const DefaultTheme: MenuThemeContextValue = {
        panel: {
            rounding: 0,
            borderSize: 0,
            padding: 16,
            backgroundColor: colorSwatch.PanelBackground,
        },
        button: {
            rounding: 0,
            width: 120,
            height: 40,
        },
        mainMenuButtonText: {
            fontSize: 10,
        },
    };

    const comp = props.comp;

    return (
        <MaterialContext.Provider value={comp}>
            <MenuThemeContext.Provider value={DefaultTheme}>
                <Container width={1000} height={200} justifyContent={Justify.Center} alignItems={Align.Center}>
                    {gameState === GameState.Menu && <MainMenu />}
                    {gameState === GameState.Playing && <Hud />}
                    {/* {gameState === GameState.Playing && <Ingame />} */}
                </Container>
            </MenuThemeContext.Provider>
        </MaterialContext.Provider>
    );
};

export class RootUI extends ReactUiBase {
    static TypeName = 'root-ui';
    static InheritProperties = true;

    override update(dt: number) {
        super.update();
    }

    render() {
        return (
            <GameServicesProvider
                services={{
                    gameFlowService,
                    gamePlayService,
                    scoreService,
                }}
            >
                <App comp={this} />
            </GameServicesProvider>
        );
    }
}
