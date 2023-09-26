const path = require('path')
const fs = require('fs')
const srcPath = path.join(__dirname, 'src') + path.sep
const outputPath = path.join(__dirname, 'build')
const widgetWebpack = require('materia-widget-development-kit/webpack-widget')

const rules = widgetWebpack.getDefaultRules()
const copy = widgetWebpack.getDefaultCopyList()

const customCopy = copy.concat([
	{
		from: path.join(__dirname, 'node_modules', 'angular-sortable-view', 'src', 'angular-sortable-view.min.js'),
		to: path.join(outputPath, 'vendor'),
	},
	{
		from: path.join(__dirname,'src','_exports','playdata_exporters.php'),
		to: path.join(outputPath,'_exports/','playdata_exporters.php')
	},
	{
		from: path.join(__dirname, 'src', '_guides', 'assets'),
		to: path.join(outputPath, 'guides', 'assets'),
		toType: 'dir'
	}
])

const entries = {
	'player': [
		path.join(srcPath, 'player.html'),
		path.join(srcPath, 'player.coffee'),
		path.join(srcPath, 'player.scss')
	],
	'creator': [
		path.join(srcPath, 'creator.html'),
		path.join(srcPath, 'creator.coffee'),
		path.join(srcPath, 'creator.scss')
	],
	'scorescreen': [
		path.join(srcPath, 'scorescreen.html'),
		path.join(srcPath, 'scorescreen.coffee'),
		path.join(srcPath, 'scorescreen.scss')
	]
}

let customRules = [
	rules.loaderDoNothingToJs,
	rules.loaderCompileCoffee,
	rules.copyImages,
	rules.loadHTMLAndReplaceMateriaScripts,
	rules.loadAndPrefixSASS,
]


// options for the build
let options = {
	entries: entries,
	copyList: customCopy,
	moduleRules: customRules
}

module.exports = widgetWebpack.getLegacyWidgetBuildConfig(options)
