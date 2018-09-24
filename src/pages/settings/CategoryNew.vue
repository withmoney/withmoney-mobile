<template>
  <div class="full-height">
    <md-toolbar class="toolbar">
      <router-link to="/settings/categories">
        <md-button class="md-icon-button">
          <md-icon>keyboard_backspace</md-icon>
        </md-button>
      </router-link>
      <h3 class="md-title">Nova Categoria</h3>
    </md-toolbar>
    <div class="content-scroll">
      <category-form :onSave="onSave"/>
    </div>
  </div>
</template>

<script>
import CategoryForm from '../../components/forms/Category';
import Categories from '../../services/categories';

export default {
  components: {
    CategoryForm,
  },
  methods: {
    async onSave(data) {
      const category = await Categories.create(data);

      if (category.id) {
        this.$store.dispatch('showFlashMessage', 'Categoria salva com sucesso!');
      }

      this.$router.push({
        path: '/settings/categories',
      });
    },
  },
};
</script>
