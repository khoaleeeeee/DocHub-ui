import { d as set_current_component, r as run_all, f as current_component, c as create_ssr_component, h as add_attribute, i as each, e as escape } from "../../chunks/ssr.js";
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function parseCustomMarkdown(text) {
  return text.replace(/###\s*(.+)/g, "<h3>$1</h3>").replace(
    /\*\*(.+?)\*\*/g,
    "<strong>$1</strong>"
    // Convert **text** into <strong>text</strong>
  ).replace(/---/g, "<hr>");
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let userInput = "";
  let messages = [
    {
      sender: "assistant",
      text: parseCustomMarkdown("### **Welcome** to the chat! How can I assist you today? ---")
    }
  ];
  let chatContainer;
  const scrollToBottom = () => {
  };
  {
    if (messages.length) {
      tick().then(() => scrollToBottom());
    }
  }
  return `<div class="flex flex-col h-screen w-screen border border-gray-300 rounded-lg p-4 shadow-lg"><div class="flex-grow overflow-y-auto space-y-4 mb-4"${add_attribute("this", chatContainer, 0)}>${each(messages, (message) => {
    return `<div class="${"flex " + escape(
      message.sender === "user" ? "justify-end" : "justify-start",
      true
    )}"><div class="${escape(
      message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black",
      true
    ) + " rounded-lg px-4 py-2 max-w-xl break-words"}"><!-- HTML_TAG_START -->${message.text}<!-- HTML_TAG_END --> </div> </div>`;
  })}</div> <div class="flex"><input type="text" placeholder="Type a message..." class="flex-grow px-4 py-2 rounded-lg border border-gray-300 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"${add_attribute("value", userInput, 0)}> <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200" data-svelte-h="svelte-utolj2">Send</button></div></div>`;
});
export {
  Page as default
};
