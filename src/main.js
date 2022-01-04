
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import './custom.scss'

const app = createApp(App)

app.config.globalProperties.$filters = {
    shortText(value, length) {
        if (value.length < length ) return value;
        let temp = "";
        for(let x=0; x < length; x++) {
            temp = temp + value[x];
        }
        return temp + ' ...';
    }
}

app.use(store)
app.use(router)
app.mount('#app')
