import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { VscChevronLeft, VscEdit, VscTrash} from "react-icons/vsc";
import {BiDetail} from "react-icons/bi"
import axios from "axios"

import Memo from "../../interface/Memo"

import styles from './MemoDetailPage.module.scss'

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
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link to={"/"}> 
          <button className={styles.backBtn}>
            <VscChevronLeft size="30"/>
          </button>
        </Link>
        <div className={styles.titleWrapper}>
          <BiDetail size="30"/>
          <h1 className={styles.title}>
            메모 상세 페이지
          </h1>
        </div>
      </header>
      <main className={styles.main}>
        <p className={styles.content}>{memo.content}</p>
        <div className={styles.extraInfo}>
          <p>생성: {new Date(memo.created_at).toLocaleString()}</p>
          {
            memo.updated_at !== null &&
                <p>수정: {new Date(memo.updated_at).toLocaleString()}</p>
          }
        </div>
      </main>
      <footer className={styles.footer}>
          <Link to ={`/${id}/edit`}>
            <button className={styles.editingBtn}>
              <VscEdit size="25"/>
            </button>
          </Link>
            <button 
              className={styles.deletingBtn}
              onClick={onDelete}
            >
              <VscTrash size="25"/>
            </button>
      </footer>
    </div>
  )
}

export default MemoDetailPage
  