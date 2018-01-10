import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import { Button } from 'semantic-ui-react'

// ignore my self-signed ssl
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

class Uploadpage extends Component {
    constructor(props) {
        super(props)
        this.state = { files: [] }
    }

    componentDidMount() {
        this.requestAllFilesInfo()
        //this.removeFileRequest('About Us Page.jpg')
    }

    onDrop(files) {

        // convert it into a formdata
        const data = new FormData()
        data.append('sampleFile', files[0])

        // post it to my server pls
        request
            .post(this.props.backendUrl + '/filestorage/upload')
            .set('enctype', 'multipart/form-data')
            .send(data)
            .end((err, res) => {
                if (err) {
                    console.log('error', err)
                } else {
                    this.requestAllFilesInfo()
                }
            })
    }

    requestAllFilesInfo() {
        request
            .get(this.props.backendUrl + '/filestorage/infos')
            .end((err, res) => {
                if (err) {
                    console.log('error', err)
                } else {
                    this.setState({files: res.body})
                }
            })
    }

    removeFileRequest(filename) {
        request
            .delete(this.props.backendUrl + '/filestorage/remove')
            .query({filename: filename})
            .end((err, res) => {
                if (err) {
                    console.log('error', err)
                } else {
                    this.requestAllFilesInfo()
                }
            })
    }

    render() {
        return (
            <section>
                <div className="dropzone">
                    <Dropzone onDrop={this.onDrop.bind(this)}>
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                </div>
                <aside>
                    <h2>Dropped files</h2>
                    <ul>
                        {
                            this.state.files.map(f => 
                                <li key={f.name}>{f.name} - {f.size} bytes <Button onClick={() => { this.removeFileRequest(f.name) }}>Delete</Button></li>
                            )
                        }
                    </ul>
                </aside>
            </section>
        );
    }
}

export default Uploadpage