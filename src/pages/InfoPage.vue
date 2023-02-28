<template>
  <div class="min-h-[100vh] bg-black text-gray-200 py-2 px-1">
    <div class="min-h-[98vh] w-full bg-gray-800 pt-2">
      <back-button
          class="text-white mt-5 p-5 fixed"
          @goBack="goToMainPage()"
      >
      </back-button>

      <div class="text-xl text-center my-2 mx-1">
        Привіт, вітаю тебе на <i>'Не Бери Вінчік!'</i>
      </div>

      <div class="xl:grid xl:grid-cols-10 mt-4 gap-5">
        <div class="xl:col-start-1 xl:col-end-4 my-auto">
          <img src="icon.png" class=" mx-auto">
        </div>
        <div class="xl:col-start-4 xl:col-end-10 col-start-2 col-end-10 text-lg m-5">
          На момент створення сайту наша база даних має близько 15 тисяч анкет киян
          з телеграм боту <a class="text-blue-600 hover:text-blue-400 italic" href="https://t.me/leomatchbot">Дайвінчіку</a>
          різних вікових категорій, а головне, вона постійно оновлюється, та наразі будуть доступні і Ваші міста!

          <br>
          <br>

          Наш програмний додаток не має і ніколи не буде мати на меті образити або принизити когось. Пам'ятайте, Ви
          власноруч викладаєте інформацію про себе в соц. мережах та месенджерах.

          <br>
          <br>

          Цей сайт є показовим прикладом цього.

          <br>
          <br>

          Окремо хотів би звернутися до військовослужбовців. Прошу не викладати фото та відео з собою у військовій формі,
          особливо на фоні військових об'єктів (навіть якщо дуже хочеться), адже ви наражаєте небезпеку не тільки на себе а й на своїх побратимів!

          <br>
          <br>

          Також, власне від себе, хотів би подякувати двом товаришам Івану та Денису, що проявили ініціативу та зробили лого сайту, яке ви зараз можете спостерігати,
          а також всім, хто надавав мені підтримку та ідеї під час його створення!

          <br>
          <br>

          Для зв'яку з розробниками Ви можете надіслати листа на поштову скриньку <i>neberivinchik@gmail.com</i>, або пошукати мене на
          <a class="text-blue-600 hover:text-blue-400 italic" href="https://github.com/Brazilianian">GitHub</a>.

          <br>
          <br>

          Мирного неба Вам та Вашим близьким!

          <br>
          <br>

          <div class="text-right text-gray-500 italic text-xs bottom-0">Made and designed by Brazilian<br> 14.02.2023 Kyiv</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from "@/components/ui/Back-Button.vue";

export default {
  name: "InfoPage",
  components: {BackButton},
  data() {
    return {
    }
  },

  methods: {
    goToMainPage(){
      this.$router.push('/')
    }
  },

  created() {
    document.title = 'Не бери вінчік - Знайди своїх знайомих!'

  }
}
</script>

<style scoped>

</style>