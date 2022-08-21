<i18n src="./QuestionCard.yaml"/>
<template>
    <v-card v-if="visible">
        <v-text-field
                :label="$t('question')"
                required
                type="name"
                v-model="question.text"
                color="secondary"
                :rules="[(v => !!v || $t('error.text_required'))]"
        />
        <v-btn color="secondary">
            <v-img
                    max-height="20"
                    max-width="20"
                    src="/bin.png"
                    @click="deleteQuestion"
            />
        </v-btn>
        <v-btn color="secondary">
            <v-img
                    max-height="20"
                    max-width="20"
                    src="/pen.png"
                    @click="addEmptyOption"
            />
        </v-btn>
        <div v-for="opt in question.options" :key="opt.id">
                <input type="checkbox" v-bind:value="opt" v-model="opt.isCorrect"><br>
                <v-text-field class="inl"
                        :label="$t('option')"
                        required
                        type="name"
                        v-model="opt.text"
                        color="secondary"
                /><br>
        </div>
    </v-card>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import SecurityMixin from "@/security/SecurityMixin";
    import {Question} from "@/models/Question";
    import {QuestionService} from '@/services/QService';
    import {Option} from "@/models/Option";

    @Component({

    })
    export default class TestCard extends SecurityMixin {
        @Prop() question!: Question;
        @Prop() testId: number | undefined;
        visible = true;
        private option = new class implements Option {
            id = -1;
            questionId = -1;
            text = "";
            isCorrect = false;
        };

        deleteQuestion(): void {
            QuestionService.deleteQuestion(this.question.id).then(() => {
                window.location.reload();
                this.$router.push({path: `/test/${this.testId}`}).catch (reason => {console.log("reason " + reason)});
            });
        }

        addEmptyOption(): void {
            this.question.options.push(new class implements Option {
                id = -1;
                questionId = -1;
                text = "";
                isCorrect = false;
            });
            /*this.option.questionId = this.question.id;
            QuestionService.addOption(this.option, this.question.id).then(() => {
                this.$router.push({path: `/test/${this.$route.params.testId}`});
            }).catch((reason: string) => {
                console.error("Reason: " + reason);
            });*/
        }

    }
</script>

<style scoped>

    .right {
        max-width: 600px;
        padding: 20px;
        display:inline-block;
        margin: 40px auto;
        float: right;
        margin-right: 10px;
    }

    .inl {
        display: inline;
        padding-left: 10px;
    }
</style>