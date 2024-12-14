import {ChangeEvent, Component} from 'react'
import './App.css'
import {sendAudio} from "./lib/api.ts";
import OutputPane from "./components/OutputPane.tsx";

class App extends Component {
    state = {
        selectedFile: null,
        transcript: null
    }

    onFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return
        }
        this.setState({selectedFile: event.target.files[0]})
    }

    onTranscribe = async () => {
        if (!this.state.selectedFile) {
            alert("Must choose a file to upload first!")
            return
        }
        const {text} = await sendAudio(this.state.selectedFile)
        this.setState({transcript: text})
    }

    render() {
        return (
            <div>
                <h1>Voxtera</h1>
                <div>
                    <input type="file" onChange={this.onFileSelect}/>
                    <button onClick={this.onTranscribe}>Transcribe!</button>
                </div>
                { this.state.transcript ? <OutputPane transcription={this.state.transcript} /> : null }
            </div>
        )
    }
}

export default App
