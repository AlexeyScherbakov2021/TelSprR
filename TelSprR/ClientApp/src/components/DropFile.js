import React, { Component, useState } from 'react';

export class DropzoneComponent extends Component {
    static displayName = DropzoneComponent.name;

    //files = [];

    constructor(props) {
        super(props);

        this.drop = false;
        this.state = { drag: false };
        this.urlFile = "photo/" + this.props.fileName;
        this.dragStartHandler = this.dragStartHandler.bind(this);
        this.dragLeaveHandler = this.dragLeaveHandler.bind(this);
        this.dropHandler = this.dropHandler.bind(this);
    }


    //-------------------------------------------------------------------------------------------------
    dragStartHandler(e) {
        e.preventDefault();
        this.setState({ drag: true });
    }

    //-------------------------------------------------------------------------------------------------
    dragLeaveHandler(e) {
        e.preventDefault();
        this.setState({ drag: false });
    }

    //-------------------------------------------------------------------------------------------------
    async dropHandler(e) {
        e.preventDefault();

        this.files = [...e.dataTransfer.files];

        //this.files.map(file => Object.assign(file, {
        //    preview: URL.createObjectURL(file)
        //}));

        this.props.onCallBack(this.files[0]);
        //this.drop = true;

        //this.fileName = this.files[0].name;
        //this.urlFile = URL.createObjectURL(this.files[0]);


        //console.log("Файл: " + this.files[0].name);

        //const data = new FormData();
        //data.append("uploadedFile", this.files[0]);
        //data.append("id", 2);

        //var xhr = new XMLHttpRequest();
        //xhr.open("post", "cards", true);
        //xhr.onload = function () {
        //    if (xhr.status === 200) {
        //        this.fileName = this.files[0].name;
        //        //this.setState({ drag: false });
        ////        //this.loadData();
        //    }
        //}.bind(this);
        //xhr.send(data);

        this.setState({ drag: false });
    }


    //-------------------------------------------------------------------------------------------------
    render() {

        const baseStyle = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px',
            borderWidth: 2,
            borderRadius: 2,
            borderColor: '#bebebe',
            borderStyle: 'dashed',
            backgroundColor: '#f0f0f0',
            color: '#bdbdbd',
            width: "232px",
            height: "300px",
            boxShadow: "0px 0px 3px 3px #00000040",
            transition: 'border .3s ease-in-out'
        };

        //console.log("render1 " + this.props.filePhoto);

        if (this.props.fileName == null) {
            this.urlFile = null;
        }



        if (this.props.filePhoto != null) {
            this.urlFile = URL.createObjectURL(this.props.filePhoto);
            //this.urlFile = this.props.filePhoto;
        }


        return (

            <div style={baseStyle} className="d-flex flex-column align-self-stretch">
                {/*<div className="d-flex justify-content-center align-items-center" style={{ background: "gray", height: "300px", width: "220px" }} >*/}
                {/*    <h6>отпустите файл</h6>*/}
                {/*</div>*/}

                {this.state.drag
                    ? <div className="drop-area d-flex justify-content-center align-items-center" style={{ height: "300px", width: "220px" } }
                        onDragStart={e => this.dragStartHandler(e)}
                        onDragLeave={e => this.dragLeaveHandler(e)}
                        onDragOver={e => this.dragStartHandler(e)}
                        onDrop={e => this.dropHandler(e)}
                    >отпустите файл</div>
                    :
                    <div className="drop-area d-flex justify-content-center align-items-center" style={{ height: "300px", width: "220px" }}
                        onDragStart={e => this.dragStartHandler(e)}
                        onDragLeave={e => this.dragLeaveHandler(e)}
                        onDragOver={e => this.dragStartHandler(e)}
                    >
                        {this.urlFile == null
                            ? <div>Перетащите файл</div>
                            : <img className="" src={this.urlFile} style={{maxHeight: "280px", maxWidth: "230px" } } />
                        }
                    </div>
                }

            </div>

        );
    }
}



