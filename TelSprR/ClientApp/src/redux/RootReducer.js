import 'react-redux';
import { createStore } from 'redux';


//const cardsPerPage = 6;

const initialState = {
    selectedOtdel: -1,
    selectedAlpha: '',
    searchText: '',
    searchTextProf: '',
    searchTextOtdel: '',
    isAdmin: false,
    listPerson: undefined,
    loadedCards: false,
    isLoading: false,
    isLoadingAll: false,
    currentPage: 1,
    listAllPerson: undefined,
    cardsPerPage2: 6

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
        currentPage: state.currentPage,
        listAllPerson: state.listAllPerson,
        cardsPerPage2: state.cardsPerPage2
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
        UpdatePerson: (person, create) => dispatch({ type: 'UPDATE_PERSON', payload: person, kind: create }),
        LoadAllPerson: () => dispatch({ type: 'LOAD_ALL_PERSON' }),
        calcCardsPerPage: (cnt_cards) => dispatch({ type: 'CARDS_PER_PAGE', payload: cnt_cards })
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
            currentPage: 1,
            cardsPerPage2: Math.round(6 * window.innerHeight / 970)
        }

        LoadCardData();
        return state;
    }


    switch (action.type) {

        case 'CARDS_PER_PAGE':
            state = {
                ...state,
                cardsPerPage2: action.payload
            }
            break;


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
            //LoadPerson(action.payload.personalId);
            //console.log("action.kind", action.kind);

            let newListPerson;

            if (action.kind == 0) {
                newListPerson = [action.payload, ...state.listPerson];
            } else {
                newListPerson = state.listPerson.map((item) => {
                    if (item.personalId === action.payload.personalId) {
                        //console.log("update", action.payload);
                        return action.payload;
                    }
                    return item;
                });
            }

            state = {
                ...state,
                listPerson: newListPerson
            }
            break;


        case 'LOAD_ALL_PERSON':
            //console.log("LOAD_ALL_PERSON");
            LoadCSVData();
            break;


        default:
            return state;
    }

    return state;


    //-----------------------------------------------------------------------------------
    //async function LoadPerson(id) {

    //    console.log(`cards/getperson?id=${id}`);
    //    const response = await fetch(`cards/getperson?id=${id}`);
    //    const dataResult = await response.json();

    //    console.log(dataResult);

    //    const newListPerson = state.listPerson.map((item) => {
    //        if (item.personalId === dataResult.personalId)
    //            return dataResult;
    //        return item;
    //    });

    //    store.dispatch({
    //        type: 'LOAD_PERSON',
    //        payload: newListPerson
    //    });

    //}


    //function LoadNextPart() {
    //    if (!state.isLoading && !state.isLoadingAll) {
    //        console.log("currentPage ", state.currentPage);
    //        console.log("Подгрузка ", state.cardsPerPage2);
    //        state = {
    //            ...state,
    //            currentPage: state.currentPage + 1,
    //            loadedCards: true,
    //            isLoading: true
    //        }
    //        LoadCardData();
    //    }
    //}



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
            '&page=' + state.currentPage + '&CardsPerPage=' + state.cardsPerPage2);
        const dataResult = await response.json();

        if (dataResult.length < state.cardsPerPage2) {
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


    async function LoadCSVData() {

        let url = state.isAdmin ? "cards/admin" : "cards";

        const response = await fetch(url + '?otdel=' + state.selectedOtdel + '&alpha=' + state.selectedAlpha + '&search=' + state.searchText +
            '&page=' + state.currentPage + '&CardsPerPage=' + 500);
        const dataResult = await response.json();


        var line = "ФИО;Раб.телефон;Моб.телефон;Должность;Отдел;Эл.почта\n";

        var res = line;

        var res = line + dataResult.map((item) => {
            return item.personalLastName
            + " " + item.personalName
                + " " + item.personalMidName
                + ";" + item.personalTel
                + ";" + item.personalMobil
                + ";" + item.profession
                + ";" + item.routeOtdels
                + ";" + item.personalEmail;
        }).join("\n");

        var res1 = utf8_decode(res);

        //console.log("LoadCSVData", res1);

        var data = new Blob([res1], {
            type: 'image/png'
        }),
            csvURL = window.URL.createObjectURL(data),
            tempLink = document.createElement('a');

        console.log("LoadCSVData", data);


        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'Telephone.csv');
        tempLink.click();

    }


    function utf8_decode(aa) {
        var bb = '', c = 0;

        var array = new Uint8Array(aa.length);

        for (var i = 0; i < aa.length; i++) {
            c = aa.charCodeAt(i);
            if (c > 127) {
                if (c > 1024) {
                    if (c == 1025) {
                        c = 1016;
                    } else if (c == 1105) {
                        c = 1032;
                    }
                    bb += String.fromCharCode(c - 848);
                    c = c - 848;
                }
            } else {
                bb += aa.charAt(i);
            }
            array[i] = c;
        }

        return array;
    }


}
