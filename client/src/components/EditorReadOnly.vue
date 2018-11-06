<template>
  <div>

    <div class="md-headline">
      {{ post.title }}
      <md-button class="md-icon-button icon-in-title" @click="navTo(`posts/${ post.uuid }/edit`)">
        <md-icon>edit</md-icon>
      </md-button>
      <md-button class="md-icon-button icon-in-title" @click="deletePost(post.uuid)">
        <md-icon>delete</md-icon>
      </md-button>
    </div>
    <br />
    <strong>Created by</strong>: {{ post.createdBy }}
    <br /><br />
    <strong><u>Post preview</u></strong>:
    <br />

    <editor :editable="false" class="editor" :extensions="extensions" ref="editor">

      <div class="editor__content" slot="content" slot-scope="props">
      </div>

    </editor>

  </div>
</template>

<script>
import Posts from '@/services/Posts'
import { Editor } from 'tiptap'
import {
  BlockquoteNode,
  CodeBlockNode,
  HardBreakNode,
  HeadingNode,
  OrderedListNode,
  BulletListNode,
  ImageNode,
  ListItemNode,
  TodoItemNode,
  TodoListNode,
  BoldMark,
  CodeMark,
  ItalicMark,
  LinkMark,
  HistoryExtension,
} from 'tiptap-extensions'

export default {
  props: [
    'post'
  ],
  components: {
    Editor,
  },
  data () {
    return {
      extensions: [
        new BlockquoteNode(),
        new BulletListNode(),
        new CodeBlockNode(),
        new HardBreakNode(),
        new HeadingNode({ maxLevel: 3 }),
        new ListItemNode(),
        new OrderedListNode(),
        new TodoItemNode(),
        new TodoListNode(),
        new BoldMark(),
        new ImageNode(),
        new CodeMark(),
        new ItalicMark(),
        new LinkMark(),
        new HistoryExtension(),
      ],
      json: '',
      html: '',
    }
  },
  methods: {
    setContent (doc) {
      this.$refs.editor.setContent(doc, true)
      this.$refs.editor.focus()
    },
    navTo (route) {
      this.$router.push(route)
    },
    async deletePost (uuid) {
      await Posts.delete(uuid)
      this.$parent.getPosts()
    }
  },
  mounted () {
    this.setContent(this.post.content)
  },
}
</script>

<style lang="scss" scoped>
$color-black: #000000;
$color-white: #ffffff;

.actions {
  max-width: 30rem;
  margin: 0 auto 2rem auto;
}
.editor__content {
  max-width: 30rem;
  margin: 1rem auto 2rem auto;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.1);
  pre {
    padding: 1rem;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: bold;
    background: rgba($color-black, 0.05);
    color: rgba($color-black, 0.8);
  }
  code {
    display: block;
    white-space: pre-wrap;
    background: rgba($color-black, 0.05);
    color: rgba($color-black, 0.8);
  }
}
.icon-in-title {
  line-height: 20px;
  margin-top: -4px;
  margin-right: -15px;
}
</style>
