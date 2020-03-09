# clz

> Serverless & Beautiful third-part comment system base on lean cloud. 简洁有趣、无需后端代码的三方评论系统。

[Live Demo 1](https://atool.vip/corevalue/) | [Live Demo 2](https://git.hust.cc/clz)

[![npm Version](https://img.shields.io/npm/v/clz.svg)](https://www.npmjs.com/package/clz)
[![Build Status](https://github.com/hustcc/clz/workflows/build/badge.svg)](https://github.com/hustcc/clz/actions)
[![npm License](https://img.shields.io/npm/l/clz.svg)](https://www.npmjs.com/package/clz)


## Install

```bash
$ npm i --save clz
```


## Usage

```ts
import CLZ from 'clz';

// 注意换成你自己的，去 leancloud 免费创建即可获取
const c = new CLZ({
  appId: 'KO2rVJq8lMvgaYkEMhrUxgGn-gzGzoHsz',
  appKey: '3UEp42VPz1kc731PeKDYKY7Q',
  serverURLs: 'https://ko2rvjq8.lc-cn-n1-shared.com',
  page: 'clz',
});

// 处理当前页面
c.launch();

// or update 
c.clear();

c.updatePage('your page key'); // default is `pathname`.

c.launch();
```


## Option

 - `appId`：leancloud 应用的 appId；
 - `appKey`：leancloud 应用的 appKey；
 - `serverURLs`：leancloud 应用的 serverURLs；
 - `page`：页面唯一标识，默认是根据 url 中的 `pathname` 标识；
 - `clicks`：触发评论的点击次数，默认是 `2`，也就是双击；
 - `interval`：连续点击的间隔时间，默认为 `200` 毫秒；


## Apply

> 在 leancloud 中注册账号，然后申请免费应用，即可获得对应的 `appId`、`appKey`，`serverURLs` 可使用提供的共享地址，不过最好绑定二级域名，使用自己的域名地址。

1. 进入 [leancloud](https://leancloud.cn/dashboard/applist.html#/apps) 控制台，创建应用（免费的即够用）
2. 在应用设置 - 应用 Keys 页面
3. 复制 `appId`、`appKey`、`serverURLs` 作为程序的配置
4. 你也可以在存储管理中，去管理所有的评论



## License

MIT@[hustcc](https://github.com/hustcc).
