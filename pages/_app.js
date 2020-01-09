import { Provider } from "react-redux"
import App from "next/app"
import withRedux from "next-redux-wrapper"
import Router from "next/router"
import NProgress from "nprogress"
import { makeStore } from "../store"

import "../styles/main.scss"

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		return {
			pageProps: {
				...(Component.getInitialProps
					? await Component.getInitialProps(ctx)
					: {})
			}
		}
	}

	componentDidMount() {
		Router.events.on("routeChangeStart", () => NProgress.start())
		Router.events.on("routeChangeComplete", () => NProgress.done())
		Router.events.on("routeChangeError", () => NProgress.done())
	}

	render() {
		const { Component, pageProps, store } = this.props
		return (
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		)
	}
}

export default withRedux(makeStore)(MyApp)