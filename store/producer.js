export const state = () => ({
	sidebar: false
})

export const mutations = {
	toggleSidebar (state) {
		state.sidebar = !state.sidebar
	}
}

export const actions = {
}
