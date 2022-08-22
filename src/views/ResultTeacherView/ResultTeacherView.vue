<i18n src="./ResultTeacherView.yaml"/>
<template>
    <div class="mx-auto fh" style="max-width: 1000px;">
        <h1>{{$t('title')}}</h1>
        <teacher-result-list v-if="feedPromise" :tests="feedPromise"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {TitleService} from "@/services/TitleService";
    import {CheckedTest} from "@/models/CheckedTest";
    import TeacherResultList from "@/components/TeacherResultList/TeacherResultList.vue";
    import {ResultService} from "@/services/ResultService";
    import StudentResultList from "@/components/StudentResultList/StudentResultList.vue";

    @Component({
        components: {TeacherResultList}
    })
    export default class ResultTeacherView extends Vue {
        feedPromise: Promise<CheckedTest[]> | null = null;

        created() {
            const testId = +this.$route.params.id;
            this.feedPromise = ResultService.getAllByTestId(testId);
            this.setTitle();
        }

        @Watch("$i18n.locale")
        private setTitle() {
            TitleService.setTitle(this.$t('title').toString());
        }

    }
</script>

<style scoped>

</style>