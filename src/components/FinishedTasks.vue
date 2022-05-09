<template>
  <table id="finishedTasks">
    <tr id="headers">
      <th>Palet number</th>
      <th>Plant</th>
      <th>Activity</th>
      <th>Realisation date</th>
    </tr>
    <tr v-for="task in finishedTasks" :key="task.dateOfPlanting">
      <td>{{ task.paletNumber }}</td>
      <td>{{ task.paletPlantsTypeName || "not specified" }}</td>
      <td>{{ task.typeOfCareName }}</td>
      <td>
        {{
          new Date(task.realizationDate).toLocaleDateString("en-US", dateFormat)
        }}
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "finished",
  props: {
    tasks: Array,
    dateFormat: Object,
  },
  computed: {
    finishedTasks: function () {
      return (this.tasks || [])
        .filter(
          (result) =>
            result.userId == localStorage.id && result.realizationDate != null
        )
        .sort((a, b) => {
          if (a.realizationDate > b.realizationDate) return -1;
          if (a.realizationDate < b.realizationDate) return 1;
          return 0;
        });
    },
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

* {
  font-family: "Roboto", sans-serif;
}

.tasksWrapper {
  margin-left: 250px;
}

.titleRow td {
  background: #43a047;
  color: #ffffff;
}

table {
  width: 70%;
  margin: 0 auto;
  text-align: left;
  box-shadow: 2px 2px 4px rgb(60 60 59 / 15%);
  border-collapse: collapse;
  background: #ffffff;
}

tr:hover {
  background: rgb(240, 240, 240);
}

th {
  padding: 10px 0px 10px 5px;
  margin: 0;
  color: white;
  border: 0;
}

td {
  padding: 5px 0px 5px 5px;
}

#headers {
  background: #76b852;
}
</style>