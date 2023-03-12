import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { VscChevronLeft } from "react-icons/vsc";
import { GrUserManager } from "react-icons/gr"

import Memo from "../../interface/Memo"

import styles from './MemoManagerPage.module.scss'

const MemoManagerPage = () => {
  const [memoList, setMemoList] = useState<Memo[]>([])
  const [selectedMemoList, setSelectedMemoList] = useState<string[]>([])

    useEffect(()=> {
      loadMemo()
    },[])

    const loadMemo = useCallback(async()=>{
      const {data} = await axios.get<Memo[]>('/')
      setMemoList(data)
    },[setMemoList])

    const resetSelectedList = () => {
      setSelectedMemoList([])
    }

    const selectList = useCallback(value=>{
      setSelectedMemoList(prev => {
        if (prev.includes(value.id))
          return prev.filter(v => value.id !== v)
        return [...prev, value.id]
        })
    },[setSelectedMemoList,])

    const removeSelectedList = useCallback(async()=>{
      const list = []
      for (const id of selectedMemoList) {
        // await axios.delete("/"+id)
          list.push(axios.delete("/" + id))
      }
      await Promise.all(list)  
      await loadMemo()
      resetSelectedList()
      alert("제거 완료!")
    },[selectedMemoList, loadMemo])

    const removeAllList = useCallback(async()=>{
      if (!window.confirm("정말로 전체 제거를 하시겠습니까?")) {
        return;
      }
      await axios.delete("/")  
      await loadMemo()
      alert("제거 완료!")
      resetSelectedList()
    },[loadMemo])

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link to={"/"}> 
          <button className={styles.backBtn}>
            <VscChevronLeft size="30"/>
          </button>
        </Link>
        <div className={styles.titleWrapper}>
          <GrUserManager size="30"/>
          <h1 className={styles.title}>
            메모장 관리자 모드
          </h1>
        </div>
      </header>
      <section className={styles.selectBtnWrapper}>
        <button 
          className={styles.isSelectedAllBtn}
          onClick={()=>{
          setSelectedMemoList(memoList.length === selectedMemoList.length ? [] : memoList.map(v => v.id))
        }}>
          {
            memoList.length === selectedMemoList.length ? "전체 해제" : "전체 선택"
          }
        </button>
        {
          selectedMemoList.length > 0 &&
          <>
            <button 
              className={styles.removedSelectedBtn}
              onClick={removeSelectedList}
            >
              선택 제거
            </button>
            <button 
              className={styles.allRemovedBtn}
              onClick={removeAllList}
            >
              전체 제거
            </button>
          </>
        }
      </section>
      <main className={styles.memoList}>
        {
          memoList.map(value => {
            return (
              <div
                key={value.created_at}
                className={(selectedMemoList.join().includes(value.id)) ? styles.selectedList : styles.list}
                onClick={()=>selectList(value)}
              >
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{__html: value.content}}
            >
            </div>
            <div className={styles.extraInfo}>
              <p>생성: {new Date(value.created_at).toLocaleString()}</p>
              {
                value.updated_at &&
                <p>수정: {new Date(value.updated_at).toLocaleString()}</p>
              }
            </div>
            </div>
            )
          })
        }
      </main>
    </div>
  )
}

export default MemoManagerPage