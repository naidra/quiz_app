require("dotenv").config()
const webpack = require("webpack")
const withSass = require("@zeit/next-sass")
const withImages = require('next-images')
const withFonts = require('next-fonts')

module.exports = withFonts(withImages(withSass({
	webpack: (config) => {
		config.plugins.push(
			new webpack.EnvironmentPlugin(process.env)
		)
		return config
	}
})))
