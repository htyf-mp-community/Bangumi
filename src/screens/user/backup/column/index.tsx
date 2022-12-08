/*
 * @Author: czy0729
 * @Date: 2022-12-08 10:47:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-08 14:45:07
 */
import React from 'react'
import { Flex, Text } from '@components'
import { ob } from '@utils/decorators'

function Column({
  style = undefined,
  show = true,
  type = undefined,
  text = undefined,
  right = undefined,
  onPress = undefined
}) {
  if (!show) return null

  return (
    <Flex style={style}>
      <Text size={11} type={!text || text === '/' ? 'sub' : type} onPress={onPress}>
        {text || '__'}
      </Text>
      {right}
    </Flex>
  )
}

export default ob(Column)
