<template>
  <div class="full-height">
    <md-toolbar class="toolbar">
      <router-link to="/settings">
        <md-button class="md-icon-button">
          <md-icon>keyboard_backspace</md-icon>
        </md-button>
      </router-link>
      <h3 class="md-title">Categorias</h3>
    </md-toolbar>
    <div class="content-scroll">
      <md-content>
        <md-list v-for="category in categories" :key="category.id">
          <md-list-item :to="`/settings/categories/edit/${category.id}`">
            <span>{{category.name}}</span>
          </md-list-item>
        </md-list>
      </md-content>

      <md-button
        class="md-fab md-primary menu-speed"
        to="/settings/categories/new"
      >
        <md-icon>note_add</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
import Categories from '../../services/categories';

export default {
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    async getCategories() {
      const { data } = await Categories.list();

      this.categories = data;
    },
  },
  created() {
    this.getCategories();
  },
};
</script>
