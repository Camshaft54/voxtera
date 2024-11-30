import {ChangeEvent, Component} from 'react'
import './App.css'
import {sendAudio} from "./lib/api.ts";

class App extends Component {
    state = {
        selectedFile: null,
        transcript: null
    }

    onFileSelect = (event: ChangeEvent) => {
        if (!event.target) {
            return
        }
        this.setState({selectedFile: event.target.files[0]})
    }

    onTranscribe = async () => {
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

// function App() {
//     const [count, setCount] = useState(0)
//
//     return (
//         <>
//             <div>
//                 <a href="https://vite.dev" target="_blank">
//                     <img src={viteLogo} className="logo" alt="Vite logo"/>
//                 </a>
//                 <a href="https://react.dev" target="_blank">
//                     <img src={reactLogo} className="logo react" alt="React logo"/>
//                 </a>
//             </div>
//             <h1>Vite + React</h1>
//             <div className="card">
//                 <button onClick={() => setCount((count) => count + 1)}>
//                     count is {count}
//                 </button>
//                 <p>
//                     Edit <code>src/App.tsx</code> and save to test HMR
//                 </p>
//             </div>
//             <p className="read-the-docs">
//                 Click on the Vite and React logos to learn more
//             </p>
//         </>
//     )
// }

export default App