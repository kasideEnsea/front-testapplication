<i18n src="./QuestionCard.yaml"/>
<template>
    <v-card v-if="visible">
        <v-text-field
                required
                type="name"
                v-model="question.text"
                color="secondary"
                :rules="[(v => !!v || $t('error.count_required'))]"
        />
        <v-btn class="right" color="secondary">
            <v-img
                    max-height="20"
                    max-width="20"
                    src="/bin.png"
                    @click="deleteQuestion"
            />
        </v-btn>
        <v-btn class="right" color="secondary">
            <v-img
                    max-height="20"
                    max-width="20"
                    src="/pen.png"
                    @click="addEmptyOption"
            />
        </v-btn>
        <template v-for="opt in question.options">
            <input type="checkbox" v-bind:value="opt" v-model="opt.isCorrect">
            <label>{{opt.text}}</label><br>
        </template>
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
        visible = true;
        private option = new class implements Option {
            id = -1;
            questionId = -1;
            text = "";
            isCorrect = false;
        };

        deleteQuestion(): void {
            QuestionService.deleteQuestion(this.question.id).then(() => {
                this.$router.push({path: `/test/${this.$route.params.testId}`});
            }).catch((reason: string) => {
                console.error("Reason: " + reason);
            });
        }

        addEmptyOption(): void {
            this.option.questionId = this.question.id;
            QuestionService.addOption(this.option, this.question.id).then(() => {
                this.$router.push({path: `/test/${this.$route.params.testId}`});
            }).catch((reason: string) => {
                console.error("Reason: " + reason);
            });
        }

    }
</script>

<style scoped>
    .test {
        max-width: 600px;
        padding: 10px;
        margin: 20px auto;
        display:inline-block;
    }

    .right {
        max-width: 600px;
        padding: 10px;
        display:inline-block;
        margin: 20px auto;
        margin-right: 20px;
        float: right;
    }

    .comment {
        padding: 10px;
        margin: 10px;
    }

    .actionBar {
        width: 100%;
        display: flow-root;
    }

    .test-name::before, .test-name::after {
        content: '';
    }

    .deck {
        max-width: 600px;
        padding: 10px;
        margin: 20px auto;
        display:inline-block;
    }

    .right {
        max-width: 600px;
        padding: 10px;
        display:inline-block;
        margin: 20px auto;
        float: right;
    }

    .comment {
        padding: 10px;
        margin: 10px;
    }

    .actionBar {
        width: 100%;
        display: flow-root;
    }

    .deck-name::before, .deck-name::after {
        content: '"';
    }
</style>