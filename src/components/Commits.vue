<template>
  <div v-if="commits">
    <div class="list row">
      <div class="col-md-14">
      <h4>Commits</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(commit, index) in commits"
          :key="index"
          @click="setActiveCommit(commit, index)"
        >
          <strong>Author:</strong> {{ commit.commit.author.name }} <br>
          <strong>Message:</strong> <br> {{ commit.commit.message }}
        </li>
      </ul>
    </div>
    </div>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Commit...</p>
  </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import PullRequestsDataService from "@/services/PullRequestsDataService";
    import PullRequests from "@/types/PullRequests";
    import ResponseData from "@/types/ResponseData";

    export default defineComponent({
        name: "commits",
        data() {
            return {
                commits: [],
                currentCommit: {},
                currentIndex: -1,
                message: '',
                url: this.$route.query.url || 'hello'
            };
        },
        methods: {
            getCommits() {
                PullRequestsDataService.get(this.url)
                    .then((response: ResponseData) => {
                        this.commits = response.data;
                        console.log(response.data);
                    })
                    .catch((e: Error) => {
                        console.log(e);
                    });
            },

            // setActivePR(commit: {}, index = -1) {
            //     this.currentCommit = commit;
            //     this.currentIndex = index;
            // },
        },
        mounted() {
            this.message = "";
            this.getCommits();
            // this.getCommits(this.$route.query.url);
        },
    });
</script>

<style>
  .edit-form {
    max-width: 300px;
    margin: auto;
  }
</style>