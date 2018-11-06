<template>
  <div id="home">
    <posts
      subtext="A list of posts from EVERYONE"
      pageTitle="Home"
      noPostsMsg="No posts by anyone yet..."
    />
  </div>
</template>

<script>
import Posts from '@/components/Posts'
export default {
  name: 'Home',
  components: {
    Posts,
  },
}
</script>

<style>
#home {
  margin-top: 40px;
}
</style>
