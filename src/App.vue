<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1>Pinia {{ name }}</h1>
    </header>
    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>
    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all', taskStore.deleteTask">All tasks</button>
      <button @click="filter = 'favs'">Favs tasks</button>
    </nav>
    <!-- loading -->
    <div class="loading" v-if="loading">Loading tasks...</div>
    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ allCount }} tasks left to do</p>
      <div v-for="task in tasks">
        <TaskDetails :task="task" />
      </div>
    </div>
    <!-- fav task list -->
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favCount }} favs left to do</p>
      <div v-for="task in favs">
        <TaskDetails :task="task" />
      </div>
    </div>
    <button @click="taskStore.$reset">Reset State</button>
  </main>
</template>

<script>
  import TaskDetails from "./components/TaskDetails.vue";
  import { useTaskStore } from "./stores/TaskStore";
  import { ref } from "vue";
  import TaskForm from "@/components/TaskForm.vue";
  import {storeToRefs} from "pinia";
  export default {
    components: { TaskForm, TaskDetails }, // on component import we have to register that component using 'componets: {}'
    setup(){
      const taskStore = useTaskStore()
      // storeToRefs method is a helper method in Vue.js that allows you to easily "copy" data from a pinia store into an object's data.
      const { name, tasks, loading, favs, allCount, favCount } = storeToRefs(taskStore)
      // fetch tasks
      taskStore.getTasks()
      const filter = ref('all')
      return { taskStore, filter, name, tasks, loading, favs, allCount, favCount } // returning taskStore as an object
    }
  }
</script>