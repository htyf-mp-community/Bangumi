/*
 * @Author: czy0729
 * @Date: 2023-03-07 16:06:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-07 16:20:03
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text, Iconfont, Input } from '@components'
import TextareaItem from '@ant-design/react-native/lib/textarea-item'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { Popover } from '../../popover'
import { IconTouchable } from '../../../icon/touchable'
import { CONTROL_DS } from '../ds'
import { memoStyles } from './styles'

function Catalog({
  id,
  expand,
  create,
  edit,
  desc,
  item,
  detail,
  onChange,
  onExpand,
  onToggle,
  onControl,
  onCreate,
  onSubmitCatalog
}) {
  const styles = memoStyles()
  const isIn = detail?.list?.some(i => i.id == id)
  const date = item.time?.split(' ')[0]?.replace('创建于:', '') || ''
  return (
    <Flex style={styles.catalog}>
      <Flex.Item>
        {create == item.id ? (
          <View style={_.mb.sm}>
            <Text bold>编辑目录</Text>
            <Input
              style={styles.textarea}
              defaultValue={item.title}
              placeholder='输入标题'
              showClear
              onChangeText={text => onChange(text, 'title')}
            />
            <TextareaItem
              style={styles.textarea}
              defaultValue={desc}
              placeholder='输入介绍'
              placeholderTextColor={_.colorDisabled}
              rows={4}
              selectionColor={_.colorMain}
              clear
              onChange={text => onChange(text, 'desc')}
            />
          </View>
        ) : (
          <Touchable onPress={() => onExpand(item)}>
            <Flex>
              <Text bold>
                {item.title}{' '}
                <Text size={11} lineHeight={14} type='sub' bold>
                  ({detail.list.length})
                </Text>
              </Text>
              <Iconfont
                style={_.ml.sm}
                name={
                  expand.includes(item.id)
                    ? 'md-keyboard-arrow-down'
                    : 'md-navigate-next'
                }
                size={22}
                lineHeight={24}
              />
            </Flex>
            <Text style={_.mt.xs} size={10} type='sub' bold numberOfLines={2}>
              {date} · {HTMLDecode(String(detail.content)).replace(/<br>/g, '')}
            </Text>
          </Touchable>
        )}
      </Flex.Item>
      <Flex style={styles.control} justify='end'>
        {!edit && !create && (
          <>
            {!!id && (
              <IconTouchable
                style={_.ml.sm}
                name={isIn ? 'md-star' : 'md-star-outline'}
                size={18}
                color={isIn ? _.colorWarning : _.colorSub}
                onPress={() => onToggle(item, detail, isIn)}
              />
            )}
            {/** @ts-expect-error */}
            <Popover.Old
              style={styles.popover}
              data={CONTROL_DS.root}
              onSelect={title => onControl(title, item)}
            >
              <Flex style={styles.touch} justify='center'>
                <Iconfont name='md-more-vert' size={18} color={_.colorSub} />
              </Flex>
              {/** @ts-expect-error */}
            </Popover.Old>
          </>
        )}
        {item.id == create && (
          <>
            <View style={styles.cancel}>
              <IconTouchable
                name='md-close'
                size={22}
                color={_.colorSub}
                onPress={() => onCreate(false)}
              />
            </View>
            <View style={styles.submit}>
              <IconTouchable
                name='md-check'
                size={22}
                color={_.colorSub}
                onPress={onSubmitCatalog}
              />
            </View>
          </>
        )}
      </Flex>
    </Flex>
  )
}

export default ob(Catalog)
