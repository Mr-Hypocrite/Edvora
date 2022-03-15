import React  from 'react'

function useFetch(url:string) {
    let [data, setData] = React.useState([])
    
    React.useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url)
            const json = await res.json()
            setData(json)
        }

        fetchData()

    }, [url])

    return [ data ]
}

export default useFetch