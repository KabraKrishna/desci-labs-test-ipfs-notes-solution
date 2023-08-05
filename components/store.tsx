import {
    useReducer,
    useContext,
    createContext,
    ReactNode,
    Dispatch,
} from 'react';

type ContentObject = {
    cid: string,
    type: 0 | 1,
    name?: string,
    content?: string,
    date: number
}

type ContentAction = { key: "GET_VALUES" }
    | { key: "GET_BY_TYPE", payload: number }
    | { key: "SET_VALUE", payload: ContentObject | Array<ContentObject> }
    | { key: "SET_VALUES", payload: Array<ContentObject> }

type ContentProviderProps = {
    children: ReactNode
    initialValue?: Array<ContentObject | any>
}

const ContentStateContext = createContext<Array<ContentObject | any>>([]);
const ContentDispatchContext = createContext<Dispatch<ContentAction>>(() => null);


const reducer = (state: Array<ContentObject | any>, action: ContentAction) => {

    switch (action.key) {

        case "GET_VALUES":
            return [...state];

        case "GET_BY_TYPE":

            const valueOfTypeFromStorage = state.filter((e: any) => e.type === action.payload);
            return [...valueOfTypeFromStorage];

        case "SET_VALUE":

            const updatedList = [...state];

            if (!Array.isArray(action.payload) && action.payload.cid) updatedList.push(action.payload);

            return updatedList;

        case "SET_VALUES":
            if (Array.isArray(action.payload)) return [...action.payload];
            else return state;
    }
}

export const ContentProvider = ({ children, initialValue = [] }: ContentProviderProps) => {

    const [state, dispatch] = useReducer(reducer, initialValue);

    return (
        <ContentDispatchContext.Provider value={dispatch}>
            <ContentStateContext.Provider value={state}>
                {children}
            </ContentStateContext.Provider>
        </ContentDispatchContext.Provider>
    )
}

export const useContent = () => useContext(ContentStateContext);
export const useDispatchContent = () => useContext(ContentDispatchContext);
