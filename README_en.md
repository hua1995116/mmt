
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

MMT (Manage Multiple Task) is a multi-task process management command tool, focusing on liberating your productivity.


# Installation
```
npm i -g mmt
```
## Use

```bash
mmt add-sync hello "echo 'hello1' "
mmt add-sync hello "echo 'hello2' "

mmt run hello
> hello1
> hello2
```

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

For example, one of my local projects needs to depend on two container environments 0d0awew0d and 1d1awew0d. At this time, running mmt will automatically execute the command.

```
mmt add-sync start-docker "docker restart 0d0awew0d";
mmt add-sync start-docker "docker restart 1d1awew0d";

mmt run start-docker

> docker restart 0d0awew0d
> docker restart 1d1awew0d
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




