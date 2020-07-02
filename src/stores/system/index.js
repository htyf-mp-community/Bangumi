/*
 * @Author: czy0729
 * @Date: 2019-05-17 21:53:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-02 20:35:12
 */
// import { NetInfo } from 'react-native'
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { info } from '@utils/ui'
import {
  DEV,
  IOS,
  GITHUB_DATA,
  GITHUB_RELEASE_REPOS,
  VERSION_GITHUB_RELEASE
} from '@constants'
import {
  MODEL_SETTING_QUALITY,
  MODEL_SETTING_TRANSITION,
  MODEL_SETTING_INITIAL_PAGE,
  MODEL_SETTING_HOME_LAYOUT,
  MODEL_SETTING_HOME_SORTING
} from '@constants/model'
import {
  NAMESPACE,
  INIT_SETTING,
  INIT_RELEASE,
  INIT_IMAGE_VIEWER
} from './init'

class System extends store {
  state = observable({
    /**
     * 云端配置数据
     */
    ota: {},

    /**
     * 基本设置
     */
    setting: INIT_SETTING,

    /**
     * 发布版本
     */
    release: INIT_RELEASE,

    /**
     * 是否显示图片预览
     */
    imageViewer: INIT_IMAGE_VIEWER,

    /**
     * 是否wifi
     */
    wifi: false,

    /**
     * 是否开发环境
     */
    dev: false,

    /**
     * iOS首次进入, 观看用户产生内容需有同意规则选项, 否则不能过审
     */
    iosUGCAgree: false
  })

  init = async () => {
    await this.readStorage(
      ['ota', 'setting', 'release', 'dev', 'iosUGCAgree'],
      NAMESPACE
    )

    // const res = NetInfo.getConnectionInfo()
    // const { type } = await res
    // if (type === 'wifi') {
    //   this.setState({
    //     wifi: true
    //   })
    // }

    // 检查新版本
    if (DEV) {
      setTimeout(() => {
        this.fetchOTA()
        this.fetchRelease()
      }, 4000)
    }

    return true
  }

  // -------------------- get --------------------
  @computed get isUGCAgree() {
    if (!IOS) {
      return true
    }
    return this.state.iosUGCAgree
  }

  // -------------------- fetch --------------------
  /*
   * 检查云端数据
   */
  fetchOTA = async () => {
    let res
    try {
      res = fetch(`${GITHUB_DATA}?t=${getTimestamp()}`).then(response =>
        response.json()
      )

      const ota = (await res) || {}
      this.setState({
        ota
      })
      this.setStorage('ota', undefined, NAMESPACE)
    } catch (error) {
      // do nothing
    }
    return res
  }

  /*
   * 检查新版本
   */
  fetchRelease = async () => {
    let res
    try {
      res = fetch(GITHUB_RELEASE_REPOS).then(response => response.json())
      const data = await res

      const { name: githubVersion, assets = [] } = data[0]
      const { browser_download_url: downloadUrl } = assets[0]
      const { name: currentVersion } = this.state.release
      if (githubVersion !== (currentVersion || VERSION_GITHUB_RELEASE)) {
        // iOS不允许提示更新
        if (!IOS) {
          setTimeout(() => {
            info('有新版本, 可到设置里下载')
          }, 1600)
        }

        const release = {
          name: githubVersion,
          downloadUrl
        }
        this.setState({
          release
        })
        this.setStorage('release', undefined, NAMESPACE)
      }
    } catch (error) {
      // do nothing
    }
    return res
  }

  // -------------------- page --------------------
  /**
   * 设置`图片质量`
   */
  setQuality = label => {
    const quality = MODEL_SETTING_QUALITY.getValue(label)
    if (quality) {
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          quality
        }
      })
      this.setStorage(key, undefined, NAMESPACE)
    }
  }

  /**
   * 设置`切页动画`
   */
  setTransition = label => {
    const transition = MODEL_SETTING_TRANSITION.getValue(label)
    if (transition) {
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          transition
        }
      })
      this.setStorage(key, undefined, NAMESPACE)
    }
  }

  /**
   * 设置`启动页`
   */
  setInitialPage = label => {
    const initialPage = MODEL_SETTING_INITIAL_PAGE.getValue(label)
    if (initialPage) {
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          initialPage
        }
      })
      this.setStorage(key, undefined, NAMESPACE)
    }
  }

  /**
   * 设置`首页布局`
   */
  setHomeLayout = label => {
    const homeLayout = MODEL_SETTING_HOME_LAYOUT.getValue(label)
    if (homeLayout) {
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          homeLayout
        }
      })
      this.setStorage(key, undefined, NAMESPACE)
    }
  }

  /**
   * 设置`首页排序`
   */
  setHomeSorting = label => {
    const homeSorting = MODEL_SETTING_HOME_SORTING.getValue(label)
    if (homeSorting) {
      const key = 'setting'
      this.setState({
        [key]: {
          ...this.setting,
          homeSorting
        }
      })
      this.setStorage(key, undefined, NAMESPACE)
    }
  }

  /**
   * 切换
   */
  switchSetting = switchKey => {
    const key = 'setting'
    this.setState({
      [key]: {
        ...this.setting,
        [switchKey]: !this.setting[switchKey]
      }
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 恢复默认设置
   */
  resetSetting = () => {
    const key = 'setting'
    this.setState({
      [key]: INIT_SETTING
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 显示ImageViewer
   * @param {*} imageUrls Image Source
   */
  showImageViewer = (imageUrls = []) => {
    this.setState({
      imageViewer: {
        visible: true,
        imageUrls
      }
    })
  }

  /**
   * 隐藏ImageViewer
   */
  closeImageViewer = () => {
    this.setState({
      imageViewer: INIT_IMAGE_VIEWER
    })
  }

  /**
   * 切换开发模式
   */
  toggleDev = () => {
    const { dev } = this.state
    const key = 'dev'
    this.setState({
      [key]: !dev
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 同意社区指导原则
   */
  updateUGCAgree = value => {
    const key = 'iosUGCAgree'
    this.setState({
      [key]: value
    })
    this.setStorage(key, undefined, NAMESPACE)
  }
}

const Store = new System()
Store.setup()

export default Store
