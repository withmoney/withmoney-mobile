<template>
  <form>
    <md-card>
      <md-card-content>
        <md-field>
          <label for="name">Name</label>
          <md-input v-model="nameMutable" id="name" />
        </md-field>
        <md-field>
          <label for="type">Type</label>
          <md-select v-model="typeMutable" name="type" id="type">
            <md-option v-for="option in typeOptions"
              :key="option.id"
              :value="option.id"
              :id="`type-${option.id}`"
            >
              {{option.name}}
            </md-option>
          </md-select>
        </md-field>
      </md-card-content>
      <md-card-actions>
        <md-button
        class="md-primary"
        @click="save"
        :disabled="isLoading"
        id="save"
      >Save</md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'out',
    },
    onSave: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      nameMutable: this.name,
      typeMutable: this.type,
      typeOptions: [
        {
          id: 'out',
          name: 'Saida',
        },
        {
          id: 'in',
          name: 'Entrada',
        },
      ],
    };
  },
  methods: {
    async save() {
      this.isLoading = true;

      await this.onSave({
        name: this.nameMutable,
        type: this.typeMutable,
      });

      this.isLoading = false;
    },
  },
};
</script>
