<template>
    <v-card v-if="visible">
        <v-label>{{question.text}}</v-label>
        <div v-for="opt in question.options" :key="opt.id">
            <div v-if="opt.isCorrect" class="true" >
                <input type="checkbox" v-bind:value="opt" v-model="opt.isChosen">
                <v-label>{{opt.text}}</v-label><br>
            </div>
            <div v-else-if="opt.isChosen" class="false" >
                <input type="checkbox" v-bind:value="opt" v-model="opt.isChosen">
                <v-label>{{opt.text}}</v-label><br>
            </div>
            <div v-else>
                <input type="checkbox" v-bind:value="opt" v-model="opt.isChosen">
                <v-label>{{opt.text}}</v-label><br>
            </div>
        </div><br>
    </v-card>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import SecurityMixin from "@/security/SecurityMixin";
    import {CheckedQuestion} from "@/models/CheckedQuestion";

    @Component({

    })
    export default class CheckedQuestionCard extends SecurityMixin {
        @Prop() question!: CheckedQuestion;
        visible = true;
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

    .true {
        background-color: rgba(127, 255, 0, 0.53);
    }

    .false {
        background-color: rgba(178, 34, 34, 0.62);
    }
</style>