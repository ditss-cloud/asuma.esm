import fs from 'fs';
import path from 'path';

export async function loadPlugins() {
  const plugins = [];
  const pluginsDir = path.resolve('./plugins');
  for (const file of fs.readdirSync(pluginsDir)) {
    if (!file.endsWith('.js')) continue;
    const pluginModule = await import(path.join(pluginsDir, file));
    plugins.push(pluginModule.default || pluginModule);
  }
  return plugins;
}
