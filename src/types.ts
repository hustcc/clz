export type Option = {
  readonly appId: string;
  readonly appKey: string;
  readonly serverURLs: string;
  readonly clicks?: number;
  readonly interval?: number;
  readonly page?: string;
};

export type Comment = Partial<{
  readonly id: string;
  /** 位置 x */
  readonly x: number;
  /** 位置 y */
  readonly y: number;
  /** 时间 */
  readonly time: Date;
  /** 内容 */
  readonly content: string;
  /** 颜色 */
  readonly color: number;
  /** 用户 UA 信息 */
  readonly ua: string;
  /** 页面标识 */
  readonly page: string;
}>;
