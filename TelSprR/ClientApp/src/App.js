import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import EditOtdel from './components/Admin/EditOtdel';
import EditProf from './components/Admin/EditProf';
import NavMenu from './components/NavMenu';
import  EditForm   from './components/Admin/EditForm';
import Login from './components/Admin/Login';
import './custom.css'


function App() {

    const [adminEdit, setAdminEdit] = useState(true);
    const [searchText, setSearchText] = useState(null);
    const [curAlpha, setCurAlpha] = useState(null);
    const [curOtdel, setCurOtdel] = useState(-1);

    //-----------------------------------------------------------------------------------------------------------
    function onSetAdmin() {
        setAdminEdit(true);
    }

    //-----------------------------------------------------------------------------------------------------------
    function onSetSearch(searchText) {
        setCurAlpha(null);
        setCurOtdel(-1);
        setSearchText(searchText);
    }

    //-----------------------------------------------------------------------------------------------------------
    function clickOtdel(e) {
        setCurAlpha(null);
        setCurOtdel(e.target.id);
        setSearchText(null);
    }

    //-----------------------------------------------------------------------------------------------------------
    function clickAlpha(e) {
        setCurAlpha(e.target.id);
        setSearchText(null);
    }

    return (
        <div>
            <NavMenu adminEdit={adminEdit} callBackSearch={onSetSearch} />
            <Routes >
                <Route exact path="/" element={
                    <Main adminEdit={adminEdit} callBackSearch={onSetSearch}
                        callBackOtdel={clickOtdel} callBackAlpha={clickAlpha}
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

export default App;

