## 简介

[vue-visual-drag](https://biubiubiu01.github.io/vue-visual-drag/#/) 是一个基于vue+element开发的大屏可视化拖拽项目，目前已经实现柱状图、折线图、饼图、水球图、词云图、地图、Table表和日期等的拖拽和配置具体属性，有兴趣可以看看，如果对你有帮助，可以给个star。


预览地址：[点击预览](https://biubiubiu01.github.io/vue-visual-drag/#/)

话不多说，上图：

![输入图片说明](https://images.gitee.com/uploads/images/2021/0824/181813_efa87a25_7647779.png "微信图片_20210824181724.png")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0824/181904_168bb0df_7647779.jpeg "img_1629800187845.jpg")

## 功能描述

 **页面分为左边中间和右边三部分** 

最左边是 图形列表页，可以选择对应的图形拖拽到中间画布上面；

中间 主要是头部功能按钮，从左到右分别是 预览、清除画布所有内容、生成代码(开发中...)、生成图片、编辑数据源、切换背景；

右边 是图形配置菜单，可以根据你得喜欢自己配置。


### 文件目录说明
```

├── public                           ---静态资源文件
├── src           
│  ├── assets                        ---图片和左边图形列表配置
│  ├── components                    ---可复用的vue组件
│  ├── icon                          ---图标
│  ├── mixins                        ---混入
│  ├── router                        ---路由
│  ├── store                         ---vuex
│  ├── styles                        ---sass样式
│  ├── utils                         ---方法函数
│  ├── views                         ---页面
│  ├── App.vue                       
│  ├── main.js            
│  ├── permission.js                 ---路由拦截           
├── tests                            ---单元测试文件
├── .browserslistrc
├── .env
├── .eslintrc.js
├──  babel.config.js
├── .jest.config.js                  ---jest的配置
├──  package.json
├──  package-lock.json
├──  README.md
└──  vue.config.js                   ---webpack的配置


```


 
## 安装

```
# 克隆项目
git clone https://github.com/biubiubiu01/vue-visual-drag.git
# 进入项目目录
cd vue-visual-drag
# 安装依赖
npm install
# 本地开发 启动项目
npm run serve
```


### 部署

```
# 打包项目
npm run build

```

## Online Demo

[预览Demo](https://biubiubiu01.github.io/vue-visual-drag/#/)

## 最后

开源不易，若觉得这个项目对你有用，可以点个[star](https://github.com/biubiubiu01/vue-visual-drag)，欢迎提出建议和bug :smile: 。




