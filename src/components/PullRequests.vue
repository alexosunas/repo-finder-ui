<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">User</label>
        <input
          type="text"
          class="form-control"
          id="user"
          required
          v-model="pullRequest.user"
          name="user"
        />
      </div>

      <div class="form-group">
        <label for="description">Repository</label>
        <input
          class="form-control"
          id="repo"
          required
          v-model="pullRequests.repo"
          name="repo"
        />
      </div>

      <button @click="getPR" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
<!--      <button class="btn btn-success" @click="newTutorial">Add</button>-->
    </div>
  </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import PullRequestsDataService from "@/services/PullRequestsDataService";
    import PullRequests from "@/types/PullRequests";
    import ResponseData from "@/types/ResponseData";

    export default defineComponent({
        name: "pull-requests",
        data() {
            return {
                pullRequests: {
                    user: "",
                    repo: "",
                    id: null,
                } as PullRequests,
                submitted: false,
            };
        },
        methods: {
            getPR() {
                let data = {
                    user: this.pullRequests.user,
                    repo: this.pullRequests.repo,
                };

                PullRequestsDataService.getAll(data.user, data.repo)
                    .then((response: ResponseData) => {
                        this.pullRequests.id = response.data.id;
                        console.log(response.data);
                        this.submitted = true;
                    })
                    .catch((e: Error) => {
                        console.log(e);
                    });
            },

            // newTutorial() {
            //     this.submitted = false;
            //     this.tutorial = {} as Tutorial;
            // },
        },
    });
</script>

<style>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
</style>