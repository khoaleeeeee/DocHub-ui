

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.Dt29NiFs.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.CkIvluxl.js"];
export const stylesheets = [];
export const fonts = [];
