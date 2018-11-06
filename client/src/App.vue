<template>
  <div id="app">
    <md-app md-waterfall md-mode="fixed-last">

      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>

            <router-link to="/" class="md-button btn-line-height-fix home-btn" :class="`md-theme-${$material.currentTheme}`">
              Large
            </router-link>
          </div>

          <div class="md-toolbar-section-end">
            <!-- <md-button class="md-icon-button">
              <md-icon>more_vert</md-icon>
            </md-button> -->
            <router-link
              v-if="!$store.state.isUserLoggedIn"
              to="/login"
              class="md-button btn-line-height-fix"
              :class="`md-theme-${$material.currentTheme}`">
              Login
            </router-link>
            <router-link
              v-if="!$store.state.isUserLoggedIn"
              to="/signup"
              class="md-button btn-line-height-fix"
              :class="`md-theme-${$material.currentTheme}`">
              Signup
            </router-link>
            <md-button
              v-if="$store.state.isUserLoggedIn"
              @click="logout"
              class="md-button btn-line-height-fix"
              :class="`md-theme-${$material.currentTheme}`">
              Logout
            </md-button>

            <md-button
              v-if="$router.history.current.path === '/posts'"
              to="/posts/new"
              class="md-fab md-primary md-bottom-right md-fixed top-right-fab">
              <md-icon>add</md-icon>
            </md-button>
          </div>
        </div>

        <div class="md-toolbar-row">
          <md-tabs :md-active-tab="activeTab" class="md-primary">
            <md-tab
              @click="navTo('/')"
              id="tab-home"
              md-label="Home">
            </md-tab>
            <md-tab
              @click="navTo('/posts')"
              id="tab-posts"
              md-label="Posts">
            </md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item @click="handleSideNavClick('/posts/new')">
            <md-icon>insert_drive_file</md-icon>
            <span class="md-list-item-text">New Post</span>
          </md-list-item>

          <md-list-item @click="handleSideNavClick('/posts')">
            <md-icon>edit</md-icon>
            <span class="md-list-item-text">Manage Posts</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    menuVisible: false,
    activeTab: null,
  }),
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push('/login')
    },
    navTo (route) {
      this.$router.push(route)
    },
    handleSideNavClick (route) {
      this.menuVisible = false
      this.$router.push(route)
    },
    getTabState () {
      return this.$router.history.current.name === 'Home' ? 'tab-home' : 'tab-posts'
    }
  },
  mounted () {
    this.activeTab = this.$router.history.current.name === 'Home' ? 'tab-home' : 'tab-posts'
  }
}
</script>

<style lang="scss">
#app, .md-app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app, .md-app {
  height: 100vh;
  width: 100vw;
  position: fixed;
}
.btn-line-height-fix {
  line-height: 40px;
}
.home-btn {
  text-transform: none;
  font-size: 20px;
}
.top-right-fab {
  top: 140px;
}
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(black, A200), // The primary color of your application
  accent: md-get-palette-color(gray, A200) // The accent or secondary color
));

@import "~vue-material/dist/theme/all"; // Apply the theme
</style>
