const db = require('../db.js')
const fs = require('fs')
jest.mock('fs')

describe('db', () => {
  afterEach(()=>{
    fs.clearMocks()
  })
  it('can read', async () => {
    let data = [{name: 'chen', age: '18'}, {name: 'xxx', age: 'xxx'}]
    fs.setReadFileMock('/xxx', null, JSON.stringify(data))
    let list = await db.read('/xxx')
    expect(list).toStrictEqual(data)
  })
  it('can write', async () => {
    let list = [{name: 'chen', age: '18'}, {name: 'xxx', age: 'xxx'}]
    let fakeFile
    fs.setWriteFileMock('/yyy', (path, data, callback) => {
      fakeFile = data
      callback(null)
    })
    await db.write(list, '/yyy')
    expect(fakeFile).toStrictEqual(JSON.stringify(list))
  })
})