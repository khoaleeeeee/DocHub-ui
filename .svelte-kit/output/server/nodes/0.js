

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CJE8NiZM.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.CkIvluxl.js"];
export const stylesheets = ["_app/immutable/assets/0.B4MDdRJi.css"];
export const fonts = [];
