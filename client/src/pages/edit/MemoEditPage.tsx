import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { VscChevronLeft } from "react-icons/vsc";

import Box from "../../components/Box"
import Button from "../../components/Button"
import Editor from "../../components/Editor"
import Flex from "../../components/Flex";

const MemoEditPage = () => {
  const{id} = useParams()
  const navigate = useNavigate()

  const [edit, setEdit] = useState<string | null>(null)

  useEffect(()=>{
    (async()=>{
      try{
        const {data} = await axios.get('/'+id)
        setEdit(data.content)
      } catch(e) {
        alert((e as any).response.data.msg)
        navigate('/')
      }
    })()
  },[])

  const onSubmit = useCallback(async()=>{
    try{
      await axios.put(('/'+id), {
        content: edit
      }) 
      alert("수정을 완료했습니다.")
      navigate('/'+id)
    }catch(e) {
      alert((e as any).response.data.msg)
      navigate('/')
    }
  },[edit])

  if(edit === null) return <></>;

  return (
    <Box p="16px">
      <Link to={`/${id}`}> 
        <Button square >
          <VscChevronLeft/>
        </Button>
      </Link>
      <h1>
        메모 수정
      </h1>
      <Editor value={edit} onChange={setEdit} />
      <Flex 
        justifyContent={"flex-end"} 
        style={{
        gap: "8px"
      }}>
        <Button mt="8px" onClick={onSubmit}>
          수정
        </Button>
        <Link to={`/${id}`}>
          <Button mt="8px">
            취소
          </Button>
        </Link>
		</Flex>
    </Box>
  )
}

export default MemoEditPage