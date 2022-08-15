<i18n src="./MainView.yaml"/>
<template>
    <div class="mx-auto fh" style="max-width: 1000px;">
        <h1>{{$t('title')}}</h1>
        <course-list v-if="feedPromise" :tests="feedPromise"/>
        <v-btn
                @click="addTest"
                class="white--text"
                color="primary"
                raised>
            {{$t('add')}}
        </v-btn>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {TitleService} from "@/services/TitleService";
    import TestList from "@/components/TestList/TestList.vue";
    import {Test} from "@/models/Test";
    import {TestService} from "@/services/TestService";

    @Component({
        components: {TestList}
    })
    export default class CourseView extends Vue {
        courses: Test[] = [];
        feedPromise: Promise<Test[]> | null = null;

        addTest(): void {
            this.$router.push({ path: `/add/course` });
        }

        created() {
            this.feedPromise = TestService.getTests();
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