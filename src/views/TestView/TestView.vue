import {State} from "@/enum/State";
<i18n src="./TestView.yaml"/>
<template>
    <div class="mx-auto fh" style="max-width: 1000px;">
        <div v-if="visible">
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
            <question-list class="space_above" v-if="options.questions" :test-id="options.id" :questions="options.questions"/>
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
        <v-alert type="info" v-if="isLoading">
            {{$t('loading')}}
        </v-alert>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {TitleService} from "@/services/TitleService";
    import QuestionList from "@/components/QuestionList/QuestionList.vue";
    import {State} from "@/enum/State";
    import {Question} from "@/models/Question";
    import {Test} from "@/models/Test";
    import {TestService} from "@/services/TestService";
    import {Option} from "@/models/Option";


    @Component({
        components: {QuestionList}
    })
    export default class TestView extends Vue {
        private state = State.None;
        private visible = false;
        private options = new class implements Test {
            id = -1;
            name = "";
            questions: Question[] = [];
        };

        addQuestion(): void {
            this.options.questions.push(new class implements Question {
                id = -1;
                text = "";
                options: Option[] = [];
            });
        }

        created() {
            this.state = State.Loading;
            const testId = +this.$route.params.id;
            TestService.getTest(testId).then(value => {
                this.options.id = value.id;
                this.options.name = value.name;
                this.options.questions = value.questions;
                this.state = State.None;
                this.visible = true;
            }).catch(reason => {
                console.error(reason);
                this.$router.push({path: `/*`});
            });
            this.setTitle();
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


        @Watch("$i18n.locale")
        private setTitle() {
            TitleService.setTitle(this.$t('title').toString());
        }

    }
</script>

<style scoped>
    .fh {
        height: auto;
    }
</style>

<style>
    /*Fixes shade blinking bug*/
    /*noinspection CssUnusedSymbol*/
    .v-window__container--is-active {
        height: auto !important;
    }

    .radio {
        padding: 5px;
    }

    .space_above {
        margin-top: 20px;
    }
</style>