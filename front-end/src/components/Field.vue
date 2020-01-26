<template>
  <div class="field-content">
    <input
      :class="inputClassName"
      :type="type"
      :name="nameIdFor"
      :id="nameIdFor"
      :title="title"
      ref="input"
      @focus="textBlackLabelUp"
      v-model="inputVal"
      @change="onSelect"
      required
      :list="list"
      :accept="accept"
    >
    <datalist v-if="list" id="allMembers" >
      <option v-for="({ id, firstname }) in membersToDisplay" :key="id">{{ firstname }}</option>
    </datalist>
    <label
      :class="labelClassName"
      :for="nameIdFor"
      ref="label"
    >
      {{ label }}
    </label>
  </div>
</template>

<script>

export default {
  props: {
    inputType: String,
    nameIdForText: String,
    value: String,
    listText: String,
    acceptText: String,
    titleText: String,
    inputClass: String,
    labelText: String,
    labelClass: String,
    membersCaught: Array
  },
  data () {
    return {
      type: this.inputType,
      nameIdFor: this.nameIdForText,
      list: this.listText,
      accept: this.acceptText,
      title: this.titleText,
      inputClassName: this.inputClass,
      label: this.labelText,
      labelClassName: this.labelClass,
      image: this.spaceImage
    }
  },
  computed: {
    inputVal: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    membersToDisplay () {
      return this.membersCaught
    }
  },
  methods: {
    textBlackLabelUp () {
      if (this.type !== 'file') {
        /* to make label go up */
        this.$refs.label.classList.add('field-content-label-space-up', 'field-content-label-animation')
      }
    },
    onSelect () {
      if (this.type === 'file') {
        this.image = this.$refs.input.files[0]
        // to ensure two-way data binding
        this.$emit('update:spaceImage', this.image)
      }
    }
  }
}
</script>
