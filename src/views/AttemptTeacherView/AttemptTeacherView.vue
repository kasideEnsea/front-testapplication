<i18n src="./AttemptTeacherView.yaml"/>
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
    import {CheckedTest} from "@/models/CheckedTest";
    import {CheckedQuestion} from "@/models/CheckedQuestion";
    import CheckedQuestionList from "@/components/CheckedQuestionList/CheckedQuestionList.vue";
    import {StringDto} from "@/models/StringDto";

    @Component({
        components: {CheckedQuestionList}
    })
    export default class AttemptTeacherView extends Vue {
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
        private emailDto = new class implements StringDto {
            str = "";
        };

        showAll(): void {
            this.$router.push({path: `/result/teacher/${this.$route.params.id}`});
        }

        created() {
            this.state = State.Loading;
            const id = +this.$route.params.linkId;
            ResultService.getCheckedTestByLinkId(id).then(value => {
                this.options.id = value.id;
                this.options.name = value.name;
                this.options.questions = value.questions;
                this.options.email = value.email;
                this.options.countOfRightAnswers = value.countOfRightAnswers;
                this.options.linkId = 0;
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