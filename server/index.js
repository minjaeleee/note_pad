const express = require('express')
const fs = require('fs')
const cors = require('cors')
const { v4 } = require('uuid')

const app = express()

// 임시 저장용 변수
let tmp = ""

//  client side 요청(req)에서 body data를 해석하기 위해서 미들웨어 처리
app.use(express.json())
app.use(cors())
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))

function save() {
  fs.writeFileSync('data.json', JSON.stringify(data), 'utf-8')
}

// 임시 저장 
app.get('/tmp', (req, res) => {
  res.json({ result: tmp })
})

app.post('/tmp', (req, res) => {
  const { content } = req.body

  if (!content || content.length === 0) res.status(400).json({ msg: "content가 올바르지 않습니다." })
  tmp = content;
  res.json({ result: true })
})

// READ
app.get('/', (req, res) => {
  res.json(data.filter(el => el.deleted_at === null))
})

app.get('/:id', (req, res) => {
  const { id } = req.params
  const dataId = data.find(list => list.id === id)

  if (!isNaN(id)) res.status(400).json({ msg: "잘못된 id입니다." })
  if (dataId.deleted_at !== null) res.status(404).json({ msg: "이미 제거된 메모입니다." })

  res.json(dataId)
})

// DELETE
app.delete('/:id', (req, res) => {
  const { id } = req.params
  const dataId = data.find(list => list.id === id)

  if (!isNaN(id)) res.status(400).json({ msg: "잘못된 id입니다." })
  if (dataId.deleted_at !== null) res.status(404).json({ msg: "이미 제거된 메모입니다." })

  dataId.deleted_at = Date.now()
  res.json(dataId)

  save()
})

app.delete('/', (req, res) => {
  const deletedArr = []
  data.map(list => {
    if (!list.deleted_at) {
      list.deleted_at = Date.now()
      deletedArr.push(list.deleted_at)
    }
  })

  res.json(deletedArr)
  save()
})

// CREATE
app.post('/', (req, res) => {
  const { content } = req.body
  if (!content || content.length === 0) res.status(400).json({ msg: "content가 올바르지 않습니다." })

  const list = {
    id: v4(),
    content,
    created_at: Date.now(),
    updated_at: null,
    deleted_at: null
  }
  data.unshift(list)

  res.json(list)
  save()
})

// UPDATE
app.put('/:id', (req, res) => {
  const { id } = req.params
  const dataId = data.find(list => list.id === id)
  const { content } = req.body

  if (!content || content.length === 0) res.status(400).json({ msg: "content가 올바르지 않습니다." })
  if (!isNaN(id)) res.status(400).json({ msg: "잘못된 id입니다." })
  if (dataId.deleted_at !== null) res.status(404).json({ msg: "이미 제거된 메모입니다." })

  dataId.updated_at = Date.now()
  dataId.content = content

  res.json(dataId)
  save()
})

app.listen(8080, (req, res) => {
  console.log('클라우드 메모장 서버 시작 ')
})