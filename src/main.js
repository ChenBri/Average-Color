import { createApp } from 'vue'
import App from './App.vue'
import { VueClipboard } from '@soerenmartius/vue3-clipboard'
import './index.css'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
 
library.add(fas);

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(VueClipboard)
.mount('#app')

