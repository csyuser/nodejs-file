const db = require('../db.js')
const fs = require('fs')
jest.mock('fs')

describe('db', () => {
  it('can read', async () => {
    let data = [{name:'chen',age:'18'},{name:'xxx',age:'xxx'}]
    fs.setReadFileMock('/xxx',null,JSON.stringify(data))
    let list = await db.read('/xxx')
    expect(list).toStrictEqual(data)
  })

})