<template>
    <v-card v-if="visible">
        <span class="test">
            <router-link :to="`/attempt/teacher/${test.linkId}`" class="test-name">{{test.email}}</router-link>
        </span>
        <v-label>{{test.countOfRightAnswers}}/{{test.questions.length}}</v-label>
    </v-card>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import SecurityMixin from "@/security/SecurityMixin";
    import {CheckedTest} from "@/models/CheckedTest";

    @Component({

    })
    export default class TeacherResultCard extends SecurityMixin {
        @Prop() test!: CheckedTest;
        visible = true;
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

    .test-name::before, .deck-name::after {
        content: '';
    }
</style>