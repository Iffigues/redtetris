const React = require('react')
const equalJSX = require('chai-equal-jsx')
const {createRenderer} = require('react-addons-test-utils')
const {Tetris, Board} = require('../src/client/components/test')

chai.should()
chai.use(equalJSX)

describe('Fake react test', function(){
  it('works', function(){
    const renderer = createRenderer()
    renderer.render(React.createElement(Tetris))
    const output = renderer.getRenderOutput()
   output.should.equalJSX(<Board/>)
  })

})
