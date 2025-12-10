const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const outdir = path.join(__dirname, '..', 'dist');

// 确保 dist 目录存在
if (!fs.existsSync(outdir)) {
  fs.mkdirSync(outdir, { recursive: true });
}

async function build() {
  try {
    // 构建非压缩版本
    console.log('Building browser bundle (unminified)...');
    await esbuild.build({
      entryPoints: [path.join(__dirname, '..', 'src', 'index.ts')],
      bundle: true,
      format: 'iife',
      globalName: 'HxhFrameApi',
      outfile: path.join(outdir, 'huixinghao-frame-api.browser.js'),
      external: ['eventemitter3'],
      sourcemap: true,
    });
    console.log('✓ Browser bundle created: huixinghao-frame-api.browser.js');

    // 构建压缩版本
    console.log('Building browser bundle (minified)...');
    await esbuild.build({
      entryPoints: [path.join(__dirname, '..', 'src', 'index.ts')],
      bundle: true,
      format: 'iife',
      globalName: 'HxhFrameApi',
      outfile: path.join(outdir, 'huixinghao-frame-api.browser.min.js'),
      external: ['eventemitter3'],
      minify: true,
      sourcemap: true,
    });
    console.log('✓ Minified bundle created: huixinghao-frame-api.browser.min.js');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
