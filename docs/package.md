### 字段

#### type

这个字段决定了 Node.js 环境下 .js 文件的模块解析方式，默认值commonjs，有两种取值：

- commonjs：使用 Node.js 的 CommonJS 模块解析方式，.js 文件默认使用 CommonJS 模块解析方式。
  - 使用require语法，如果需要import语法，文件后缀名用.mjs，比如[eslint配置](/eslint.config.mjs)
- module：使用 Node.js 的 ES 模块解析方式，.js 文件默认使用 ES 模块解析方式。
  - 使用import语法，如果需要require语法，文件后缀名用.cjs

区别点：

| 维度       | ESModule（ESM）                                                                       | CommonJS（CJS）                                                                     |
| ---------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 加载时机   | 静态编译时解析（编译阶段确定依赖关系）                                                | 动态运行时加载（执行到 require 时加载）                                             |
| 模块特性   | 只读导出（导出值不可修改）<br/>静态结构（支持 Tree-shaking）<br/>顶层 await（ES2022） | 可变导出（导出值可以修改）<br/>动态结构（不支持 Tree-shaking）<br/>不支持顶层 await |
| 文件扩展名 | .mjs或.js(type为module)                                                               | .cjs或.js(type为commonjs)                                                           |
| 错误处理   | 导入不存在的模块会立即抛出错误                                                        | 运行时才会发现依赖问题                                                              |
