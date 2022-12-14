import path from 'path';

import { fileURLToPath } from 'url'

const __filenameNew = fileURLToPath(import.meta.url);

const __dirnameNew = path.dirname(__filenameNew);

// Rollup 并不能“开箱即用”地处理 NPM 包的依赖关系
// 插件可以让 Rollup 查找到外部模块, 打包到bundle中
import resolve from '@rollup/plugin-node-resolve';

// 一些库暴露了可以按照原样导入的 ES 模块——the-answer 就是这样的一种模块。
// 但目前，大多数的 NPM 包暴露的都是 CommonJS 模块。在此更改之前，我们需要将 CommonJS 转换为 ES2015，这样 Rollup 才能处理它们。
import commonjs from '@rollup/plugin-commonjs';

import json from '@rollup/plugin-json';

import typescript from 'rollup-plugin-typescript2';

import babel from '@rollup/plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core';

export default {
  input: path.resolve(__dirnameNew, './src/index.ts'),
  output: [
    {
      dir: path.resolve(__dirnameNew, 'dist/esm'),
      format: 'esm', // 通过esm格式输出
    }
  ],
  // 关键属性，只有将其设置为 `true` 才能保证只编译、不打包
  preserveModules: true,
  plugins: [
    resolve(),
    json(),
    commonjs(),
    typescript(),
    babel({ 
      // 编译库使用 
      babelHelpers: 'runtime', 
      // 只转换源代码，不转换外部依赖 
      exclude: 'node_modules/**', 
      // babel 默认不支持 ts 需要手动添加 
      extensions: [
          ...DEFAULT_EXTENSIONS, 
          '.ts', 
      ], 
  }), 
  ]
}