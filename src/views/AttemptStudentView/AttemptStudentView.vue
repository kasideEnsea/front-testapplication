<i18n src="./AttemptStudentView.yaml"/>
<template>
    <div class="mx-auto fh" style="max-width: 1000px;">
        <h1>{{$t('test')}} {{options.name}}</h1><br>
        <h2>{{$t('email')}} {{options.email}}</h2><br>
        <checked-question-list v-if="options.questions" :questions="options.questions"/>
        <v-btn
                @click="showAll"
                class="white--text"
                color="primary"
                raised>
            {{$t('show')}}
        </v-btn>
        <v-alert type="info" v-if="isLoading">
            {{$t('loading')}}
        </v-alert>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {TitleService} from "@/services/TitleService";
    import {State} from "@/enum/State";
    import {ResultService} from "@/services/ResultService";
    import CheckedQuestionList from "@/components/CheckedQuestionList/CheckedQuestionList.vue";
    import {CheckedTest} from "@/models/CheckedTest";
    import {CheckedQuestion} from "@/models/CheckedQuestion";

    @Component({
        components: {CheckedQuestionList}
    })
    export default class AttemptStudentView extends Vue {
        private state = State.None;
        private visible = false;
        private options = new class implements CheckedTest {
            id = 0;
            name = "";
            questions: CheckedQuestion[] = [];
            email = "";
            countOfRightAnswers = 0;
            linkId = 0;
        };

        showAll(): void {
            this.$router.push({path: `/result/${this.$route.params.code}`});
        }

        created() {
            this.state = State.Loading;
            ResultService.getByCode(this.$route.params.code).then(value => {
                this.options.id = value.id;
                this.options.name = value.name;
                this.options.questions = value.questions;
                this.options.email = value.email;
                this.options.countOfRightAnswers = value.countOfRightAnswers;
                this.options.linkId = value.linkId;
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
        display: inline-block;
        margin: 20px auto;
        margin-right: 20px;
        float: right;
    }
</style>