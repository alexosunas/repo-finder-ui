<template>
  <div class="submit-form list row">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="user">User</label>
        <input
          type="text"
          class="form-control"
          id="user"
          required
          v-model="user"
          name="user"
        />
      </div>

      <div class="form-group">
        <label for="repo">Repository</label>
        <input
          class="form-control"
          id="repo"
          required
          v-model="repo"
          name="repo"
        />
      </div><br>
      <button @click="getPR" class="btn btn-success">Get PRs</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
    </div>
  </div>
  <div class="list row">
    <div class="col-md-6">
      <h4>PR List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(pr, index) in pullRequests"
          :key="index"
          @click="setActivePR(pr, index)"
        >
          {{ pr.id }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentPullRequest.id">
        <h4>Pull Request</h4>
        <div>
          <label><strong>ID:</strong></label> {{ currentPullRequest.id }}
        </div>
        <div>
          <label><strong>URL:</strong></label>
          {{ currentPullRequest.url }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentPullRequest.state }}
        </div>

        <router-link
          :to="`/commits?url=${currentPullRequest.commits_url}`"
          class="badge badge-warning"
          style="color:#214C6E; font-size:18px; padding-left: 0px"
        >Comits</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a PR...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    /* eslint-disable */
    import { defineComponent } from "vue";
    import PullRequestsDataService from "@/services/PullRequestsDataService";
    import PullRequests from "@/types/PullRequests";
    import ResponseData from "@/types/ResponseData";

    export default defineComponent({
        name: "pull-requests-list",
        data() {
            return {
                pullRequests: [] as PullRequests[],
                currentPullRequest: {},
                currentIndex: -1,
                title: "",
                user: "",
                repo: "",
            };
        },
        methods: {
            getPR() {
                let data = {
                    user: this.user,
                    repo: this.repo,
                };
                PullRequestsDataService.getAll(data.user, data.repo)
                    .then((response: ResponseData) => {
                        this.pullRequests = response.data;
                        console.log(response.data);
                    })
                    .catch((e: Error) => {
                        console.log(e);
                    });
            },

            refreshList() {
                this.getPR();
                this.currentPullRequest = {};
                this.currentIndex = -1;
            },

            setActivePR(pr: {}, index = -1) {
                this.currentPullRequest = pr;
                this.currentIndex = index;
            },
        },
        mounted() {
            this.getPR();
        },
    });
</script>

<style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
</style>