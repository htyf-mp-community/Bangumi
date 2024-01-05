/*
 * @Author: czy0729
 * @Date: 2019-04-27 20:21:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-05 16:21:19
 */
import React from 'react'
import { Flex, Touchable, UserStatus } from '@components'
import { InView } from '@_'
import { memo } from '@utils/decorators'
import Avatar from './avatar'
import BtnPopover from './btn-popover'
import Content from './content'
import IconFavor from './icon-favor'
import Readed from './readed'
import { COMPONENT_MAIN, DEFAULT_PROPS, ITEM_HEIGHT } from './ds'

const Item = memo(
  ({
    styles,
    index,
    avatar,
    userId,
    userName,
    groupHref,
    groupCn,
    href,
    title,
    time,
    topicId,
    replyCount,
    isGroup,
    onPress
  }) => {
    return (
      <Touchable animate onPress={onPress}>
        <Readed topicId={topicId}>
          <Flex align='start'>
            <UserStatus userId={userId}>
              <InView style={styles.inView} index={index} y={ITEM_HEIGHT * index + 1}>
                <Avatar avatar={avatar} userName={userName} userId={userId} />
              </InView>
            </UserStatus>
            <Flex.Item style={styles.wrap}>
              <Flex align='start'>
                <Flex.Item>
                  <Content
                    groupCn={groupCn}
                    title={title}
                    time={time}
                    topicId={topicId}
                    replyCount={replyCount}
                    userId={userId}
                    userName={userName}
                    isGroup={isGroup}
                  />
                </Flex.Item>
                <BtnPopover
                  groupCn={groupCn}
                  groupHref={groupHref}
                  href={href}
                  topicId={topicId}
                  userId={userId}
                  userName={userName}
                  isGroup={isGroup}
                />
              </Flex>
            </Flex.Item>
          </Flex>
          <IconFavor topicId={topicId} />
        </Readed>
      </Touchable>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN,
  (props, prevProps, nextProps) => ({
    ...props,

    /** 减少重渲染次数: index 只用于 InView, 若之后更新比之前小, 就没有意义 */
    index: Math.min(prevProps.index, nextProps.index),

    /** 减少重渲染次数: "...19h 52m ago" => "...19h 55m ago" 只判断前几个字符 */
    time: props.time.slice(0, 4)
  })
)

export default Item
