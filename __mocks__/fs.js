const fs = jest.createMockFromModule('fs')
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

let writeMocks = {}
fs.setReadFileMock = (path, error, data) => {
  writeMocks[path] = [error, data]
}
fs.readFile = (path, options, callback) => {
  if (callback === undefined){callback = options}
  if (path in writeMocks) {
    callback(...writeMocks[path])
  } else {
    -fs.readFile(path, options, callback)
  }
}
module.exports = fs