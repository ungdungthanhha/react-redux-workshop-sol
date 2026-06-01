// TODO: Import action type constants
import { SET_FILTER, CLEAR_FILTERS } from "./actionTypes";
import type { FilterAction } from "./actions";

// TODO: Define a FiltersState interface/type with a `category` field (string | null)
export interface FiltersState {
    category: string | null
}

// TODO: Export a filtersReducer function (using `export function` or `export const`)
//       - Default state: { category: null }
//       - Handle SET_FILTER: return { category: action.payload }
//       - Handle CLEAR_FILTERS: return { category: null }
//       - Default: return state

export const filtersReducer = (
    state: FiltersState = { category: null }, 
    action: FilterAction
) : FiltersState => {
    switch(action.type) {
        case SET_FILTER:
            return { category: action.payload }
        
        case CLEAR_FILTERS:
            return { category: null }

        default:
            return state;
    }
}
