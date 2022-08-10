import 'react-redux';
import { createStore } from 'redux';


const cardsPerPage = 5;

const initialState = {
    selectedOtdel: -1,
    selectedAlpha: '',
    searchText: '',
    searchTextProf: '',
    searchTextOtdel: '',
    isAdmin: true,
    listPerson: undefined,
    loadedCards: false,
    isLoading: false,
    isLoadingAll: false,
    currentPage: 1

};

export const store = createStore(rootReducer);

export function mapStateToProps(state) {
    return {
        selectedOtdel: state.selectedOtdel,
        selectedAlpha: state.selectedAlpha,
        searchText: state.searchText,
        searchTextProf: state.searchTextProf,
        searchTextOtdel: state.searchTextOtdel,
        isAdmin: state.isAdmin,
        listPerson: state.listPerson,
        loadedCards: state.loadedCards,
        isLoading: state.isLoading,
        isLoadingAll: state.isLoadingAll,
        currentPage: state.currentPage
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        onSelectOtdel: (idOtdel) => dispatch({ type: 'SELECT_OTDEL', payload: idOtdel }),
        onSelectAlpha: (alpha) => dispatch({ type: 'SELECT_ALPHA', payload: alpha }),
        onSearch: (searchText, loc) => dispatch({ type: 'SEARCH', payload: searchText, loc: loc }),
        setAdmin: () => dispatch({ type: 'IS_ADMIN' }),
        loadPerson: (data) => dispatch({ type: 'LOAD_PERSON', payload: data }),
        NextLoadPerson: () => dispatch({type: 'NEXT_LOAD'}),
        LoadAll: () => dispatch({ type: 'LOAD_ALL' }),
        DeletePerson: (person) => dispatch({ type: 'DELETE_PERSON', payload: person }),
        UpdatePerson: (person) => dispatch({ type: 'UPDATE_PERSON', payload: person })
    }
}


export default function rootReducer(state = initialState, action) {

    if (state.listPerson === undefined) {
        state = {
            selectedOtdel: -1,
            selectedAlpha: '',
            searchText: '',
            searchTextProf: '',
            searchTextOtdel: '',
            isAdmin: state.isAdmin,
            listPerson: [],
            loadedCards: false,
            isLoading: false,
            isLoadingAll: false,
            currentPage: 1
        }

        LoadCardData();
        return state;
    }


    switch (action.type) {

        case 'SELECT_OTDEL':
            state = {
                ...state,
                selectedOtdel: action.payload,
                selectedAlpha: '',
                searchText: '',
                isAdmin: state.isAdmin,
                listPerson: [],
                currentPage: 1,
                isLoading: true,
                isLoadingAll: false,
                loadedCards: false
            }
            LoadCardData();
            break;
        case 'SELECT_ALPHA':
            state = {
                ...state,
                selectedAlpha: action.payload,
                searchText: '',
                isAdmin: state.isAdmin,
                listPerson: [],
                currentPage: 1,
                isLoading: true,
                isLoadingAll: false,
                loadedCards: false
            }
            LoadCardData();
            break;
        case 'SEARCH':
            //console.log("location", action.loc );
            switch (action.loc) {
                case '/':
                    state = {
                        ...state,
                        selectedAlpha: '',
                        selectedOtdel: -1,
                        isAdmin: state.isAdmin,
                        listPerson: [],
                        currentPage: 1,
                        isLoading: true,
                        loadedCards: false,
                        isLoadingAll: false,
                        searchText: action.payload,
                    }
                    LoadCardData();
                    break;

                case '/otdels':
                    state = {
                        ...state,
                        searchTextOtdel: action.payload,
                    }
                    break;
                case '/profession':
                    state = {
                        ...state,
                        searchTextProf: action.payload,
                    }
                    break;
            }

            break;
        case 'IS_ADMIN':
            state = {
                ...state,
                isAdmin: true,
                listPerson: [],
                currentPage: 1,
                isLoading: true,
                isLoadingAll: false,
                loadedCards: false
            }
            LoadCardData();
            break;

        case 'LOAD_PERSON':
            //console.log("LOAD_PERSON", action.payload);
            state = {
                ...state,
                listPerson: action.payload,
                loadedCards: true,
                isLoading: false
            }
            break;

        case 'NEXT_LOAD':
            if (!state.isLoading && !state.isLoadingAll) {
                state = {
                    ...state,
                    currentPage: state.currentPage + 1,
                    loadedCards: true,
                    isLoading: true
                }

                 LoadCardData();
            }
            break;

        case 'LOAD_ALL':
            state = {
                ...state,
                isLoadingAll: true
            }
            break;

        case 'DELETE_PERSON':
            DeletePerson(action.payload);
            break;

        case 'UPDATE_PERSON':
            const newListPerson = state.listPerson.map((item) => {
                if (item.personalId === action.payload.personalId)
                    return action.payload;
                return item;
            });

            //console.log("update", newListPerson);

            state = {
                ...state,
                listPerson: newListPerson
            }
            break;


        default:
            return state;
    }


    return state;

    //-----------------------------------------------------------------------------------

    function DeletePerson(person) {

        var result = window.confirm('Удалить "' + person.personalLastName + ' ' + person.personalName + ' ' + person.personalMidName + '"');

        if (result) {
            var xhr = new XMLHttpRequest();
            xhr.open("delete", "cards/" + person.personalId, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const list = [...state.listPerson];
                    const index = list.findIndex(e => e.personalId === person.personalId);

                    list.splice(index, 1);
                    store.dispatch({
                        type: 'LOAD_PERSON',
                        payload: list
                    });
                }
            }.bind(this);
            xhr.send();
        }
    }
    


    //-----------------------------------------------------------------------------------
    async function LoadCardData() {

        let url = state.isAdmin ? "cards/admin" : "cards";

        const response = await fetch(url + '?otdel=' + state.selectedOtdel + '&alpha=' + state.selectedAlpha + '&search=' + state.searchText +
            '&page=' + state.currentPage + '&CardsPerPage=' + cardsPerPage);
        const dataResult = await response.json();

        if (dataResult.length < cardsPerPage) {
            store.dispatch({ type: 'LOAD_ALL' });
        }

        if (state.currentPage > 1) {
            //console.log("LoadedCardData", state.currentPage, dataResult);
            store.dispatch({
                type: 'LOAD_PERSON',
                payload: [...state.listPerson, ...dataResult]
            });

        } else {
            //console.log("LoadedCardData", state.currentPage, dataResult);
            store.dispatch({
                type: 'LOAD_PERSON',
                payload: dataResult
            });
        }


    }
}
