<template>
  <div id="posts">
    <div class="md-display-1">{{ pageTitle }}</div>
    <br />
    <p>{{ subtext }}</p>
      <div v-if="loading">
        <br /><br />
        Loading posts...
        <md-progress-bar md-mode="indeterminate"></md-progress-bar>

      </div>
      <div v-if="!loading && posts && posts.length === 0">
        <br />
        <br />
        {{ noPostsMsg }}
        <br />
        <md-button to="/posts/new">add one</md-button>
      </div>
      <div v-for="post in posts" :post="post" :key="post.uuid">
        <md-divider></md-divider>
        <br />
        <editor-read-only :title="post.title" :post="post" />
      </div>
  </div>
</template>

<script>
import Posts from '@/services/Posts'
import EditorReadOnly from '@/components/EditorReadOnly'

export default {
  props: [
    'filter',
    'subtext',
    'pageTitle',
    'noPostsMsg'
  ],
  components: {
    EditorReadOnly,
  },
  async mounted () {
    this.getPosts()
  },
  data () {
    return {
      posts: null,
      loading: false,
    }
  },
  methods: {
    async getPosts () {
      this.loading = true
      const res = await Posts.getAll(this.filter)
      this.posts = res.data.posts
      this.loading = false
    },
    timeout (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
  },
}
</script>

<style>
#posts {
  margin-top: 40px;
}
</style>
