/*
 * @Author: czy0729
 * @Date: 2020-03-22 14:18:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-14 21:42:34
 */
import { computed, observable } from 'mobx'
import { usersStore, userStore } from '@stores'
import store from '@utils/store'
import { HTML_USERS_BLOGS } from '@constants'
import { NAMESPACE, STATE } from './ds'
import { Params } from './types'

export default class ScreenBlogs extends store<typeof STATE> {
  params: Params

  state = observable(STATE)

  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      _loaded: true
    })

    return this.refresh()
  }

  // -------------------- fetch --------------------
  refresh = () => {
    return this.fetchBlogs(true)
  }

  fetchBlogs = (refresh: boolean = false) => {
    return usersStore.fetchBlogs(
      {
        userId: this.userId
      },
      refresh
    )
  }

  // -------------------- get --------------------
  @computed get userId() {
    const { userId } = this.params
    return userId || userStore.myId
  }

  @computed get blogs() {
    return usersStore.blogs(this.userId)
  }

  @computed get url() {
    return HTML_USERS_BLOGS(this.userId)
  }
}
