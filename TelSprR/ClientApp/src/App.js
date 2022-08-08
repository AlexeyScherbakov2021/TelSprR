import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import Main from './components/Main';
import EditOtdel from './components/Admin/EditOtdel';
import EditProf from './components/Admin/EditProf';
import NavMenu from './components/NavMenu';
import  EditForm   from './components/Admin/EditForm';
import Login from './components/Admin/Login';
import { mapStateToProps, mapDispatchToProps } from './redux/RootReducer'
import './custom.css'


function App(props) {

    const [adminEdit, setAdminEdit] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [curAlpha, setCurAlpha] = useState('');
    const [curOtdel, setCurOtdel] = useState(-1);

    //-----------------------------------------------------------------------------------------------------------
    function onSetAdmin() {
        setAdminEdit(true);
    }

    //-----------------------------------------------------------------------------------------------------------
    function onSetSearch(searchText) {
        setCurAlpha('');
        setCurOtdel(-1);
        setSearchText(searchText);
    }

    //-----------------------------------------------------------------------------------------------------------
    function clickOtdel(e) {
        setCurAlpha('');
        setCurOtdel(e.target.id);
        setSearchText('');
    }

    //-----------------------------------------------------------------------------------------------------------
    function clickAlpha(e) {
        setCurAlpha(e.target.id);
        setSearchText('');
    }


    //console.log("App", props);

    return (
        <div>
            {/*<NavMenu adminEdit={adminEdit} callBackSearch={onSetSearch} />*/}
            <NavMenu />
            <Routes >
                <Route exact path="/" element={

                  <Main adminEdit={adminEdit} callBackSearch={onSetSearch}
                      callBackOtdel={clickOtdel} callBackAlpha={clickAlpha}
                      setOtdel={props.onSelectOtdel} setAlpha={props.onSelectAlpha }
                      searchText={searchText} curOtdel={curOtdel} curAlpha={curAlpha} />
                } />

                <Route path='/profession' element={<EditProf searchText={searchText} />} />
                <Route path='/otdels' element={<EditOtdel searchText={searchText} />} />

                <Route path='/editForm' element={<EditForm />} />

                <Route path="/login" element={<Login callBackAdm={onSetAdmin} />} />
            </Routes>
        </div>



        );

}


//function mapStateToProps(state) {
//    return {
//        selectedOtdel: state.selectedOtdel,
//        selectedAlpha: state.selectedAlpha,
//        searchText: state.searchText,
//        isAdmin: state.isAdmin
//    }
//}

//function mapDispatchToProps(dispatch) {
//    return {
//        onSelectOtdel: (idOtdel) => dispatch({ type: 'SELECT_OTDEL', payload: idOtdel }),
//        onSelectAlpha: (alpha) => dispatch({ type: 'SELECT_ALPHA', payload: alpha}),
//        onSearch: (searchText) => dispatch({ type: 'SEARCH', payload: searchText }),
//        setAdmin: () => dispatch({ type: 'IS_ADMIN' })
//    }
//}


export default connect(mapStateToProps, mapDispatchToProps)(App);
//export default App;

