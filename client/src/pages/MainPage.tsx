import axios from 'axios'
import { useEffect } from 'react'
import Box from '../components/Box'
import Editor from '../components/Editor'

const MainPage = () => {
  useEffect(()=> {
    (async()=>{
       const {data} =  await axios.get('/tmp')
       console.log("data",data)
    })()
  },[])

  return (
    <Box p="16px">
      <h1>
        클라우드메모장
      </h1>
      <Editor/>
    </Box>
  )
}

export default MainPage