import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { VscChevronLeft, VscEdit, VscRefresh, VscTrash } from "react-icons/vsc";
import { BiCommentEdit } from 'react-icons/bi'


import Editor from "../../components/Editor"

import styles from './MemoEditPage.module.scss'

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
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link to={`/${id}`}> 
            <button className={styles.backBtn}>
              <VscChevronLeft size="30"/>
            </button>
        </Link>
        <div className={styles.titleWrapper}>
          <BiCommentEdit size="30"/>
          <h1 className={styles.title}>
            메모 수정
          </h1>
        </div>
      </header>
      <main className={styles.main}>
        <Editor value={edit} onChange={setEdit} />
      </main>
      <footer className={styles.footer}>
        <button 
          className={styles.editingBtn}
          onClick={onSubmit}
        >
          <VscEdit size="25"/>
        </button>
        <Link to={`/${id}`}>
          <button className={styles.deletingBtn}>
            <VscTrash size="25"/>
          </button>
        </Link>
      </footer>
    </div>
  )
}

export default MemoEditPage