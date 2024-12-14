import {ChangeEvent, Component} from 'react'
import './App.css'
import {sendAudio} from "./lib/api.ts";

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

    transcription = () => {
        if (this.state.transcript) {
            return (
                <>
                    <p>Transcription complete!</p>
                    <p>{this.state.transcript}</p>
                </>
            )
        }
    }

    render() {
        return (
            <div>
                <h1>Voxtera</h1>
                <div>
                    <input type="file" onChange={this.onFileSelect}/>
                    <button onClick={this.onTranscribe}>Transcribe!</button>
                </div>
                {this.transcription()}
            </div>
        )
    }
}

export default App
