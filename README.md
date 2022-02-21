
<p align="center">
  <img src="./source/mmt-logo.png" width="300" />
</p>


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

例如我每次开发一些项目的时候都会用到 docker ，但是不同的项目想启动不同的实例。这个时候我就需要在电脑重启的时候启动对应的实例了。

```
mmt add dc "docker restart 0d0awew0d";
mmt add dc "docker restart 1d1awew0d";

mmt run dc
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





