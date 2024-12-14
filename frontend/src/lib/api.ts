export type TranscribedFileResponse = {
    text: string
}

export const sendAudio = async (
    file: File
) => {
    const api_endpoint = window.location.protocol + "//" + window.location.hostname + "/transcribe"
    console.log(api_endpoint)
    const formData = new FormData()
    formData.append('file', file)
    console.log(file)
    const response = await fetch(api_endpoint, {
        method: 'POST',
        body: formData
    }).then(res => {
        if (!res.ok) {
            throw new Error(`Could not transcribe audio for ${file.name}`)
        }
        console.log(res)
        return res
    })
    return await response.json() as TranscribedFileResponse
}