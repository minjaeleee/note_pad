import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Box from '../components/Box'
import Button from '../components/Button'
import Editor from '../components/Editor'
import Flex from '../components/Flex'
import Memo from '../interface/Memo'
import {SlBookOpen} from 'react-icons/sl';
import styles from './MainPage.module.css'


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
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <SlBookOpen size="25"/>
        <h1 className={styles.title}>
          메모장
        </h1>
      </header>
      <main className={styles.main}>
        <Editor value={edit} onChange={setEdit}/>
        <div className={styles.btnWrapper}>
          <button className={styles.submitBtn} onClick={onSubmit}>
            제출
          </button>
          <Link to={`/manager`}>
            <button className={styles.manageBtn}>
              관리자 모드
            </button>
          </Link>
        </div>
        <div className={styles.memoList}>
        {
          memoList.map(value => {
            return (
              <div className={styles.list}>
                <Link 
                  to={`/${value.id}`}
                  key={value.created_at} 
                >
                  {value.content}
                        생성: {new Date(value.created_at).toLocaleString()}
                    {
                      value.updated_at &&
                        <p>수정: {new Date(value.updated_at).toLocaleString()}</p> 
                    }
                </Link>
              </div>
            )
          })
        }
        </div>
      </main>
    </div>
  )
}

export default MainPage