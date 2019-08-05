<template>
  <div>
    <input
      :id="id"
      :type="type"
      :name="name"
    >
    <label :for="id">
      {{ placeholder }}
    </label>
  </div>
</template>

<script>
  export default {
    name: 'Input',
    props: {
      type: {
        type: String,
        default: 'text'
      },
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        required: true
      }
    }
  };
</script>

<style lang="scss" scoped>
  div {
    position: relative;
    margin-top: 20px;
  }

  input {
    width: 100%;
    border: none;
    padding: 10px 0;
    font-size: 18px;
    line-height: 44px;
    height: 44px;
    border-bottom: 1px solid #bdbdbd;
    outline: none;
  }

  label {
    display: block;
    color: #999;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: .2s top, .2s font-size;
  }

  input:focus ~ label {
    top: -10px;
    font-size: 14px;
    color: #4dba87;
  }
</style>
