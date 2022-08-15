<i18n src="./TestView.yaml"/>
<template>
    <div class="mx-auto fh" style="max-width: 1000px;">
        <v-text-field
                required
                type="name"
                v-model="options.name"
                color="secondary"
                :rules="[(v => !!v || $t('name_required'))]"
        />
        <course-list v-if="options.questions" :questions="options.questions"/>
        <v-btn
                @click="save"
                class="white--text"
                color="primary"
                raised>
            {{$t('save')}}
        </v-btn>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {TitleService} from "@/services/TitleService";
    import {Test} from "@/models/Test";
    import {TestService} from "@/services/TestService";
    import QuestionList from "@/components/QuestionList/QuestionList.vue";
    import {Question} from "@/models/Question";
    import {Option} from "@/models/Option";

    @Component({
        components: {QuestionList}
    })
    export default class TestView extends Vue {
        private options = new class implements Test {
            id = -1;
            name = "";
            questions: Question[] = [];
        };
        private newQuestion = new class implements Question {
            id = -1;
            text = "";
            options: Option[] = [];
        };

        addQuestion(): void {
            const testId = +this.$route.params.testId;
            TestService.addTest(this.newQuestion, testId);
            this.$router.push({ path: `/test/${this.$route.params.testId}` });
        }

        save(): void {
            TestService.editTest(this.options);
            this.$router.push({ path: `/test/${this.$route.params.testId}` });
        }

        created() {
            const testId = +this.$route.params.testId;
            TestService.getTest(testId).then(value => {
                this.options.name = value.name;
                this.options.questions = value.questions;
            }).catch(reason => {
                console.error(reason);
            });
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