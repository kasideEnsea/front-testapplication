import {State} from "@/enum/State";
<i18n src="./TestStudentView.yaml"/>
<template>
    <div class="mx-auto fh" style="max-width: 1000px;">
        <h1>{{options.name}}</h1>
        <student-list class="space_above" v-if="options.questions" :questions="options.questions"/>
        <v-btn
                @click="save"
                class="white--text"
                color="primary"
                raised>
            {{$t('save')}}
        </v-btn>

        <v-alert type="info" v-if="isLoading">
            {{$t('loading')}}
        </v-alert>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {TitleService} from "@/services/TitleService";
    import CardList from "@/components/CardList/CardList.vue";
    import StudentList from "@/components/StudentList/StudentList.vue";
    import {Question} from "@/models/Question";
    import {Test} from "@/models/Test";
    import {State} from "@/enum/State";
    import {StudentLinkService} from "@/services/StudentLinkService";
    import {ResultService} from "@/services/ResultService";


    @Component({
        components: {StudentList}
    })
    export default class TestStudentView extends Vue {
        private state = State.None;
        private visible = false;
        private options = new class implements Test {
            id = 0;
            name = "";
            questions: Question[] = [];
        };

        created() {
            this.state = State.Loading;
            StudentLinkService.getTest(this.$route.params.code).then(value => {
                this.options.id = value.id;
                this.options.name = value.name;
                this.options.questions = value.questions;
                this.state = State.None;
                this.visible = true;
            }).catch(reason => {
                console.error(reason);
                this.$router.push({path: `/noValidTestLink`});
            });
            this.setTitle();
        }

        save(): void {
            ResultService.saveAttempt(this.options, this.$route.params.code);
            this.$router.push({path: `/attempt/${this.$route.params.code}`});
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