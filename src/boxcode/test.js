'use strict'

import fs from 'fs'
import BoxCode from '.'

const box_code = new BoxCode(JSON.parse(fs.readFileSync('test.json')))
box_code.generate(console.log)
