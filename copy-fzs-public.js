/*eslint-disabled*/
const fse = require('fs-extra')

// H:/~Company/580/GitLab/abc-second-class/scr/styles/bee-mui
const origin = 'H:\\GitHub\\bee-mui\\src'
const target = 'H:/~Company/580/GitLab/abc-second-class/src/styles/bee-mui'
fse.remove(target)
  .then(() => {
    fse.copySync(origin, target, {
      filter: (origin, target) => {
        return origin.indexOf('node_modules') === -1 &&
          origin.indexOf('.idea') === -1

      }
    })
  })
  .catch(err => {
    console.error(err)
  })

