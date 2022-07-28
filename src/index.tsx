import React from 'react'
import {createPlugin} from 'sanity'

import Input from './components/Input'
import Preview from './components/Preview'
import muxVideo from './schema/mux.video'
import videoAsset from './schema/mux.videoAsset'
import {isMuxInputPreviewProps, isMuxInputProps} from './util/asserters'
import {type Config} from './util/types'

/*
// @TODO use declaration merging to allow correct typings for userland schemas when they use type: mux.video
declare module 'sanity' {
  namespace Schema {

  }
}
// */

/* @TODO export validation rules for: required (checks if the video asset is defined), and that it has a ready uploaded file
export const validation = {
  required(Rule: Rule) {
    return
  }
}
// */

export const defaultConfig: Config = {
  mp4_support: 'none',
}

export const muxInput = createPlugin<Partial<Config> | void>((userConfig) => {
  const config: Config = {...defaultConfig, ...userConfig}
  return {
    name: 'mux-input',
    form: {
      renderInput(props, next) {
        if (isMuxInputProps(props)) {
          return <Input config={config} {...props} />
        }
        return next(props)
      },
      renderPreview(props, next) {
        if (isMuxInputPreviewProps(props)) {
          return <Preview {...props} />
        }
        return next(props)
      },
    },
    schema: {types: [muxVideo, videoAsset]},
  }
})

export {Input, Preview}
