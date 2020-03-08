import { Comment, Option } from './types';
import { getColor, getTextColor } from './helper/color';
import { generateNewComment } from './helper/comment';
import { escape } from './helper/xss';
import { DOM_TEMP } from './const';

/**
 * 维护 ui 的 class
 */
export class DOM {
  private option: Option;
  private onShoot: (comment: Comment) => void;

  private $container: HTMLElement;
  private $input: HTMLElement;
  private $textarea: HTMLElement;
  private $comment: HTMLElement;

  private timer: number;
  private clickCount: number = 0;

  private newComment: Comment = {};

  constructor(option: Option, onShoot) {
    this.option = option;
    this.onShoot = onShoot;

    // 初始化元素
    this.initDOM();
    // 绑定事件
    this.bindEvents();
  }

  /**
   * 渲染所有的 comment
   * @param comment
   */
  public render(comment: Comment) {
    this.createDotDOM(comment);
  }

  /**
   * 清空所有评论
   */
  public clear() {
    const comments = document.querySelectorAll('.clz-comment-dot');
    comments.forEach((c) => {
      c.parentNode.removeChild(c);
    });
  }

  /**
   * 销毁
   */
  public destroy() {
    // 移除元素
    this.$container.parentNode.removeChild(this.$container);

    // 取消事件
    document.removeEventListener('click', this.showInput);
    this.$textarea.removeEventListener('keydown', this.onKeydown);

    this.$container.removeEventListener('mouseover', this.showComment);
    this.$container.removeEventListener('mouseleave', this.hideComment);
  }

  private bindEvents() {
    document.addEventListener('click', this.onClick);
    this.$textarea.addEventListener('keydown', this.onKeydown);

    // 显示消息
    this.$container.addEventListener('mouseover', this.showComment);
    this.$container.addEventListener('mouseleave', this.hideComment);
  }

  private initDOM() {
    this.$container = this.createContainerDOM();

    this.$container.innerHTML = DOM_TEMP;

    this.$input = this.$container.querySelector('.clz-input');
    this.$textarea = this.$input.querySelector('textarea');
    this.$comment = this.$container.querySelector('.clz-message');
  }

  private showInput = (e: MouseEvent) => {
    const { pageX, pageY } = e;
    const x = (pageX / document.documentElement.clientWidth) * 100;
    // 点击的时候，弹出输入框
    this.$input.style.left = `${e.clientX}px`;
    this.$input.style.top = `${e.clientY + 12}px`;

    this.$input.style.display = 'inline-block';

    this.newComment = generateNewComment(x, pageY);

    this.render(this.newComment);

    this.$textarea.focus();
  };

  private hideInput = () => {
    // 删除 dom
    const d = document.getElementById(this.newComment.id);
    if (d) {
      d.parentNode.removeChild(d);
    }

    // @ts-ignore
    this.$textarea.value = '';
    this.$input.style.display = 'none';
    this.newComment = {};
  };

  private onClick = (e: MouseEvent) => {
    const { clicks, interval } = this.option;

    // 如果存在，则清空
    if (this.timer) {
      clearTimeout(this.timer);
      // 计数
      this.clickCount++;
    }

    this.timer = (setTimeout(() => {
      this.clickCount = 0;
      this.timer = undefined;
    }, interval) as unknown) as number;

    if (this.clickCount >= clicks - 1) {
      this.clickCount = 0;
      this.showInput(e);
    } else {
      this.hideInput();
    }
  };

  /**
   * popover 的形式显示 comment
   * @param e
   */
  private showComment = (e: MouseEvent) => {
    const target = (e.target || e.srcElement) as HTMLElement;
    // 判断是否匹配目标元素
    const cls = target.getAttribute('class');
    if (cls && cls.indexOf('clz-comment-dot') !== -1) {
      const id = target.getAttribute('id');
      const x = target.getAttribute('data-x');
      const y = target.getAttribute('data-y');
      const content = target.getAttribute('data-content');
      const color = Number(target.getAttribute('data-color'));

      if (content && x && y && id !== this.newComment.id) {
        this.$comment.style.color = getTextColor(color);
        this.$comment.style.background = getColor(color);
        this.$comment.style.left = `${e.clientX}px`;
        this.$comment.style.top = `${e.clientY + 16}px`;
        this.$comment.innerHTML = content;
        this.$comment.style.display = 'inline-block';
      }
    }
  };

  private hideComment = () => {
    this.$comment.style.display = 'none';
  };

  private onKeydown = (e: KeyboardEvent) => {
    if (e && e.keyCode === 13) {
      e.preventDefault();
      // @ts-ignore
      const content = this.$textarea.value;

      // check
      const pass = content && content.length >= 6;

      const comment = {
        ...this.newComment,
        content: escape(content),
      };

      this.hideInput();

      if (pass) {
        this.onShoot(comment);
        this.render(comment);
      }
    } else if (e && e.keyCode === 27) {
      // escape
      this.hideInput();
    }
  };

  private createContainerDOM(): HTMLElement {
    const div = this.createDiv();
    div.setAttribute('class', 'clz-container');
    return div;
  }

  /**
   * 创建一个小圆点
   * @param comment
   */
  private createDotDOM(comment: Comment): HTMLElement {
    const { id, x, y, content, time, ua, color } = comment;
    const div = this.createDiv(this.$container);

    div.setAttribute('id', id);
    div.setAttribute('data-content', content);
    div.setAttribute('data-time', `${time.getTime()}`);
    div.setAttribute('data-x', `${x}`);
    div.setAttribute('data-y', `${y}`);
    div.setAttribute('data-ua', ua);
    div.setAttribute('data-color', `${color}`);

    div.setAttribute('class', 'clz-comment-dot');

    div.style.background = getColor(color);
    div.style.left = `${x}%`;
    div.style.top = `${y}px`;

    return div;
  }

  private createDiv(container = document.body): HTMLElement {
    const div = document.createElement('div');

    container.appendChild(div);

    return div;
  }
}
