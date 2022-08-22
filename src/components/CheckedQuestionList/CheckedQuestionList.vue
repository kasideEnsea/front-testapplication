<i18n src="./CheckedQuestionList.yaml"/>
<template>
    <div style="max-width: 800px">
        <template v-if="questions">
            <checked-question-card :question="question" :key="question.id" v-for="question in questions" />
        </template>
        <p v-if="isSuccess && !data.length">
            {{$t('nothing_found')}}
        </p>
        <v-alert type="info" v-if="isLoading">
            {{$t('loading')}}
        </v-alert>
        <v-alert type="error" v-if="isError">
            {{$t('error')}}
        </v-alert>
        <v-pagination
                :length="totalPages"
                v-model="page"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import {State} from "@/enum/State";
    import CheckedQuestionCard from "@/components/CheckedQuestionCard/CheckedQuestionCard.vue";
    import {CheckedQuestion} from "@/models/CheckedQuestion";


    @Component({
        components: {CheckedQuestionCard}
    })
    export default class CheckedQuestionList extends Vue {
        state: State = State.None;
        page = 1;
        toLoad = 1;
        totalPages = 0;
        @Prop() questions!: CheckedQuestion[];

        get isLoading(): boolean {
            return this.state == State.Loading;
        }

        get isSuccess(): boolean {
            return this.state == State.Success;
        }

        get isError(): boolean {
            return this.state == State.Error;
        }

        created(): void {
            this.load();
        }

        @Watch("page")
        private pageChanged(): void {
            this.questions = [];
            this.toLoad = this.page;
            this.load()
        }

        private reloadAndShowMore(): void {
            this.load();
            this.loadMore()
        }

        private loadMore(): void {
            this.toLoad++;
            this.load();
        }

        private load(): void {
            if (this.questions.length){
                this.totalPages = 1;
                this.state = State.Success;
            }
        }
    }
</script>

<style scoped>

</style>