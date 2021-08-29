import axios from 'axios'
import { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'

type BPIdata = {
    bpi:Record<string,number>
}

const Result = () =>{
    let query = useQuery();
    const [loading, setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [data,setData] = useState<BPIdata>()

    function useQuery() {
        return new URLSearchParams(useLocation().search)
    }

    let start = query.get('start')
    let end = query.get("end")

    useEffect(()=>{
        setLoading(true)
        axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB&start='+start+'&end='+end)
            .then(resp=>{
                setData(resp.data)
                setLoading(false)
            })
            .catch(err =>{
                setLoading(false)
                setError(true)
            })
    },[])

    const render = () =>{
        if(loading) return <p className='text-2xl'>Loading ...</p>
        else if(error) return <p className='text-2xl text-red-500'>There was an error. Please try again later.</p>
        else {
            let Array:[string,number][] = []
            if(data?.bpi){
                Array = Object.entries(data?.bpi)
            }
            return (
                <div className='text-center space-y-3'>
                    <p className='text-xl font-semibold'> ( From {start} To {end} ) </p>
                    <ul>
                        {
                            Array.map(arr => <li className="text-xl">{arr[0]} - {arr[1].toLocaleString()} THB</li>)
                        }
                    </ul>
                </div>
            )
        }
    }

    return(
        <div className='text-center space-y-3'>
            <p className='text-2xl font-semibold'>Historical price</p>
            {render()}
      </div>
    )
}

export default Result