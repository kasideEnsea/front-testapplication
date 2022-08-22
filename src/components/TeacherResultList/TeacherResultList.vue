import {State} from "@/enum/State";
<i18n src="./TeacherResultList.yaml"/>
<template>
    <div style="max-width: 800px">
        <template v-if="data && tests">
            <teacher-result-card :test="test" :key="test.id" v-for="test in data"/>
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
    import {CheckedTest} from "@/models/CheckedTest";
    import TeacherResultCard from "@/components/TeacherResultCard/TeacherResultCard.vue";

    @Component({
        components: {TeacherResultCard}
    })
    export default class TeacherResultList extends Vue {
        state: State = State.None;
        data: CheckedTest[] | null = null;
        page = 1;
        toLoad = 1;
        totalPages = 0;
        @Prop() tests!: Promise<CheckedTest[]>;
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
            this.tests.then(value => {
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