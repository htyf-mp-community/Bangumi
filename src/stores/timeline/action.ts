/*
 * @Author: czy0729
 * @Date: 2023-04-25 16:37:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-19 19:20:46
 */
import { getTimestamp } from '@utils'
import { xhr } from '@utils/fetch'
import {
  API_CONNECT,
  API_TOPIC_COMMENT_LIKE,
  HTML_ACTION_TIMELINE_REPLY,
  HTML_ACTION_TIMELINE_SAY
} from '@constants'
import { Fn, Id, UserId } from '@types'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 更新隐藏某人动态的截止时间 */
  updateHidden = (hash?: UserId, day: number = 1) => {
    if (!hash) return false

    const key = 'hidden'
    if (day) {
      this.setState({
        [key]: {
          ...this.state[key],
          [hash]: getTimestamp() + day * 24 * 60 * 60
        }
      })
    } else {
      this.clearState(key, {})
    }
    this.save(key)

    return true
  }

  // -------------------- action --------------------
  /** 回复吐槽 */
  doReply = async (
    args: {
      id: Id
      content: string
      formhash: string
    },
    success?: () => any
  ) => {
    const { id, content, formhash } = args || {}
    xhr(
      {
        url: HTML_ACTION_TIMELINE_REPLY(id),
        data: {
          content,
          formhash,
          submit: 'submit'
        }
      },
      success
    )
  }

  /** 新吐槽 */
  doSay = async (
    args: {
      content: string
      formhash: string
    },
    success?: () => any
  ) => {
    const { content, formhash } = args || {}
    xhr(
      {
        url: HTML_ACTION_TIMELINE_SAY(),
        data: {
          say_input: content,
          formhash,
          submit: 'submit'
        }
      },
      success
    )
  }

  private _doLiking = false

  /** 添加回复表情 */
  doLike = (
    item: {
      main_id: number
      type: number
      value: string
    },
    id: number,
    formhash: string,
    callback?: Fn
  ) => {
    if (this._doLiking) return

    this._doLiking = true
    setTimeout(() => {
      this._doLiking = false
    }, 1600)

    xhr(
      {
        url: API_TOPIC_COMMENT_LIKE(item.type, item.main_id, id, item.value, formhash)
      },
      responseText => {
        try {
          const data = JSON.parse(responseText)
          if (data?.status === 'ok') {
            this.updateLikes(
              data?.data || {
                [id]: {}
              }
            )

            if (typeof callback === 'function') callback()
          }
        } catch (error) {}
      },
      () => {
        if (typeof callback === 'function') callback()
      }
    )
  }

  /** 添加好友 */
  doConnect = async (userId: number) => {
    await this.fetchFormHash()
    if (!this.formhash) return false

    return new Promise(resolve => {
      xhr(
        {
          url: API_CONNECT(userId, this.formhash)
        },
        responseText => {
          try {
            if (JSON.parse(responseText)?.status === 'ok') return resolve(true)
          } catch (error) {}

          resolve(false)
        },
        () => resolve(false)
      )
    })
  }
}
