import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Box from '../components/Box'
import Button from '../components/Button'
import Editor from '../components/Editor'
import Flex from '../components/Flex'
import Memo from '../interface/Memo'

const MainPage = () => {
  const [edit, setEdit] = useState('')
  const [memoList, setMemoList] = useState<Memo[]>([])

  // 임시 저장된 값을 불러옴
  useEffect(()=> {
    (async()=>{
      const {data:{result}} =  await axios.get('/tmp')
      setEdit(result)
    })()
    loadMemo()
  },[])

  // 입력값 임시 저장
  useEffect(()=>{
    if(edit.length>0) {
      (async()=> {
        await axios.post('/tmp', {
          content: edit
        })
      })()
    }
  },[edit])

  const loadMemo = useCallback(async()=>{
    const {data} = await axios.get<Memo[]>('/')
    setMemoList(data)
  },[setMemoList])

  const onSubmit = useCallback(async()=>{
    const onlyTextContent = edit.replace(/<[/\w\s"=-]*>/gi, "")
    if(onlyTextContent.length === 0) {
      alert('메모가 비어있있습니다.')
      return;
    } else {
      const {data} = await axios.post('/', {
        content: onlyTextContent
      })
      setMemoList(prev => [...prev, data])
      setEdit('')
    }

  },[edit])

  return (
    <Box p="16px">
      <h1>
        클라우드메모장
      </h1>
      <Editor value={edit} onChange={setEdit}/>
      <Button mt="8px" onClick={onSubmit}>
        제출
      </Button>
      {
        memoList.map((value,idx) => {
          return (
            <Link 
              to={"/"+idx}                
              key={value.created_at} 
              >
              <Flex
                my="8px"
                p="12px"
                border={"#ccc solid 1px"}
                flexDirection="column"
              >
                <Box 
                  dangerouslySetInnerHTML={{__html: value.content}}
                />
                <Box 
                  textAlign={"right"}
                  fontSize={"12px"} 
                  color="#555"
                >
                    생성: {new Date(value.created_at).toLocaleString()}
                </Box>
              </Flex>
            </Link>
          )
        })
      }
    </Box>
  )
}

export default MainPage