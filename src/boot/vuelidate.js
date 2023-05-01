import { boot } from 'quasar/wrappers'
import Vuelidate from '@vuelidate/core'

export default boot(({ app }) => {
  app.use(Vuelidate)
})
