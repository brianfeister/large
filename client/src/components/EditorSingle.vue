<template>
  <div>

    <form novalidate class="md-layout md-alignment-top-center" @submit.prevent="submitForm">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div
            v-if="$router.history.current.path.match('new')"
            class="md-title">
            New Post
          </div>
          <div
            v-if="$router.history.current.path.match('edit')"
            class="md-title">
            Edit Post
          </div>
        </md-card-header>

        <md-card-content>
          <md-field :class="getValidationClass('title')">
            <label for="title">Title</label>
            <md-input type="text" title="title" id="title" autocomplete="title" v-model="form.title" :disabled="saving" />
            <span class="md-error" v-if="!$v.form.title.required">The title is required</span>
          </md-field>

          <editor class="editor" :extensions="extensions" ref="editor">

            <div class="menubar" slot="menubar" slot-scope="{ nodes, marks }">
              <div v-if="nodes && marks">

                <md-button
                  class="md-icon-button"
                  :class="{ 'is-active': marks.bold.active() }"
                  @click="marks.bold.command"
                >
                  <md-icon>format_bold</md-icon>
                </md-button>

                <md-button
                  class="md-icon-button"
                  :class="{ 'is-active': marks.italic.active() }"
                  @click="marks.italic.command"
                >
                  <md-icon>format_italic</md-icon>
                </md-button>

                <md-button
                  class="md-icon-button"
                  @click="marks.code.command"
                  :class="{ 'is-active': marks.code.active() }
                ">
                  <md-icon>code</md-icon>
                </md-button>

                <md-button
                  class="md-icon-button"
                  :class="{ 'is-active': nodes.paragraph.active() }"
                  @click="nodes.paragraph.command"
                >
                  <md-icon>format_textdirection_l_to_r</md-icon>
                </md-button>

                <md-button
                  class="md-icon-button"
                  :class="{ 'is-active': nodes.heading.active({ level: 1 }) }"
                  @click="nodes.heading.command({ level: 1 })"
                >
                  H1
                </md-button>

                <md-button
                  class="md-icon-button"
                  :class="{ 'is-active': nodes.heading.active({ level: 2 }) }"
                  @click="nodes.heading.command({ level: 2 })"
                >
                  H2
                </md-button>

                <md-button
                  class="md-icon-button"
                  :class="{ 'is-active': nodes.heading.active({ level: 3 }) }"
                  @click="nodes.heading.command({ level: 3 })"
                >
                  H3
                </md-button>

                <md-button
                  class="md-icon-button"
                  :class="{ 'is-active': nodes.bullet_list.active() }"
                  @click="nodes.bullet_list.command"
                >
                  <md-icon>list</md-icon>
                </md-button>

                <md-button
                  class="md-icon-button"
                  :class="{ 'is-active': nodes.ordered_list.active() }"
                  @click="nodes.ordered_list.command"
                >
                  <md-icon>format_list_numbered</md-icon>
                </md-button>

                <md-button
                  class="md-icon-button"
                  :class="{ 'is-active': nodes.code_block.active() }"
                  @click="nodes.code_block.command"
                >
                  <md-icon>subtitles</md-icon>
                </md-button>

                <md-button
                  class="md-icon-button"
                  @click="showImagePrompt(nodes.image.command)"
                >
                  <md-icon>image</md-icon>
                </md-button>

              </div>
            </div>

            <div class="editor__content" slot="content" slot-scope="props">
            </div>

          </editor>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="saving" />

        <md-card-actions>
          <md-button @click="deletePost" class="md-primary" :disabled="saving">Delete</md-button>
          <md-button type="submit" class="md-primary" :disabled="saving">Save</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar
        :md-active.sync="postSaveFailed"
        :md-duration="Infinity"
        md-position="center"
        md-persistent
      >
        {{ postSaveFailedMsg }}
      </md-snackbar>
    </form>

  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
} from 'vuelidate/lib/validators'

import Posts from '@/services/Posts'
import { Editor } from 'tiptap'
import {
  // Nodes
  BlockquoteNode,
  CodeBlockNode,
  CodeBlockHighlightNode,
  HardBreakNode,
  HeadingNode,
  ImageNode,
  OrderedListNode,
  BulletListNode,
  ListItemNode,
  TodoItemNode,
  TodoListNode,

  // Marks
  BoldMark,
  CodeMark,
  ItalicMark,
  LinkMark,
  StrikeMark,
  UnderlineMark,

  // General Extensions
  HistoryExtension,
  PlaceholderExtension,
} from 'tiptap-extensions'

export default {
  components: {
    Editor,
  },
  mixins: [validationMixin],
  data: () => ({
    extensions: [
      new BlockquoteNode(),
      new BulletListNode(),
      new CodeBlockNode(),
      new CodeBlockHighlightNode(),
      new HardBreakNode(),
      new HeadingNode({ maxLevel: 3 }),
      new ImageNode(),
      new ListItemNode(),
      new OrderedListNode(),
      new TodoItemNode(),
      new TodoListNode(),
      new BoldMark(),
      new CodeMark(),
      new ItalicMark(),
      new LinkMark(),
      new StrikeMark(),
      new UnderlineMark(),
      new HistoryExtension(),
      new PlaceholderExtension(),
    ],
    json: 'Update content to see changes',
    html: 'Update content to see changes',
    form: {
      title: null,
    },
    saving: false,
    postSaveFailed: false,
    postSaveFailedMsg: '',
  }),
  validations: {
    form: {
      title: {
        required,
      },
    }
  },
  methods: {
    setContent (doc) {
      this.json = doc
      this.$refs.editor.setContent(doc, true)
      this.$refs.editor.focus()
    },
    async submitForm () {
      try {
        this.postSaveFailed = false
        this.saving = true
        if (this.$router.history.current.path.match('edit')) {
          await this.updatePost()
        } else {
          await this.savePost()
        }
      } catch (e) {
        this.saving = false
        this.postSaveFailed = true
        this.postSaveFailedMsg = e
      }
      this.saving = false
    },
    async updatePost () {
      try {
        const uuid = this.$router.history.current.params.uuid
        await Posts.update(uuid, {
          title: this.form.title,
          createdBy: this.$store.state.user.email || 'Anonymous',
          content: this.$refs.editor.getJSON(),
        })
      } catch (e) {
        throw e
      }
    },
    async savePost () {
      try {
        await Posts.create({
          title: this.form.title,
          createdBy: this.$store.state.user.email || 'Anonymous',
          content: this.$refs.editor.getJSON(),
        })
      } catch (e) {
        throw e
      }
    },
    async deletePost () {
      this.saving = true
      const uuid = this.$router.history.current.params.uuid
      await Posts.delete(uuid)
      this.saving = false
    },
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
  },
  async mounted () {
    if (this.$router.history.current.params.uuid) {
      const res = await Posts.get(this.$router.history.current.params.uuid)
      this.form.title = res.data.title
      this.setContent(res.data.content, true)
    }
  }
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
  border: 1px solid black;
  max-width: 30rem;
  margin: 0 auto 2rem auto;
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
