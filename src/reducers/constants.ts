export enum Borough {
    MANHATTAN = 'manhattan',
    BRONX = 'bronx',
    BROOKLYN = 'brooklyn',
    QUEENS = 'queens',
    STATEN_ISLAND = 'statenIsland',
}

export const BOROUGHS_BY_NAME: { [key in Borough]: number } = {
    [Borough.MANHATTAN]: 1,
    [Borough.BRONX]: 2,
    [Borough.BROOKLYN]: 3,
    [Borough.QUEENS]: 4,
    [Borough.STATEN_ISLAND]: 5,
};

export const BOROUGHS_BY_ID: { [key: number]: Borough } = {
    1: Borough.MANHATTAN,
    2: Borough.BRONX,
    3: Borough.BROOKLYN,
    4: Borough.QUEENS,
    5: Borough.STATEN_ISLAND,
};
