<i18n src="./TestView.yaml"/>
<template>
    <div class="mx-auto fh" style="max-width: 1000px;">
        <v-text-field
                :label="$t('name')"
                required
                type="name"
                v-model="options.name"
                color="secondary"
                :rules="[(v => !!v || $t('error.name_required'))]"
        />
        <v-btn class="right" color="secondary">
            <v-img
                    max-height="20"
                    max-width="20"
                    src="/plus.png"
                    @click="addQuestion"
            />
        </v-btn>
        <question-list v-if="options" :questions="options.questions" :test-id="options.id"/>
        <v-btn
                @click="save"
                class="white--text"
                color="primary"
                raised>
            {{$t('save')}}
        </v-btn>
        <v-btn
                @click="deleteTest"
                class="white--text"
                color="error"
                raised>
            {{$t('delete')}}
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
            this.options.questions.push(new class implements Question {
                id = -1;
                text = "";
                options: Option[] = [];
            });
            /*const testId = +this.$route.params.testId;
            QuestionService.addQuestion(this.newQuestion, testId);
            this.$router.push({ path: `/test/${this.$route.params.testId}` });*/
        }

        save(): void {
            TestService.editTest(this.options);
            this.$router.push({path: `/`});
        }

        deleteTest(): void {
            const testId = +this.$route.params.id;
            TestService.deleteTest(testId).then(() => {
                this.$router.push({path: `/`});
            }).catch(reason => {
                console.error("Reason: " + reason);
            });
        }

        created() {
            const testId = +this.$route.params.id;
            TestService.getTest(testId).then(value => {
                this.options.id = value.id;
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
    .right {
        max-width: 600px;
        padding: 10px;
        display:inline-block;
        margin: 20px auto;
        margin-right: 20px;
        float: right;
    }
</style>