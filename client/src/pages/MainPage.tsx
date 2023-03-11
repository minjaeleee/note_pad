import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {SlBookOpen} from 'react-icons/sl';

import Editor from '../components/Editor'
import Memo from '../interface/Memo'

import styles from './MainPage.module.scss'

const MainPage = () => {
  const [edit, setEdit] = useState('')
  const [memoList, setMemoList] = useState<Memo[]>([])

  useEffect(()=> {
    // 임시 저장된 값을 불러옴
    (async()=>{
      const {data:{result}} =  await axios.get('/tmp')
      setEdit(result)
    })()

    // 전체 메모장 READ
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
    const {data} = await axios.get('/')
    setMemoList(data.reverse())
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
      setMemoList(prev => [data, ...prev])
      setEdit('')
    }
  },[edit])

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <SlBookOpen size="30"/>
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
                <Link 
                  to={`/${value.id}`}
                  key={value.created_at} 
                >
                  <div className={styles.list}>
                    <div 
                      className={styles.content}
                      dangerouslySetInnerHTML={{__html: value.content}}
                    >
                    </div>
                    <div className={styles.extraInfo}>
                        <p> 생성: {new Date(value.created_at).toLocaleString()} </p>
                      {
                        value.updated_at &&
                          <p>수정: {new Date(value.updated_at).toLocaleString()}</p> 
                      }
                    </div>
                  </div>
                </Link>
            )
          })
        }
        </div>
      </main>
    </div>
  )
}

export default MainPage