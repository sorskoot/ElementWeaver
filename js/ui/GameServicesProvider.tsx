import React, {createContext, useContext} from 'react';
import {IGameFlowService} from '../services/GameFlowService.ts';
import {IGamePlayService} from '../services/GamePlayService.ts';

export interface GameServices {
    gameFlowService: IGameFlowService;
    gamePlayService: IGamePlayService;
}

const GameServicesContext = createContext<GameServices | null>(null);

export interface GameServicesProviderProps {
    services: GameServices;
    children: React.ReactNode;
}

export function GameServicesProvider(props: GameServicesProviderProps) {
    return <GameServicesContext.Provider value={props.services}>{props.children}</GameServicesContext.Provider>;
}

export function useGameServices(): GameServices {
    const services = useContext(GameServicesContext);

    if (!services) {
        throw new Error('useGameServices must be used inside GameServicesProvider');
    }

    return services;
}

// Convenience exports for the services
export function useGameFlowService() {
    return useGameServices().gameFlowService;
}

export function useGamePlayService() {
    return useGameServices().gamePlayService;
}
