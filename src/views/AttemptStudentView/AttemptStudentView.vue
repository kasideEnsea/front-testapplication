<i18n src="./AttemptStudentView.yaml"/>
<template>
    <div class="mx-auto fh" style="max-width: 1000px;">
        <div v-if="visible">
            <v-label>{{options.name}}</v-label>
            <empty-question-list v-if="options" :questions="options.questions" :test-id="options.id"/>
            <v-btn
                    @click="save"
                    class="white--text"
                    color="primary"
                    raised>
                {{$t('save')}}
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
    import {Test} from "@/models/Test";
    import {TestService} from "@/services/TestService";
    import {Question} from "@/models/Question";
    import {Option} from "@/models/Option";
    import {State} from "@/enum/State";
    import {StudentLinkService} from "@/services/StudentLinkService";
    import {ValidOptions} from "@/models/ValidOptions";
    import EmptyQuestionList from "@/components/EmptyQuestionList/EmptyQuestionList.vue";

    @Component({
        components: {EmptyQuestionList}
    })
    export default class AttemptStudentView extends Vue {
        private state = State.None;
        private visible = false;
        private options = new class implements Test {
            id = 0;
            name = "";
            questions: Question[] = [];
        };
        private validOptions = new class implements ValidOptions {
            id = 0;
            code = "";
        };

        save(): void {
            this.state = State.Loading;
            this.validOptions.id = +this.$route.params.id;
            this.validOptions.code = this.$route.params.code;
            StudentLinkService.getTest(this.validOptions).then(value => {
                this.options.id = value.id;
                this.options.name = value.name;
                this.options.questions = value.questions;
                this.state = State.None;
                this.visible = true;
            }).catch(reason => {
                console.error(reason);
            });
            this.setTitle();
            this.$router.push({path: `/`});
        }

        created() {
            this.state = State.Loading;
            this.validOptions.id = +this.$route.params.id;
            this.validOptions.code = this.$route.params.code;
            StudentLinkService.getTest(this.validOptions).then(value => {
                this.options.id = value.id;
                this.options.name = value.name;
                this.options.questions = value.questions;
                this.state = State.None;
                this.visible = true;
            }).catch(reason => {
                console.error(reason);
            });
            this.setTitle();
        }

        @Watch("$i18n.locale")
        private setTitle() {
            TitleService.setTitle(this.$t('title').toString());
        }

        get isLoading(): boolean {
            return this.state == State.Loading;
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