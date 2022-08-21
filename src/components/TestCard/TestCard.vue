<template>
    <v-card v-if="visible">
        <v-label class="deck-name">{{card.front_word}}</v-label>
        <span class="test">
            <router-link :to="`/test/${test.id}`" class="test-name">{{test.name}}</router-link>
        </span>
        <v-btn class="right" color="secondary">
            <v-img
                    max-height="20"
                    max-width="20"
                    src="/link.png"
                    @click="link"
            />
        </v-btn>
        <v-btn class="right" color="secondary">
            <v-img
                    max-height="20"
                    max-width="20"
                    src="/question.png"
                    @click="results"
            />
        </v-btn>
    </v-card>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import SecurityMixin from "@/security/SecurityMixin";
    import { Test } from '@/models/Test';
    import {TestService} from "@/services/TestService";

    @Component({

    })
    export default class TestCard extends SecurityMixin {
        @Prop() test!: Test;
        visible = true;

        link(): void {
            this.$router.push({path: `/send/${this.test.id}`});
        }

        results(): void {
            this.$router.push({path: `/result/teacher/${this.test.id}`});
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