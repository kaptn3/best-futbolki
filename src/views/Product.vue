<template>
  <div>
    <product-top
      :id="id"
      :data="data"
      :name="name"
      :model="model"
      :relations="relations"
    />
    <product-detail :details="details"/>
  </div>
</template>

<script>
  import axios from 'axios';
  import ProductTop from '@/components/product/ProductTop';
  import ProductDetail from '@/components/product/ProductDetail';

  export default {
    components: {
      ProductTop,
      ProductDetail
    },
    data() {
      return {
        data: {},
        relations: {},
        id: 0,
        name: '',
        model: '',
        details: []
      };
    },
    mounted() {
      const url = `${process.env.VUE_APP_API}/data.json`;
      const urlRef = `${process.env.VUE_APP_API}/reference.json`;

      axios.get(url)
        .then((res) => {
          this.data = res.data;
          this.id = this.data.design.id;
          this.name = this.data.design.alias;
          this.model = this.data.categories[0].title;
          this.details = this.data.external_attributes;

          return axios.get(urlRef);
        })
        .then((res) => {
          this.relations = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
</script>
