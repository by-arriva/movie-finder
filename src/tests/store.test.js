import { store, reducer, sendRequest } from "../store"

describe("Async action", () => {
    const mockResponse = {
        Search: [1, 2, 3],
        totalResults: "1",
        Response: "True",
    }
    
    beforeEach(() => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse)
        })
    });
      
    afterEach(() => {
        jest.restoreAllMocks();
    });
    
    it("should update list in state", () => {
        return store.dispatch(sendRequest("s", "test")).then(() => {
            expect(store.getState().list).toEqual(mockResponse)
        })
    })
})

describe("Reducer", () => {  
    const state = {
        loading: true,
        search: "test",
        page: 1,
        list: null,
        film: null
    }
    const expectedAction = {
        type: "SEARCH_OK",
        list: [1, 2, 3],
        page: 1,
    }
    
    it("receives SEARCH_OK", () => {
        expect(reducer(state, expectedAction)).toEqual({
            ...state,
            list: [1, 2, 3],
            loading: false,
        })
    })
})