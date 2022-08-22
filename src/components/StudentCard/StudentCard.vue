<template>
    <v-card v-if="visible">
        <v-label>{{question.text}}</v-label>
        <div v-for="opt in question.options" :key="opt.id">
            <input type="checkbox" v-bind:value="opt" v-model="opt.isCorrect">
            <v-label>{{opt.text}}</v-label><br>
        </div>
        <br>
    </v-card>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import SecurityMixin from "@/security/SecurityMixin";
    import {Question} from "@/models/Question";

    @Component({

    })
    export default class StudentCard extends SecurityMixin {
        @Prop() question!: Question;
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
</style>