<template>
  <div id="myposts">
    <posts
      :filter="{ createdBy: $store.state.user.email}"
      subtext="A list of all of YOUR posts"
      pageTitle="My Posts"
      noPostsMsg="No posts by YOU yet..."
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
#myposts {
  margin-top: 40px;
}
</style>
