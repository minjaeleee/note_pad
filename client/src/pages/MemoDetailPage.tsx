import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { VscChevronLeft} from "react-icons/vsc";

import Box from "../components/Box"
import Button from "../components/Button"
import Flex from "../components/Flex"
import Memo from "../interface/Memo"

const MemoDetailPage = () => {
  const {id} = useParams()
  const [memo, setMemo] = useState<Memo | null>(null)

  useEffect(()=>{
    (async()=>{
      const {data} = await axios.get('/'+id)
      setMemo(data)
    })()
  },[])

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
      </Flex>
    </Box>
  )
}

export default MemoDetailPage