<template>
    <v-card v-if="visible">
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
                    src="/bin.png"
                    @click="deleteTest"
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

        deleteTest(): void {
            TestService.deleteTest(this.test.id).then(() => {
                this.$router.push({path: `/`});
            }).catch(reason => {
                console.error("Reason: " + reason);
            });
        }

        link(): void {
            this.$router.push({path: `/send/${this.test.id}`});
        }

        results(): void {
            this.$router.push({path: `/results/${this.test.id}`});
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