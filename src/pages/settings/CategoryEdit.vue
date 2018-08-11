<template>
  <div>
    <md-toolbar>
      <router-link to="/settings/categories">
        <md-button class="md-icon-button">
          <md-icon>keyboard_backspace</md-icon>
        </md-button>
      </router-link>
      <h3 class="md-title" style="flex: 1">Categoria: {{name}}</h3>
      <md-button id="delete" class="md-icon-button" @click="showConfirmDelete = true">
        <md-icon>delete</md-icon>
      </md-button>
    </md-toolbar>
    <category-form
      v-if="category"
      :name="name"
      :type="type"
      :onSave="onSave"
    />
    <md-dialog-confirm
      :md-active.sync="showConfirmDelete"
      md-title="Deseja mesmo excluir essa transação?"
      md-confirm-text="Sim"
      md-cancel-text="Não"
      @md-cancel="showConfirmDelete = false"
      @md-confirm="onConfirm" />
  </div>
</template>

<script>
import CategoryForm from '../../components/forms/Category';
import Categories from '../../services/categories';

export default {
  components: {
    CategoryForm,
  },
  data() {
    return {
      category: null,
      name: '',
      type: 'out',
      showConfirmDelete: false,
    };
  },
  methods: {
    async onSave(data) {
      const category = await Categories.update(this.$route.params.id, data);

      if (category.id) {
        this.$store.dispatch('showFlashMessage', 'Categoria salva com sucesso!');
      }

      this.$router.push({
        path: '/settings/categories',
      });
    },
    async getCategory() {
      const data = await Categories.get(this.$route.params.id);

      this.name = data.name;
      this.type = data.type;

      this.category = data;
    },
    async onConfirm() {
      await Categories.destroy(this.$route.params.id);

      this.$store.dispatch('showFlashMessage', 'Categoria excluida com sucesso');

      this.$router.push({
        path: '/settings/categories',
      });
    },
  },
  created() {
    this.getCategory();
  },
};
</script>
