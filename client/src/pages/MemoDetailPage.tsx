import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { VscChevronLeft, VscEdit, VscTrash} from "react-icons/vsc";

import Box from "../components/Box"
import Button from "../components/Button"
import Flex from "../components/Flex"
import Memo from "../interface/Memo"

const MemoDetailPage = () => {
  const navigate = useNavigate()
  const {id} = useParams()

  const [memo, setMemo] = useState<Memo | null>(null)

  useEffect(()=>{
    (async()=>{
      try{
        const {data} = await axios.get('/'+id)
        setMemo(data)
      } catch(e) {
        alert((e as any).response.data.msg)
        navigate('/')
      }
    })()
  },[])

  const onDelete = async() => {
    if(window.confirm("해당 메모를 지우겠습니까?")){
      try{
        await axios.delete('/'+id)
        alert("제거가 완료되었습니다.")
        navigate('/')
      } catch(e) {
        alert((e as any).response.data.msg)
        navigate('/')
      }
    }
  }

  if(memo === null) return <></>;

  return (
    <Box p="16px">
      <Link to={"/"}> 
        <Button square >
          <VscChevronLeft/>
        </Button>
      </Link>
      <Flex
        my="8px"
        p="12px"
        border={"#ccc solid 1px"}
        flexDirection="column"
      >
        <Box 
          dangerouslySetInnerHTML={{__html: memo.content}}
        />
        <Box 
          textAlign={"right"}
          fontSize={"12px"} 
          color="#555"
        >
            생성: {new Date(memo.created_at).toLocaleString()}
        </Box>
        {
          memo.updated_at !== null &&
          <Box 
            textAlign={"right"}
            fontSize={"12px"} 
            color="#555"
          >
              수정: {new Date(memo.updated_at).toLocaleString()}
          </Box>
        }
        <Flex justifyContent={"flex-end"} style={{gap:8}}>
          <Link to ={"/edit"}>
            <Button square>
              <VscEdit />
            </Button>
          </Link>
          <Link to ={"/edit"}>
            <Button square onClick={onDelete}>
              <VscTrash />
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}

export default MemoDetailPage
  