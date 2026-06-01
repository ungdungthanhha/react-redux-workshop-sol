// TODO: Import action type constants
import { CLEAR_FILTERS, SET_FILTER } from "./actionTypes";

// TODO: Export a setFilter action creator that accepts a category: string
export const setFilter = (category: string) => {
    return {
        type: SET_FILTER,
        payload: category
    } as const
}
// TODO: Export a clearFilters action creator (no payload)
export const clearFilters = () => {
    return {
        type: CLEAR_FILTERS
    } as const
}
// Use `as const` on the return to get literal types, matching the expenses/actions.ts pattern.

export type FilterAction = 
    | ReturnType<typeof setFilter>
    | ReturnType<typeof clearFilters>
