import { useState } from "react"
import sendHttpRequest from './sendRequest'

const Firebase = () => {

    const [title, setTitle] = useState('')
    const [releasedDate, setReleasedDate] = useState('')
    const [movieList, setMovieList] = useState([])

    const applyData = (data) => {
        console.log('data', data)
        const loadedMovies = []

        for (const key in data) {
            loadedMovies.push({
                id: key,
                title: data[key].title,
                releasedDate: data[key].releasedDate
            })
        }
        let reverse = loadedMovies.reverse()
        setMovieList(reverse)
    }

    const { isLoading, error } =
        sendHttpRequest(
        {
            url: 'https://reactjs-app-aa583-default-rtdb.firebaseio.com/Movies.json'
        },
        applyData
        )
    console.log("isLoading=",isLoading, 'error=',error)
    
    const applyData2 = (data) => {
        if (data.name) {
            alert('Data submited successfully!')
        } else {
            alert('Something whent wrong...')
        }
        setTitle('')
        setReleasedDate('')
    }
    console.log('applyData2', applyData2)
    const sendData = () => {
        if (title !== '' && releasedDate !== '') {
            sendHttpRequest(
                {
                    url: 'https://reactjs-app-aa583-default-rtdb.firebaseio.com/Movies.json',
                    method: 'POST',
                    header: { 'Content-type': 'application/json' },
                    body: { title, releasedDate }
                },
                (data) => {
                    if (data?.name) {
                        alert('Data submited successfully!')
                    } else {
                        alert('Something whent wrong...')
                    }
                    setTitle('')
                    setReleasedDate('')
                }
            )
        }
    }

    const titleHandler = (event) => {
        setTitle(event?.target?.value)
    }
    const releasedDateHandler = (event) => {
        setReleasedDate(event?.target?.value)
    }

    // const sendRequist = async () => {
        // if (title !== '' && releasedDate !== '') {
            // <SendRequest
            //     url='https://reactjs-app-aa583-default-rtdb.firebaseio.com/Movies.json'
            //     method='POST'
            //     header= {'Content-type': 'application/json'}
            //     applyData = { applyData }
            // />
            // const response = await fetch('https://reactjs-app-aa583-default-rtdb.firebaseio.com/Movies.json', {
            //     method: 'POST',
            //     header: {
            //         'Content-type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         title: title,
            //         releasedDate: releasedDate
            //     })
            // })

            // const data = await response.json()
            // if (data.name) {
            //     alert('Data submited successfully!')
            // } else {
            //     alert('Something whent wrong...')
            // }
            // setTitle('')
            // setReleasedDate('')
            // fetchData()
        // }
    // }

    const fetchDataaa = async () => {
        const response = await fetch('https://reactjs-app-aa583-default-rtdb.firebaseio.com/Movies.json')

        const data = await response.json()
        const loadedMovies = []

        for (const key in data) {
            loadedMovies.push({
                id: key,
                title: data[key].title,
                releasedDate: data[key].releasedDate
            })
        }
        let reverse = loadedMovies.reverse()
        setMovieList(reverse)
    }
    console.log('fetchDataaa', fetchDataaa)

    // useEffect(() => {
    //     fd()
    // }, [])

    return (
        <div style={{ width: '50%', margin: 'auto' }}>
            <div style={{ width: '100%', margin: 'auto' }} className={`bg-dark p-5 mt-4 rounded`}>
                <input type="text" className="form-control" value={title} onChange={titleHandler} placeholder="Enter movie title..." />
                <input type="date" className="form-control mt-4" value={releasedDate} onChange={releasedDateHandler} placeholder="Enter released data..." />
                <button className="btn btn-info form-control fw-bold mt-5" onClick={sendData}>Submit</button>
            </div>
            {/* <button className="btn btn-info col-xl-6 offset-lg-3 text-center form-control mt-5 text-capitalize" onClick={() => fd()}>FETCH DATA</button> */}

            {movieList?.length > 0
                && movieList.map(item => {
                    return (
                        <div style={{ width: '80%', margin: 'auto' }} className={`bg-dark text-white p-2 mt-3 text-capitalize rounded`}>
                            {item?.title} released on {item?.releasedDate}.
                        </div>
                    )
                })}
        </div>
    )
}
export default Firebase
