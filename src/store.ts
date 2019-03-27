import Vue from 'vue'
import Vuex from 'vuex'
import { action, Module, mutation, VuexModule } from 'vuex-class-component/dist'
import { apollo } from '@/vue-apollo'
import gql from 'graphql-tag'

Vue.use(Vuex)

export interface Recipe {
  id?: string
  title?: string
  description?: string
}

@Module({ namespacedPath: 'recipe/' })
export class RecipeModule extends VuexModule {
  recipes: Recipe[] = [
    {
      id: '8',
      title: 'ij'
    }
  ]

  @mutation
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes
  }

  @action()
  async fetchRecipes() {
    const recipes = await apollo.defaultClient.query({
      query: gql`{
        recipes {
          id
          title
          description
        }
      }`
    })
    this.setRecipes(recipes.data.recipes)
  }

  @action()
  async fetchRecipe({ id } : {id: string}) : Promise<Recipe | null> {
    if (!id) throw new Error()
    const recipes = await apollo.defaultClient.query({
      query: gql`query($id: String!){
        recipe(id: $id) {
          id
          title
          description
        }
      }`,
      variables: {
        id
      }
    })
    return recipes.data.recipe
  }
}

const store = new Vuex.Store({
  modules: {
    recipe: RecipeModule.ExtractVuexModule(RecipeModule)
  }
})

export default store

export const vxm = {
  recipe: RecipeModule.CreateProxy(store, RecipeModule)
}
