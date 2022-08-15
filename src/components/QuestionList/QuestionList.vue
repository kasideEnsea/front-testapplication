<i18n src="./QuestionList.yaml"/>
<template>
    <div style="max-width: 800px">
        <template v-if="data && questions">
            <question-card :question="question" :key="question.id" v-for="question in data"/>
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
    import QuestionCard from "@/components/QuestionCard/QuestionCard.vue";
    import {Question} from "@/models/Question";


    @Component({
        components: {QuestionCard}
    })
    export default class QuestionList extends Vue {
        state: State = State.None;
        data: Question[] | null = null;
        page = 1;
        toLoad = 1;
        totalPages = 0;
        @Prop() questions!: Promise<Question[]>;
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
            this.data = null;
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
            this.state = State.Loading;
            this.questions.then(value => {
                this.data = value;
                this.totalPages = 1;
                this.state = State.Success;
            }).catch(reason => {
                console.error("Reason: " + reason);
                this.state = State.Error;
            });
        }
    }
</script>

<style scoped>

</style>