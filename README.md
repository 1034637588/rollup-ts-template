最常见的三种情况：
在构建工具中引入（esm）
在页面中直接引入（umd）
在nodejs 环境中使用 (cjs)

通过参考目前开源社区的实现方式，我们还可以发现，通常一个开源库的 esm 产出物，并不是和 rollup 默认行为那样“把所有文件打包成一个 index.esm.js”，而是：
只编译，不打包；（这样就能完美支持按需引入了）

使用 esbuild 进行 ts => js 的编译
使用 TypeScript 进行 .d.ts 文件的编译；