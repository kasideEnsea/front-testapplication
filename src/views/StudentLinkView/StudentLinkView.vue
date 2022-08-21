<i18n src="./StudentLinkView.yaml"/>
<template>
    <div class="mx-auto fh" style="max-width: 1000px;">
        <h1>{{$t('title')}}</h1>
        <v-text-field
                :label="$t('links')"
                required
                type="text"
                v-model="emailsString"
                color="secondary"
        />
        <v-btn
                @click="send"
                class="white--text"
                color="primary"
                raised>
            {{$t('send')}}
        </v-btn>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {TitleService} from "@/services/TitleService";
    import TestList from "@/components/TestList/TestList.vue";
    import {Test} from "@/models/Test";
    import {TestService} from "@/services/TestService";
    import {Question} from "@/models/Question";
    import {StudentLinkService} from "@/services/StudentLinkService";
    import {RegistrationOptions} from "@/models/RegistrationOptions";
    import {EmailList} from "@/models/EmailList";

    @Component({

    })
    export default class StudentLinkView extends Vue {
        private emailsString = "";
        private options = new class implements EmailList {
            emails: string[] = [];
            testId = -1;
        };

        send(): void {
            const testId = +this.$route.params.id;
            this.options.emails = this.emailsString.split(" ");
            this.options.testId = testId;
            StudentLinkService.sendLinks(this.options);
            this.$router.push({ path: `/` });
        }

        created() {
            this.setTitle();
        }

        @Watch("$i18n.locale")
        private setTitle() {
            TitleService.setTitle(this.$t('title').toString());
        }

    }
</script>

<style scoped>

</style>