export enum Borough {
    MANHATTAN = 1,
    BRONX = 2,
    BROOKLYN = 3,
    QUEENS = 4,
    STATEN_ISLAND = 5,
}

export const BOROUGHS_BY_ID: { [key: number]: Borough } = {
    1: Borough.MANHATTAN,
    2: Borough.BRONX,
    3: Borough.BROOKLYN,
    4: Borough.QUEENS,
    5: Borough.STATEN_ISLAND,
};
