export const VITE_API_ROOT_URL: string | undefined = import.meta.env
    .VITE_API_ROOT_URL

export type TranscribedFileResponse = {
    text: string
}

export const sendAudio = async (
    file: File
) => {
    const formData = new FormData()
    formData.append('file', file)
    console.log(file)
    console.log(`${VITE_API_ROOT_URL}/transcribe`)
    const response = await fetch(`${VITE_API_ROOT_URL}/transcribe`, {
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