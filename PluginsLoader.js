import fs from "fs"
import path from "path"
const plugins = new Map()
export async function loadPlugins() {
  const pluginDir = path.join(process.cwd(), "plugins")
  const files = fs.readdirSync(pluginDir).filter(f => f.endsWith(".js"))
  for (let file of files) {
    let pluginPath = path.join(pluginDir, file)
    let pluginModule = (await import(`file://${pluginPath}`)).default
    if (pluginModule?.command) {
      pluginModule.command.forEach(cmd => {
        plugins.set(cmd, pluginModule)
      })
    }
  }
  console.log(`✅ Loaded ${plugins.size} plugins`)
}

export { plugins }
