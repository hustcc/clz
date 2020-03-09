import * as Storage from 'leancloud-storage/dist/av-min.js';
import { Option, Comment } from './types';
import { DB } from './const';
import { DOM } from './dom';

import './style.less';

const AV = Storage.default;

/**
 * const c = new CLZ({ ... });
 *
 * c.launch('currentPage');
 */
export class Clz {
  private option: Option;
  private dom: DOM;

  constructor(option: Option) {
    this.option = {
      clicks: 2,
      interval: 200,
      page: location.pathname,
      ...option,
    };

    // 加载成功，初始化
    const { appId, appKey, serverURLs } = this.option;

    // 防止多次 init 报错
    try {
      AV.init({
        appId,
        appKey,
        serverURLs,
      });
    } catch(e) {}


    // 新建 dom
    this.dom = new DOM(this.option, (comment: Comment) => {
      this.shoot(comment);
    });
  }

  /**
   * 更新 page
   * @param page
   */
  public updatePage(page: string) {
    this.option = {
      ...this.option,
      page,
    };
  }

  /**
   * 渲染当前页面
   */
  public async launch() {
    const { page } = this.option;
    // 拉取 comments
    const comments: Comment[] = (await this.fetch(page)).map((c) => c.attributes as Comment);

    for (const comment of comments) {
      await this.render(comment);
    }
  }

  /**
   * 清空
   */
  public clear() {
    this.dom.clear();
  }

  /**
   * 销毁，清空所有 dom
   */
  public destroy() {
    this.dom.destroy();
  }

  /**
   * 发射一个评论
   * @param comment
   */
  private async shoot(comment: Comment) {
    // @ts-ignore
    const Record = AV.Object.extend(DB);

    // 构建对象
    const record = new Record();

    const newComment: Comment = {
      ...comment,
      page: this.option.page, // 加入 page 属性
    };

    // 为属性赋值
    Object.entries(newComment).forEach(([key, value]) => {
      record.set(key, value);
    });

    // 将对象保存到云端
    await record.save();
  }

   /**
   * 渲染一个 comment
   * @param comment
   */
  private async render(comment: Comment) {
    // 渲染 dom
    this.dom.render(comment);
  }

  /**
   * 获取当前页面的所有评论
   * @param page
   */
  private async fetch(page: string) {
    // @ts-ignore
    const q = new AV.Query(DB);
    q.equalTo('page', page);

    return await q.find();
  }
}
