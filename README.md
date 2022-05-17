
<p align="center">
  <img src="./source/mmt-logo.png" width="300" />
</p>

<p align="center">
    <a href="https://npmcharts.com/compare/mmt?minimal=true" rel="nofollow"><img src="https://img.shields.io/npm/dm/mmt.svg" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/mmt" rel="nofollow"><img src="https://img.shields.io/npm/v/mmt.svg" style="max-width:100%;"></a>
    <a href="https://www.npmjs.com/package/mmt" rel="nofollow"><img src="https://img.shields.io/npm/l/mmt.svg?style=flat" style="max-width:100%;"></a>
</p>

Read this in other languages: [简体中文](./README.md) | English

# Introduction

MMT (Manage Multiple Task) is a tool for automatically executing multiple commands in MacOS + iTerm2. It only needs to be defined once and run permanently.


# Installation
```
npm i -g mmt
```
## Use

### Case1: Single project with multiple repositories

When your project has two projects, front and back, you always need to remember multiple commands or multiple directories, and opening multiple windows will always be troublesome.

your front end project：case1-front, launch command: `npm run start`

your backend project: case1-backend, launch command: `npm run dev`

Declaration using mmt:
```
> cd path/case1-front
> mmt add case1 start
> cd path/case1-backend
> mmt add case1 dev
```

In any command window:
```
> mmt run case1
```

The effect is the following(Automatically open multiple windows and execute commands in the corresponding windows):

![](./source/case1.gif)

### Case2: Multiple projects and multiple repositories

When you maintain a project with multiple technology stacks alone, you can't remember all the startup command. The start command for a Vue project may be `npm run serve`, while for a React project it is `npm run start`, and some projects may also be `npm run dev`. Using mmt can smooth out this difference and you don't have to memorize your project path.

your project1: projec1-vue, launch command `npm run serve`
your project2: projec2-react, launch command `npm run start`

Declaration using mmt:
```
> cd path/projec1-vue
> mmt add project1 serve
> cd path/projec2-react
> mmt add project2 start
```

In any command window:
```
> mmt run project1
> mmt run project2
```

The effect is the following:

![](./source/case2.gif)

### Case3: Script alias

When you want to run some pipeline work synchronously, you can use the `add-sync`. For example, one of my local projects needs to depend on two container environments e8a47b8aed91 and e0d433a26388. At this time, running mmt will automatically execute the command。


```
> mmt add-sync project1-dep "docker restart e8a47b8aed91"
> mmt add-sync project1-dep "docker restart e0d433a26388"
```

In any command window:
```
> mmt run project1-dep
```

![](./source/case3.gif)

## API

### add

Support platform: Mac/Linux

Add an asynchronous task, the task will start with a new tab page.

Common scenarios:

When we have a full stack service, we need to start the frontend and backend. At this time, we need to switch tab pages every time, and then start two services.

For example, my other project "Mujicv" is a full-stack project. At this time, I can do this if I want to quickly start the front-end and back-end.
```
mmt add muji "cd frontend/path && npm run start";
mmt add muji "cd server/path && npm run dev";

mmt run muji
```
At this point, two new tab pages will be opened to run the front-end and back-end services.

### add-sync

Add a synchronization task, the task will be executed directly on the current page.

Common scenarios:

For example, whenever we need to switch projects, there are some pre-made environments and mmt can help us handle those situations. For example, one of my local projects needs to depend on two container environments e8a47b8aed91 and e0d433a26388. At this time, running mmt will automatically execute the command.

```
mmt add-sync start-docker "docker restart e8a47b8aed91";
mmt add-sync start-docker "docker restart e0d433a26388";

mmt run start-docker

> docker restart e8a47b8aed91
> docker restart e0d433a26388
```

### ls

List what commands the current task has.

```
mmt ls muji

> cd frontend/path && npm run start
> cd server/path && npm run dev

```

### rm
Delete a task.

`mmt rm <task>`

```
mmt rm muji
> delete muji task success!
```

### run

Run a task.

`mmt run <task>`

```
mmt run muji
```

### export

`mmt export <task>`

Export all configurations.
```
mmt export all
```

Export a single configuration.

```
mmt export muji
```



## License

MIT

Copyright (c) 2022- 蓝色的秋风

