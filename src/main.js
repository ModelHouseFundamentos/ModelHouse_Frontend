import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from "./App.vue";

import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import Button from "primevue/button";
import Image from 'primevue/image';
import router from "@/router";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Password from "primevue/password";
import Card from "primevue/card";
import FileUpload from 'primevue/fileupload';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Paginator from 'primevue/paginator';
import Galleria from 'primevue/galleria';
import Rating from "primevue/rating";
import Dialog from "primevue/dialog";
import Badge from "primevue/badge";
import BadgeDirective from "primevue/badgedirective";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import TieredMenu from "primevue/tieredmenu";

const app = createApp(App);
app.directive('badge', BadgeDirective);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.component('Button', Button);
app.component('pv-image', Image);
app.component('InputText', InputText);
app.component('Toast', Toast);
app.component('Password', Password);
app.component('Card', Card);
app.component('FileUpload',FileUpload);
app.component('InputNumber',InputNumber);
app.component('Textarea', Textarea);
app.component('Paginator', Paginator);
app.component('Galleria', Galleria);
app.component('Rating', Rating);
app.component('Dialog', Dialog);
app.component('Textarea', Textarea);
app.component('Badge', Badge);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('TieredMenu', TieredMenu);

app.mount('#app');

