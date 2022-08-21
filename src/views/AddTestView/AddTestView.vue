<i18n src="./AddTestView.yaml"/>
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
        <v-btn
                @click="save"
                class="white--text"
                color="primary"
                raised>
            {{$t('save')}}
        </v-btn>
        <v-alert type="success" v-if="isSuccess">
            {{$t('success')}}
        </v-alert>
        <v-alert type="info" v-if="isLoading">
            {{$t('loading')}}
        </v-alert>
        <div :key="errCode">
            <v-alert type="error" v-if="isError">
                {{getErrorDescription}}
            </v-alert>
        </div>
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
    import {QuestionService} from "@/services/QService";
    import {State} from "@/enum/State";
    import {AuthService} from "@/security/AuthService";

    @Component({
        components: {QuestionList}
    })
    export default class AddTestView extends Vue {
        private options = new class implements Test {
            id = -1;
            name = "";
            questions: Question[] = [];
        };
        private state = State.None;
        private errCode = 0;
        private errorDict!: Record<number, string>

        save(): void {
            this.state = State.Loading;
            TestService.addTest(this.options).then((value) => {
                this.state = State.Success;
                this.$router.push({ path: `/` });
            }).catch(reason => {
                console.error("Reason: " + reason);
                this.errCode = reason.response.status;
                this.state = State.Error;
            });

            this.$router.back();
        }

        created() {
            this.setTitle();
        }

        @Watch("$i18n.locale")
        private setTitle() {
            TitleService.setTitle(this.$t('title').toString());
        }

        get getErrorDescription(): string {
            const error = this.errorDict[this.errCode];
            if (error)
                return error;
            else
                return this.$t('error.default', {errCode: this.errCode}).toString();
        }

        get isLoading(): boolean {
            return this.state == State.Loading;
        }

        get isSuccess(): boolean {
            return this.state == State.Success;
        }

        get isError(): boolean {
            return this.state == State.Error;
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