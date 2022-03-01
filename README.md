
<p align="center">
  <img src="./source/mmt-logo.png" width="300" />
</p>

<p align="center">
    <a href="https://npmcharts.com/compare/mmt?minimal=true" rel="nofollow"><img src="https://img.shields.io/npm/dm/mmt.svg" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/mmt" rel="nofollow"><img src="https://img.shields.io/npm/v/mmt.svg" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/mmt" rel="nofollow"><img src="https://img.shields.io/npm/l/mmt.svg?style=flat" style="max-width:100%;"></a>
</p>

使用其他语言阅读: 简体中文 | [English](./README_en.md)

# 介绍

MMT (Manage Multiple Task) 是一个多任务流程的管理命令工具，专注解放你的生产力。


# 安装
```
npm i -g mmt
```
## 使用

```bash
mmt add-sync hello "echo 'hello1' "
mmt add-sync hello "echo 'hello2' "

mmt run hello
> hello1
> hello2
```

## API

### add

支持平台: Mac/Linux

添加一个异步任务，任务会以新建一个 tab 页启动。

常见场景:

当我们有一个全栈服务的时候，我们需要启动前端和后端，这个时候我们每次都需要麻烦的切换 tab 页，然后启动两个服务

示例:
例如我的另一个项目「木及简历」是一个全栈项目，这个时候我想要快速启动前后端就可以这样做。
```
mmt add muji "cd frontend/path && npm run start";
mmt add muji "cd server/path && npm run dev";

mmt run muji
```
此时会新开两个 tab 页面运行前端和后端服务。

### add-sync

添加一个同步任务，任务会在当前页面直接执行。

常见场景：

每当我们需要切换项目的时候，有一些预制环境，mmt能够帮助我们处理这些情况。例如我的某个本地项目需要依赖两个容器环境 e8a47b8aed91 和 e0d433a26388 这个时候运行mmt 将会自动执行命令。

```
mmt add-sync start-docker "docker restart e8a47b8aed91";
mmt add-sync start-docker "docker restart e0d433a26388";

mmt run start-docker

> docker restart e8a47b8aed91
> docker restart e0d433a26388
```
此时会在当前 tab 页里，一次运行以上两个命令


### ls

列出当前任务有哪些命令

```
mmt ls muji

> cd frontend/path && npm run start
> cd server/path && npm run dev

```

### rm
删除一个任务

`mmt rm <task>`

```
mmt rm muji
> delete muji task success!
```

### run

运行一个任务

`mmt run <task>`

```
mmt run muji
```

### export

`mmt export <task>`

导出所有配置
```
mmt export all
```

导出单个配置

```
mmt export muji
```




