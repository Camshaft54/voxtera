import {ChangeEvent, Component} from 'react'
import './App.css'
import {sendAudio} from "./lib/api.ts";
import OutputPane from "./components/OutputPane.tsx";
import LoadingButton from '@mui/lab/LoadingButton';
import {Button} from "@mui/joy";

class App extends Component {
    state = {
        selectedFile: null,
        transcript: null,
        status: 0
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
        this.setState({status: 1})
        const {text} = await sendAudio(this.state.selectedFile)
        this.setState({transcript: text})
        this.setState({status: 2})
    }

    onCopy = async () => {
        if (this.state.transcript != null) {
            await navigator.clipboard.writeText(this.state.transcript)
        }
    }

    render() {
        return (
            <div>
                <h1>Voxtera</h1>
                <div><input type="file" onChange={this.onFileSelect}/></div>
                <br></br>
                <div><Button onClick={this.onTranscribe}>Transcribe!</Button></div>
                <br></br>
                {this.state.transcript ? <OutputPane transcription={this.state.transcript}/> : null}
                {this.state.status != 0 ? <LoadingButton loading={this.state.status == 1} onClick={this.onCopy}>Copy
                    transcript</LoadingButton> : null}
            </div>
        )
    }
}

export default App
