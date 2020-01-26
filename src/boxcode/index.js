'use strict'

import {Map,fromJS} from 'immutable'

const scale = 10

const generators = [
  ({immu_box})=>([
    'from tgimbox import *',
    '',
    '##Declare and fork each box',
    immu_box
      .map((v,k)=>(
        [`# box: ${k}`
        , `${k} = ${v.get('type')}.Fork('${k}')`
        , `${k}.Set(Point(`
          + v.get('point').map((v,k)=>`${k}=${v/scale}`).join(', ')
          + `))`
        ].join('\n')
      ))
      .valueSeq().join('\n'),
  ]),

  ({immu_box, debug_mode})=>([
    '##Connect boxs',
    immu_box
      .map((v,k)=>(
        [`# box: ${k}`
          , v.get('ports').flatMap(port=>{
            if (typeof port==='string' || port.get('rel')!=='child') {
              if (!debug_mode) return []
              if (typeof port==='string')
                return [`# port:${port} is not connected`]
              if (port.get('rel')!=='child')
                return [`# port:${port.get('name')} is not relevant of child`]
            }
            return [
              `${k}.ConnectPort(`
              + [ `'${port.get('name')}'`
                , port.get('connect').get(0)
                , `'${port.get('connect').get(1)}'`
                ].join(', ')
              + `)`
            ]

          }).toJS().map(x=>x.trim()).join('\n')
        ].join('\n')
      ))
      .valueSeq().join('\n'),
  ]),

  ({immu_box})=>([
    '##Schedule and other codes',
    immu_box
      .filter((v,k)=>v.has('code'))
      .filter((v,k)=>v.get('code').trim()!=='')
      .map((v,k)=>(
        [`# box: ${k}`
        , `def fn(this):`
        , '  '+v.get('code').split('\n').join('\n  ')
        , `fn(${k})`
        ].join('\n')
      ))
      .valueSeq().join('\n'),
  ]),

  ({immu_box})=>([
    '##Build',
    [`BuildBox([`
      , '  '+immu_box.keySeq().join(',\n  ')
      , `]).Build().Merge('src/initialNet.json')`].join('\n'),
  ]),
]

export default class BoxCode {
  constructor(nsom, option = {}) {
    this.box = nsom.box
    this.config = {
      debug_mode: option['debug'] || false,
      outfn: option['outfn'] || console.log,
    }
  }

  generate(callback) {
    const output = (callback)? callback: this.config.outfn
    const immu_box = fromJS(this.box)
    const result = generators
      .map(f=>f({
        immu_box: immu_box,
        debug_mode: this.config.debug_mode
      }).join('\n'))
      .join('\n\n')
    output(result)
  }
}

