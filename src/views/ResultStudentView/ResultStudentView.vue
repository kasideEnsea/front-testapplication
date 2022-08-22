<i18n src="./ResultStudentView.yaml"/>
<template>
    <div class="mx-auto fh" style="max-width: 1000px;">
        <h1>{{$t('title')}}</h1>
        <student-result-list v-if="feedPromise" :tests="feedPromise"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {TitleService} from "@/services/TitleService";
    import StudentResultList from "@/components/StudentResultList/StudentResultList.vue";
    import {CheckedTest} from "@/models/CheckedTest";
    import {ResultService} from "@/services/ResultService";

    @Component({
        components: {StudentResultList}
    })
    export default class ResultStudentView extends Vue {
        feedPromise: Promise<CheckedTest[]> | null = null;

        created() {

            this.feedPromise = ResultService.getAllByCode(this.$route.params.code);
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