import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
    // Pinia the state is defined as a function that returns the initial state.
    // state will return objects
    state: () => ({
        tasks: [],
        loading: false,
        name: "Yoshi"
    }),
    // Getters are exactly the equivalent of computed values for the state of a Store
    getters: {
        favs(){
            return this.tasks.filter(t => t.isFav)
        },
        favCount(){
            return this.tasks.filter(t => t.isFav === true).length
        },
        allCount(){
            return this.tasks.length
        }
    },
    // perfect to define business logic
    // perform such tasks thst will be added to state:()
    actions: {
        // retrieve tasks data from db.json
        async getTasks(){
            this.loading = true
            const res = await fetch('http://localhost:3000/tasks')
            const data = await res.json()
            this.tasks = data
            this.loading = false
        },
        // add task data inside db.json
        async addTask(task){
            this.tasks.push(task)
            const res = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-Type': 'application/json'}
            })
            if (res.error){
                console.log(res.error)
            }
        },
        // delete specific task from db.json
        async deleteTask(id){
            this.tasks = this.tasks.filter(t => t.id !== id)
            const res = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'DELETE',
            })
            if (res.error){
                console.log(res.error)
            }
        },
        // update your favorite task in db.json
        async toggleFav(id){
            const task = this.tasks.find(t => t.id === id)
            task.isFav = !task.isFav
            const res = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ isFav: task.isFav }),
                headers: {'Content-Type': 'application/json'}
            })
            if (res.error){
                console.log(res.error)
            }
        }
    }
  })
