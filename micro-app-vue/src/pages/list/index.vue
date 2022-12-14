<template>
  <section>
    <a-card title="Vue 子应用列表页">
      <a-table rowKey="_id" :dataSource="data" :pagination="pageInfo">
        <a-table-column dataIndex="name" />
        <a-table-column dataIndex="price" :customRender="(text) => `￥ ${text}`" />
      </a-table>
    </a-card>
    <a-button @click="toMainAppHome">toMainAppHome</a-button>
  </section>
  
</template>

<script>
import fetch from "isomorphic-fetch";
import actions from "@/shared/actions";
export default {
  name: "List",

  data() {
    return {
      data: [],
      pageInfo: {
        onChange: page => this.fetchVegetable(page, 10)
      },
    }
  },
  
  methods: {
    toMainAppHome() {
      const token = actions.actions.getGlobalState('token')
      actions.actions.mainRouter.push({path: '/?token=' + token})
      // actions
      // this.$router.push({path: '/'})
    },
    async fetchVegetable (page, pageSize) {
      const result = await fetch("http://dev-api.jt-gmall.com/mall", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // graphql 的查询风格
        body: JSON.stringify({ query: `{ vegetableList (page: ${page}, pageSize: ${pageSize}) { page, pageSize, total, items { _id, name, poster, price } } }` })
      }).then(res => res.json());
      const { vegetableList } = result.data;
      this.data = vegetableList.items;
      this.pageInfo = {
        current: vegetableList.page,
        pageSize: vegetableList.pageSize,
        total: vegetableList.total,
        onChange: page => this.fetchVegetable(page, 10)
      };
    }
  },

  created() {
    this.fetchVegetable(1, 10);
  }
}
</script>