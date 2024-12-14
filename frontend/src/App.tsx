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
        this.setState({status: 2})
        this.setState({transcript: "Hi, I'm Brendan. We're here in the Fishworks Lab. Sorry for screaming. It's very loud in here with the air conditioners and servers all around me. We just made an interest in discovery and we thought we'd show you straight away. So over here, here I'm measuring disk IO operations broken down by latency. I've also drilled down to disk IO operations taking at least 520 milliseconds broken down by disk. This is using D-Trace so I can do performance analysis of disks. I'm applying a right workload to two JBugs which are over here. The lights are blinking on these JBugs because they're doing work. What I'm going to do is not recommend it. This is not supported. Do not try this at home. This is not special effects. This is real. What we're looking at here is the effect of disk vibration. Vibration is a serious issue and we can see the effect here that it's caused. So here the latency for the disks that are under the workload has gone up. Here I can see which disks have now had IO operations longer than 500 milliseconds and I can find out that they belong to the JBuds I was just shouting at. So amazing stuff. This has been made possible by analytics from fishworks which lets us look at things we've never seen before. High latency caused by vibration is a real issue. You've seen it. It does exist. Just don't let brethren shout at your disks. That's right. Don't shout at your JBugs. They don't like it."})
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
