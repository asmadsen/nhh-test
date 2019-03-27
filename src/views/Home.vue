<template>
  <v-card>
    <v-card-text>
      <v-text-field v-model="firstName" label="First name" />
      <v-text-field v-model="lastName"  label="Last name" />
      <p>Then your full name is: {{ fullName }}</p>
      <v-text-field label="Search" v-model="search" />
      <HelloWorld :person="personObject" url="fullName" @click="componentClicked"></HelloWorld>

    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue'
import gql from 'graphql-tag'
import { Recipe, vxm } from '@/store'

@Component({
  components: { HelloWorld }
})
export default class Home extends Vue {
  firstName = ''
  lastName = ''
  search = ''
  searchResults : any[] = []

  get fullName () {
    return this.firstName + ' ' + this.lastName
  }

  get personObject () {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.fullName
    }
  }

  get recipes () : Recipe[] {
    return vxm.recipe.recipes
  }

  mounted () {
    vxm.recipe.fetchRecipes()
  }

  @Watch('search')
  onSearchChanged () {
    vxm.recipe.fetchRecipe({id: this.search})
      .then((recipe : Recipe) => {
        console.log(recipe)
      })
      .catch(_ => {
        console.log('catched error')
      })
  }

  componentClicked (textFromEvent) {
    this.$router.push({ name: 'about-something' })
  }
}
</script>
