/*
 * @Author: czy0729
 * @Date: 2021-01-17 00:59:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-11 09:35:09
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconReverse as CompIconReverse } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconReverse(props, { $ }) {
  const { epsReverse } = $.state
  return (
    <CompIconReverse
      style={[styles.touch, epsReverse && styles.reverse]}
      color={epsReverse ? _.colorMain : _.colorIcon}
      onPress={$.toggleReverseEps}
    >
      <Heatmap right={-5} id='条目.章节倒序' />
    </CompIconReverse>
  )
}

export default obc(IconReverse)

const styles = _.create({
  touch: {
    marginRight: -_.sm
  },
  reverse: {
    transform: [
      {
        rotateX: '180deg'
      }
    ]
  }
})
