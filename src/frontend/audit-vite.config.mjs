import base from './vite.config.js';
export default (ctx) => ({...base(ctx), cacheDir:'/tmp/dakjangsu-rebrand-vite-cache'});
