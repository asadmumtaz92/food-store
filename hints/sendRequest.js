import { useState } from 'react'

const SendHttpRequest = async (requestConfig, applyData) => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const sendRequest = async () => {
        try {
            setError(null)
            setIsLoading(true)

            const response = await fetch(requestConfig?.url, {
                method: requestConfig?.method ? requestConfig?.method : 'GET',
                header: requestConfig?.header ? requestConfig?.header : {},
                body: requestConfig?.body ? JSON.stringify(requestConfig?.body) : null,
            })
            if (!response.ok) {
                throw new Error('Request failed...')
            }

            const data = await response.json();
            applyData(data)
        }
        catch (error) {
            setError(error.message || 'Something went worng...!')
            console.log("Request Error == ", error)
        }
        setIsLoading(false)
    }

    return {
        isLoading: isLoading,
        error: error,
        sendRequest: sendRequest
    }
}

export default SendHttpRequest
